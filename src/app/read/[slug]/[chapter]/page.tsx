'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';

type ReaderTheme = 'midnight' | 'sepia' | 'daylight';

export default function ChapterReaderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const chapterNum = Number(params?.chapter || 1);

  const {
    books,
    updateProgress,
    paragraphComments,
    addParagraphComment,
    saveQuoteHighlight,
    incrementReadingMinutes
  } = useBookStore();

  const book = books.find((b) => b.slug === slug);

  const [theme, setTheme] = useState<ReaderTheme>('midnight');
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);

  // 1. AI Audiobook / Neural US African-American Male Voice State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [speakingParaIdx, setSpeakingParaIdx] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [voiceProfile, setVoiceProfile] = useState<'marcus' | 'darius' | 'malik'>('marcus');
  const [autoNextChapter, setAutoNextChapter] = useState<boolean>(true);
  const stopRequestedRef = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());

  // 2. Inline Paragraph Comments & Quote Card Drawer State
  const [activeParaIdx, setActiveParaIdx] = useState<number | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<'🔥' | '❤️' | '🙏' | '💡'>('🔥');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [fullChapterContent, setFullChapterContent] = useState<string | null>(null);

  useEffect(() => {
    setFullChapterContent(null);
    fetch(`/api/chapter?slug=${slug}&chapter=${chapterNum}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.ok && data.chapter?.content) {
          setFullChapterContent(data.chapter.content);
        }
      })
      .catch(() => {});
  }, [slug, chapterNum]);

  useEffect(() => {
    if (book && chapterNum) {
      updateProgress(book.slug, chapterNum);
      incrementReadingMinutes(2);
    }
    return () => {
      stopRequestedRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [slug, chapterNum]);

  if (!book) {
    return (
      <div className="px-4 py-20 text-center space-y-4">
        <h1 className="font-title-novel text-2xl font-bold text-on-surface">
          Novel Not Found
        </h1>
        <Link
          href="/"
          className="inline-block rounded-xl bg-primary-container px-6 py-2.5 text-xs font-bold text-on-primary-container"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const currentChapter =
    book.chapters.find((c) => c.number === chapterNum) || book.chapters[0];
  const activeContent = fullChapterContent || currentChapter.content;
  const paragraphs = activeContent
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const hasPrev = chapterNum > 1;
  const hasNext = chapterNum < book.chapters.length;
  const progressPercent = Math.round(
    (currentChapter.number / Math.max(1, book.chapters.length)) * 100
  );

  // Fetch neural MP3 blob URL for a paragraph (with in-memory cache + prefetch support)
  const fetchNeuralAudioUrl = async (
    text: string,
    voice: string,
    rate: number
  ): Promise<string> => {
    const cacheKey = `${voice}:${rate}:${text.slice(0, 64)}:${text.length}`;
    const existing = audioCacheRef.current.get(cacheKey);
    if (existing) return existing;

    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice, rate })
    });
    if (!res.ok) {
      throw new Error('Neural TTS unavailable');
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioCacheRef.current.set(cacheKey, url);
    return url;
  };

  // Speak paragraph-by-paragraph with realistic 25yo US African-American Male Neural Voice
  const startSpeakingFrom = (startIndex: number) => {
    if (typeof window === 'undefined') return;
    stopRequestedRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(true);

    const speakStep = async (idx: number) => {
      if (stopRequestedRef.current) return;
      if (idx >= paragraphs.length) {
        setIsPlayingAudio(false);
        setIsLoadingAudio(false);
        setSpeakingParaIdx(null);
        if (autoNextChapter && hasNext) {
          router.push(`/read/${book.slug}/${chapterNum + 1}`);
        }
        return;
      }

      setSpeakingParaIdx(idx);
      setIsLoadingAudio(true);

      // Pre-fetch next paragraph in the background for zero-latency transitions
      if (idx + 1 < paragraphs.length) {
        fetchNeuralAudioUrl(paragraphs[idx + 1], voiceProfile, speechRate).catch(
          () => {}
        );
      }

      try {
        const audioUrl = await fetchNeuralAudioUrl(
          paragraphs[idx],
          voiceProfile,
          speechRate
        );
        if (stopRequestedRef.current) return;

        setIsLoadingAudio(false);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          if (!stopRequestedRef.current) {
            speakStep(idx + 1);
          }
        };

        audio.onerror = () => {
          if (!stopRequestedRef.current) {
            speakStep(idx + 1);
          }
        };

        await audio.play();
      } catch {
        // Offline Fallback: Use browser speechSynthesis tuned to deep US male voice
        setIsLoadingAudio(false);
        if (stopRequestedRef.current || !('speechSynthesis' in window)) return;
        const utter = new SpeechSynthesisUtterance(paragraphs[idx]);
        const voices = window.speechSynthesis.getVoices();
        const usMaleVoice =
          voices.find(
            (v) =>
              v.lang.startsWith('en-US') &&
              /brian|andrew|guy|christopher|david|mark|male/i.test(v.name)
          ) || voices.find((v) => v.lang.startsWith('en-US'));
        if (usMaleVoice) utter.voice = usMaleVoice;
        utter.rate = speechRate;
        utter.pitch = 0.92;
        utter.onend = () => {
          if (!stopRequestedRef.current) {
            speakStep(idx + 1);
          }
        };
        window.speechSynthesis.speak(utter);
      }
    };

    speakStep(startIndex);
  };

  const toggleAudiobook = () => {
    if (isPlayingAudio) {
      stopRequestedRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      setIsLoadingAudio(false);
      setSpeakingParaIdx(null);
    } else {
      startSpeakingFrom(speakingParaIdx ?? 0);
    }
  };

  const handleAddInlineComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeParaIdx === null || !commentText.trim()) return;
    addParagraphComment(
      book.slug,
      currentChapter.number,
      activeParaIdx,
      commentName.trim() || 'Reader',
      commentText.trim(),
      selectedReaction
    );
    setCommentText('');
    setToastMsg('Reaction posted to this paragraph!');
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleSaveParagraphQuote = (paraIdx: number) => {
    const text = paragraphs[paraIdx];
    saveQuoteHighlight({
      bookTitle: book.title,
      bookSlug: book.slug,
      author: book.author,
      chapterNumber: currentChapter.number,
      chapterTitle: currentChapter.title,
      quoteText: text
    });
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `“${text}” — ${book.author}, ${book.title} (${currentChapter.title})`
      );
    }
    setToastMsg('Quote saved to your Library Highlights & copied to clipboard!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const themeClasses: Record<ReaderTheme, string> = {
    midnight: 'bg-[#0b0f19] text-[#f8fafc]',
    sepia: 'bg-[#f4ecd8] text-[#3b2f2f]',
    daylight: 'bg-[#f8fafc] text-[#0f172a]'
  };

  const activeParaComments =
    activeParaIdx !== null
      ? paragraphComments.filter(
          (c) =>
            c.bookSlug === book.slug &&
            c.chapterNumber === currentChapter.number &&
            c.paragraphIndex === activeParaIdx
        )
      : [];

  return (
    <div
      className={`min-h-screen rounded-2xl transition-colors duration-200 pb-24 ${themeClasses[theme]}`}
    >
      {/* Top Android Reader Sub-Bar */}
      <div className="sticky top-[102px] z-40 bg-surface-container-low/95 text-on-surface backdrop-blur-md border-b border-surface-variant/50 px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        <Link
          href={`/book/${book.slug}`}
          className="flex items-center gap-1 rounded-xl bg-surface-container-high px-2.5 py-1.5 text-xs font-semibold text-on-surface active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          <span className="hidden xs:inline">Chapters</span>
        </Link>

        {/* Chapter Jump Select */}
        <select
          value={currentChapter.number}
          onChange={(e) => router.push(`/read/${book.slug}/${e.target.value}`)}
          className="flex-1 max-w-[175px] truncate rounded-xl bg-surface-container border border-surface-variant/60 px-2.5 py-1.5 text-xs text-on-surface focus:border-primary-container focus:outline-none"
        >
          {book.chapters.map((ch) => (
            <option key={ch.id} value={ch.number}>
              #{ch.number}: {ch.title}
            </option>
          ))}
        </select>

        {/* AI Audiobook Play/Pause Pill */}
        <button
          onClick={toggleAudiobook}
          className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all active:scale-95 ${
            isPlayingAudio
              ? 'bg-[#fbbf24] text-slate-950 shadow-md'
              : 'bg-primary-container text-white shadow'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isPlayingAudio ? 'pause_circle' : 'headphones'}
          </span>
          <span>{isPlayingAudio ? 'Listening' : 'Listen'}</span>
        </button>

        {/* Typography Settings Button */}
        <button
          onClick={() => setShowSettingsSheet(!showSettingsSheet)}
          className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold active:scale-95 transition-all ${
            showSettingsSheet
              ? 'bg-primary-container text-on-primary-container'
              : 'bg-surface-container-high text-primary'
          }`}
        >
          <span>Aa</span>
        </button>
      </div>

      {/* Crimson Reading Progress Bar */}
      <div className="h-1 w-full bg-surface-container-highest">
        <div
          className="h-full bg-primary-container transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Toast Feedback Banner */}
      {toastMsg && (
        <div className="fixed top-36 left-1/2 -translate-x-1/2 z-50 rounded-full bg-emerald-500 px-4 py-2 text-xs font-black text-slate-950 shadow-xl">
          ✓ {toastMsg}
        </div>
      )}

      {/* AI AUDIOBOOK CONTROLLER BAR (25yo US African-American Male Studio Vocals) */}
      <div className="mx-4 mt-3 rounded-2xl bg-gradient-to-r from-[#121826] via-[#1e273d] to-[#121826] border border-[#334155] p-3 text-[#f8fafc] shadow-lg flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleAudiobook}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fbbf24] text-slate-950 font-black shadow active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isLoadingAudio
                ? 'hourglass_top'
                : isPlayingAudio
                ? 'pause'
                : 'play_arrow'}
            </span>
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-extrabold text-[#f8fafc]">
                US African-American Male Narrator (25yo)
              </span>
              <span className="rounded bg-primary-container/30 border border-primary/40 px-1.5 py-0.2 text-[9px] font-bold text-primary">
                NEURAL HD
              </span>
              {isPlayingAudio && (
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300 animate-pulse">
                  {isLoadingAudio
                    ? 'LOADING STUDIO VOICE...'
                    : `SPEAKING PARA #${(speakingParaIdx ?? 0) + 1}`}
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#94a3b8]">
              Realistic 25yo African-American male vocals • Tap any paragraph to listen from that spot
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Vocal Profile Selector */}
          <select
            value={voiceProfile}
            onChange={(e) => {
              const nextVoice = e.target.value as 'marcus' | 'darius' | 'malik';
              setVoiceProfile(nextVoice);
            }}
            aria-label="Select African-American Male Vocal Profile"
            className="rounded-lg bg-[#0b0f19] border border-[#334155] px-2 py-1 text-[11px] font-bold text-[#f8fafc]"
          >
            <option value="marcus">🎙️ Marcus (25 • Soulful &amp; Sincere)</option>
            <option value="darius">🎙️ Darius (25 • Warm Baritone)</option>
            <option value="malik">🎙️ Malik (26 • Deep Storyteller)</option>
          </select>

          {/* Speed Selector */}
          <select
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="rounded-lg bg-[#0b0f19] border border-[#334155] px-2 py-1 text-[11px] font-bold text-[#fbbf24]"
          >
            <option value={0.85}>0.85x Slow</option>
            <option value={1.0}>1.0x Normal</option>
            <option value={1.2}>1.2x Fast</option>
            <option value={1.5}>1.5x Speed</option>
          </select>

          {/* Auto-Next Chapter Toggle */}
          <button
            onClick={() => setAutoNextChapter(!autoNextChapter)}
            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border transition-colors ${
              autoNextChapter
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                : 'border-[#334155] bg-[#0b0f19] text-[#94a3b8]'
            }`}
          >
            Auto-Next: {autoNextChapter ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Android Bottom-Sheet Style Typography & Theme Drawer */}
      {showSettingsSheet && (
        <div className="mx-4 mt-3 rounded-2xl bg-surface-container border border-surface-variant/60 p-4 text-on-surface shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-tertiary">
              Reading Preferences
            </span>
            <button
              onClick={() => setShowSettingsSheet(false)}
              className="text-xs text-on-surface-variant hover:text-on-surface"
            >
              Done
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFontFamily('serif')}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                fontFamily === 'serif'
                  ? 'bg-primary-container text-on-primary-container border-primary-container'
                  : 'bg-surface-container-low border-surface-variant text-on-surface-variant'
              }`}
            >
              Newsreader (Serif)
            </button>
            <button
              onClick={() => setFontFamily('sans')}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                fontFamily === 'sans'
                  ? 'bg-primary-container text-on-primary-container border-primary-container'
                  : 'bg-surface-container-low border-surface-variant text-on-surface-variant'
              }`}
            >
              Plus Jakarta (Sans)
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center rounded-xl bg-surface-container-low border border-surface-variant p-1">
              <button
                onClick={() => setFontSize((s) => Math.max(15, s - 2))}
                className="px-3 py-1 text-xs font-bold text-on-surface active:scale-95"
              >
                A-
              </button>
              <span className="px-2 text-xs font-bold text-tertiary">
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize((s) => Math.min(28, s + 2))}
                className="px-3 py-1 text-xs font-bold text-on-surface active:scale-95"
              >
                A+
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTheme('midnight')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  theme === 'midnight'
                    ? 'border-primary-container bg-[#0b0f19] text-white'
                    : 'border-surface-variant bg-[#0b0f19]/60 text-slate-400'
                }`}
              >
                Midnight
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  theme === 'sepia'
                    ? 'border-primary-container bg-[#f4ecd8] text-[#3b2f2f]'
                    : 'border-surface-variant bg-[#f4ecd8]/80 text-[#3b2f2f]'
                }`}
              >
                Sepia
              </button>
              <button
                onClick={() => setTheme('daylight')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  theme === 'daylight'
                    ? 'border-primary-container bg-white text-slate-900'
                    : 'border-surface-variant bg-white/80 text-slate-800'
                }`}
              >
                Light
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chapter Content with Inline Paragraph Reactions & Quote Highlighter */}
      <article className="px-5 py-7 sm:px-8">
        <header className="mb-8 border-b border-current/15 pb-6">
          <p className="text-[11px] font-bold uppercase tracking-widest opacity-70">
            {book.title} • {currentChapter.part ? `${currentChapter.part} • ` : ''}
            Part {currentChapter.number} of {book.chapters.length}
          </p>
          <h1 className="mt-1.5 font-title-novel text-2xl sm:text-3xl font-bold leading-snug">
            {currentChapter.title}
          </h1>
          <p className="mt-2 text-xs opacity-65">
            By {book.author} • {currentChapter.wordCount} words • 100% Free
          </p>
        </header>

        <div
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          className={`space-y-5 ${
            fontFamily === 'serif' ? 'font-title-novel' : 'font-sans'
          }`}
        >
          {paragraphs.map((para, i) => {
            const paraComments = paragraphComments.filter(
              (c) =>
                c.bookSlug === book.slug &&
                c.chapterNumber === currentChapter.number &&
                c.paragraphIndex === i
            );
            const isSpeakingThis = speakingParaIdx === i;
            const isSelectedThis = activeParaIdx === i;

            return (
              <div
                key={i}
                className={`group relative rounded-xl transition-all duration-200 ${
                  isSpeakingThis
                    ? 'bg-[#fbbf24]/15 border-l-4 border-[#fbbf24] pl-3 py-1'
                    : isSelectedThis
                    ? 'bg-primary-container/10 border-l-2 border-primary-container pl-3 py-1'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <p
                  onClick={() =>
                    setActiveParaIdx(isSelectedThis ? null : i)
                  }
                  className="whitespace-pre-line cursor-pointer pr-10"
                >
                  {para}
                </p>

                {/* Inline Paragraph Comment Bubble / Action Trigger */}
                <div className="absolute right-1 top-1 flex items-center gap-1">
                  <button
                    onClick={() =>
                      setActiveParaIdx(isSelectedThis ? null : i)
                    }
                    title="View or add inline paragraph reaction"
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                      paraComments.length > 0
                        ? 'bg-[#e11d48]/20 border border-[#e11d48]/50 text-[#fda4af]'
                        : 'opacity-30 group-hover:opacity-100 bg-white/5 text-current'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      chat_bubble
                    </span>
                    {paraComments.length > 0 && <span>{paraComments.length}</span>}
                  </button>
                </div>

                {/* Inline Paragraph Drawer when user taps this paragraph */}
                {isSelectedThis && (
                  <div className="mt-3 rounded-2xl bg-[#121826] border border-[#334155] p-3.5 text-xs text-[#f8fafc] font-sans shadow-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#232d42] pb-2">
                      <span className="text-[11px] font-extrabold text-[#fbbf24]">
                        Paragraph #{i + 1} Actions &amp; Community Notes (
                        {activeParaComments.length})
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => startSpeakingFrom(i)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#fbbf24]/20 border border-[#fbbf24]/40 px-2.5 py-1 text-[10px] font-bold text-[#fbbf24]"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            volume_up
                          </span>
                          Speak Here
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveParagraphQuote(i)}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-[10px] font-bold text-emerald-300"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            format_quote
                          </span>
                          Save &amp; Copy Quote
                        </button>
                      </div>
                    </div>

                    {/* Existing Comments on this exact paragraph */}
                    {activeParaComments.length > 0 && (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {activeParaComments.map((c) => (
                          <div
                            key={c.id}
                            className="rounded-xl bg-[#161d2f] border border-[#232d42] p-2.5"
                          >
                            <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                              <strong className="text-[#f8fafc]">
                                {c.reaction} {c.readerName}
                              </strong>
                              <span>{c.createdAt}</span>
                            </div>
                            <p className="mt-1 text-xs text-[#cbd5e1]">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Reaction Form */}
                    <form onSubmit={handleAddInlineComment} className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        {(['🔥', '❤️', '🙏', '💡'] as const).map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setSelectedReaction(emoji)}
                            className={`rounded-lg px-2 py-1 text-xs border ${
                              selectedReaction === emoji
                                ? 'border-[#fbbf24] bg-[#fbbf24]/20'
                                : 'border-[#232d42] bg-[#0b0f19]'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                        <input
                          type="text"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder="Your name"
                          className="flex-1 rounded-lg bg-[#0b0f19] border border-[#334155] px-2.5 py-1 text-[11px] text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="React to this exact sentence..."
                          className="flex-1 rounded-xl bg-[#0b0f19] border border-[#334155] px-3 py-1.5 text-xs text-white"
                        />
                        <button
                          type="submit"
                          className="rounded-xl bg-[#e11d48] px-3.5 py-1.5 text-xs font-bold text-white"
                        >
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Chapter Navigation */}
        <div className="mt-12 pt-6 border-t border-current/15 flex items-center justify-between gap-3">
          {hasPrev ? (
            <Link
              href={`/read/${book.slug}/${chapterNum - 1}`}
              className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-surface-container-high text-on-surface py-3 px-4 text-xs font-bold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">
                chevron_left
              </span>
              <span>Previous</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          <Link
            href={`/book/${book.slug}`}
            className="rounded-xl bg-surface-container border border-surface-variant p-3 text-on-surface active:scale-95"
            title="Table of Contents"
          >
            <span className="material-symbols-outlined text-[18px]">
              format_list_bulleted
            </span>
          </Link>

          {hasNext ? (
            <Link
              href={`/read/${book.slug}/${chapterNum + 1}`}
              className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-primary-container text-on-primary-container py-3 px-4 text-xs font-bold shadow-lg shadow-primary-container/25 active:scale-95 transition-transform"
            >
              <span>Next Chapter</span>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
            </Link>
          ) : (
            <Link
              href={`/book/${book.slug}`}
              className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-emerald-500 text-slate-950 py-3 px-4 text-xs font-black active:scale-95 transition-transform"
            >
              <span>Completed! Review</span>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}

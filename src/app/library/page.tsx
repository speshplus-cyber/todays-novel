'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';

export default function LibraryPage() {
  const {
    books,
    bookmarks,
    toggleBookmark,
    readingProgress,
    savedQuotes,
    readingStats,
    toggleOfflineBook
  } = useBookStore();

  const [activeTab, setActiveTab] = useState<'shelf' | 'quotes' | 'offline'>(
    'shelf'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const savedBooks = books.filter((b) => bookmarks.includes(b.id));
  const goalPct = Math.min(
    100,
    Math.round(
      (readingStats.minutesToday / Math.max(1, readingStats.dailyGoalMinutes)) *
        100
    )
  );

  return (
    <div className="px-4 py-5 space-y-5 pb-12">
      {/* GAMIFIED DAILY STREAK & HABIT TRACKER BANNER (2026 Top Requested Feature) */}
      <div className="rounded-2xl bg-gradient-to-r from-[#161d2f] via-[#1e273d] to-[#161d2f] border border-[#334155] p-4 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#e11d48] text-slate-950 font-black shadow">
              <span className="material-symbols-outlined text-[26px]">
                local_fire_department
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#f8fafc]">
                  {readingStats.streakDays}-Day Reading Streak!
                </h2>
                <span className="rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 px-2 py-0.5 text-[9px] font-extrabold text-[#fbbf24]">
                  ACTIVE READER
                </span>
              </div>
              <p className="text-xs text-[#94a3b8]">
                {readingStats.minutesToday} / {readingStats.dailyGoalMinutes} mins
                read today • {readingStats.chaptersCompleted} chapters completed
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-extrabold text-emerald-400">
              {goalPct}% Daily Goal
            </span>
          </div>
        </div>

        {/* Daily Progress Bar */}
        <div className="mt-3 h-2 w-full rounded-full bg-[#0b0f19] overflow-hidden border border-[#232d42]">
          <div
            className="h-full bg-gradient-to-r from-[#e11d48] to-[#fbbf24] transition-all duration-300"
            style={{ width: `${goalPct}%` }}
          />
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('shelf')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'shelf'
              ? 'bg-primary-container text-white shadow'
              : 'bg-surface-container border border-surface-variant text-on-surface-variant'
          }`}
        >
          Bookshelf ({savedBooks.length})
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'quotes'
              ? 'bg-primary-container text-white shadow'
              : 'bg-surface-container border border-surface-variant text-on-surface-variant'
          }`}
        >
          Saved Quotes ({savedQuotes.length})
        </button>
        <button
          onClick={() => setActiveTab('offline')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'offline'
              ? 'bg-primary-container text-white shadow'
              : 'bg-surface-container border border-surface-variant text-on-surface-variant'
          }`}
        >
          Offline Vault ({readingStats.offlineSavedBooks.length})
        </button>
      </div>

      {/* TAB 1: BOOKSHELF */}
      {activeTab === 'shelf' && (
        <>
          {savedBooks.length === 0 ? (
            <div className="rounded-2xl bg-surface-container-low border border-surface-variant/40 p-10 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/60">
                local_library
              </span>
              <p className="text-sm font-semibold text-on-surface">
                Your bookshelf is empty
              </p>
              <Link
                href="/book/unbound"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container px-5 py-2.5 text-xs font-bold text-on-primary-container"
              >
                Read #1 Priority Book: UNBOUND
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              {savedBooks.map((book) => {
                const currentChapter = readingProgress[book.slug] || 1;
                const pct = Math.min(
                  100,
                  Math.round(
                    (currentChapter / Math.max(1, book.chapters.length)) * 100
                  )
                );
                const isOfflineSaved = readingStats.offlineSavedBooks.includes(
                  book.id
                );

                return (
                  <div
                    key={book.id}
                    className="flex bg-surface-container-low rounded-2xl p-3 border border-surface-variant/40 gap-3.5"
                  >
                    <Link
                      href={`/book/${book.slug}`}
                      className="relative shrink-0 w-20 aspect-[2/3] rounded-lg overflow-hidden bg-surface-container-high spine-crease"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-surface-container-highest">
                        <div
                          className="h-full bg-primary-container"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </Link>

                    <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                            {book.genre}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleOfflineBook(book.id)}
                              title="Download all chapters for 100% offline reading"
                              className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold border ${
                                isOfflineSaved
                                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                  : 'border-[#334155] bg-[#161d2f] text-[#94a3b8]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[13px]">
                                {isOfflineSaved
                                  ? 'offline_pin'
                                  : 'download_for_offline'}
                              </span>
                              {isOfflineSaved ? 'Offline Ready' : 'Save Offline'}
                            </button>
                            <button
                              onClick={() => toggleBookmark(book.id)}
                              className="text-on-surface-variant/60 hover:text-primary"
                              title="Remove from Library"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                bookmark_remove
                              </span>
                            </button>
                          </div>
                        </div>

                        <Link href={`/book/${book.slug}`}>
                          <h2 className="font-title-novel text-[17px] font-bold text-on-surface truncate">
                            {book.title}
                          </h2>
                        </Link>
                        <p className="text-xs text-on-surface-variant truncate">
                          By {book.author}
                        </p>
                        <p className="text-[11px] text-primary font-semibold mt-1">
                          Part {currentChapter} of {book.chapters.length} ({pct}%)
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Link
                          href={`/read/${book.slug}/${currentChapter}`}
                          className="flex-1 text-center rounded-xl bg-primary-container py-2 px-3 text-xs font-bold text-on-primary-container active:scale-95 transition-transform"
                        >
                          Read / Listen Now
                        </Link>
                        <Link
                          href={`/book/${book.slug}`}
                          className="rounded-xl bg-surface-container-high px-3 py-2 text-xs font-semibold text-on-surface"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* TAB 2: SAVED QUOTES & HIGHLIGHT CARDS */}
      {activeTab === 'quotes' && (
        <div className="space-y-3">
          <p className="text-xs text-[#94a3b8]">
            Tap any paragraph while reading a chapter to highlight and save
            shareable quote cards here.
          </p>
          {savedQuotes.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl bg-gradient-to-br from-[#161d2f] via-[#121826] to-[#0b0f19] border-l-4 border-l-[#fbbf24] border border-[#334155] p-4 space-y-2.5 shadow-md"
            >
              <p className="font-title-novel italic text-sm text-[#f8fafc] leading-relaxed">
                &ldquo;{q.quoteText}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#232d42] text-[11px]">
                <div>
                  <strong className="text-[#fbbf24]">{q.author}</strong> •{' '}
                  <Link
                    href={`/read/${q.bookSlug}/${q.chapterNumber}`}
                    className="text-[#cbd5e1] underline hover:text-white"
                  >
                    {q.bookTitle} ({q.chapterTitle})
                  </Link>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `“${q.quoteText}” — ${q.author}, ${q.bookTitle}`
                    );
                    setCopiedId(q.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-bold text-[#fbbf24]"
                >
                  {copiedId === q.id ? '✓ Copied!' : 'Share Quote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: OFFLINE VAULT */}
      {activeTab === 'offline' && (
        <div className="space-y-3">
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-xs text-emerald-200">
            <strong>100% Offline Bulk Sync Active:</strong> All chapters of the
            books below are cached locally in your device storage so you can
            read or listen even without mobile data or Wi-Fi.
          </div>
          {books
            .filter((b) => readingStats.offlineSavedBooks.includes(b.id))
            .map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between rounded-2xl bg-[#121826] border border-[#232d42] p-3.5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-14 w-10 rounded object-cover spine-crease"
                  />
                  <div>
                    <h3 className="font-title-novel text-sm font-bold text-white">
                      {book.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-semibold">
                      ✓ All {book.chapters.length} Chapters Downloaded Offline
                    </p>
                  </div>
                </div>
                <Link
                  href={`/read/${book.slug}/${readingProgress[book.slug] || 1}`}
                  className="rounded-xl bg-primary-container px-4 py-2 text-xs font-bold text-white"
                >
                  Open Offline
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  PenTool,
  DownloadCloud,
  PlusCircle,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Search,
  Loader2,
  Crown
} from 'lucide-react';
import { useBookStore } from '@/context/BookStoreContext';
import { Book, GENRES } from '@/data/books';

interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  subjects: string[];
  summaries?: string[];
  formats: Record<string, string>;
  download_count: number;
}

export default function StudioPage() {
  const router = useRouter();
  const { books, addBook, addChapter } = useBookStore();

  const [activeTab, setActiveTab] = useState<'unbound' | 'create' | 'import'>('unbound');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Tab 1: Add Chapter to Unbound (or any existing book)
  const [selectedBookId, setSelectedBookId] = useState('unbound-kenah-pascal');
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');

  // Tab 2: Create New Free Novel
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('Kenah Pascal');
  const [newGenre, setNewGenre] = useState('Inspirational & Memoir');
  const [newCoverUrl, setNewCoverUrl] = useState('/covers/unbound-cover.svg');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [firstChapterTitle, setFirstChapterTitle] = useState('Chapter 1');
  const [firstChapterContent, setFirstChapterContent] = useState('');

  // Tab 3: Public Domain Importer (Project Gutenberg / Gutendex API)
  const [gutenbergQuery, setGutenbergQuery] = useState('adventure');
  const [gutenbergResults, setGutenbergResults] = useState<GutendexBook[]>([]);
  const [isSearchingGutenberg, setIsSearchingGutenberg] = useState(false);

  const handlePublishChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterTitle.trim() || !chapterContent.trim()) return;
    addChapter(selectedBookId, {
      title: chapterTitle.trim(),
      content: chapterContent.trim()
    });
    const targetBook = books.find((b) => b.id === selectedBookId);
    setBannerMessage(
      `Published "${chapterTitle}" to ${targetBook?.title || 'Book'} (100% Free)!`
    );
    setChapterTitle('');
    setChapterContent('');
  };

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !firstChapterContent.trim()) return;
    const slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const createdBook: Book = {
      id: `custom-${slug}-${Date.now()}`,
      slug,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      author: newAuthor.trim() || 'Kenah Pascal',
      coverUrl: newCoverUrl.trim() || '/covers/unbound-cover.svg',
      genre: newGenre,
      tags: [newGenre, 'Original', '100% Free'],
      rating: 5.0,
      views: '1.2K',
      status: 'Ongoing',
      isFree: true,
      synopsis: newSynopsis.trim() || 'An inspiring original novel on Today’s Novel.',
      source: 'custom',
      chapters: [
        {
          id: `${slug}-ch-1`,
          number: 1,
          title: firstChapterTitle.trim() || 'Chapter 1',
          content: firstChapterContent.trim(),
          wordCount: firstChapterContent.trim().split(/\s+/).length,
          publishedAt: new Date().toISOString().split('T')[0]
        }
      ],
      reviews: []
    };

    addBook(createdBook);
    router.push(`/book/${createdBook.slug}`);
  };

  const searchGutenberg = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!gutenbergQuery.trim()) return;
    setIsSearchingGutenberg(true);
    try {
      const res = await fetch(
        `https://gutendex.com/books/?search=${encodeURIComponent(gutenbergQuery.trim())}`
      );
      const data = await res.json();
      setGutenbergResults(data.results?.slice(0, 12) || []);
    } catch (err) {
      console.error('Failed to query Gutendex:', err);
    } finally {
      setIsSearchingGutenberg(false);
    }
  };

  const importGutenbergBook = (gBook: GutendexBook) => {
    const slug = gBook.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60);

    if (books.some((b) => b.slug === slug)) {
      setBannerMessage(`"${gBook.title}" is already in Today's Novel catalog!`);
      return;
    }

    const authorName =
      gBook.authors?.[0]?.name.split(',').reverse().join(' ').trim() || 'Classic Author';
    const coverImg =
      gBook.formats['image/jpeg'] ||
      `https://www.gutenberg.org/cache/epub/${gBook.id}/pg${gBook.id}.cover.medium.jpg`;
    const summary =
      gBook.summaries?.[0] ||
      `A timeless classic work by ${authorName}, imported from the public domain into Today's Novel so readers can enjoy it 100% free.`;

    const newBook: Book = {
      id: `gutenberg-${gBook.id}`,
      slug,
      title: gBook.title,
      author: authorName,
      coverUrl: coverImg,
      genre: 'Sci-Fi & Adventure',
      tags: ['Public Domain', 'Classic', '100% Free'],
      rating: 4.8,
      views: `${(gBook.download_count / 1000).toFixed(1)}K`,
      status: 'Completed',
      isFree: true,
      synopsis: summary,
      source: 'gutenberg',
      chapters: [
        {
          id: `gut-${gBook.id}-ch-1`,
          number: 1,
          title: `Chapter 1 — Opening of ${gBook.title}`,
          publishedAt: new Date().toISOString().split('T')[0],
          wordCount: 320,
          content: `${summary}\n\n[Imported from Project Gutenberg #${gBook.id} for 100% Free Reading on Today's Novel. Use the "+ Publish New Chapter" button on the book page to paste or append additional chapters anytime.]`
        }
      ],
      reviews: []
    };

    addBook(newBook);
    setBannerMessage(`Imported "${gBook.title}" by ${authorName} into Today's Novel!`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <PenTool className="h-3.5 w-3.5" /> Today&apos;s Novel CMS &amp; Importer
          </span>
          <h1 className="mt-1 text-3xl font-black text-white">
            Author Studio &amp; Free Book Importer
          </h1>
          <p className="text-sm text-slate-400">
            Add new chapters to <strong className="text-amber-300">UNBOUND</strong> by Kenah
            Pascal, publish new original books, or import free books from Project Gutenberg.
          </p>
        </div>

        <Link
          href="/book/unbound"
          className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
        >
          <Crown className="h-4 w-4 text-amber-400" /> View Priority #1 Book: UNBOUND
        </Link>
      </div>

      {bannerMessage && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-200">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {bannerMessage}
          </span>
          <button
            onClick={() => setBannerMessage(null)}
            className="text-xs underline hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab('unbound')}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'unbound'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
              : 'border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/10'
          }`}
        >
          <PlusCircle className="h-4 w-4" /> Add Chapters to UNBOUND / Existing Novel
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'create'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
              : 'border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/10'
          }`}
        >
          <BookOpen className="h-4 w-4" /> Publish a Brand-New Novel
        </button>

        <button
          onClick={() => {
            setActiveTab('import');
            if (gutenbergResults.length === 0) searchGutenberg();
          }}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
            activeTab === 'import'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
              : 'border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/10'
          }`}
        >
          <DownloadCloud className="h-4 w-4" /> Import Free Public Domain Books
        </button>
      </div>

      {/* TAB 1: ADD CHAPTER TO UNBOUND OR EXISTING BOOK */}
      {activeTab === 'unbound' && (
        <form
          onSubmit={handlePublishChapter}
          className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-6 sm:p-8 space-y-5"
        >
          <h2 className="text-xl font-bold text-white">
            Publish a New Free Chapter
          </h2>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Select Book
            </label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.isPriority ? '★ [PRIORITY #1] ' : ''}
                  {b.title} — by {b.author} ({b.chapters.length} chapters)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Chapter Title
            </label>
            <input
              type="text"
              required
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="e.g., Chapter 3: Walking Out of Rehab Into Purpose"
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Chapter Manuscript / Text
            </label>
            <textarea
              rows={12}
              required
              value={chapterContent}
              onChange={(e) => setChapterContent(e.target.value)}
              placeholder="Write or paste the next chapter of UNBOUND here..."
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white font-serif leading-relaxed focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 text-sm font-black text-slate-950 shadow-lg hover:brightness-110"
          >
            <Sparkles className="h-4 w-4" /> Publish Chapter (100% Free for All Readers)
          </button>
        </form>
      )}

      {/* TAB 2: CREATE NEW NOVEL */}
      {activeTab === 'create' && (
        <form
          onSubmit={handleCreateBook}
          className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 space-y-5"
        >
          <h2 className="text-xl font-bold text-white">Create a New Free Novel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Book Title
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter novel title"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Subtitle (Optional)
              </label>
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="e.g., A Journey of Faith"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Author Name
              </label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Genre
              </label>
              <select
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
              >
                {GENRES.filter((g) => g !== 'All').map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              value={newCoverUrl}
              onChange={(e) => setNewCoverUrl(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Synopsis
            </label>
            <textarea
              rows={3}
              required
              value={newSynopsis}
              onChange={(e) => setNewSynopsis(e.target.value)}
              placeholder="Describe what the book is about..."
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
            />
          </div>

          <div className="border-t border-white/10 pt-4 space-y-4">
            <h3 className="text-sm font-bold text-amber-400">First Chapter</h3>
            <input
              type="text"
              required
              value={firstChapterTitle}
              onChange={(e) => setFirstChapterTitle(e.target.value)}
              placeholder="Chapter 1 Title"
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
            />
            <textarea
              rows={8}
              required
              value={firstChapterContent}
              onChange={(e) => setFirstChapterContent(e.target.value)}
              placeholder="Write or paste Chapter 1 content..."
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 text-sm text-white"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-amber-400 px-7 py-3 text-sm font-black text-slate-950 hover:bg-amber-300"
          >
            Publish Free Novel
          </button>
        </form>
      )}

      {/* TAB 3: PUBLIC DOMAIN IMPORTER */}
      {activeTab === 'import' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">
                One-Click Free Public Domain Book Importer
              </h2>
              <p className="text-xs text-slate-400">
                Search over 70,000+ free books via the Gutendex (Project Gutenberg) API and import
                them directly into Today&apos;s Novel.
              </p>
            </div>

            <form onSubmit={searchGutenberg} className="flex gap-2">
              <input
                type="text"
                value={gutenbergQuery}
                onChange={(e) => setGutenbergQuery(e.target.value)}
                placeholder="Search title, author, topic..."
                className="rounded-xl border border-white/15 bg-slate-950 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSearchingGutenberg}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-300"
              >
                {isSearchingGutenberg ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Search
              </button>
            </form>
          </div>

          {isSearchingGutenberg ? (
            <div className="py-12 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
              Fetching books from Project Gutenberg...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gutenbergResults.map((gBook) => {
                const cover =
                  gBook.formats['image/jpeg'] ||
                  `https://www.gutenberg.org/cache/epub/${gBook.id}/pg${gBook.id}.cover.medium.jpg`;
                const author =
                  gBook.authors?.[0]?.name.split(',').reverse().join(' ').trim() ||
                  'Unknown Author';
                return (
                  <div
                    key={gBook.id}
                    className="flex gap-3.5 rounded-xl border border-white/10 bg-slate-950/70 p-3.5"
                  >
                    <img
                      src={cover}
                      alt={gBook.title}
                      className="h-28 w-20 rounded object-cover flex-shrink-0 border border-white/10"
                    />
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-bold text-white">
                          {gBook.title}
                        </h3>
                        <p className="mt-1 truncate text-xs text-slate-400">{author}</p>
                      </div>
                      <button
                        onClick={() => importGutenbergBook(gBook)}
                        className="mt-2 w-full rounded-lg bg-amber-500/20 border border-amber-500/40 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                      >
                        + Import Free Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

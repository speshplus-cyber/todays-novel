'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';
import { BOOK_COLLECTIONS } from '@/data/freeCollections';
import type { Book } from '@/data/books';

interface ScrapedResult {
  gutenbergId: number;
  title: string;
  author: string;
  coverUrl: string;
  downloadCount: number;
  summary: string;
  subjects: string[];
}

const COLLECTION_GENRE_MAP: Record<string, string> = {
  'col-faith-memoir': 'Memoir & Faith',
  'col-dark-supernatural': 'Fantasy',
  'col-romance-billionaire': 'Romance',
  'col-revenge-mystery': 'Drama',
  'col-scifi-voyages': 'Fantasy',
  'col-power-wisdom': 'Memoir & Faith'
};

export default function CollectionsPage() {
  const { books, addBook, readingProgress } = useBookStore();
  const [activeCollectionId, setActiveCollectionId] = useState<string>('ALL');

  // Live Internet Free Book Scraper State
  const [searchQuery, setSearchQuery] = useState('');
  const [targetCollectionId, setTargetCollectionId] = useState('col-faith-memoir');
  const [isSearching, setIsSearching] = useState(false);
  const [scrapingBookId, setScrapingBookId] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<ScrapedResult[]>([]);
  const [customCollectionMap, setCustomCollectionMap] = useState<
    Record<string, string[]>
  >({});
  const [toast, setToast] = useState<string | null>(null);

  const handleSearchInternetBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/scrape-books?q=${encodeURIComponent(searchQuery.trim())}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {
      setToast('Could not reach live book directory. Try again.');
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickTopicScrape = async (topic: string) => {
    setSearchQuery(topic);
    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/scrape-books?q=${encodeURIComponent(topic)}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {
      // ignore
    } finally {
      setIsSearching(false);
    }
  };

  const handleScrapeAndSaveBook = async (item: ScrapedResult) => {
    setScrapingBookId(item.gutenbergId);
    try {
      const res = await fetch('/api/scrape-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gutenbergId: item.gutenbergId,
          title: item.title,
          author: item.author,
          summary: item.summary
        })
      });
      const data = await res.json();

      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const mappedGenre = COLLECTION_GENRE_MAP[targetCollectionId] || 'Drama';
      const targetCol = BOOK_COLLECTIONS.find((c) => c.id === targetCollectionId);

      const newBook: Book = {
        id: `gutenberg-${item.gutenbergId}`,
        slug,
        title: item.title,
        subtitle: `Scraped Free Edition • ${targetCol?.title || 'Curated Collection'}`,
        author: item.author,
        coverUrl: item.coverUrl,
        genre: mappedGenre,
        tags: [targetCol?.badge || 'Curated', 'Scraped Free', '100% Free'],
        rating: 4.9,
        views: `${Math.max(12, Math.round(item.downloadCount / 100))}K`,
        status: 'Completed',
        isFree: true,
        source: 'gutenberg',
        synopsis: item.summary,
        chapters: data.chapters || [],
        reviews: []
      };

      addBook(newBook);
      setCustomCollectionMap((prev) => ({
        ...prev,
        [targetCollectionId]: [
          ...(prev[targetCollectionId] || []),
          newBook.slug
        ]
      }));

      setToast(
        `Scraped "${item.title}" (${newBook.chapters.length} chapters) into ${targetCol?.title}!`
      );
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast('Failed to scrape book chapters.');
      setTimeout(() => setToast(null), 3000);
    } finally {
      setScrapingBookId(null);
    }
  };

  const visibleCollections =
    activeCollectionId === 'ALL'
      ? BOOK_COLLECTIONS
      : BOOK_COLLECTIONS.filter((c) => c.id === activeCollectionId);

  return (
    <div className="px-4 py-6 space-y-7">
      {toast && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-2xl">
          ✓ {toast}
        </div>
      )}

      {/* Hero Header */}
      <div className="rounded-3xl border border-surface-variant bg-gradient-to-br from-[#1b2438] via-[#121826] to-[#0b0f19] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-container/25 border border-primary/40 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
              <span className="material-symbols-outlined text-[13px]">
                collections_bookmark
              </span>
              6 Curated Free Collections • {books.length} Complete Books
            </span>
            <h1 className="font-title-novel text-2xl sm:text-3xl font-bold text-on-surface">
              Top Free Books by Collection
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Every book below is 100% free, organized into curated thematic collections, and ready for offline reading or listening with our 25yo US African-American Male AI Audiobook narrator.
            </p>
          </div>
          <Link
            href="/book/unbound"
            className="flex items-center gap-2 rounded-2xl bg-primary-container px-4 py-3 text-xs font-extrabold text-on-primary-container shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">star</span>
            Read #1 Priority: UNBOUND
          </Link>
        </div>

        {/* Live Internet Free Book Scraper Bar */}
        <div className="mt-5 rounded-2xl border border-surface-variant/70 bg-surface-container-lowest/90 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                travel_explore
              </span>
              <h2 className="text-xs sm:text-sm font-extrabold text-on-surface">
                Live Internet Free Book Scraper (70,000+ Public Domain Novels)
              </h2>
            </div>
            <span className="text-[11px] text-on-surface-variant">
              Search, scrape full chapters &amp; save directly to any collection
            </span>
          </div>

          <form
            onSubmit={handleSearchInternetBooks}
            className="grid grid-cols-1 sm:grid-cols-12 gap-2.5"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search free books on the internet (e.g., Treasure Island, Shakespeare, Mystery, Africa)..."
              className="sm:col-span-6 rounded-xl bg-surface-container border border-surface-variant px-3.5 py-2.5 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none"
            />
            <select
              value={targetCollectionId}
              onChange={(e) => setTargetCollectionId(e.target.value)}
              className="sm:col-span-4 rounded-xl bg-surface-container border border-surface-variant px-3 py-2.5 text-xs font-semibold text-on-surface focus:border-primary focus:outline-none"
            >
              {BOOK_COLLECTIONS.map((col) => (
                <option key={col.id} value={col.id}>
                  Save to: {col.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isSearching}
              className="sm:col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-[#fbbf24] px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSearching ? 'hourglass_top' : 'cloud_download'}
              </span>
              {isSearching ? 'Scraping...' : 'Search Web'}
            </button>
          </form>

          {/* Quick Scrape Topic Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mr-1">
              Quick Scrape:
            </span>
            {[
              'Adventure',
              'Vampire',
              'Detective',
              'Love',
              'Philosophy',
              'Science Fiction',
              'Africa',
              'Alexandre Dumas'
            ].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleQuickTopicScrape(topic)}
                className="rounded-lg bg-surface-container-high border border-surface-variant/60 px-2.5 py-1 text-[10px] font-semibold text-on-surface-variant hover:border-primary hover:text-on-surface transition-colors"
              >
                + {topic}
              </button>
            ))}
          </div>

          {/* Scraped Search Results Drawer */}
          {searchResults.length > 0 && (
            <div className="pt-3 border-t border-surface-variant/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-tertiary">
                  Found {searchResults.length} Free Books Ready to Scrape Into Collection
                </span>
                <button
                  onClick={() => setSearchResults([])}
                  className="text-[11px] text-on-surface-variant hover:text-on-surface"
                >
                  Close Results ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {searchResults.map((item) => {
                  const alreadyInApp = books.some(
                    (b) => b.id === `gutenberg-${item.gutenbergId}`
                  );
                  return (
                    <div
                      key={item.gutenbergId}
                      className="flex items-center gap-3 rounded-xl border border-surface-variant bg-surface-container p-2.5"
                    >
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="h-16 w-11 rounded object-cover shrink-0 bg-surface-container-high"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-title-novel text-xs font-bold text-on-surface truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-on-surface-variant truncate">
                          {item.author}
                        </p>
                        <button
                          onClick={() => handleScrapeAndSaveBook(item)}
                          disabled={scrapingBookId === item.gutenbergId || alreadyInApp}
                          className={`mt-1.5 w-full rounded-lg px-2.5 py-1 text-[10px] font-extrabold transition-all ${
                            alreadyInApp
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-primary-container text-on-primary-container hover:brightness-110 active:scale-95'
                          }`}
                        >
                          {alreadyInApp
                            ? '✓ Saved in Collection'
                            : scrapingBookId === item.gutenbergId
                            ? 'Scraping Chapters...'
                            : '+ Scrape & Save to Collection'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collection Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveCollectionId('ALL')}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeCollectionId === 'ALL'
              ? 'bg-primary-container text-on-primary-container shadow-md'
              : 'bg-surface-container border border-surface-variant text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All 6 Collections ({books.length} Books)
        </button>
        {BOOK_COLLECTIONS.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveCollectionId(col.id)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all ${
              activeCollectionId === col.id
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'bg-surface-container border border-surface-variant text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {col.icon}
            </span>
            <span>{col.title}</span>
          </button>
        ))}
      </div>

      {/* Collections Shelves */}
      <div className="space-y-8">
        {visibleCollections.map((col) => {
          const allSlugs = [
            ...col.bookSlugs,
            ...(customCollectionMap[col.id] || [])
          ];
          const colBooks = allSlugs
            .map((slug) => books.find((b) => b.slug === slug))
            .filter((b): b is Book => Boolean(b));

          return (
            <section
              key={col.id}
              className="rounded-3xl border border-surface-variant/60 bg-surface-container-low p-4 sm:p-5 space-y-4 shadow-lg"
            >
              {/* Collection Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-surface-variant/40 pb-3.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${col.accentColor} px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {col.icon}
                      </span>
                      {col.badge}
                    </span>
                    <span className="text-[11px] font-bold text-tertiary">
                      {colBooks.length} Free Novels
                    </span>
                  </div>
                  <h2 className="font-title-novel text-xl sm:text-2xl font-bold text-on-surface">
                    {col.title}
                  </h2>
                  <p className="text-xs text-on-surface-variant max-w-2xl">
                    {col.description}
                  </p>
                </div>
              </div>

              {/* Books Grid in This Collection */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {colBooks.map((book) => {
                  const progressChap = readingProgress[book.slug] || 1;
                  return (
                    <Link
                      key={book.id}
                      href={`/book/${book.slug}`}
                      className="group flex flex-col rounded-2xl border border-surface-variant/40 bg-surface-container p-2.5 hover:border-primary/50 active:scale-[0.99] transition-all"
                    >
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-container-high spine-crease shadow-md">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1.5 right-1.5 rounded bg-surface-container-lowest/90 px-1.5 py-0.5 text-[9px] font-bold text-tertiary backdrop-blur-sm">
                          {book.rating.toFixed(1)} ★
                        </div>
                        {book.isPriority && (
                          <div className="absolute top-1.5 left-1.5 rounded bg-primary-container px-1.5 py-0.5 text-[8px] font-extrabold text-on-primary-container">
                            #1 PRIORITY
                          </div>
                        )}
                        <div className="absolute bottom-1.5 left-1.5 rounded bg-emerald-500/90 px-1.5 py-0.5 text-[8px] font-black uppercase text-slate-950">
                          100% Free
                        </div>
                      </div>

                      <h3 className="mt-2.5 font-title-novel text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-primary-fixed-dim truncate">
                        {book.author}
                      </p>
                      <p className="mt-1 text-[10px] text-on-surface-variant line-clamp-2 flex-1">
                        {book.synopsis}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-surface-variant/40 flex items-center justify-between text-[10px] font-bold text-tertiary">
                        <span>{book.chapters.length} Chaps</span>
                        <span className="text-primary group-hover:underline">
                          Read Ch. {progressChap} &rarr;
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

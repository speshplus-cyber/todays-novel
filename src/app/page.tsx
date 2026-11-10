'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';
import { GENRES } from '@/data/books';
import { triggerInstallModal } from '@/components/InstallAppManager';

export default function HomePage() {
  const { books, bookmarks, toggleBookmark, readingProgress, readingStats } = useBookStore();
  const [selectedGenre, setSelectedGenre] = useState('Discover');
  const [heroIndex, setHeroIndex] = useState(0);

  // Priority #1 is UNBOUND by Kenah Pascal
  const priorityBook = books.find((b) => b.id === 'unbound-kenah-pascal') || books[0];
  const heroSlides = [
    priorityBook,
    books.find((b) => b.slug === 'his-alpha-queen') || books[1],
    books.find((b) => b.slug === 'mated-to-the-alpha-i-hate') || books[2]
  ].filter(Boolean);

  const activeHero = heroSlides[heroIndex] || priorityBook;
  const nextHero = heroSlides[(heroIndex + 1) % heroSlides.length] || priorityBook;

  const filteredBooks =
    selectedGenre === 'Discover'
      ? books
      : books.filter(
          (b) =>
            b.genre.toLowerCase().includes(selectedGenre.toLowerCase()) ||
            b.tags.some((t) => t.toLowerCase().includes(selectedGenre.toLowerCase()))
        );

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return (
    <div className="flex flex-col space-y-8 pb-6">
      {/* QUICK GENRE FILTER PILLS (Horizontal Scroll - Android Touch Ergonomics) */}
      <nav aria-label="Genre Filters" className="pt-2">
        <div className="flex items-center space-x-2 overflow-x-auto px-4 no-scrollbar">
          {GENRES.map((genre) => {
            const active = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 ${
                  active
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'bg-surface-container border border-surface-variant/50 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </nav>

      {/* GAMIFIED DAILY STREAK & CONTINUE READING BAR (2026 Top Retention Feature) */}
      <section className="px-4 -mb-3">
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-gradient-to-r from-[#121826] via-[#161d2f] to-[#121826] border border-[#232d42] px-3.5 py-2.5 shadow">
          <Link href="/library" className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#fbbf24]">
              <span className="material-symbols-outlined text-[18px]">
                local_fire_department
              </span>
            </span>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[#f8fafc] truncate">
                {readingStats.streakDays}-Day Reading Streak • {readingStats.minutesToday}/{readingStats.dailyGoalMinutes}m Today
              </p>
              <p className="text-[10px] text-[#94a3b8] truncate">
                AI Audiobook, Inline Paragraph Notes &amp; Offline Sync Active
              </p>
            </div>
          </Link>
          <Link
            href={`/read/unbound/${readingProgress['unbound'] || 1}`}
            className="shrink-0 rounded-xl bg-[#fbbf24] px-3 py-1.5 text-[11px] font-black text-slate-950 shadow active:scale-95"
          >
            Resume Ch. {readingProgress['unbound'] || 1}
          </Link>
        </div>
      </section>

      {/* HERO FEATURED BOOK BANNER CAROUSEL (#1 PRIORITY: UNBOUND BY KENAH PASCAL) */}
      <section className="px-4">
        <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-low border border-surface-variant/40 shadow-xl group">
          {/* Hero Background Scrim Artwork */}
          <div className="relative w-full h-[380px] sm:h-[420px]">
            <img
              src={activeHero.coverUrl}
              alt={activeHero.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-tier Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-surface/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/90 via-surface-container-lowest/40 to-transparent" />
          </div>

          {/* Overlaid Novel Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {activeHero.isPriority && (
                <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary-container text-[10px] uppercase tracking-wider font-extrabold shadow">
                  #1 PRIORITY EXCLUSIVE
                </span>
              )}
              <span className="px-2 py-0.5 rounded bg-surface-container-high/85 text-secondary-fixed-dim text-[10px] font-semibold backdrop-blur-sm border border-secondary/20">
                {activeHero.genre}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                100% FREE
              </span>
              <div className="flex items-center space-x-1 ml-auto bg-surface-container-highest/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-tertiary-container/30">
                <span
                  className="material-symbols-outlined text-tertiary text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-xs font-bold text-tertiary">
                  {activeHero.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <Link href={`/book/${activeHero.slug}`}>
              <h2 className="font-display-hero-mobile text-[28px] sm:text-[34px] font-bold text-on-surface leading-tight tracking-tight drop-shadow-md">
                {activeHero.title}
              </h2>
            </Link>

            <p className="text-xs text-primary font-semibold mt-0.5 mb-1.5">
              By {activeHero.author}
              {activeHero.forewordBy
                ? ` • Foreword by ${activeHero.forewordBy}`
                : ''}{' '}
              • {activeHero.views} Reads
            </p>

            <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
              {activeHero.synopsis}
            </p>

            <div className="flex items-center justify-between gap-3">
              <Link
                href={`/read/${activeHero.slug}/${
                  readingProgress[activeHero.slug] || 1
                }`}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-primary-container text-on-primary-container text-sm font-bold shadow-lg shadow-primary-container/25 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  auto_stories
                </span>
                <span>
                  {readingProgress[activeHero.slug]
                    ? `Continue Ch. ${readingProgress[activeHero.slug]}`
                    : 'Read Now (Free)'}
                </span>
              </Link>

              <button
                onClick={() => toggleBookmark(activeHero.id)}
                aria-label="Add to library"
                className={`p-2.5 rounded-xl backdrop-blur-md border active:scale-95 transition-all ${
                  isBookmarked(activeHero.id)
                    ? 'bg-primary-container/20 border-primary-container text-primary'
                    : 'bg-surface-container-high/80 border-surface-variant text-on-surface hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isBookmarked(activeHero.id) ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </div>

            {/* Carousel Paging / Slide Previews */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-variant/30 text-on-surface-variant/80 text-[10px] font-semibold">
              <div className="flex items-center space-x-1.5">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setHeroIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === heroIndex
                        ? 'w-5 bg-primary-container'
                        : 'w-1.5 bg-surface-variant'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}
                className="truncate text-right pl-2 text-on-surface-variant/70 hover:text-on-surface"
              >
                Next: <span className="text-on-surface font-semibold">{nextHero.title}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED SECTION 1: UNBOUND — Complete 19-Part Memoir Quick Jump Carousel */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-4">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-4 rounded-full bg-tertiary"></span>
              <h3 className="text-[19px] font-bold text-on-surface">
                UNBOUND: Complete 19-Part Memoir
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant pl-3">
              By Kenah Pascal • Foreword by Dr. Theresia Fuh-Tabe • 100% Free
            </p>
          </div>
          <Link
            href="/book/unbound"
            className="text-xs font-semibold text-primary flex items-center space-x-0.5 hover:underline"
          >
            <span>All 19 Parts</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </Link>
        </div>

        {/* Horizontal Chapter Cards for Unbound */}
        <div className="flex space-x-3 overflow-x-auto px-4 no-scrollbar pt-1">
          {priorityBook.chapters.slice(0, 8).map((ch) => (
            <Link
              key={ch.id}
              href={`/read/unbound/${ch.number}`}
              className="shrink-0 w-56 rounded-xl bg-surface-container-low border border-surface-variant/50 p-3.5 flex flex-col justify-between hover:border-primary/50 active:scale-[0.98] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary text-[10px] font-bold">
                    Part #{ch.number}
                  </span>
                  <span className="text-[10px] font-bold text-tertiary">FREE</span>
                </div>
                <h4 className="font-title-novel text-[15px] font-bold text-on-surface line-clamp-2 leading-snug">
                  {ch.title}
                </h4>
                {ch.part && (
                  <p className="text-[10px] text-on-surface-variant/80 mt-1 truncate">
                    {ch.part}
                  </p>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-surface-variant/30 flex items-center justify-between text-[11px] text-primary font-semibold">
                <span>{ch.wordCount} words</span>
                <span>Read &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CURATED SECTION 2: Featured & Paranormal / Web Novels (Horizontal Carousel with 2:3 Spine Crease) */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-4">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-4 rounded-full bg-primary-container"></span>
              <h3 className="text-[19px] font-bold text-on-surface">
                Featured Free Novels
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant pl-3">
              True testimonies, destined mates, forbidden bonds &amp; timeless stories
            </p>
          </div>
          <Link
            href="/studio"
            className="text-xs font-semibold text-primary flex items-center space-x-0.5 hover:underline"
          >
            <span>Import More</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </Link>
        </div>

        {/* Book Card List (Aspect 2:3 with spine crease) */}
        <div className="flex space-x-3.5 overflow-x-auto px-4 no-scrollbar pt-1">
          {filteredBooks.map((book) => {
            const progressChap = readingProgress[book.slug] || 1;
            const progressPercent = Math.min(
              100,
              Math.round((progressChap / Math.max(1, book.chapters.length)) * 100)
            );
            return (
              <Link
                key={book.id}
                href={`/book/${book.slug}`}
                className="shrink-0 w-32 sm:w-36 flex flex-col group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-surface-container-high border border-surface-variant/60 shadow-md spine-crease group-hover:border-primary/50 transition-colors">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-tertiary">
                    {book.rating.toFixed(1)} ★
                  </div>
                  {book.isPriority && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-primary-container text-[8px] font-extrabold text-on-primary-container">
                      #1
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-surface-container-highest">
                    <div
                      className="h-full bg-primary-container"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
                <h4 className="mt-2 font-title-novel text-[16px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {book.title}
                </h4>
                <div className="flex items-center space-x-1 text-on-surface-variant text-[10px] font-semibold mt-0.5">
                  <span className="text-primary-fixed-dim truncate">{book.author}</span>
                  <span>•</span>
                  <span>Free</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* AUTHOR & EDITOR'S SPOTLIGHT BANNER (KENAH PASCAL & DR. THERESIA FUH-TABE) */}
      <section className="px-4">
        <Link
          href="/book/unbound"
          className="block relative rounded-2xl bg-surface-container p-4 border-l-4 border-l-primary-container border-y border-r border-surface-variant/40 shadow-lg overflow-hidden active:scale-[0.99] transition-transform"
        >
          <div className="flex items-start space-x-3.5">
            {/* Thumbnail Cover */}
            <div className="shrink-0 w-20 aspect-[2/3] rounded-lg overflow-hidden bg-surface-container-high border border-surface-variant spine-crease shadow-sm">
              <img
                src={priorityBook.coverUrl}
                alt={priorityBook.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description and Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">
                    auto_awesome
                  </span>
                  Exclusive Author Spotlight
                </span>
                <span className="text-[10px] font-semibold text-tertiary-fixed-dim">
                  5.0 ★
                </span>
              </div>
              <h4 className="font-display-hero-mobile text-[19px] font-bold text-on-surface mt-0.5 truncate">
                Kenah Pascal — UNBOUND
              </h4>
              <p className="text-xs text-on-surface-variant/90 italic mt-0.5 line-clamp-2">
                &ldquo;A craving is not a command. Pain is not an emergency. A bad day is
                not a ruined life. And my past is not my identity... I am UNBOUND.&rdquo;
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-semibold">
                  Foreword: Dr. Theresia Fuh-Tabe
                </span>
                <span className="px-2 py-0.5 rounded bg-secondary-container/50 text-secondary-fixed text-[10px] font-semibold">
                  Living Vine Rehab Bamenda
                </span>
                <span className="px-2 py-0.5 rounded bg-primary-container/25 text-primary text-[10px] font-bold">
                  19 Chapters Free
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* CURATED SECTION 3: Trending Leaderboard (Top 5 Ranked - Exact Stitch Design) */}
      <section className="px-4 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-4 rounded-full bg-secondary"></span>
            <h3 className="text-[19px] font-bold text-on-surface">
              Trending Leaderboard
            </h3>
          </div>
          <Link
            href="/book/unbound"
            className="text-xs font-semibold text-primary flex items-center space-x-0.5 hover:underline"
          >
            <span>Full Chart</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </Link>
        </div>

        <div className="flex flex-col space-y-2.5">
          {books.slice(0, 5).map((book, idx) => {
            const rankNum = String(idx + 1).padStart(2, '0');
            const rankColor =
              idx === 0
                ? 'text-tertiary'
                : idx === 1
                ? 'text-primary-container'
                : idx === 2
                ? 'text-secondary'
                : 'text-on-surface-variant/60';
            const readMetricColor =
              idx === 0
                ? 'text-tertiary-fixed-dim'
                : idx === 1
                ? 'text-primary'
                : idx === 2
                ? 'text-secondary-fixed-dim'
                : 'text-on-surface-variant';

            return (
              <Link
                key={book.id}
                href={`/book/${book.slug}`}
                className="flex items-center p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/30 hover:border-tertiary/40 active:scale-[0.99] transition-all group cursor-pointer"
              >
                <span className={`w-8 text-[22px] font-extrabold ${rankColor} text-center`}>
                  {rankNum}
                </span>
                <div className="w-12 h-16 rounded overflow-hidden bg-surface-container-high shrink-0 ml-1 mr-3 spine-crease shadow-sm">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-title-novel text-[17px] font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                      {book.title}
                    </h4>
                    {book.isPriority && (
                      <span className="rounded bg-primary-container px-1.5 py-0.2 text-[9px] font-extrabold text-on-primary-container">
                        #1
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`${readMetricColor} text-[11px] font-semibold`}>
                      {book.views} reads
                    </span>
                    <span className="text-on-surface-variant text-[10px]">•</span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-semibold">
                      {book.genre}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary transition-colors">
                  {idx < 3 ? 'trending_up' : 'equalizer'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CURATED SECTION 4: New Arrivals & Rising (Bento Grid - Exact Stitch Layout) */}
      <section className="px-4 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-4 rounded-full bg-tertiary"></span>
            <h3 className="text-[19px] font-bold text-on-surface">
              New Arrivals &amp; Rising
            </h3>
          </div>
          <Link
            href="/studio"
            className="text-xs font-semibold text-primary flex items-center space-x-0.5 hover:underline"
          >
            <span>Add / Import</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </Link>
        </div>

        {/* Bento-style Showcase */}
        <div className="grid grid-cols-1 gap-3">
          {/* Lead Bento Card: UNBOUND */}
          <Link
            href={`/book/${priorityBook.slug}`}
            className="flex bg-surface-container-low rounded-2xl p-3 border border-surface-variant/40 group cursor-pointer hover:border-primary/40 active:scale-[0.99] transition-all"
          >
            <div className="shrink-0 w-24 aspect-[2/3] rounded-lg overflow-hidden bg-surface-container-high spine-crease shadow-sm">
              <img
                src={priorityBook.coverUrl}
                alt={priorityBook.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3.5 flex flex-col justify-between py-1 min-w-0">
              <div>
                <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-fixed-dim text-[10px] font-semibold border border-primary-container/30">
                  Exclusive #1 Memoir
                </span>
                <h4 className="mt-1 font-title-novel text-[18px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {priorityBook.title}: Rescued from Substance Use
                </h4>
                <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                  {priorityBook.tagline} By Kenah Pascal, with Foreword by Dr. Theresia
                  Fuh-Tabe.
                </p>
              </div>
              <div className="flex items-center space-x-3 text-on-surface-variant/80 text-[11px] font-semibold mt-2">
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[14px] text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {priorityBook.rating.toFixed(1)}
                </span>
                <span>•</span>
                <span>{priorityBook.chapters.length} Chapters (Free)</span>
              </div>
            </div>
          </Link>

          {/* 2 Column Sub Cards */}
          <div className="grid grid-cols-2 gap-3">
            {books.slice(5, 7).map((subBook) => (
              <Link
                key={subBook.id}
                href={`/book/${subBook.slug}`}
                className="flex flex-col bg-surface-container-low rounded-xl p-2.5 border border-surface-variant/30 group cursor-pointer hover:border-primary/40 active:scale-95 transition-all"
              >
                <div className="aspect-[2/3] w-full rounded-lg overflow-hidden bg-surface-container-high spine-crease shadow-sm mb-2">
                  <img
                    src={subBook.coverUrl}
                    alt={subBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-title-novel text-[15px] font-bold leading-tight text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  {subBook.title}
                </h4>
                <span className="text-[10px] font-semibold text-on-surface-variant mt-1">
                  {subBook.genre}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT APP DOWNLOAD & INSTALL SECTION (ANDROID & IPHONE) */}
      <section className="px-4 pt-2">
        <div className="rounded-3xl border border-primary/35 bg-gradient-to-br from-[#1b2438] via-[#131b2e] to-[#0b0f19] p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-container/25 border border-primary/40 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-[13px]">install_mobile</span>
                Direct Mobile App Install
              </span>
              <h3 className="font-title-novel text-xl font-bold text-on-surface">
                Install Today&apos;s Novel on Android &amp; iPhone
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Add the official app directly to your phone&apos;s Home Screen for 100% offline reading of{' '}
                <strong className="text-on-surface">UNBOUND by Kenah Pascal</strong>, AI Audiobook narration, and instant chapter sync.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => triggerInstallModal('android')}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-3 text-xs font-extrabold text-on-primary-container shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">phone_android</span>
                <span>Install on Android</span>
              </button>
              <button
                onClick={() => triggerInstallModal('ios')}
                className="flex items-center justify-center gap-2 rounded-xl bg-surface-container-highest border border-surface-variant px-4 py-3 text-xs font-extrabold text-on-surface hover:border-tertiary active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  phone_iphone
                </span>
                <span>Install on iPhone</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

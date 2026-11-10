'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';

export default function BookDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { books, bookmarks, toggleBookmark, readingProgress, addReview, addChapter } =
    useBookStore();

  const book = books.find((b) => b.slug === slug);

  const [activeTab, setActiveTab] = useState<'chapters' | 'about' | 'reviews'>('chapters');
  const [readerName, setReaderName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const [showAddChapter, setShowAddChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterContent, setNewChapterContent] = useState('');

  if (!book) {
    return (
      <div className="px-4 py-16 text-center space-y-4">
        <h1 className="font-title-novel text-2xl font-bold text-on-surface">
          Story Not Found
        </h1>
        <Link
          href="/"
          className="inline-block rounded-xl bg-primary-container px-6 py-2.5 text-sm font-bold text-on-primary-container"
        >
          Back to Discover
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(book.id);
  const lastReadChapter = readingProgress[book.slug] || 1;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(book.id, {
      readerName: readerName.trim() || 'Inspired Reader',
      rating: reviewRating,
      comment: reviewComment.trim()
    });
    setReaderName('');
    setReviewComment('');
  };

  const handleAddChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim() || !newChapterContent.trim()) return;
    addChapter(book.id, {
      title: newChapterTitle.trim(),
      content: newChapterContent.trim()
    });
    setNewChapterTitle('');
    setNewChapterContent('');
    setShowAddChapter(false);
    setActiveTab('chapters');
  };

  return (
    <div className="flex flex-col space-y-6 pb-8 px-4 pt-3">
      {/* HERO NOVEL SPOTLIGHT CARD */}
      <div className="relative rounded-2xl overflow-hidden bg-surface-container-low border border-surface-variant/40 shadow-xl p-5">
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          {/* 2:3 Cover with Spine Crease */}
          <div className="relative w-36 sm:w-44 aspect-[2/3] rounded-lg overflow-hidden bg-surface-container-high border border-surface-variant spine-crease shrink-0 shadow-lg">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 right-2 rounded bg-emerald-500 px-2 py-0.5 text-[9px] font-black text-slate-950">
              100% FREE
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              {book.isPriority && (
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container text-[10px] font-extrabold uppercase tracking-wider">
                  #1 PRIORITY EXCLUSIVE
                </span>
              )}
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary-fixed-dim text-[10px] font-semibold border border-secondary/20">
                {book.genre}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-tertiary text-[10px] font-bold">
                ★ {book.rating.toFixed(1)}
              </span>
            </div>

            <h1 className="font-display-hero-mobile text-[28px] sm:text-[34px] font-bold text-on-surface leading-tight">
              {book.title}
            </h1>

            {book.subtitle && (
              <p className="font-title-novel italic text-sm text-primary-fixed-dim leading-snug">
                {book.subtitle}
              </p>
            )}

            <div className="text-xs text-on-surface-variant space-y-0.5">
              <p>
                Author: <strong className="text-on-surface">{book.author}</strong>
              </p>
              {book.forewordBy && (
                <p>
                  Foreword by:{' '}
                  <strong className="text-tertiary">{book.forewordBy}</strong>
                </p>
              )}
              <p className="text-[11px] opacity-80">
                {book.views} Reads • {book.chapters.length} Chapters • {book.status}
              </p>
            </div>

            {/* Primary Mobile Action Row */}
            <div className="flex items-center gap-2.5 pt-2">
              <Link
                href={`/read/${book.slug}/${lastReadChapter}`}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-primary-container text-on-primary-container text-sm font-bold shadow-lg shadow-primary-container/25 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  auto_stories
                </span>
                <span>
                  {readingProgress[book.slug]
                    ? `Continue Ch. ${lastReadChapter}`
                    : 'Read Now (Free)'}
                </span>
              </Link>

              <button
                onClick={() => toggleBookmark(book.id)}
                aria-label="Bookmark"
                className={`p-3 rounded-xl border active:scale-95 transition-all ${
                  isBookmarked
                    ? 'bg-primary-container/20 border-primary-container text-primary'
                    : 'bg-surface-container-high border-surface-variant text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>

              <button
                onClick={() => setShowAddChapter(!showAddChapter)}
                aria-label="Add Chapter"
                title="Publish New Chapter"
                className="p-3 rounded-xl bg-surface-container-high border border-surface-variant text-tertiary active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  post_add
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Inline Add Chapter Drawer */}
        {showAddChapter && (
          <form
            onSubmit={handleAddChapterSubmit}
            className="mt-5 pt-4 border-t border-surface-variant/40 space-y-3"
          >
            <h3 className="text-sm font-bold text-tertiary">
              Publish Chapter #{book.chapters.length + 1} to {book.title}
            </h3>
            <input
              type="text"
              required
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              placeholder="Chapter Title..."
              className="w-full rounded-xl bg-surface-container border border-surface-variant px-3.5 py-2 text-xs text-on-surface"
            />
            <textarea
              rows={5}
              required
              value={newChapterContent}
              onChange={(e) => setNewChapterContent(e.target.value)}
              placeholder="Write or paste chapter content..."
              className="w-full rounded-xl bg-surface-container border border-surface-variant px-3.5 py-2 text-xs text-on-surface"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-xl bg-primary-container px-4 py-2 text-xs font-bold text-on-primary-container"
              >
                Publish Free Chapter
              </button>
              <button
                type="button"
                onClick={() => setShowAddChapter(false)}
                className="rounded-xl bg-surface-container-high px-4 py-2 text-xs text-on-surface-variant"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* PILL TABS */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
            activeTab === 'chapters'
              ? 'bg-primary-container text-on-primary-container shadow'
              : 'bg-surface-container border border-surface-variant/50 text-on-surface-variant'
          }`}
        >
          Chapters ({book.chapters.length})
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
            activeTab === 'about'
              ? 'bg-primary-container text-on-primary-container shadow'
              : 'bg-surface-container border border-surface-variant/50 text-on-surface-variant'
          }`}
        >
          Synopsis &amp; Author Bio
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
            activeTab === 'reviews'
              ? 'bg-primary-container text-on-primary-container shadow'
              : 'bg-surface-container border border-surface-variant/50 text-on-surface-variant'
          }`}
        >
          Reviews ({book.reviews.length})
        </button>
      </div>

      {/* TAB 1: CHAPTER LIST */}
      {activeTab === 'chapters' && (
        <div className="flex flex-col space-y-2.5">
          {book.chapters.map((ch) => {
            const isCurrent = readingProgress[book.slug] === ch.number;
            return (
              <Link
                key={ch.id}
                href={`/read/${book.slug}/${ch.number}`}
                className={`flex items-center p-3 rounded-xl border transition-all active:scale-[0.99] ${
                  isCurrent
                    ? 'bg-surface-container border-primary-container/60'
                    : 'bg-surface-container-low border-surface-variant/30 hover:border-primary/40'
                }`}
              >
                <span className="w-9 text-lg font-extrabold text-tertiary text-center">
                  {String(ch.number).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0 ml-2">
                  {ch.part && (
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-secondary-fixed-dim">
                      {ch.part}
                    </span>
                  )}
                  <h3 className="font-title-novel text-[16px] font-bold text-on-surface truncate">
                    {ch.title}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    {ch.wordCount} words • <span className="text-emerald-400 font-bold">FREE</span>
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]">
                  chevron_right
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* TAB 2: SYNOPSIS & KENAH PASCAL AUTHOR BIO */}
      {activeTab === 'about' && (
        <div id="author-bio" className="space-y-4">
          <div className="rounded-2xl bg-surface-container-low border border-surface-variant/40 p-4 space-y-2">
            <h2 className="text-base font-bold text-on-surface">Synopsis</h2>
            <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line">
              {book.synopsis}
            </p>
          </div>

          <div className="rounded-2xl bg-surface-container p-4 border-l-4 border-l-primary-container border-y border-r border-surface-variant/40 space-y-2.5">
            <div className="flex items-center gap-2 text-tertiary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              About the Author — {book.author}
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              {book.authorBio ||
                `${book.author} is a featured writer on Today's Novel whose complete works are unlocked 100% free.`}
            </p>
            {book.forewordBy && (
              <div className="rounded-xl bg-surface-container-lowest/70 p-3 border border-surface-variant/40 text-[11px] text-on-surface-variant">
                <strong className="text-tertiary block mb-0.5">
                  Foreword by {book.forewordBy}
                </strong>
                Psychiatric Mental Health Professional with nearly a decade of clinical
                experience caring for individuals with substance use and mental health
                conditions.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: READER REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <form
            onSubmit={handleReviewSubmit}
            className="rounded-2xl bg-surface-container-low border border-surface-variant/40 p-4 space-y-3"
          >
            <h3 className="text-sm font-bold text-on-surface">Leave a Reader Review</h3>
            <input
              type="text"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
              placeholder="Your Name (optional)"
              className="w-full rounded-xl bg-surface-container border border-surface-variant/60 px-3 py-2 text-xs text-on-surface"
            />
            <textarea
              rows={3}
              required
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share how this book touched your life..."
              className="w-full rounded-xl bg-surface-container border border-surface-variant/60 px-3 py-2 text-xs text-on-surface"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary-container px-5 py-2 text-xs font-bold text-on-primary-container active:scale-95 transition-transform"
            >
              Post Review
            </button>
          </form>

          <div className="space-y-2.5">
            {book.reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-3.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">
                    {rev.readerName}
                  </span>
                  <span className="text-[10px] text-tertiary font-bold">
                    {'★'.repeat(rev.rating)}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

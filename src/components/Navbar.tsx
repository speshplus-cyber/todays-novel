'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBookStore } from '@/context/BookStoreContext';
import BrandLogo from '@/components/BrandLogo';
import { triggerInstallModal } from '@/components/InstallAppManager';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { books, bookmarks, currentUser } = useBookStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredBooks = searchQuery.trim()
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full max-w-md md:max-w-5xl mx-auto bg-surface-container-low/95 backdrop-blur-md shadow-sm border-b border-surface-variant/50">
      <div className="flex items-center justify-between w-full px-4 py-2.5">
        <Link href="/" className="active:scale-95 transition-transform duration-150">
          <BrandLogo size="md" showSubtitle={true} />
        </Link>

        {/* Desktop quick links + Notification bell */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 mr-2">
            <Link
              href="/book/unbound"
              className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold shadow-sm hover:brightness-110 transition-all"
            >
              ★ Read UNBOUND (#1)
            </Link>
            <Link
              href="/collections"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/collections'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Collections ({books.length})
            </Link>
            <Link
              href="/library"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/library'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Library ({bookmarks.length})
            </Link>
            <Link
              href="/studio"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/studio'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Author Studio
            </Link>
            <Link
              href="/admin"
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                pathname === '/admin'
                  ? 'bg-tertiary text-slate-950'
                  : 'bg-tertiary/15 border border-tertiary/40 text-tertiary hover:bg-tertiary/25'
              }`}
            >
              Admin Panel
            </Link>
          </div>

          <button
            onClick={() => triggerInstallModal()}
            title="Install Today's Novel on Android or iPhone"
            className="flex items-center gap-1 rounded-full bg-primary-container/20 border border-primary/40 px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">
              install_mobile
            </span>
            <span className="hidden xs:inline sm:inline">Get App</span>
          </button>

          <Link
            href="/auth"
            className="flex items-center gap-1.5 rounded-full bg-surface-container-high border border-surface-variant px-2.5 py-1 text-[11px] font-bold text-on-surface hover:border-primary active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">
              person
            </span>
            <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
          </Link>

          <Link
            href="/book/unbound"
            aria-label="Featured Priority Book Notification"
            className="relative p-1 text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95"
            title="New: UNBOUND by Kenah Pascal (19 Chapters Free)"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container ring-2 ring-surface-container-low"></span>
          </Link>
        </div>
      </div>

      {/* Quick Search Bar Input */}
      <div className="px-4 pb-3 relative">
        <div className="relative flex items-center w-full h-10 rounded-xl bg-surface-container border border-surface-variant/60 focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container/40 transition-all duration-200 px-3">
          <span className="material-symbols-outlined text-on-surface-variant/70 text-[18px] mr-2">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Search stories, Kenah Pascal, Unbound..."
            className="w-full bg-transparent border-none p-0 text-on-surface placeholder:text-on-surface-variant/60 text-[13px] focus:ring-0 focus:outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="material-symbols-outlined text-on-surface-variant/60 text-[16px]"
            >
              close
            </button>
          ) : (
            <span className="material-symbols-outlined text-on-surface-variant/50 text-[16px] cursor-pointer hover:text-primary transition-colors">
              mic
            </span>
          )}
        </div>

        {/* Live Search Dropdown */}
        {showDropdown && searchQuery.trim().length > 0 && (
          <div className="absolute left-4 right-4 mt-2 rounded-2xl border border-surface-variant/60 bg-surface-container-low/95 p-2 shadow-2xl backdrop-blur-xl z-50 max-h-80 overflow-y-auto">
            {filteredBooks.length === 0 ? (
              <p className="p-3 text-center text-xs text-on-surface-variant">
                No stories matching &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              filteredBooks.map((book) => (
                <button
                  key={book.id}
                  onMouseDown={() => {
                    router.push(`/book/${book.slug}`);
                    setShowDropdown(false);
                    setSearchQuery('');
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-surface-container-high active:scale-[0.99] transition-all"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-12 w-9 rounded object-cover shrink-0 spine-crease"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate font-title-novel text-sm font-bold text-on-surface">
                        {book.title}
                      </p>
                      {book.isPriority && (
                        <span className="rounded bg-primary-container px-1.5 py-0.5 text-[9px] font-bold text-on-primary-container">
                          #1 PRIORITY
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-on-surface-variant">
                      By {book.author} • {book.genre}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </header>
  );
}

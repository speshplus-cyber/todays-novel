'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBookStore } from '@/context/BookStoreContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { bookmarks, conversations } = useBookStore();

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadByAdmin, 0);

  const navItems = [
    {
      label: 'Discover',
      href: '/',
      icon: 'explore',
      isActive: pathname === '/'
    },
    {
      label: 'Library',
      href: '/library',
      icon: 'local_library',
      isActive: pathname === '/library',
      badge: bookmarks.length
    },
    {
      label: 'Unbound #1',
      href: '/book/unbound',
      icon: 'auto_stories',
      isActive: pathname.startsWith('/book/unbound') || pathname.startsWith('/read/unbound')
    },
    {
      label: 'Studio',
      href: '/studio',
      icon: 'edit_note',
      isActive: pathname === '/studio'
    },
    {
      label: 'Admin',
      href: '/admin',
      icon: 'admin_panel_settings',
      isActive: pathname === '/admin',
      badge: totalUnread
    }
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-2 max-w-md md:max-w-5xl mx-auto bg-surface-container-low/95 backdrop-blur-md border-t border-surface-variant/50 shadow-[0_-4px_16px_rgba(0,0,0,0.5)]"
    >
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`relative flex flex-col items-center justify-center min-w-[60px] py-1 transition-all duration-150 active:scale-95 ${
            item.isActive
              ? 'text-primary-container font-semibold'
              : 'text-on-surface-variant opacity-80 hover:text-primary'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              item.isActive ? 'material-symbols-filled' : ''
            }`}
            style={
              item.isActive ? { fontVariationSettings: "'FILL' 1" } : undefined
            }
          >
            {item.icon}
          </span>
          <span className="text-[10px] font-semibold tracking-wide mt-0.5">
            {item.label}
          </span>
          {item.isActive && (
            <span className="w-1 h-1 rounded-full bg-primary-container mt-0.5" />
          )}
          {item.badge !== undefined && item.badge > 0 && (
            <span className="absolute top-0.5 right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary-container px-1 text-[9px] font-bold text-on-primary-container">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';

export default function AdminDashboardPage() {
  const {
    books,
    users,
    conversations,
    announcements,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    sendAdminReply,
    updateConversationStatus,
    togglePriorityBook,
    deleteBook,
    addAnnouncement
  } = useBookStore();

  const [adminEmail, setAdminEmail] = useState('kenah@todaysnovel.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'inbox' | 'users' | 'catalog' | 'broadcast'
  >('inbox');

  const [selectedConvId, setSelectedConvId] = useState<string>(
    conversations[0]?.id || 'conv-visitor-live'
  );
  const [replyText, setReplyText] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Broadcast form
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  const selectedConv =
    conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadByAdmin, 0);
  const onlineUsersCount = users.filter((u) => u.status !== 'Offline').length;
  const totalChaptersCount = books.reduce((acc, b) => acc + b.chapters.length, 0);

  const filteredUsers = userSearch.trim()
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.location.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.currentBook.toLowerCase().includes(userSearch.toLowerCase())
      )
    : users;

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConv) return;
    sendAdminReply(selectedConv.id, replyText.trim());
    setReplyText('');
    setStatusBanner(
      `Reply sent to ${selectedConv.userName}! It is immediately visible in their Floating Assistant chat.`
    );
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    addAnnouncement(annTitle.trim(), annMessage.trim());
    setAnnTitle('');
    setAnnMessage('');
    setStatusBanner('Broadcast announcement published to all readers!');
  };

  const cannedReplies = [
    'Thank you for reading UNBOUND! Remember: your worst chapter is not your whole story. Stay strong!',
    'Every book and chapter on Today’s Novel is 100% free forever. Please share with anyone who needs hope!',
    'If you or a loved one needs rehabilitation support in Bamenda, Living Vine Rehab Center is a great place to start.'
  ];

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginAdmin(adminEmail, adminPassword);
    if (!res.ok) {
      setAuthError(res.message);
    } else {
      setAuthError(null);
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="px-4 py-8 max-w-md mx-auto pb-16">
        <div className="rounded-3xl bg-gradient-to-b from-[#161d2f] via-[#121826] to-[#0b0f19] border border-[#fbbf24]/40 p-6 shadow-2xl space-y-5">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#d97706] text-slate-950 shadow-lg">
              <span className="material-symbols-outlined text-[30px]">
                admin_panel_settings
              </span>
            </div>
            <span className="rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/40 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[#fbbf24]">
              Protected Executive Portal
            </span>
            <h1 className="font-title-novel text-2xl font-bold text-[#f8fafc]">
              Admin Command Login
            </h1>
            <p className="text-xs text-[#94a3b8]">
              Sign in as <strong>Kenah Pascal</strong> to track live users, reply to
              customer chats, and manage Today&apos;s Novel.
            </p>
          </div>

          {authError && (
            <div className="rounded-xl bg-rose-500/15 border border-rose-500/40 px-3.5 py-2.5 text-xs font-semibold text-rose-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Admin Email / Username
              </label>
              <input
                type="text"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="kenah@todaysnovel.com"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#fbbf24] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Admin Passkey
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password (unbound2026)"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#fbbf24] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg active:scale-95 transition-transform"
            >
              Unlock Admin Command Center
            </button>
          </form>

          {/* 1-Tap Quick Demo Unlock for Kenah Pascal */}
          <div className="pt-3 border-t border-[#232d42] text-center space-y-2">
            <p className="text-[10px] text-[#94a3b8]">
              Default Credentials: <code className="text-[#fbbf24]">kenah@todaysnovel.com</code> /{' '}
              <code className="text-[#fbbf24]">unbound2026</code>
            </p>
            <button
              type="button"
              onClick={() => loginAdmin('kenah@todaysnovel.com', 'unbound2026')}
              className="w-full rounded-xl bg-[#1e273d] border border-[#334155] py-2 text-[11px] font-bold text-[#fbbf24] hover:bg-[#27324c]"
            >
              ⚡ Instant One-Tap Unlock (Kenah Pascal)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5 pb-12">
      {/* ADMIN HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#161d2f] via-[#1e273d] to-[#161d2f] p-4 border border-[#334155] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#fbbf24] to-[#d97706] text-slate-950 font-black shadow">
            <span className="material-symbols-outlined text-[24px]">
              admin_panel_settings
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-title-novel text-xl font-bold text-[#f8fafc]">
                Admin &amp; Customer Command Center
              </h1>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-extrabold text-emerald-300">
                KENAH PASCAL
              </span>
            </div>
            <p className="text-xs text-[#94a3b8]">
              Track live readers, reply to customer chats, and manage Today&apos;s Novel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/studio"
            className="rounded-xl bg-[#e11d48] px-3.5 py-2 text-xs font-bold text-white shadow active:scale-95 transition-transform"
          >
            + Publish Chapter / Import
          </Link>
          <button
            onClick={logoutAdmin}
            className="rounded-xl bg-rose-500/15 border border-rose-500/30 px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/25 active:scale-95"
          >
            Lock Admin
          </button>
        </div>
      </div>

      {statusBanner && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-500/15 border border-emerald-500/40 px-4 py-2.5 text-xs font-semibold text-emerald-200">
          <span>✓ {statusBanner}</span>
          <button
            onClick={() => setStatusBanner(null)}
            className="underline ml-2 text-emerald-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#121826] border border-[#232d42] p-3.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold">
            <span>Active Readers</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="mt-1 text-2xl font-extrabold text-[#f8fafc]">
            {onlineUsersCount} <span className="text-xs font-normal text-emerald-400">Live</span>
          </p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5">
            {users.length} tracked accounts
          </p>
        </div>

        <div className="rounded-2xl bg-[#121826] border border-[#232d42] p-3.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold">
            <span>Customer Inbox</span>
            <span className="material-symbols-outlined text-[15px] text-[#e11d48]">
              forum
            </span>
          </div>
          <p className="mt-1 text-2xl font-extrabold text-[#f8fafc]">
            {conversations.length}{' '}
            {totalUnread > 0 && (
              <span className="text-xs font-bold text-[#fbbf24]">
                ({totalUnread} new)
              </span>
            )}
          </p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5">
            Direct &amp; Assistant threads
          </p>
        </div>

        <div className="rounded-2xl bg-[#121826] border border-[#232d42] p-3.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold">
            <span>UNBOUND Reads</span>
            <span className="material-symbols-outlined text-[15px] text-[#fbbf24]">
              workspace_premium
            </span>
          </div>
          <p className="mt-1 text-2xl font-extrabold text-[#fbbf24]">842K</p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5">
            #1 Priority • 19 Chapters
          </p>
        </div>

        <div className="rounded-2xl bg-[#121826] border border-[#232d42] p-3.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold">
            <span>Free Catalog</span>
            <span className="material-symbols-outlined text-[15px] text-[#c4b5fd]">
              menu_book
            </span>
          </div>
          <p className="mt-1 text-2xl font-extrabold text-[#f8fafc]">
            {books.length} <span className="text-xs font-normal text-[#94a3b8]">Books</span>
          </p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5">
            {totalChaptersCount} total free chapters
          </p>
        </div>
      </div>

      {/* ADMIN NAVIGATION PILLS */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveTab('inbox')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'inbox'
              ? 'bg-[#e11d48] text-white shadow'
              : 'bg-[#161d2f] border border-[#232d42] text-[#94a3b8]'
          }`}
        >
          💬 Customer Support Inbox ({conversations.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'users'
              ? 'bg-[#e11d48] text-white shadow'
              : 'bg-[#161d2f] border border-[#232d42] text-[#94a3b8]'
          }`}
        >
          👥 Live User Tracker ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'catalog'
              ? 'bg-[#e11d48] text-white shadow'
              : 'bg-[#161d2f] border border-[#232d42] text-[#94a3b8]'
          }`}
        >
          📚 Book &amp; Priority Manager ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'broadcast'
              ? 'bg-[#e11d48] text-white shadow'
              : 'bg-[#161d2f] border border-[#232d42] text-[#94a3b8]'
          }`}
        >
          📢 Broadcast Announcements
        </button>
      </div>

      {/* TAB 1: CUSTOMER SUPPORT INBOX & LIVE REPLY */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Conversation List (Left 5 cols) */}
          <div className="md:col-span-5 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] px-1">
              Customer &amp; Reader Threads
            </h2>
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedConv?.id;
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`w-full text-left rounded-2xl p-3.5 border transition-all ${
                    isSelected
                      ? 'bg-[#1e273d] border-[#e11d48] shadow-md'
                      : 'bg-[#121826] border-[#232d42] hover:bg-[#161d2f]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-[#f8fafc] truncate">
                      {conv.userName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {conv.unreadByAdmin > 0 && (
                        <span className="rounded-full bg-[#e11d48] px-1.5 py-0.2 text-[9px] font-bold text-white">
                          {conv.unreadByAdmin} NEW
                        </span>
                      )}
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          conv.status === 'Open'
                            ? 'bg-[#fbbf24]/20 text-[#fbbf24]'
                            : conv.status === 'Replied'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {conv.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-[#fda4af] truncate mt-0.5">
                    {conv.subject}
                  </p>
                  {lastMsg && (
                    <p className="text-[11px] text-[#94a3b8] line-clamp-1 mt-1">
                      <strong>{lastMsg.senderName}:</strong> {lastMsg.text}
                    </p>
                  )}
                  <p className="text-[9px] text-[#64748b] mt-1">{conv.lastUpdated}</p>
                </button>
              );
            })}
          </div>

          {/* Active Conversation Thread & Admin Reply Box (Right 7 cols) */}
          {selectedConv && (
            <div className="md:col-span-7 flex flex-col rounded-2xl bg-[#121826] border border-[#232d42] overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#161d2f] px-4 py-3 border-b border-[#232d42]">
                <div>
                  <h3 className="text-sm font-bold text-[#f8fafc]">
                    {selectedConv.userName}{' '}
                    <span className="text-xs font-normal text-[#94a3b8]">
                      ({selectedConv.userEmail})
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#fbbf24]">{selectedConv.subject}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateConversationStatus(selectedConv.id, 'Resolved')}
                    className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-[10px] font-bold text-emerald-300 hover:bg-emerald-500/30"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-3 max-h-80 overflow-y-auto">
                {selectedConv.messages.map((m) => {
                  const isAdmin = m.sender === 'admin';
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        isAdmin ? 'items-end' : 'items-start'
                      }`}
                    >
                      <span className="text-[10px] text-[#94a3b8] mb-0.5">
                        {m.senderName} • {m.timestamp}
                      </span>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          isAdmin
                            ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-slate-950 font-medium'
                            : isUser
                            ? 'bg-[#e11d48]/20 border border-[#e11d48]/50 text-[#f8fafc]'
                            : 'bg-[#1e273d] border border-[#334155] text-[#cbd5e1]'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Canned Replies for Kenah Pascal */}
              <div className="px-4 py-2 bg-[#0b0f19]/60 border-t border-[#232d42] space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]">
                  One-Tap Quick Replies:
                </span>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {cannedReplies.map((canned, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setReplyText(canned)}
                      className="shrink-0 max-w-xs truncate rounded-lg bg-[#161d2f] border border-[#334155] px-2.5 py-1 text-[10px] text-[#cbd5e1] hover:border-[#fbbf24]"
                    >
                      {canned}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Reply Input */}
              <form
                onSubmit={handleReplySubmit}
                className="p-3 bg-[#161d2f] border-t border-[#232d42] space-y-2"
              >
                <textarea
                  rows={2}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply directly to ${selectedConv.userName} as Kenah Pascal (Admin)...`}
                  className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3 py-2 text-xs text-white placeholder-[#94a3b8] focus:border-[#fbbf24] focus:outline-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#94a3b8]">
                    Replies appear live in the reader&apos;s Floating Help Assistant
                  </span>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] px-5 py-2 text-xs font-black text-slate-950 shadow active:scale-95 transition-transform"
                  >
                    Send Official Reply
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE USER TRACKER */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-[#f8fafc]">
              Real-Time Reader Activity &amp; Device Telemetry
            </h2>
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Filter by reader name, city, or book..."
              className="rounded-xl bg-[#121826] border border-[#232d42] px-3.5 py-1.5 text-xs text-white placeholder-[#94a3b8]"
            />
          </div>

          <div className="space-y-2.5">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#121826] border border-[#232d42] p-3.5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e273d] border border-[#334155] font-bold text-xs text-[#fbbf24]">
                    {u.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#f8fafc]">{u.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          u.status === 'Reading'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : u.status === 'Online'
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        ● {u.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94a3b8]">
                      {u.email} • 📍 {u.location}
                    </p>
                    <p className="text-[10px] text-[#64748b] mt-0.5">
                      📱 {u.device} • Joined {u.joinedAt}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-[#232d42] pt-2 sm:pt-0 text-right">
                  <span className="text-xs font-bold text-[#fbbf24]">
                    Reading: {u.currentBook} (Ch. {u.currentChapter})
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">
                    {u.chaptersRead} total chapters read • Active {u.lastActive}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOOK & PRIORITY MANAGER */}
      {activeTab === 'catalog' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#f8fafc]">
              Manage Catalog &amp; Priority Status
            </h2>
            <Link
              href="/studio"
              className="text-xs font-bold text-[#fbbf24] hover:underline"
            >
              + Add New Book / Chapter &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {books.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-[#121826] border border-[#232d42] p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={b.coverUrl}
                    alt={b.title}
                    className="h-14 w-10 rounded object-cover shrink-0 spine-crease"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-title-novel text-sm font-bold text-[#f8fafc] truncate">
                        {b.title}
                      </h3>
                      {b.isPriority && (
                        <span className="rounded bg-[#e11d48] px-1.5 py-0.5 text-[9px] font-black text-white">
                          PRIORITY #1
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94a3b8]">
                      By {b.author} • {b.chapters.length} Chapters • {b.views} reads
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePriorityBook(b.id)}
                    className={`rounded-xl px-3 py-1.5 text-[10px] font-bold border transition-colors ${
                      b.isPriority
                        ? 'border-[#fbbf24] bg-[#fbbf24]/20 text-[#fbbf24]'
                        : 'border-[#334155] bg-[#161d2f] text-[#94a3b8]'
                    }`}
                  >
                    {b.isPriority ? '★ Priority' : 'Set Priority'}
                  </button>
                  {b.id !== 'unbound-kenah-pascal' && (
                    <button
                      onClick={() => deleteBook(b.id)}
                      className="rounded-xl bg-rose-500/15 border border-rose-500/30 px-2.5 py-1.5 text-[10px] font-bold text-rose-300 hover:bg-rose-500/25"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BROADCAST ANNOUNCEMENTS */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <form
            onSubmit={handleBroadcastSubmit}
            className="md:col-span-6 rounded-2xl bg-[#121826] border border-[#232d42] p-4 space-y-3"
          >
            <h2 className="text-sm font-bold text-[#f8fafc]">
              Send Push Banner to All Readers
            </h2>
            <input
              type="text"
              required
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              placeholder="Announcement Headline..."
              className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2 text-xs text-white"
            />
            <textarea
              rows={3}
              required
              value={annMessage}
              onChange={(e) => setAnnMessage(e.target.value)}
              placeholder="Write your announcement message..."
              className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#e11d48] px-5 py-2.5 text-xs font-bold text-white shadow"
            >
              Publish Broadcast
            </button>
          </form>

          <div className="md:col-span-6 space-y-2.5">
            <h2 className="text-sm font-bold text-[#f8fafc]">Active Announcements</h2>
            {announcements.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl bg-[#121826] border border-[#232d42] p-3.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#fbbf24]">{a.title}</span>
                  <span className="text-[10px] text-[#94a3b8]">{a.createdAt}</span>
                </div>
                <p className="text-xs text-[#cbd5e1]">{a.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

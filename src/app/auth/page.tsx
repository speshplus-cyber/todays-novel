'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookStore } from '@/context/BookStoreContext';
import BrandLogo from '@/components/BrandLogo';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function UserAuthPage() {
  const router = useRouter();
  const {
    currentUser,
    readingStats,
    bookmarks,
    loginUser,
    registerUser,
    resetUserPassword,
    logoutUser
  } = useBookStore();

  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [location, setLocation] = useState('Bamenda, Cameroon');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginUser(email, password);
    setFeedback({
      type: res.ok ? 'success' : 'error',
      text: res.message
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const res = registerUser(name, email, password, location);
    setFeedback({
      type: res.ok ? 'success' : 'error',
      text: res.message
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    const res = resetUserPassword(email, newPassword);
    setFeedback({
      type: res.ok ? 'success' : 'error',
      text: res.message
    });
    if (res.ok) {
      setTimeout(() => {
        setMode('login');
        setPassword('');
      }, 1500);
    }
  };

  // If the user is already signed in, show their Reader Profile & Quick Actions
  if (currentUser) {
    return (
      <div className="px-4 py-6 space-y-5 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#161d2f] via-[#121826] to-[#0b0f19] border border-[#334155] p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#e11d48] text-slate-950 font-black text-xl shadow-lg">
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  ● Verified Reader Account
                </span>
                <h1 className="font-title-novel text-2xl font-bold text-[#f8fafc] mt-0.5">
                  {currentUser.name}
                </h1>
                <p className="text-xs text-[#94a3b8]">
                  {currentUser.email} • 📍 {currentUser.location}
                </p>
              </div>
            </div>

            <button
              onClick={logoutUser}
              className="rounded-xl bg-rose-500/15 border border-rose-500/30 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/25 active:scale-95"
            >
              Sign Out
            </button>
          </div>

          {/* Reader Stats Row */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#232d42]">
            <div className="rounded-2xl bg-[#0b0f19]/80 border border-[#232d42] p-3 text-center">
              <p className="text-lg font-extrabold text-[#fbbf24]">
                {readingStats.streakDays} Days
              </p>
              <p className="text-[10px] text-[#94a3b8] font-semibold">
                Reading Streak
              </p>
            </div>
            <div className="rounded-2xl bg-[#0b0f19]/80 border border-[#232d42] p-3 text-center">
              <p className="text-lg font-extrabold text-[#f8fafc]">
                {bookmarks.length}
              </p>
              <p className="text-[10px] text-[#94a3b8] font-semibold">
                Saved Books
              </p>
            </div>
            <div className="rounded-2xl bg-[#0b0f19]/80 border border-[#232d42] p-3 text-center">
              <p className="text-lg font-extrabold text-emerald-400">100%</p>
              <p className="text-[10px] text-[#94a3b8] font-semibold">
                Free Forever
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/read/unbound/1"
              className="text-center rounded-xl bg-[#e11d48] py-2.5 px-3 text-xs font-bold text-white shadow-lg hover:brightness-110 transition-all"
            >
              Read UNBOUND (#1)
            </Link>
            <Link
              href="/library"
              className="text-center rounded-xl bg-[#1e273d] border border-[#334155] py-2.5 px-3 text-xs font-bold text-[#f8fafc] hover:bg-[#283552] transition-all"
            >
              Open My Library
            </Link>
            <Link
              href="/about"
              className="text-center rounded-xl bg-rose-500/20 border border-rose-500/40 py-2.5 px-3 text-xs font-bold text-rose-300 hover:bg-rose-500/30 transition-all"
            >
              ♥ Dedication &amp; About
            </Link>
            <Link
              href="/admin"
              className="text-center rounded-xl bg-amber-500/20 border border-amber-500/40 py-2.5 px-3 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-all"
            >
              Author Admin Panel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-5 pb-16">
      {/* Brand Card Header */}
      <div className="rounded-3xl bg-gradient-to-b from-[#161d2f] via-[#121826] to-[#0b0f19] border border-[#334155] p-6 shadow-2xl space-y-5">
        <div className="flex flex-col items-center text-center space-y-2">
          <BrandLogo size="lg" showSubtitle={true} />
          <p className="text-xs text-[#94a3b8] pt-1">
            {mode === 'login' &&
              'Sign in to sync your reading streaks, bookmarks & inline notes across devices.'}
            {mode === 'signup' &&
              'Create a 100% free reader account in seconds—no credit card or coins ever.'}
            {mode === 'forgot' &&
              'Reset your reader account password quickly and securely.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#0b0f19] p-1.5 border border-[#232d42]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setFeedback(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-[#e11d48] text-white shadow'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setFeedback(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-[#e11d48] text-white shadow'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('forgot');
              setFeedback(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'forgot'
                ? 'bg-[#fbbf24] text-slate-950 shadow'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Forgot Pass
          </button>
        </div>

        {feedback && (
          <div
            className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold border ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* FORM 1: SIGN IN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="emmanuel.n@gmail.com"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] font-semibold text-[#fbbf24] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[#e11d48]/25 active:scale-95 transition-transform"
            >
              Sign In to Today&apos;s Novel
            </button>

            {/* 1-Tap Demo Reader Login */}
            <div className="pt-2 border-t border-[#232d42] text-center">
              <button
                type="button"
                onClick={() => {
                  loginUser('emmanuel.n@gmail.com', 'reader123');
                }}
                className="text-[11px] font-semibold text-[#fbbf24] hover:underline"
              >
                ⚡ Quick Demo Sign-In as Emmanuel N. (Bamenda)
              </button>
            </div>
          </form>
        )}

        {/* FORM 2: CREATE ACCOUNT (SIGN UP) */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Marie F."
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                City / Country
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bamenda, Cameroon"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Create Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#e11d48] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[#e11d48]/25 active:scale-95 transition-transform"
            >
              Create Free Reader Account
            </button>
          </form>
        )}

        {/* FORM 3: FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your account email..."
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#fbbf24] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password..."
                className="w-full rounded-xl bg-[#0b0f19] border border-[#334155] px-3.5 py-2.5 text-xs text-white focus:border-[#fbbf24] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg active:scale-95 transition-transform"
            >
              Reset My Password
            </button>
          </form>
        )}

        {/* Admin Portal Link */}
        <div className="pt-3 border-t border-[#232d42] flex items-center justify-between text-[11px] text-[#94a3b8]">
          <span>Are you Kenah Pascal / Admin?</span>
          <Link
            href="/admin"
            className="font-bold text-[#fbbf24] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">
              admin_panel_settings
            </span>
            Admin Login &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

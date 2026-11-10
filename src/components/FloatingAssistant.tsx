'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useBookStore } from '@/context/BookStoreContext';

export default function FloatingAssistant() {
  const { conversations, activeCustomerConvId, sendCustomerMessage } = useBookStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'assistant' | 'human'>('assistant');
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv =
    conversations.find((c) => c.id === activeCustomerConvId) || conversations[0];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, activeConv?.messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendCustomerMessage(
      inputText.trim(),
      userName.trim() || 'Current Reader (You)',
      'reader@todaysnovel.com',
      mode
    );
    setInputText('');
  };

  const handleSpeakLastReply = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const lastBotOrAdmin = [...(activeConv?.messages || [])]
      .reverse()
      .find((m) => m.sender !== 'user');
    if (!lastBotOrAdmin) return;

    const utterance = new SpeechSynthesisUtterance(lastBotOrAdmin.text);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const quickPrompts = [
    'Tell me about UNBOUND by Kenah Pascal',
    'How can I contact Kenah Pascal / Admin?',
    'Need support or recovery guidance'
  ];

  return (
    <>
      {/* FLOATING HELP / SPEAK TO ASSISTANT BUTTON (Android Optimized Above BottomNav) */}
      <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Help & Speak to Assistant"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e11d48] via-[#be123c] to-[#881337] px-4 py-3 text-white shadow-[0_8px_28px_rgba(225,29,72,0.45)] ring-1 ring-[#fbbf24]/40 active:scale-95 transition-all"
          >
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#fbbf24] text-slate-950">
              <span className="material-symbols-outlined text-[16px] font-bold">
                support_agent
              </span>
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#881337]" />
            </span>
            <span className="text-xs font-extrabold tracking-wide pr-0.5">
              Help &amp; Assistant
            </span>
          </button>
        )}
      </div>

      {/* ANDROID BOTTOM SHEET / CHAT MODAL */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-16 z-50 mx-auto max-w-md px-3 sm:px-4">
          <div className="flex flex-col h-[490px] max-h-[75vh] rounded-t-3xl rounded-b-2xl bg-[#121826]/98 border border-[#334155] shadow-[0_-12px_40px_rgba(0,0,0,0.75)] backdrop-blur-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#161d2f] via-[#1e273d] to-[#161d2f] px-4 py-3 border-b border-[#334155]">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#fbbf24] to-[#d97706] text-slate-950 shadow">
                  <span className="material-symbols-outlined text-[20px]">
                    support_agent
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#161d2f]" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[#f8fafc] flex items-center gap-1.5">
                    Today&apos;s Novel Assistant
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300">
                      LIVE
                    </span>
                  </h3>
                  <p className="text-[10px] text-[#94a3b8]">
                    Instant AI Help &amp; Direct Line to Kenah Pascal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleSpeakLastReply}
                  title="Read Last Reply Aloud (Voice Assistant)"
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    isSpeaking
                      ? 'bg-[#fbbf24] text-slate-950 border-[#fbbf24]'
                      : 'bg-white/5 border-white/10 text-[#fbbf24] hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isSpeaking ? 'volume_up' : 'record_voice_over'}
                  </span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Mode Switcher: AI Assistant vs Direct Admin/Author Message */}
            <div className="grid grid-cols-2 gap-1.5 bg-[#0b0f19] p-2 border-b border-[#232d42]">
              <button
                onClick={() => setMode('assistant')}
                className={`py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  mode === 'assistant'
                    ? 'bg-[#e11d48] text-white shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                🤖 Speak to AI Assistant
              </button>
              <button
                onClick={() => setMode('human')}
                className={`py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  mode === 'human'
                    ? 'bg-[#fbbf24] text-slate-950 shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                ✍️ Message Kenah / Admin
              </button>
            </div>

            {/* Optional Reader Name Bar when messaging Human Admin */}
            {mode === 'human' && (
              <div className="bg-[#161d2f]/70 px-3 py-1.5 border-b border-[#232d42] flex items-center gap-2">
                <span className="text-[10px] font-semibold text-[#fbbf24]">
                  Your Name:
                </span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name so Kenah can reply..."
                  className="flex-1 bg-transparent text-[11px] text-white placeholder-[#94a3b8] focus:outline-none"
                />
              </div>
            )}

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              {activeConv?.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[9px] font-bold text-[#94a3b8] mb-0.5 px-1">
                      {msg.senderName} • {msg.timestamp}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#e11d48] text-white rounded-br-xs'
                          : isAdmin
                          ? 'bg-gradient-to-r from-[#fbbf24]/20 to-[#d97706]/20 border border-[#fbbf24]/50 text-[#f8fafc] rounded-bl-xs'
                          : 'bg-[#1e273d] border border-[#334155] text-[#f8fafc] rounded-bl-xs'
                      }`}
                    >
                      {isAdmin && (
                        <span className="block text-[9px] font-extrabold uppercase tracking-wider text-[#fbbf24] mb-1">
                          ★ Official Admin / Author Reply
                        </span>
                      )}
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto px-3 py-1.5 no-scrollbar border-t border-[#232d42]/60 bg-[#0b0f19]/60">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    sendCustomerMessage(
                      prompt,
                      userName.trim() || 'Current Reader (You)',
                      'reader@todaysnovel.com',
                      mode
                    );
                  }}
                  className="shrink-0 rounded-full bg-[#161d2f] border border-[#334155] px-2.5 py-1 text-[10px] font-semibold text-[#cbd5e1] hover:border-[#fbbf24] active:scale-95 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 bg-[#161d2f] p-2.5 border-t border-[#334155]"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === 'assistant'
                    ? 'Ask the assistant anything...'
                    : 'Write a message to Kenah Pascal / Admin...'
                }
                className="flex-1 rounded-xl bg-[#0b0f19] border border-[#334155] px-3 py-2 text-xs text-white placeholder-[#94a3b8] focus:border-[#e11d48] focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e11d48] text-white shadow active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

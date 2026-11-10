'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function BrandLogo({
  size = 'md',
  showSubtitle = true
}: BrandLogoProps) {
  const iconDimensions =
    size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';
  const titleSize =
    size === 'sm'
      ? 'text-[17px]'
      : size === 'lg'
      ? 'text-[24px]'
      : 'text-[19px]';

  return (
    <div className="flex items-center space-x-2.5 select-none group">
      {/* Custom Professional SVG Emblem */}
      <div
        className={`relative ${iconDimensions} shrink-0 rounded-xl overflow-hidden shadow-md shadow-black/50 ring-1 ring-[#ffb95f]/30 group-hover:ring-[#ffb95f]/60 transition-all duration-200`}
      >
        <img
          src="/logo.svg"
          alt="Today's Novel Logo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Editorial Wordmark */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-title-novel ${titleSize} font-bold tracking-tight leading-none text-[#f8fafc]`}
          >
            Today&apos;s{' '}
            <span className="bg-gradient-to-r from-[#fde68a] via-[#ffb95f] to-[#f59e0b] bg-clip-text text-transparent">
              Novel
            </span>
          </span>
          <span className="rounded-full bg-[#e11d48]/15 border border-[#e11d48]/40 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#fda4af]">
            FREE
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8] mt-0.5">
            Original &amp; Classic Literature
          </span>
        )}
      </div>
    </div>
  );
}

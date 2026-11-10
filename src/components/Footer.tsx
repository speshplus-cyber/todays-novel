import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06070a] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-slate-950">
                <BookOpen className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                TODAY&apos;S <span className="text-amber-400">NOVEL</span>
              </span>
            </div>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed">
              Today&apos;s Novel is a 100% free reading platform dedicated to transformative stories,
              real-life testimonies, and timeless literature. Proudly featuring our flagship exclusive{' '}
              <Link href="/book/unbound" className="text-amber-300 underline hover:text-amber-200">
                UNBOUND: Faith, Rescue, and Thriving
              </Link>{' '}
              by <strong>Kenah Pascal</strong>, with foreword by{' '}
              <strong>Dr. Theresia Fuh-Tabe</strong>.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-emerald-400 font-medium">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Zero Paywalls — Every Chapter Free
              </span>
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Sparkles className="h-4 w-4" /> Psalm 23:3 — &ldquo;He restores my soul&rdquo;
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/book/unbound" className="text-amber-300 hover:text-white font-medium">
                  ★ Read UNBOUND (Priority #1)
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-rose-300 hover:text-rose-200 font-semibold flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
                  About Kenah Pascal &amp; Dedication to My Wife
                </Link>
              </li>
              <li>
                <Link href="/read/unbound/1" className="hover:text-white">
                  Foreword by Dr. Theresia Fuh-Tabe
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white">
                  Free Book Collections
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-white">
                  My Reading Library
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white">
                  Author Studio &amp; Free Book Importer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              About the Author
            </h3>
            <p className="text-xs leading-relaxed text-slate-400">
              <strong className="text-slate-200">Kenah Pascal</strong> writes from lived experience,
              turning a real-life journey through addiction, withdrawal, rehab, and relapse into a
              message of rescue, hope, and redemption in Christ Jesus. Created Today&apos;s Novel
              with deep devotion as a gift to his beloved wife.
            </p>
            <Link
              href="/about"
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              Read Full Bio &amp; Letter to My Wife &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Today&apos;s Novel. All books and chapters are 100% free to read.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> featuring
            Kenah Pascal&apos;s Exclusive Original Novel <em>UNBOUND</em>
          </p>
        </div>
      </div>
    </footer>
  );
}

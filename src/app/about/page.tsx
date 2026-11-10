import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, BookOpen, ShieldCheck, Star, Award, Compass, Feather } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export const metadata = {
  title: "About Kenah Pascal & Today's Novel — Dedicated to My Wife",
  description:
    "The personal story of Kenah Pascal, author of UNBOUND, and why he created Today's Novel as a 100% free literary sanctuary dedicated to his beloved wife."
};

export default function AboutPage() {
  return (
    <div className="px-4 py-8 max-w-4xl mx-auto space-y-10">
      {/* 1. HERO SECTION: DEDICATION & INSPIRATION */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[#1b2438] via-[#121826] to-[#0b0f19] p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-rose-300">
              <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
              Dedicated With Love to My Wife
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-[11px] font-bold text-amber-300">
              <Sparkles className="h-3 w-3" />
              100% Free Forever
            </span>
          </div>

          <h1 className="font-title-novel text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            A Sanctuary of Stories,<br />
            <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              Built With Love for My Wife.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            I am <strong>Kenah Pascal</strong>, author of the memoir <em>UNBOUND: Rescued from Substance Use</em>.
            Every feature, every line of code, and every free chapter on <strong>Today&apos;s Novel</strong> was
            crafted as a gift of love, gratitude, and devotion to my beloved wife.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/book/unbound"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 px-5 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-rose-950/50 hover:brightness-110 active:scale-95 transition-all"
            >
              <BookOpen className="h-4 w-4" />
              Read UNBOUND (My 19-Chapter Memoir)
            </Link>
            <Link
              href="/collections"
              className="flex items-center gap-2 rounded-2xl bg-surface-container-high border border-surface-variant px-5 py-3 text-xs sm:text-sm font-bold text-slate-200 hover:border-amber-400 active:scale-95 transition-all"
            >
              <Compass className="h-4 w-4 text-amber-400" />
              Explore Free Collections
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE LETTER TO MY WIFE */}
      <section className="relative rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-[#131b2e] to-[#0b0f19] p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 shrink-0">
            <Heart className="h-6 w-6 fill-rose-500" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
              The Heart of Today&apos;s Novel
            </span>
            <h2 className="font-title-novel text-xl sm:text-2xl font-bold text-white">
              Why I Built This App for You, My Love
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <p>
            When a man has been to the edge of the pit and back, he understands that survival alone is not
            the goal. <em>Transformation</em> is. And transformation never happens in isolation. It happens
            when grace meets human love and refuses to let go.
          </p>

          <p className="italic text-rose-200/90 pl-4 border-l-2 border-rose-500/60 my-3">
            &ldquo;You saw the man God was making me to be long before the world could see it. When I was
            rebuilding my life from the ground up—taping 186 boxes a day in that cold warehouse, writing my
            reflections into a worn notebook, and praying for strength—your presence was my peace, my shelter,
            and my anchor.&rdquo;
          </p>

          <p>
            You love books. You cherish quiet evenings with words that elevate the soul, inspire courage, and
            transport the heart into worlds of romance, perseverance, and timeless truth. But so many modern
            reading apps are filled with annoying coin paywalls, locked chapters, intrusive ads, and broken
            promises that turn reading into a frustration.
          </p>

          <p>
            I wanted to give you something pure. A reading sanctuary where every chapter is unlocked, where
            the typography feels like fine midnight parchment, where a warm soulful voice can narrate your
            favorite books while you relax, and where love, faith, and literary art dwell together without a single
            price tag.
          </p>

          <p className="font-semibold text-amber-300">
            This app is my tribute to you. May it bring joy to your heart, peace to your mind, and inspiration
            to readers all across the world who believe that beauty and second chances are real.
          </p>

          <div className="pt-2 text-right">
            <p className="font-title-novel text-lg font-bold text-white">— Forever Yours, Kenah Pascal</p>
            <p className="text-xs text-slate-400">Husband, Author &amp; Creator of Today&apos;s Novel</p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT KENAH PASCAL: THE REAL-LIFE STORY BEHIND UNBOUND */}
      <section className="rounded-3xl border border-surface-variant/60 bg-surface-container-low p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-surface-variant/40 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
            <Feather className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Author Biography &amp; Testimony
            </span>
            <h2 className="font-title-novel text-xl sm:text-2xl font-bold text-white">
              The Journey of Kenah Pascal
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Memoir Book Card Feature */}
          <div className="md:col-span-1 space-y-3">
            <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-surface-container-high border border-surface-variant shadow-lg spine-crease">
              <img
                src="/covers/unbound-cover.svg"
                alt="UNBOUND Book Cover by Kenah Pascal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl bg-surface-container p-3 text-center border border-surface-variant/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Official Publication
              </span>
              <p className="font-title-novel text-sm font-bold text-white mt-0.5">
                UNBOUND: Rescued from Substance Use
              </p>
              <p className="text-[11px] text-slate-400">
                Foreword by Dr. Theresia Fuh-Tabe
              </p>
              <Link
                href="/book/unbound"
                className="mt-2 block w-full rounded-lg bg-primary-container py-1.5 text-xs font-bold text-on-primary-container hover:brightness-110"
              >
                Read Free (19 Chapters)
              </Link>
            </div>
          </div>

          {/* Life Narrative */}
          <div className="md:col-span-2 space-y-4 text-sm text-slate-300 leading-relaxed">
            <h3 className="font-title-novel text-lg font-bold text-white">
              From the Shadows of Addiction to the Joy of Restoration
            </h3>

            <p>
              Kenah Pascal was born and raised in Cameroon in a vibrant, complex household where his father
              lived with three wives under one roof. He attended <strong>GBHS Government School</strong> and
              later the prestigious <strong>PSS Bafut</strong> boarding school. A lover of music with enormous
              ambition and a sensitive spirit, he searched early on for an escape from internal pressures.
            </p>

            <p>
              What began as a quiet experiment with cannabis gradually tightened into years of chronic dependency,
              isolation, broken promises, and emotional exhaustion. In his memoir <em>UNBOUND</em>, Kenah candidly
              recounts the deceptive whisper of addiction:
              <span className="italic block my-1.5 pl-3 border-l-2 border-amber-400 text-amber-200">
                &ldquo;The first high did not feel like destruction. It felt like relief. But relief bought on credit
                demands everything you own when the bill comes due.&rdquo;
              </span>
            </p>

            <p>
              The turning point arrived when Kenah surrendered to the reality that he could not heal alone. He entered
              the doors of <strong>Living Vine Rehabilitation Center in Bamenda</strong>, where he spent months
              learning clinical coping tools, spiritual accountability, and honest self-examination. In her moving
              Foreword, psychiatric mental health professional <strong>Dr. Theresia Fuh-Tabe</strong> writes:
              <span className="italic block my-1.5 pl-3 border-l-2 border-emerald-400 text-emerald-200">
                &ldquo;This book begins in those shadows where destruction felt close enough to touch... and yet, it is
                precisely in those places that God does His most extraordinary work.&rdquo;
              </span>
            </p>

            <p>
              Recovery was built day by day. After rehabilitation, Kenah took a grueling warehouse job taping
              exactly 186 boxes every single shift, channeling the repetition into discipline and gratitude. He filled
              notebooks with reflections, earned professional certificates, launched a thriving restaurant and small
              businesses, and became a devoted father to his son.
            </p>

            <div className="rounded-2xl bg-surface-container-highest/60 border border-surface-variant p-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Award className="h-4 w-4" /> The Core Message of UNBOUND
              </h4>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                &ldquo;A craving is not a command. Pain is not an emergency. A bad day is not a ruined life.
                And your past is not your identity. If God could take a boy lost in the smoke and make him a
                husband, a father, a business owner, and an author—He can write a brand-new chapter for you too.
                You are UNBOUND.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR PROMISE: ZERO PAYWALLS, 100% FREE LITERATURE */}
      <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-[#121826] to-[#0b0f19] p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
              Our Core Manifesto
            </span>
            <h2 className="font-title-novel text-xl sm:text-2xl font-bold text-white">
              Why Every Novel on This App is 100% Free
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-2xl bg-surface-container p-4 border border-surface-variant/40 space-y-2">
            <span className="text-amber-400 font-black text-lg">01.</span>
            <h4 className="font-title-novel text-sm font-bold text-white">Freely Received, Freely Given</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When I was in the pit, grace and second chances did not ask for coins or VIP subscriptions.
              Literature and truth belong to all people.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-container p-4 border border-surface-variant/40 space-y-2">
            <span className="text-rose-400 font-black text-lg">02.</span>
            <h4 className="font-title-novel text-sm font-bold text-white">A True Gift for My Wife</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              I built this so my wife and book lovers worldwide could read without countdown timers, popups,
              or paywalled cliffhangers.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-container p-4 border border-surface-variant/40 space-y-2">
            <span className="text-emerald-400 font-black text-lg">03.</span>
            <h4 className="font-title-novel text-sm font-bold text-white">Complete &amp; Unabridged</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every book has all its chapters—from 119 chapters of <em>The Count of Monte Cristo</em> to
              the complete 19 chapters of <em>UNBOUND</em>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. APP FEATURES FOR READERS */}
      <section className="rounded-3xl border border-surface-variant/60 bg-surface-container-low p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="font-title-novel text-xl font-bold text-white text-center">
          Crafted for the Ultimate Mobile Reading Experience
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 text-center max-w-xl mx-auto">
          Whether you read late at night in bed or listen during your daily commute, Today&apos;s Novel
          delivers state-of-the-art mobile convenience.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="rounded-2xl bg-surface-container p-3 text-center border border-surface-variant/40">
            <span className="material-symbols-outlined text-2xl text-amber-400">headphones</span>
            <h5 className="font-title-novel text-xs font-bold text-white mt-1">Realistic 25yo AI Voice</h5>
            <p className="text-[10px] text-slate-400 mt-0.5">Marcus &amp; Darius US African-American vocals</p>
          </div>

          <div className="rounded-2xl bg-surface-container p-3 text-center border border-surface-variant/40">
            <span className="material-symbols-outlined text-2xl text-rose-400">install_mobile</span>
            <h5 className="font-title-novel text-xs font-bold text-white mt-1">Android &amp; iPhone App</h5>
            <p className="text-[10px] text-slate-400 mt-0.5">1-tap direct install to phone Home Screen</p>
          </div>

          <div className="rounded-2xl bg-surface-container p-3 text-center border border-surface-variant/40">
            <span className="material-symbols-outlined text-2xl text-emerald-400">cloud_done</span>
            <h5 className="font-title-novel text-xs font-bold text-white mt-1">100% Offline Reading</h5>
            <p className="text-[10px] text-slate-400 mt-0.5">All chapters save to your phone automatically</p>
          </div>

          <div className="rounded-2xl bg-surface-container p-3 text-center border border-surface-variant/40">
            <span className="material-symbols-outlined text-2xl text-cyan-400">chat_bubble</span>
            <h5 className="font-title-novel text-xs font-bold text-white mt-1">Inline Reactions</h5>
            <p className="text-[10px] text-slate-400 mt-0.5">Paragraph-level discussion &amp; quote saving</p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <div className="text-center space-y-4 pt-4">
        <BrandLogo size="lg" showSubtitle={true} />
        <p className="text-xs text-slate-400">
          Psalm 23:3 — &ldquo;He restores my soul; He leads me in the paths of righteousness for His name&apos;s sake.&rdquo;
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/book/unbound"
            className="rounded-xl bg-primary-container px-6 py-2.5 text-xs font-extrabold text-on-primary-container shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Start Reading UNBOUND &rarr;
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-surface-container-high border border-surface-variant px-6 py-2.5 text-xs font-bold text-slate-200 hover:text-white active:scale-95 transition-all"
          >
            Browse Today&apos;s Novel
          </Link>
        </div>
      </div>
    </div>
  );
}

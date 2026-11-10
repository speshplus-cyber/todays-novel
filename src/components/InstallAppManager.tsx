'use client';

import React, { useEffect, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function triggerInstallModal(defaultPlatform?: 'android' | 'ios') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('todays-novel-open-install', {
        detail: { platform: defaultPlatform }
      })
    );
  }
}

export default function InstallAppManager() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>('android');
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Register PWA Service Worker for Android WebAPK & offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // Detect if already running as installed standalone app on Android or iPhone
    const standaloneMatch =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standaloneMatch);

    // Detect OS to pre-select the right tab (Android vs iPhone/iPad)
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    if (isIOS) {
      setActiveTab('ios');
    } else {
      setActiveTab('android');
    }

    // Show smart install banner if not already installed and not dismissed in this session
    const dismissed = sessionStorage.getItem('todays_novel_install_banner_dismissed');
    if (!standaloneMatch && !dismissed) {
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstallSuccess(true);
      setIsStandalone(true);
      setDeferredPrompt(null);
      setShowBanner(false);
    };

    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ platform?: 'android' | 'ios' }>;
      if (customEvent.detail?.platform) {
        setActiveTab(customEvent.detail.platform);
      }
      setShowModal(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('todays-novel-open-install', handleOpenModal);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('todays-novel-open-install', handleOpenModal);
    };
  }, []);

  const handleNativeAndroidInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstallSuccess(true);
        setDeferredPrompt(null);
        setShowBanner(false);
      }
    } else {
      setActiveTab('android');
      setShowModal(true);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem('todays_novel_install_banner_dismissed', '1');
  };

  return (
    <>
      {/* Smart Floating Install Banner (Above BottomNav) */}
      {showBanner && !isStandalone && (
        <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-md rounded-2xl border border-primary/40 bg-surface-container-low/95 p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.75)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0">
                <BrandLogo size="sm" showText={false} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-title-novel text-sm font-bold text-on-surface truncate">
                    Install Today&apos;s Novel App
                  </p>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-emerald-300">
                    Free
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant truncate">
                  Read UNBOUND offline on Android &amp; iPhone
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  if (deferredPrompt && activeTab === 'android') {
                    handleNativeAndroidInstall();
                  } else {
                    setShowModal(true);
                  }
                }}
                className="flex items-center gap-1 rounded-xl bg-primary-container px-3 py-2 text-xs font-extrabold text-on-primary-container shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">install_mobile</span>
                Install
              </button>
              <button
                onClick={dismissBanner}
                aria-label="Dismiss install banner"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Android & iPhone Installation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-surface-variant bg-[#0f1626] shadow-2xl">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#1b2438] via-[#131b2e] to-[#0b0f19] p-5 border-b border-surface-variant/60">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>

              <div className="flex items-center gap-3.5">
                <BrandLogo size="md" showText={false} />
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Official Mobile Web App
                  </span>
                  <h3 className="mt-1 font-title-novel text-xl font-bold text-on-surface">
                    Install Today&apos;s Novel
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Direct home screen app for Android &amp; iPhone • 100% Free
                  </p>
                </div>
              </div>

              {/* Platform Switcher Tabs */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-surface-container-lowest p-1 border border-surface-variant/50">
                <button
                  onClick={() => setActiveTab('android')}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    activeTab === 'android'
                      ? 'bg-primary-container text-on-primary-container shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">phone_android</span>
                  Android App
                </button>
                <button
                  onClick={() => setActiveTab('ios')}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    activeTab === 'ios'
                      ? 'bg-primary-container text-on-primary-container shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">phone_iphone</span>
                  iPhone / iPad
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {installSuccess || isStandalone ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center">
                  <span className="material-symbols-outlined text-3xl text-emerald-400">
                    check_circle
                  </span>
                  <h4 className="mt-1 font-title-novel text-base font-bold text-emerald-200">
                    Today&apos;s Novel is Installed!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-300/80">
                    You can launch Today&apos;s Novel anytime directly from your phone&apos;s Home Screen with full offline reading and AI Audio support.
                  </p>
                </div>
              ) : activeTab === 'android' ? (
                <div className="space-y-4">
                  {/* Direct 1-Tap Native Install Button */}
                  <div className="rounded-2xl border border-primary/30 bg-primary-container/10 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary">
                          Option 1: Direct 1-Tap Install
                        </h4>
                        <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                          Install the lightweight Android WebAPK directly onto your phone without needing Google Play Store.
                        </p>
                      </div>
                      <span className="rounded-lg bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300 shrink-0">
                        2.1 MB
                      </span>
                    </div>

                    <button
                      onClick={handleNativeAndroidInstall}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container py-3 text-xs font-extrabold text-on-primary-container shadow-lg hover:brightness-110 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      {deferredPrompt
                        ? 'Install on Android Now (1-Tap)'
                        : 'Launch Android App Installer'}
                    </button>
                  </div>

                  {/* Step-by-Step Chrome / Samsung Browser Guide */}
                  <div className="rounded-2xl border border-surface-variant bg-surface-container p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-tertiary">
                      Quick Chrome / Android Browser Steps
                    </h4>
                    <div className="space-y-2.5 text-xs text-on-surface">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-[11px] font-extrabold text-tertiary">
                          1
                        </span>
                        <p className="flex-1">
                          Tap the browser menu icon{' '}
                          <span className="inline-flex items-center rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-[11px] text-primary">
                            ⋮
                          </span>{' '}
                          in the top-right corner of Chrome.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-[11px] font-extrabold text-tertiary">
                          2
                        </span>
                        <p className="flex-1">
                          Tap{' '}
                          <span className="font-bold text-primary">
                            &ldquo;Install app&rdquo;
                          </span>{' '}
                          or{' '}
                          <span className="font-bold text-primary">
                            &ldquo;Add to Home screen&rdquo;
                          </span>
                          .
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-[11px] font-extrabold text-tertiary">
                          3
                        </span>
                        <p className="flex-1">
                          Confirm <span className="font-bold text-emerald-400">Install</span> — the{' '}
                          <strong>Today&apos;s Novel</strong> icon will appear in your Android app drawer!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* iPhone / iPad iOS Installation Steps */
                <div className="space-y-4">
                  <div className="rounded-2xl border border-tertiary/30 bg-tertiary/10 p-3.5 flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl text-tertiary">
                      phone_iphone
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">
                      On <strong>iPhone &amp; iPad</strong>, open this page in{' '}
                      <strong>Safari</strong> and follow these 3 quick steps to install the full-screen app:
                    </p>
                  </div>

                  <div className="rounded-2xl border border-surface-variant bg-surface-container p-4 space-y-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-extrabold text-on-primary-container">
                        1
                      </span>
                      <div className="flex-1 text-xs text-on-surface">
                        Tap the <strong>Share</strong> button at the bottom of Safari:{' '}
                        <span className="inline-flex items-center gap-1 rounded-md bg-surface-container-highest px-2 py-0.5 text-[11px] font-bold text-tertiary align-middle">
                          <span className="material-symbols-outlined text-[14px]">ios_share</span>
                          Share
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-extrabold text-on-primary-container">
                        2
                      </span>
                      <div className="flex-1 text-xs text-on-surface">
                        Scroll down the share sheet and tap:{' '}
                        <span className="inline-flex items-center gap-1 rounded-md bg-surface-container-highest px-2 py-0.5 text-[11px] font-bold text-primary align-middle">
                          <span className="material-symbols-outlined text-[14px]">add_box</span>
                          Add to Home Screen
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-extrabold text-on-primary-container">
                        3
                      </span>
                      <div className="flex-1 text-xs text-on-surface">
                        Tap <strong className="text-emerald-400">&ldquo;Add&rdquo;</strong> in the top-right corner. Today&apos;s Novel is now installed on your iPhone!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* App Perks Footer */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="rounded-xl bg-surface-container-low p-2 border border-surface-variant/40">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    cloud_done
                  </span>
                  <p className="mt-0.5 text-[10px] font-bold text-on-surface">100% Offline</p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-2 border border-surface-variant/40">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    headphones
                  </span>
                  <p className="mt-0.5 text-[10px] font-bold text-on-surface">AI Narrator</p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-2 border border-surface-variant/40">
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">
                    fullscreen
                  </span>
                  <p className="mt-0.5 text-[10px] font-bold text-on-surface">Full Screen</p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded-xl bg-surface-container-high py-2.5 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

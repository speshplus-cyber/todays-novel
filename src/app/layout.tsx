import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BookStoreProvider } from '@/context/BookStoreContext';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import FloatingAssistant from '@/components/FloatingAssistant';
import InstallAppManager from '@/components/InstallAppManager';

export const metadata: Metadata = {
  title: "Today's Novel — Midnight Literary Discovery | UNBOUND by Kenah Pascal",
  description:
    "100% Free Android-optimized reading app featuring UNBOUND: Rescued from Substance Use by Kenah Pascal (Foreword by Dr. Theresia Fuh-Tabe) and top web novels.",
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Today's Novel"
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0b0f19'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased min-h-screen pb-24 selection:bg-primary-container selection:text-on-primary-container">
        <BookStoreProvider>
          <Navbar />
          <main className="max-w-md md:max-w-5xl mx-auto">{children}</main>
          <InstallAppManager />
          <FloatingAssistant />
          <BottomNav />
        </BookStoreProvider>
      </body>
    </html>
  );
}

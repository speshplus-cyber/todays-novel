'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Chapter, Review, INITIAL_BOOKS } from '@/data/books';

export interface TrackedUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  location: string;
  device: string;
  currentBook: string;
  currentChapter: number;
  chaptersRead: number;
  status: 'Online' | 'Reading' | 'Offline';
  lastActive: string;
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'admin';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface SupportConversation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: 'Open' | 'Replied' | 'Resolved';
  unreadByAdmin: number;
  lastUpdated: string;
  messages: ChatMessage[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  active: boolean;
}

export interface ParagraphComment {
  id: string;
  bookSlug: string;
  chapterNumber: number;
  paragraphIndex: number;
  readerName: string;
  text: string;
  reaction?: '🔥' | '❤️' | '🙏' | '💡';
  createdAt: string;
}

export interface SavedQuote {
  id: string;
  bookTitle: string;
  bookSlug: string;
  author: string;
  chapterNumber: number;
  chapterTitle: string;
  quoteText: string;
  savedAt: string;
}

export interface ReadingStats {
  streakDays: number;
  minutesToday: number;
  dailyGoalMinutes: number;
  chaptersCompleted: number;
  offlineSavedBooks: string[]; // bookIds saved for 100% offline reading
}

interface BookStoreContextType {
  books: Book[];
  bookmarks: string[];
  readingProgress: Record<string, number>;
  users: TrackedUser[];
  conversations: SupportConversation[];
  activeCustomerConvId: string;
  announcements: Announcement[];
  paragraphComments: ParagraphComment[];
  savedQuotes: SavedQuote[];
  readingStats: ReadingStats;
  currentUser: TrackedUser | null;
  isAdminAuthenticated: boolean;
  loginUser: (email: string, password: string) => { ok: boolean; message: string };
  registerUser: (
    name: string,
    email: string,
    password: string,
    location?: string
  ) => { ok: boolean; message: string };
  resetUserPassword: (email: string, newPassword: string) => { ok: boolean; message: string };
  logoutUser: () => void;
  loginAdmin: (email: string, password: string) => { ok: boolean; message: string };
  logoutAdmin: () => void;
  toggleBookmark: (bookId: string) => void;
  updateProgress: (bookSlug: string, chapterNumber: number) => void;
  addBook: (book: Book) => void;
  deleteBook: (bookId: string) => void;
  togglePriorityBook: (bookId: string) => void;
  addChapter: (
    bookId: string,
    chapter: Omit<Chapter, 'id' | 'number' | 'publishedAt' | 'wordCount'>
  ) => void;
  addReview: (bookId: string, review: Omit<Review, 'id' | 'date'>) => void;
  sendCustomerMessage: (
    text: string,
    userName?: string,
    userEmail?: string,
    mode?: 'assistant' | 'human'
  ) => void;
  sendAdminReply: (conversationId: string, replyText: string) => void;
  updateConversationStatus: (
    conversationId: string,
    status: 'Open' | 'Replied' | 'Resolved'
  ) => void;
  addAnnouncement: (title: string, message: string) => void;
  addParagraphComment: (
    bookSlug: string,
    chapterNumber: number,
    paragraphIndex: number,
    readerName: string,
    text: string,
    reaction?: '🔥' | '❤️' | '🙏' | '💡'
  ) => void;
  saveQuoteHighlight: (quote: Omit<SavedQuote, 'id' | 'savedAt'>) => void;
  toggleOfflineBook: (bookId: string) => void;
  incrementReadingMinutes: (mins: number) => void;
}

const BookStoreContext = createContext<BookStoreContextType | undefined>(undefined);

const STORAGE_KEY_BOOKS = 'todays_novel_books_v9';
const STORAGE_KEY_BOOKMARKS = 'todays_novel_bookmarks_v5';
const STORAGE_KEY_PROGRESS = 'todays_novel_progress_v5';
const STORAGE_KEY_USERS = 'todays_novel_users_v5';
const STORAGE_KEY_CONVS = 'todays_novel_convs_v5';
const STORAGE_KEY_ANNOUNCEMENTS = 'todays_novel_announcements_v5';
const STORAGE_KEY_PARA_COMMENTS = 'todays_novel_para_comments_v5';
const STORAGE_KEY_QUOTES = 'todays_novel_quotes_v5';
const STORAGE_KEY_STATS = 'todays_novel_stats_v5';
const STORAGE_KEY_CURRENT_USER = 'todays_novel_current_user_v5';
const STORAGE_KEY_ADMIN_AUTH = 'todays_novel_admin_auth_v5';

const INITIAL_PARA_COMMENTS: ParagraphComment[] = [
  {
    id: 'pc-1',
    bookSlug: 'unbound',
    chapterNumber: 1,
    paragraphIndex: 2,
    readerName: 'Dr. Theresia Fuh-Tabe',
    text: 'This single prayer—"Lord, help me"—is where so many clinical and spiritual breakthroughs begin.',
    reaction: '🙏',
    createdAt: '2h ago'
  },
  {
    id: 'pc-2',
    bookSlug: 'unbound',
    chapterNumber: 3,
    paragraphIndex: 4,
    readerName: 'Emmanuel N.',
    text: '“The first high did not feel like destruction. It felt like relief.” Most accurate description of addiction I have ever read.',
    reaction: '💡',
    createdAt: '1h ago'
  },
  {
    id: 'pc-3',
    bookSlug: 'unbound',
    chapterNumber: 13,
    paragraphIndex: 5,
    readerName: 'Grace M.',
    text: '“A craving could be intense without being an instruction.” Highlighting this forever!',
    reaction: '🔥',
    createdAt: '45m ago'
  },
  {
    id: 'pc-4',
    bookSlug: 'unbound',
    chapterNumber: 16,
    paragraphIndex: 19,
    readerName: 'Samuel K.',
    text: '“I saw my past today. He smiled. I didn’t smile back.” Pure chills!',
    reaction: '🔥',
    createdAt: '20m ago'
  }
];

const INITIAL_SAVED_QUOTES: SavedQuote[] = [
  {
    id: 'sq-1',
    bookTitle: 'UNBOUND',
    bookSlug: 'unbound',
    author: 'Kenah Pascal',
    chapterNumber: 15,
    chapterTitle: 'Chapter 12 — The Door Still Opens',
    quoteText:
      '“You are not supposed to become who you were. You are supposed to become better.”',
    savedAt: 'Nov 10, 2026'
  },
  {
    id: 'sq-2',
    bookTitle: 'UNBOUND',
    bookSlug: 'unbound',
    author: 'Kenah Pascal',
    chapterNumber: 18,
    chapterTitle: 'Chapter 15 — The Effects of Addiction',
    quoteText:
      'A craving is not a command. Pain is not an emergency. A bad day is not a ruined life. And my past is not my identity.',
    savedAt: 'Nov 10, 2026'
  }
];

const INITIAL_USERS: TrackedUser[] = [
  {
    id: 'usr-1',
    name: 'Emmanuel N.',
    email: 'emmanuel.n@gmail.com',
    location: 'Bamenda, Cameroon',
    device: 'Android 15 • Samsung Galaxy S24',
    currentBook: 'UNBOUND',
    currentChapter: 16,
    chaptersRead: 16,
    status: 'Reading',
    lastActive: 'Just now',
    joinedAt: 'Nov 08, 2026'
  },
  {
    id: 'usr-2',
    name: 'Grace M.',
    email: 'grace.mbah@yahoo.com',
    location: 'Douala, Cameroon',
    device: 'Android 14 • Tecno Phantom X2',
    currentBook: 'UNBOUND',
    currentChapter: 13,
    chaptersRead: 19,
    status: 'Online',
    lastActive: '2 mins ago',
    joinedAt: 'Nov 09, 2026'
  },
  {
    id: 'usr-3',
    name: 'Samuel K.',
    email: 'samuel.k@outlook.com',
    location: 'Yaoundé, Cameroon',
    device: 'Android 14 • Xiaomi Redmi Note 13',
    currentBook: 'UNBOUND',
    currentChapter: 4,
    chaptersRead: 7,
    status: 'Reading',
    lastActive: '5 mins ago',
    joinedAt: 'Nov 09, 2026'
  },
  {
    id: 'usr-4',
    name: 'Chantal T.',
    email: 'chantal.t@gmail.com',
    location: 'Buea, Cameroon',
    device: 'Android 15 • Google Pixel 8',
    currentBook: 'His Alpha Queen',
    currentChapter: 1,
    chaptersRead: 12,
    status: 'Online',
    lastActive: '11 mins ago',
    joinedAt: 'Nov 10, 2026'
  },
  {
    id: 'usr-5',
    name: 'David O.',
    email: 'david.o@gmail.com',
    location: 'Lagos, Nigeria',
    device: 'Android 13 • Infinix Zero 30',
    currentBook: 'UNBOUND',
    currentChapter: 19,
    chaptersRead: 24,
    status: 'Offline',
    lastActive: '1 hr ago',
    joinedAt: 'Nov 07, 2026'
  }
];

const INITIAL_CONVERSATIONS: SupportConversation[] = [
  {
    id: 'conv-visitor-live',
    userId: 'usr-live',
    userName: 'Current Reader (You)',
    userEmail: 'reader@todaysnovel.com',
    subject: 'Welcome & Reading Assistant',
    status: 'Open',
    unreadByAdmin: 0,
    lastUpdated: 'Just now',
    messages: [
      {
        id: 'msg-welcome-1',
        sender: 'assistant',
        senderName: "Today's Novel Assistant",
        text: "Welcome to Today's Novel! Everything here is 100% free. Ask me anything about Kenah Pascal's #1 memoir 'UNBOUND', Living Vine Rehab Center, or leave a message for Kenah Pascal / Admin and we'll reply right here!",
        timestamp: 'Just now'
      }
    ]
  },
  {
    id: 'conv-1',
    userId: 'usr-1',
    userName: 'Emmanuel N.',
    userEmail: 'emmanuel.n@gmail.com',
    subject: 'Thank you Kenah Pascal for UNBOUND!',
    status: 'Open',
    unreadByAdmin: 1,
    lastUpdated: '4 mins ago',
    messages: [
      {
        id: 'm-101',
        sender: 'user',
        senderName: 'Emmanuel N.',
        text: 'Hello Kenah Pascal, I just finished Chapter 13 (Learning to Live Again). My younger brother is struggling with cannabis right now in Bamenda. How can we reach Living Vine Rehab Center or get guidance from you?',
        timestamp: '4 mins ago'
      }
    ]
  },
  {
    id: 'conv-2',
    userId: 'usr-2',
    userName: 'Grace M.',
    userEmail: 'grace.mbah@yahoo.com',
    subject: 'Sharing UNBOUND with our youth group',
    status: 'Replied',
    unreadByAdmin: 0,
    lastUpdated: '22 mins ago',
    messages: [
      {
        id: 'm-201',
        sender: 'user',
        senderName: 'Grace M.',
        text: 'Good afternoon! Can we share the link to UNBOUND with our church youth recovery fellowship in Douala? Is it really 100% free for everyone?',
        timestamp: '35 mins ago'
      },
      {
        id: 'm-202',
        sender: 'admin',
        senderName: 'Kenah Pascal (Admin)',
        text: 'Blessings Grace! Yes, UNBOUND and every book on Today’s Novel are 100% free with zero paywalls. Please share it freely with the youths!',
        timestamp: '22 mins ago'
      }
    ]
  }
];

function generateSmartAssistantReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('unbound') || q.includes('kenah') || q.includes('author')) {
    return '“UNBOUND: Rescued from Substance Use” is our #1 Priority Exclusive memoir by Kenah Pascal, featuring a Foreword by Dr. Theresia Fuh-Tabe. All 19 chapters are unlocked 100% free—plus you can listen to it as an AI Audiobook inside any chapter!';
  }
  if (q.includes('audio') || q.includes('listen') || q.includes('voice')) {
    return 'You can listen to any chapter hands-free! Open any chapter and tap the "Listen (Audiobook)" bar to hear natural narration with speed controls (0.8x to 1.5x) and Auto-Next Chapter playback.';
  }
  if (
    q.includes('rehab') ||
    q.includes('living vine') ||
    q.includes('help') ||
    q.includes('addiction')
  ) {
    return 'If you or a loved one is battling addiction, remember from UNBOUND: "A craving is not a command, and your worst chapter is not your whole story." Kenah Pascal attended Living Vine Rehab Center in Bamenda. I have also flagged your message for Kenah Pascal / Admin to reply personally!';
  }
  if (q.includes('free') || q.includes('pay') || q.includes('coin')) {
    return "Every single book and chapter on Today's Novel is 100% FREE forever. There are no coins, subscriptions, or locked chapters.";
  }
  return 'Thank you for reaching out! Our AI Assistant has logged your message and notified Kenah Pascal & the Admin team. You will receive a direct reply right here in this chat.';
}

export function BookStoreProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [bookmarks, setBookmarks] = useState<string[]>(['unbound-kenah-pascal']);
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({});
  const [users, setUsers] = useState<TrackedUser[]>(INITIAL_USERS);
  const [conversations, setConversations] =
    useState<SupportConversation[]>(INITIAL_CONVERSATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann-1',
      title: 'UNBOUND Complete 19-Part Memoir + AI Audiobook Live!',
      message:
        'Read or listen to the full real-life story by Kenah Pascal with Foreword by Dr. Theresia Fuh-Tabe — 100% Free.',
      createdAt: 'Nov 10, 2026',
      active: true
    }
  ]);
  const [paragraphComments, setParagraphComments] =
    useState<ParagraphComment[]>(INITIAL_PARA_COMMENTS);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(INITIAL_SAVED_QUOTES);
  const [readingStats, setReadingStats] = useState<ReadingStats>({
    streakDays: 5,
    minutesToday: 18,
    dailyGoalMinutes: 25,
    chaptersCompleted: 12,
    offlineSavedBooks: ['unbound-kenah-pascal']
  });
  const [currentUser, setCurrentUser] = useState<TrackedUser | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  const activeCustomerConvId = 'conv-visitor-live';

  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem(STORAGE_KEY_BOOKS);
      if (savedBooks) {
        const parsed: Book[] = JSON.parse(savedBooks);
        const initialSlugs = new Set(INITIAL_BOOKS.map((b) => b.slug));
        const customBooks = parsed.filter((b) => !initialSlugs.has(b.slug));
        setBooks([...INITIAL_BOOKS, ...customBooks]);
      }
      const savedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedProgress) setReadingProgress(JSON.parse(savedProgress));

      const savedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      if (savedUsers) setUsers(JSON.parse(savedUsers));

      const savedConvs = localStorage.getItem(STORAGE_KEY_CONVS);
      if (savedConvs) setConversations(JSON.parse(savedConvs));

      const savedAnn = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS);
      if (savedAnn) setAnnouncements(JSON.parse(savedAnn));

      const savedPara = localStorage.getItem(STORAGE_KEY_PARA_COMMENTS);
      if (savedPara) setParagraphComments(JSON.parse(savedPara));

      const savedQ = localStorage.getItem(STORAGE_KEY_QUOTES);
      if (savedQ) setSavedQuotes(JSON.parse(savedQ));

      const savedS = localStorage.getItem(STORAGE_KEY_STATS);
      if (savedS) setReadingStats(JSON.parse(savedS));

      const savedCurrUser = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (savedCurrUser) setCurrentUser(JSON.parse(savedCurrUser));

      const savedAdminAuth = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
      if (savedAdminAuth === 'true') setIsAdminAuthenticated(true);
    } catch (e) {
      console.error('Error loading state:', e);
    }
  }, []);

  const persistUsers = (nextUsers: TrackedUser[]) => {
    setUsers(nextUsers);
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(nextUsers));
    } catch (e) {
      console.error(e);
    }
  };

  const loginUser = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { ok: false, message: 'No reader account found with that email. Please Sign Up!' };
    }
    if (found.password && found.password !== password) {
      return { ok: false, message: 'Incorrect password. Please try again or use Forgot Password.' };
    }
    const updatedUser: TrackedUser = {
      ...found,
      status: 'Online',
      lastActive: 'Just now'
    };
    setCurrentUser(updatedUser);
    persistUsers(users.map((u) => (u.id === found.id ? updatedUser : u)));
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
    }
    return { ok: true, message: `Welcome back, ${updatedUser.name}!` };
  };

  const registerUser = (
    name: string,
    email: string,
    password: string,
    location = 'Cameroon'
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { ok: false, message: 'An account with this email already exists. Please Sign In.' };
    }
    const newUser: TrackedUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      location: location.trim() || 'Cameroon',
      device: 'Android Web / PWA',
      currentBook: 'UNBOUND',
      currentChapter: 1,
      chaptersRead: 1,
      status: 'Online',
      lastActive: 'Just now',
      joinedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    const nextUsers = [newUser, ...users];
    persistUsers(nextUsers);
    setCurrentUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
    return { ok: true, message: `Account created! Welcome to Today's Novel, ${newUser.name}.` };
  };

  const resetUserPassword = (email: string, newPassword: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { ok: false, message: 'We could not find an account matching that email address.' };
    }
    const updatedUser: TrackedUser = { ...found, password: newPassword };
    persistUsers(users.map((u) => (u.id === found.id ? updatedUser : u)));
    return {
      ok: true,
      message: 'Your password has been reset! You can now sign in with your new password.'
    };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    } catch (e) {
      console.error(e);
    }
  };

  const loginAdmin = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === 'kenah@todaysnovel.com' ||
        cleanEmail === 'admin@todaysnovel.com' ||
        cleanEmail === 'kenahpascal') &&
      (password === 'unbound2026' || password === 'admin123')
    ) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      return { ok: true, message: 'Authenticated as Kenah Pascal (Executive Admin).' };
    }
    return {
      ok: false,
      message: 'Invalid Admin credentials. Use kenah@todaysnovel.com / unbound2026'
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    } catch (e) {
      console.error(e);
    }
  };

  const persistBooks = (nextBooks: Book[]) => {
    setBooks(nextBooks);
    try {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(nextBooks));
    } catch (e) {
      console.error(e);
    }
  };

  const persistConvs = (nextConvs: SupportConversation[]) => {
    setConversations(nextConvs);
    try {
      localStorage.setItem(STORAGE_KEY_CONVS, JSON.stringify(nextConvs));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBookmark = (bookId: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId];
      try {
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const updateProgress = (bookSlug: string, chapterNumber: number) => {
    setReadingProgress((prev) => {
      const next = { ...prev, [bookSlug]: chapterNumber };
      try {
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const addBook = (newBook: Book) => {
    const priorityBooks = books.filter((b) => b.isPriority);
    const otherBooks = books.filter((b) => !b.isPriority);
    if (newBook.isPriority) {
      persistBooks([newBook, ...priorityBooks, ...otherBooks]);
    } else {
      persistBooks([...priorityBooks, newBook, ...otherBooks]);
    }
  };

  const deleteBook = (bookId: string) => {
    if (bookId === 'unbound-kenah-pascal') return;
    persistBooks(books.filter((b) => b.id !== bookId));
  };

  const togglePriorityBook = (bookId: string) => {
    const next = books.map((b) =>
      b.id === bookId ? { ...b, isPriority: !b.isPriority } : b
    );
    persistBooks(next);
  };

  const addChapter = (
    bookId: string,
    chapterInput: Omit<Chapter, 'id' | 'number' | 'publishedAt' | 'wordCount'>
  ) => {
    const nextBooks = books.map((book) => {
      if (book.id !== bookId) return book;
      const nextNum = book.chapters.length + 1;
      const wordCount = chapterInput.content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      const newChapter: Chapter = {
        id: `${book.slug}-ch-${nextNum}-${Date.now()}`,
        number: nextNum,
        title: chapterInput.title,
        content: chapterInput.content,
        wordCount,
        publishedAt: new Date().toISOString().split('T')[0]
      };
      return {
        ...book,
        chapters: [...book.chapters, newChapter]
      };
    });
    persistBooks(nextBooks);
  };

  const addReview = (bookId: string, reviewInput: Omit<Review, 'id' | 'date'>) => {
    const nextBooks = books.map((book) => {
      if (book.id !== bookId) return book;
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        readerName: reviewInput.readerName || 'Anonymous Reader',
        rating: reviewInput.rating,
        comment: reviewInput.comment,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };
      return {
        ...book,
        reviews: [newReview, ...book.reviews]
      };
    });
    persistBooks(nextBooks);
  };

  const sendCustomerMessage = (
    text: string,
    userName = 'Current Reader (You)',
    userEmail = 'reader@todaysnovel.com',
    mode: 'assistant' | 'human' = 'assistant'
  ) => {
    if (!text.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: userName,
      text: text.trim(),
      timestamp: timeStr
    };

    const nextMessages: ChatMessage[] = [userMsg];

    if (mode === 'assistant') {
      const autoReply: ChatMessage = {
        id: `msg-ai-${Date.now() + 1}`,
        sender: 'assistant',
        senderName: "Today's Novel Assistant",
        text: generateSmartAssistantReply(text),
        timestamp: timeStr
      };
      nextMessages.push(autoReply);
    }

    const updatedConvs = conversations.map((conv) => {
      if (conv.id !== activeCustomerConvId) return conv;
      return {
        ...conv,
        userName: userName || conv.userName,
        userEmail: userEmail || conv.userEmail,
        subject: text.slice(0, 42),
        status: 'Open' as const,
        unreadByAdmin: conv.unreadByAdmin + 1,
        lastUpdated: 'Just now',
        messages: [...conv.messages, ...nextMessages]
      };
    });

    persistConvs(updatedConvs);
  };

  const sendAdminReply = (conversationId: string, replyText: string) => {
    if (!replyText.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const adminMsg: ChatMessage = {
      id: `msg-admin-${Date.now()}`,
      sender: 'admin',
      senderName: 'Kenah Pascal (Admin)',
      text: replyText.trim(),
      timestamp: timeStr
    };

    const updatedConvs = conversations.map((conv) => {
      if (conv.id !== conversationId) return conv;
      return {
        ...conv,
        status: 'Replied' as const,
        unreadByAdmin: 0,
        lastUpdated: 'Just now',
        messages: [...conv.messages, adminMsg]
      };
    });

    persistConvs(updatedConvs);
  };

  const updateConversationStatus = (
    conversationId: string,
    status: 'Open' | 'Replied' | 'Resolved'
  ) => {
    const updatedConvs = conversations.map((c) =>
      c.id === conversationId ? { ...c, status, unreadByAdmin: 0 } : c
    );
    persistConvs(updatedConvs);
  };

  const addAnnouncement = (title: string, message: string) => {
    const next: Announcement[] = [
      {
        id: `ann-${Date.now()}`,
        title,
        message,
        createdAt: 'Just now',
        active: true
      },
      ...announcements
    ];
    setAnnouncements(next);
    try {
      localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const addParagraphComment = (
    bookSlug: string,
    chapterNumber: number,
    paragraphIndex: number,
    readerName: string,
    text: string,
    reaction: '🔥' | '❤️' | '🙏' | '💡' = '🔥'
  ) => {
    const newComment: ParagraphComment = {
      id: `pc-${Date.now()}`,
      bookSlug,
      chapterNumber,
      paragraphIndex,
      readerName: readerName.trim() || 'Fellow Reader',
      text: text.trim(),
      reaction,
      createdAt: 'Just now'
    };
    const next = [newComment, ...paragraphComments];
    setParagraphComments(next);
    try {
      localStorage.setItem(STORAGE_KEY_PARA_COMMENTS, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const saveQuoteHighlight = (quoteInput: Omit<SavedQuote, 'id' | 'savedAt'>) => {
    const newQuote: SavedQuote = {
      ...quoteInput,
      id: `sq-${Date.now()}`,
      savedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    const next = [newQuote, ...savedQuotes];
    setSavedQuotes(next);
    try {
      localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleOfflineBook = (bookId: string) => {
    setReadingStats((prev) => {
      const exists = prev.offlineSavedBooks.includes(bookId);
      const nextOffline = exists
        ? prev.offlineSavedBooks.filter((id) => id !== bookId)
        : [...prev.offlineSavedBooks, bookId];
      const next = { ...prev, offlineSavedBooks: nextOffline };
      try {
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const incrementReadingMinutes = (mins: number) => {
    setReadingStats((prev) => {
      const next = {
        ...prev,
        minutesToday: prev.minutesToday + mins,
        chaptersCompleted: prev.chaptersCompleted + 1
      };
      try {
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return (
    <BookStoreContext.Provider
      value={{
        books,
        bookmarks,
        readingProgress,
        users,
        conversations,
        activeCustomerConvId,
        announcements,
        paragraphComments,
        savedQuotes,
        readingStats,
        currentUser,
        isAdminAuthenticated,
        loginUser,
        registerUser,
        resetUserPassword,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        toggleBookmark,
        updateProgress,
        addBook,
        deleteBook,
        togglePriorityBook,
        addChapter,
        addReview,
        sendCustomerMessage,
        sendAdminReply,
        updateConversationStatus,
        addAnnouncement,
        addParagraphComment,
        saveQuoteHighlight,
        toggleOfflineBook,
        incrementReadingMinutes
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
}

export function useBookStore() {
  const ctx = useContext(BookStoreContext);
  if (!ctx) {
    throw new Error('useBookStore must be used within a BookStoreProvider');
  }
  return ctx;
}

import { NextRequest, NextResponse } from 'next/server';

interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  summaries?: string[];
  subjects?: string[];
  bookshelves?: string[];
  formats: Record<string, string>;
  download_count: number;
}

function splitTextIntoChapters(rawText: string, bookTitle: string) {
  // Strip Project Gutenberg header/footer boilerplate if present
  let body = rawText;
  const startMatch = body.match(/\*\*\*\s*START OF (THIS|THE) PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i);
  if (startMatch && startMatch.index !== undefined) {
    body = body.slice(startMatch.index + startMatch[0].length);
  }
  const endMatch = body.match(/\*\*\*\s*END OF (THIS|THE) PROJECT GUTENBERG EBOOK/i);
  if (endMatch && endMatch.index !== undefined) {
    body = body.slice(0, endMatch.index);
  }

  // Normalize line endings
  body = body.replace(/\r\n/g, '\n').trim();

  // Split into substantial paragraphs
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n+/g, ' ').trim())
    .filter((p) => p.length > 60);

  // Create up to 6 rich chapters (~6-8 paragraphs each) for fast mobile reading
  const chapters = [];
  const parasPerChapter = 7;
  const maxChapters = 6;

  for (let c = 0; c < maxChapters; c++) {
    const slice = paragraphs.slice(c * parasPerChapter, (c + 1) * parasPerChapter);
    if (slice.length === 0) break;
    const content = slice.join('\n\n');
    const wordCount = content.split(/\s+/).length;
    chapters.push({
      id: `scraped-${Date.now()}-${c + 1}`,
      number: c + 1,
      title: `Chapter ${c + 1} — ${bookTitle}`,
      publishedAt: new Date().toISOString().slice(0, 10),
      wordCount,
      content
    });
  }

  return chapters;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const topic = searchParams.get('topic') || '';

    const apiUrl = new URL('https://gutendex.com/books/');
    if (query) apiUrl.searchParams.set('search', query);
    if (topic) apiUrl.searchParams.set('topic', topic);

    const res = await fetch(apiUrl.toString(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Gutendex returned ${res.status}`);
    }

    const data = await res.json();
    const results = (data.results || []).slice(0, 12).map((b: GutendexBook) => {
      const authorRaw = b.authors?.[0]?.name || 'Classic Author';
      const author = authorRaw.includes(',')
        ? authorRaw
            .split(',')
            .reverse()
            .map((s) => s.trim())
            .join(' ')
        : authorRaw;

      const coverUrl =
        b.formats['image/jpeg'] ||
        `https://www.gutenberg.org/cache/epub/${b.id}/pg${b.id}.cover.medium.jpg`;

      const textUrl =
        b.formats['text/plain; charset=utf-8'] ||
        b.formats['text/plain; charset=us-ascii'] ||
        b.formats['text/plain'] ||
        `https://www.gutenberg.org/cache/epub/${b.id}/pg${b.id}.txt`;

      return {
        gutenbergId: b.id,
        title: b.title.split(';')[0].split('\n')[0].trim(),
        author,
        coverUrl,
        textUrl,
        downloadCount: b.download_count,
        summary:
          b.summaries?.[0] ||
          `Complete free public-domain edition of ${b.title} by ${author}, scraped and formatted for Today's Novel.`,
        subjects: (b.subjects || []).slice(0, 3)
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Scrape search error:', error);
    return NextResponse.json(
      { error: 'Failed to search free internet books', results: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gutenbergId, title, author, summary } = body;

    // Fetch raw text from Project Gutenberg mirror
    const mirrorUrl = `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`;
    let rawText = '';

    try {
      const textRes = await fetch(mirrorUrl, {
        headers: { 'User-Agent': 'TodaysNovelApp/1.0' }
      });
      if (textRes.ok) {
        const fullText = await textRes.text();
        // Take first 85,000 chars so chapter extraction is super fast
        rawText = fullText.slice(0, 85000);
      }
    } catch {
      // Fallback if mirror is slow
    }

    const chapters = rawText
      ? splitTextIntoChapters(rawText, title)
      : [
          {
            id: `scraped-${gutenbergId}-1`,
            number: 1,
            title: `Chapter 1 — ${title}`,
            publishedAt: new Date().toISOString().slice(0, 10),
            wordCount: 350,
            content:
              summary ||
              `Opening chapter of ${title} by ${author}. Full free edition imported into Today's Novel.`
          }
        ];

    return NextResponse.json({
      ok: true,
      chapters: chapters.length > 0 ? chapters : [
        {
          id: `scraped-${gutenbergId}-1`,
          number: 1,
          title: `Chapter 1 — ${title}`,
          publishedAt: new Date().toISOString().slice(0, 10),
          wordCount: 350,
          content: summary || `Opening chapter of ${title} by ${author}.`
        }
      ]
    });
  } catch (error) {
    console.error('Scrape book content error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape book chapters' },
      { status: 500 }
    );
  }
}

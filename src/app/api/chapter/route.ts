import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const chapterNum = Number(searchParams.get('chapter') || 1);

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const filePath = path.join(
      process.cwd(),
      'src',
      'data',
      'chapters',
      `${slug}.json`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Chapter file not found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const chapters = JSON.parse(fileContent);
    const chapter =
      chapters.find((c: { number: number }) => c.number === chapterNum) ||
      chapters[0];

    return NextResponse.json({
      ok: true,
      totalChapters: chapters.length,
      chapter
    });
  } catch (error) {
    console.error('Error serving complete chapter:', error);
    return NextResponse.json(
      { error: 'Failed to load complete chapter' },
      { status: 500 }
    );
  }
}

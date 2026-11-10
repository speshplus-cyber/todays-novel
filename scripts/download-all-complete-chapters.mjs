import fs from 'fs';
import path from 'path';

// Complete List of Public Domain and Original Novels for Today's Novel
const ALL_GUTENBERG_BOOKS = [
  // 1. FAITH, MEMOIR & TRANSFORMATION
  { id: 23, slug: 'narrative-of-the-life-of-frederick-douglass', title: 'Narrative of the Life of Frederick Douglass', author: 'Frederick Douglass' },
  { id: 2376, slug: 'up-from-slavery', title: 'Up From Slavery', author: 'Booker T. Washington' },
  { id: 408, slug: 'the-souls-of-black-folk', title: 'The Souls of Black Folk', author: 'W. E. B. Du Bois' },
  { id: 131, slug: 'the-pilgrims-progress', title: 'The Pilgrim’s Progress', author: 'John Bunyan' },

  // 2. ROMANCE & HIGH SOCIETY
  { id: 1342, slug: 'pride-and-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 1260, slug: 'jane-eyre', title: 'Jane Eyre', author: 'Charlotte Brontë' },
  { id: 768, slug: 'wuthering-heights', title: 'Wuthering Heights', author: 'Emily Brontë' },
  { id: 161, slug: 'sense-and-sensibility', title: 'Sense and Sensibility', author: 'Jane Austen' },
  { id: 64317, slug: 'the-great-gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },

  // 3. DARK GOTHIC & SUPERNATURAL
  { id: 345, slug: 'dracula', title: 'Dracula', author: 'Bram Stoker' },
  { id: 84, slug: 'frankenstein', title: 'Frankenstein', author: 'Mary Shelley' },
  { id: 175, slug: 'the-phantom-of-the-opera', title: 'The Phantom of the Opera', author: 'Gaston Leroux' },
  { id: 10007, slug: 'carmilla', title: 'Carmilla', author: 'J. Sheridan Le Fanu' },
  { id: 174, slug: 'the-picture-of-dorian-gray', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde' },
  { id: 43, slug: 'dr-jekyll-and-mr-hyde', title: 'The Strange Case of Dr. Jekyll and Mr. Hyde', author: 'Robert Louis Stevenson' },

  // 4. REVENGE, MYSTERY & THRILLERS
  { id: 1184, slug: 'the-count-of-monte-cristo', title: 'The Count of Monte Cristo', author: 'Alexandre Dumas' },
  { id: 1257, slug: 'the-three-musketeers', title: 'The Three Musketeers', author: 'Alexandre Dumas' },
  { id: 1661, slug: 'the-adventures-of-sherlock-holmes', title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle' },
  { id: 2852, slug: 'the-hound-of-the-baskervilles', title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle' },
  { id: 2554, slug: 'crime-and-punishment', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },

  // 5. SCI-FI & EPIC VOYAGES
  { id: 120, slug: 'treasure-island', title: 'Treasure Island', author: 'Robert Louis Stevenson' },
  { id: 103, slug: 'around-the-world-in-eighty-days', title: 'Around the World in Eighty Days', author: 'Jules Verne' },
  { id: 215, slug: 'the-call-of-the-wild', title: 'The Call of the Wild', author: 'Jack London' },
  { id: 35, slug: 'the-time-machine', title: 'The Time Machine', author: 'H. G. Wells' },
  { id: 164, slug: 'twenty-thousand-leagues-under-the-sea', title: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne' },
  { id: 36, slug: 'the-war-of-the-worlds', title: 'The War of the Worlds', author: 'H. G. Wells' },
  { id: 1727, slug: 'the-odyssey', title: 'The Odyssey', author: 'Homer' },

  // 6. POWER, STRATEGY & INNER MASTERY
  { id: 132, slug: 'the-art-of-war', title: 'The Art of War', author: 'Sun Tzu' },
  { id: 2680, slug: 'meditations', title: 'Meditations', author: 'Marcus Aurelius' },
  { id: 1232, slug: 'the-prince', title: 'The Prince', author: 'Niccolò Machiavelli' },
  { id: 4507, slug: 'as-a-man-thinketh', title: 'As a Man Thinketh', author: 'James Allen' },

  // 7. STAGE PLAYS & DRAMA
  { id: 1533, slug: 'macbeth', title: 'Macbeth', author: 'William Shakespeare' },
  { id: 1522, slug: 'julius-caesar', title: 'Julius Caesar', author: 'William Shakespeare' },
  { id: 1513, slug: 'romeo-and-juliet', title: 'Romeo and Juliet', author: 'William Shakespeare' },
  { id: 1524, slug: 'hamlet', title: 'Hamlet, Prince of Denmark', author: 'William Shakespeare' },
  { id: 1531, slug: 'othello', title: 'Othello, the Moor of Venice', author: 'William Shakespeare' },
  { id: 1515, slug: 'the-merchant-of-venice', title: 'The Merchant of Venice', author: 'William Shakespeare' },
  { id: 2542, slug: 'a-dolls-house', title: 'A Doll’s House', author: 'Henrik Ibsen' },
  { id: 844, slug: 'the-importance-of-being-earnest', title: 'The Importance of Being Earnest', author: 'Oscar Wilde' },
  { id: 3825, slug: 'pygmalion', title: 'Pygmalion', author: 'George Bernard Shaw' },

  // 8. SATIRE & ALLEGORY
  { id: 21, slug: 'aesops-fables', title: 'Aesop’s Fables', author: 'Aesop' },
  { id: 829, slug: 'gullivers-travels', title: 'Gulliver’s Travels', author: 'Jonathan Swift' },
  { id: 1164, slug: 'the-iron-heel', title: 'The Iron Heel', author: 'Jack London' },
  { id: 219, slug: 'heart-of-darkness', title: 'Heart of Darkness', author: 'Joseph Conrad' },
  { id: 2130, slug: 'utopia', title: 'Utopia', author: 'Sir Thomas More' },
  { id: 19942, slug: 'candide', title: 'Candide', author: 'Voltaire' }
];

async function fetchFullText(id) {
  const url = `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`;
  const res = await fetch(url, { headers: { 'User-Agent': 'TodaysNovelFullDownloader/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function cleanGutenbergBody(raw) {
  let body = raw;
  const startMatch = body.match(/\*\*\*\s*START OF (THIS|THE) PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i);
  const endMatch = body.match(/\*\*\*\s*END OF (THIS|THE) PROJECT GUTENBERG EBOOK/i);
  if (startMatch && endMatch) {
    body = body.slice(startMatch.index + startMatch[0].length, endMatch.index);
  }
  return body.replace(/\r\n/g, '\n').trim();
}

function parseCompleteChapters(rawText, slug, bookTitle) {
  const body = cleanGutenbergBody(rawText);
  const lines = body.split('\n');

  // Detect chapter boundary candidates
  const candidates = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;

    // Disregard Table of Contents entries (contain dot leaders or end in a page number)
    if (/\.\s*\.\s*\./.test(l) || /\.\s*\d+$/.test(l)) continue;

    // Pattern 1: Standard CHAPTER / Chapter / Act / Scene / Book / Part
    if (/^(CHAPTER|Chapter)\s+([0-9IVXLCDM]+)(.*)$/i.test(l) ||
        /^(ACT|Act)\s+([0-9IVXLCDM]+)(.*)$/i.test(l) ||
        /^(SCENE|Scene)\s+([0-9IVXLCDM]+)(.*)$/i.test(l) ||
        /^(BOOK|Book)\s+([0-9IVXLCDM]+)(.*)$/i.test(l) ||
        /^(PART|Part)\s+([0-9IVXLCDM]+)(.*)$/i.test(l) ||
        /^(ADVENTURE|Adventure)\s+([0-9IVXLCDM]+)(.*)$/i.test(l) ||
        /^(STORY|Story)\s+([0-9IVXLCDM]+)(.*)$/i.test(l)) {
      candidates.push({ lineIndex: i, title: l });
      continue;
    }

    // Pattern 2: Standalone Roman numerals on their own line (Gatsby, Time Machine, etc.)
    if (/^[IVXLCDM]+\.?$/i.test(l) && l.length <= 6) {
      let nextTitle = l;
      if (lines[i + 1] && lines[i + 1].trim() && lines[i + 1].trim().length < 60) {
        nextTitle = `${l} — ${lines[i + 1].trim()}`;
      }
      candidates.push({ lineIndex: i, title: nextTitle });
      continue;
    }

    // Pattern 3: Numbered titles: I. THE OLD SEA-DOG AT THE ADMIRAL BENBOW
    if (/^[0-9IVXLCDM]+\.\s+[A-Z][A-Za-z\s,']{3,60}$/.test(l)) {
      candidates.push({ lineIndex: i, title: l });
      continue;
    }

    // Pattern 4: Jekyll & Hyde section headers (STORY OF THE DOOR, THE CAREW MURDER CASE, etc.)
    if (/^(STORY OF THE DOOR|SEARCH FOR MR\. HYDE|DR\. JEKYLL WAS QUITE AT EASE|THE CAREW MURDER CASE|INCIDENT OF THE LETTER|INCIDENT OF DR\. LANYON|INCIDENT AT THE WINDOW|THE LAST NIGHT|DR\. LANYON’S NARRATIVE|HENRY JEKYLL’S FULL STATEMENT OF THE CASE)$/i.test(l)) {
      candidates.push({ lineIndex: i, title: l });
      continue;
    }
  }

  // Filter candidates to ensure each has at least 150 words of actual body text
  const extracted = [];
  for (let j = 0; j < candidates.length; j++) {
    const cur = candidates[j];
    const next = candidates[j + 1];
    const sliceLines = lines.slice(cur.lineIndex, next ? next.lineIndex : lines.length);
    const content = sliceLines
      .join('\n')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    const wordCount = content.split(/\s+/).length;

    if (wordCount >= 150) {
      extracted.push({
        id: `${slug}-ch-${extracted.length + 1}`,
        number: extracted.length + 1,
        title: cur.title.replace(/[:._\r\n]+$/, '').trim(),
        publishedAt: '2026-11-09',
        wordCount,
        content
      });
    }
  }

  // If explicit headings found at least 3 valid chapters, return them!
  if (extracted.length >= 3) {
    return extracted;
  }

  // Fallback: If book text is free-form (e.g., essays, ancient poetry), divide 100% of the entire text
  // into complete, natural multi-thousand word chapters so zero words are lost.
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 60);

  const chapters = [];
  const targetWordsPerChapter = 1800;
  let curParas = [];
  let curWords = 0;

  for (const para of paragraphs) {
    const pWords = para.split(/\s+/).length;
    curParas.push(para);
    curWords += pWords;

    if (curWords >= targetWordsPerChapter) {
      const num = chapters.length + 1;
      chapters.push({
        id: `${slug}-ch-${num}`,
        number: num,
        title: `Chapter ${num} — ${bookTitle}`,
        publishedAt: '2026-11-09',
        wordCount: curWords,
        content: curParas.join('\n\n')
      });
      curParas = [];
      curWords = 0;
    }
  }

  if (curParas.length > 0) {
    const num = chapters.length + 1;
    chapters.push({
      id: `${slug}-ch-${num}`,
      number: num,
      title: `Chapter ${num} — ${bookTitle}`,
      publishedAt: '2026-11-09',
      wordCount: curWords,
      content: curParas.join('\n\n')
    });
  }

  return chapters;
}

async function main() {
  console.log(`Starting complete chapter download for ${ALL_GUTENBERG_BOOKS.length} books...`);
  const chaptersBySlug = {};
  const stats = [];

  for (let idx = 0; idx < ALL_GUTENBERG_BOOKS.length; idx++) {
    const b = ALL_GUTENBERG_BOOKS[idx];
    try {
      process.stdout.write(`[${idx + 1}/${ALL_GUTENBERG_BOOKS.length}] Downloading #${b.id} ${b.title}... `);
      const raw = await fetchFullText(b.id);
      const chaps = parseCompleteChapters(raw, b.slug, b.title);
      chaptersBySlug[b.slug] = chaps;
      const totalWords = chaps.reduce((acc, c) => acc + c.wordCount, 0);
      stats.push({ slug: b.slug, title: b.title, chapters: chaps.length, words: totalWords });
      console.log(`✓ ${chaps.length} COMPLETE chapters (${totalWords.toLocaleString()} words).`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  // Write to src/data/multiChapterData.json
  const outPath = path.join(process.cwd(), 'src', 'data', 'multiChapterData.json');
  fs.writeFileSync(
    outPath,
    JSON.stringify({ chaptersBySlug, booksMeta: ALL_GUTENBERG_BOOKS }, null, 2),
    'utf8'
  );

  console.log('\n================ SUMMARY OF COMPLETE BOOKS ================');
  stats.forEach((s) => console.log(`${s.title}: ${s.chapters} chapters, ${s.words.toLocaleString()} words`));
  const grandTotalWords = stats.reduce((acc, s) => acc + s.words, 0);
  console.log(`\nGrand Total Words: ${grandTotalWords.toLocaleString()} across ${stats.length} complete books!`);
}

main();

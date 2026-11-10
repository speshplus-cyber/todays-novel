import fs from 'fs';
import path from 'path';

const GUTENBERG_BOOKS = [
  // Existing 31 Classics (12 chapters each)
  { id: 1342, slug: 'pride-and-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', collectionId: 'col-romance-billionaire', views: '412K', rating: 4.9 },
  { id: 1184, slug: 'the-count-of-monte-cristo', title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genre: 'Drama', collectionId: 'col-revenge-mystery', views: '530K', rating: 5.0 },
  { id: 23, slug: 'narrative-of-the-life-of-frederick-douglass', title: 'Narrative of the Life of Frederick Douglass', author: 'Frederick Douglass', genre: 'Memoir & Faith', collectionId: 'col-faith-memoir', views: '310K', rating: 5.0 },
  { id: 2376, slug: 'up-from-slavery', title: 'Up From Slavery', author: 'Booker T. Washington', genre: 'Memoir & Faith', collectionId: 'col-faith-memoir', views: '245K', rating: 4.9 },
  { id: 408, slug: 'the-souls-of-black-folk', title: 'The Souls of Black Folk', author: 'W. E. B. Du Bois', genre: 'Memoir & Faith', collectionId: 'col-faith-memoir', views: '198K', rating: 4.9 },
  { id: 345, slug: 'dracula', title: 'Dracula', author: 'Bram Stoker', genre: 'Fantasy', collectionId: 'col-dark-supernatural', views: '420K', rating: 4.9 },
  { id: 84, slug: 'frankenstein', title: 'Frankenstein', author: 'Mary Shelley', genre: 'Fantasy', collectionId: 'col-dark-supernatural', views: '365K', rating: 4.8 },
  { id: 174, slug: 'the-picture-of-dorian-gray', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Drama', collectionId: 'col-dark-supernatural', views: '290K', rating: 4.9 },
  { id: 43, slug: 'dr-jekyll-and-mr-hyde', title: 'The Strange Case of Dr. Jekyll and Mr. Hyde', author: 'Robert Louis Stevenson', genre: 'Drama', collectionId: 'col-dark-supernatural', views: '215K', rating: 4.8 },
  { id: 1260, slug: 'jane-eyre', title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Romance', collectionId: 'col-romance-billionaire', views: '340K', rating: 4.9 },
  { id: 768, slug: 'wuthering-heights', title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Romance', collectionId: 'col-romance-billionaire', views: '275K', rating: 4.8 },
  { id: 64317, slug: 'the-great-gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Billionaire', collectionId: 'col-romance-billionaire', views: '490K', rating: 4.9 },
  { id: 1661, slug: 'the-adventures-of-sherlock-holmes', title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', genre: 'Drama', collectionId: 'col-revenge-mystery', views: '430K', rating: 5.0 },
  { id: 2852, slug: 'the-hound-of-the-baskervilles', title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', genre: 'Drama', collectionId: 'col-revenge-mystery', views: '260K', rating: 4.9 },
  { id: 2554, slug: 'crime-and-punishment', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Drama', collectionId: 'col-revenge-mystery', views: '380K', rating: 4.9 },
  { id: 35, slug: 'the-time-machine', title: 'The Time Machine', author: 'H. G. Wells', genre: 'Fantasy', collectionId: 'col-scifi-voyages', views: '295K', rating: 4.8 },
  { id: 164, slug: 'twenty-thousand-leagues-under-the-sea', title: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne', genre: 'Fantasy', collectionId: 'col-scifi-voyages', views: '270K', rating: 4.9 },
  { id: 36, slug: 'the-war-of-the-worlds', title: 'The War of the Worlds', author: 'H. G. Wells', genre: 'Fantasy', collectionId: 'col-scifi-voyages', views: '250K', rating: 4.8 },
  { id: 1727, slug: 'the-odyssey', title: 'The Odyssey', author: 'Homer', genre: 'Fantasy', collectionId: 'col-scifi-voyages', views: '330K', rating: 4.9 },
  { id: 132, slug: 'the-art-of-war', title: 'The Art of War', author: 'Sun Tzu', genre: 'Drama', collectionId: 'col-power-wisdom', views: '510K', rating: 5.0 },
  { id: 2680, slug: 'meditations', title: 'Meditations', author: 'Marcus Aurelius', genre: 'Memoir & Faith', collectionId: 'col-power-wisdom', views: '460K', rating: 5.0 },
  { id: 1232, slug: 'the-prince', title: 'The Prince', author: 'Niccolò Machiavelli', genre: 'Drama', collectionId: 'col-power-wisdom', views: '310K', rating: 4.8 },
  { id: 4507, slug: 'as-a-man-thinketh', title: 'As a Man Thinketh', author: 'James Allen', genre: 'Memoir & Faith', collectionId: 'col-power-wisdom', views: '390K', rating: 5.0 },
  { id: 120, slug: 'treasure-island', title: 'Treasure Island', author: 'Robert Louis Stevenson', genre: 'Fantasy', collectionId: 'col-scifi-voyages', views: '405K', rating: 4.9 },
  { id: 1257, slug: 'the-three-musketeers', title: 'The Three Musketeers', author: 'Alexandre Dumas', genre: 'Drama', collectionId: 'col-revenge-mystery', views: '375K', rating: 4.9 },
  { id: 175, slug: 'the-phantom-of-the-opera', title: 'The Phantom of the Opera', author: 'Gaston Leroux', genre: 'Romance', collectionId: 'col-dark-supernatural', views: '355K', rating: 4.9 },
  { id: 103, slug: 'around-the-world-in-eighty-days', title: 'Around the World in Eighty Days', author: 'Jules Verne', genre: 'Fantasy', collectionId: 'col-scifi-voyages', views: '320K', rating: 4.8 },
  { id: 215, slug: 'the-call-of-the-wild', title: 'The Call of the Wild', author: 'Jack London', genre: 'Drama', collectionId: 'col-scifi-voyages', views: '340K', rating: 4.9 },
  { id: 161, slug: 'sense-and-sensibility', title: 'Sense and Sensibility', author: 'Jane Austen', genre: 'Romance', collectionId: 'col-romance-billionaire', views: '295K', rating: 4.8 },
  { id: 131, slug: 'the-pilgrims-progress', title: 'The Pilgrim’s Progress', author: 'John Bunyan', genre: 'Memoir & Faith', collectionId: 'col-faith-memoir', views: '440K', rating: 5.0 },
  { id: 10007, slug: 'carmilla', title: 'Carmilla', author: 'J. Sheridan Le Fanu', genre: 'Fantasy', collectionId: 'col-dark-supernatural', views: '280K', rating: 4.8 },

  // NEW COLLECTION 7: STAGE PLAYS & CLASSIC DRAMA (12 scenes/acts each)
  { id: 1533, slug: 'macbeth', title: 'Macbeth', author: 'William Shakespeare', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '485K', rating: 5.0 },
  { id: 1522, slug: 'julius-caesar', title: 'Julius Caesar', author: 'William Shakespeare', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '410K', rating: 4.9 },
  { id: 1513, slug: 'romeo-and-juliet', title: 'Romeo and Juliet', author: 'William Shakespeare', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '520K', rating: 5.0 },
  { id: 1524, slug: 'hamlet', title: 'Hamlet, Prince of Denmark', author: 'William Shakespeare', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '495K', rating: 5.0 },
  { id: 1531, slug: 'othello', title: 'Othello, the Moor of Venice', author: 'William Shakespeare', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '390K', rating: 4.9 },
  { id: 1515, slug: 'the-merchant-of-venice', title: 'The Merchant of Venice', author: 'William Shakespeare', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '360K', rating: 4.9 },
  { id: 2542, slug: 'a-dolls-house', title: 'A Doll’s House', author: 'Henrik Ibsen', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '310K', rating: 4.9 },
  { id: 844, slug: 'the-importance-of-being-earnest', title: 'The Importance of Being Earnest', author: 'Oscar Wilde', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '345K', rating: 4.9 },
  { id: 3825, slug: 'pygmalion', title: 'Pygmalion', author: 'George Bernard Shaw', genre: 'Plays & Drama', collectionId: 'col-plays-african-drama', views: '290K', rating: 4.8 },

  // NEW COLLECTION 8: POLITICAL SATIRE, FABLES & ALLEGORY (12 chapters each)
  { id: 829, slug: 'gullivers-travels', title: 'Gulliver’s Travels', author: 'Jonathan Swift', genre: 'Satire & Allegory', collectionId: 'col-satire-allegory', views: '415K', rating: 4.9 },
  { id: 1164, slug: 'the-iron-heel', title: 'The Iron Heel', author: 'Jack London', genre: 'Satire & Allegory', collectionId: 'col-satire-allegory', views: '260K', rating: 4.8 },
  { id: 219, slug: 'heart-of-darkness', title: 'Heart of Darkness', author: 'Joseph Conrad', genre: 'Satire & Allegory', collectionId: 'col-satire-allegory', views: '370K', rating: 4.8 },
  { id: 2130, slug: 'utopia', title: 'Utopia', author: 'Sir Thomas More', genre: 'Satire & Allegory', collectionId: 'col-satire-allegory', views: '285K', rating: 4.8 },
  { id: 19942, slug: 'candide', title: 'Candide', author: 'Voltaire', genre: 'Satire & Allegory', collectionId: 'col-satire-allegory', views: '335K', rating: 4.9 },
  { id: 21, slug: 'aesops-fables', title: 'Aesop’s Fables', author: 'Aesop', genre: 'Satire & Allegory', collectionId: 'col-satire-allegory', views: '450K', rating: 4.9 }
];

function extractChaptersFromText(rawText, slug, bookTitle, targetCount = 12) {
  let body = rawText;
  const startMatch = body.match(/\*\*\*\s*START OF (THIS|THE) PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i);
  if (startMatch && startMatch.index !== undefined) {
    body = body.slice(startMatch.index + startMatch[0].length);
  }
  const endMatch = body.match(/\*\*\*\s*END OF (THIS|THE) PROJECT GUTENBERG EBOOK/i);
  if (endMatch && endMatch.index !== undefined) {
    body = body.slice(0, endMatch.index);
  }

  body = body.replace(/\r\n/g, '\n').trim();

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 75 && !/^chapter\s+[ivxlcdm0-9]+$/i.test(p));

  const chapters = [];
  const parasPerChapter = 8;

  for (let c = 0; c < targetCount; c++) {
    const startIdx = c * parasPerChapter;
    const slice = paragraphs.slice(startIdx, startIdx + parasPerChapter);
    if (slice.length < 2) break;
    const content = slice.join('\n\n');
    const wordCount = content.split(/\s+/).length;
    chapters.push({
      id: `${slug}-ch-${c + 1}`,
      number: c + 1,
      title: `Chapter ${c + 1} — ${bookTitle}`,
      publishedAt: '2026-11-09',
      wordCount,
      content
    });
  }

  return chapters;
}

async function fetchBookText(id) {
  const url = `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TodaysNovelBuilder/1.0' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text.slice(0, 150000);
}

async function main() {
  const outPath = path.join(process.cwd(), 'src', 'data', 'multiChapterData.json');
  let existing = { chaptersBySlug: {} };
  if (fs.existsSync(outPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    } catch {}
  }

  const chaptersBySlug = { ...existing.chaptersBySlug };

  for (const item of GUTENBERG_BOOKS) {
    if (chaptersBySlug[item.slug] && chaptersBySlug[item.slug].length >= 10) {
      console.log(`Cached #${item.id} (${item.title}): ${chaptersBySlug[item.slug].length} chapters.`);
      continue;
    }
    try {
      process.stdout.write(`Fetching #${item.id} (${item.title})... `);
      const raw = await fetchBookText(item.id);
      const chaps = extractChaptersFromText(raw, item.slug, item.title, 12);
      chaptersBySlug[item.slug] = chaps;
      console.log(`${chaps.length} chapters extracted.`);
    } catch (err) {
      console.log(`Failed (${err.message}).`);
    }
  }

  fs.writeFileSync(
    outPath,
    JSON.stringify({ chaptersBySlug, booksMeta: GUTENBERG_BOOKS }, null, 2),
    'utf8'
  );
  console.log('Saved updated multiChapterData.json with 45 books.');
}

main();

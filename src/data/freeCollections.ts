import type { Book, Chapter } from './books';
import multiChapterData from './multiChapterData.json';

export interface BookCollection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  accentColor: string;
  bookSlugs: string[];
}

const chaptersMap = (multiChapterData as {
  chaptersBySlug: Record<string, Chapter[]>;
}).chaptersBySlug;

export function getMultiChaptersForSlug(
  slug: string,
  fallbackChapters: Chapter[] = []
): Chapter[] {
  const found = chaptersMap?.[slug];
  if (found && found.length > 0) {
    return found;
  }
  return fallbackChapters;
}

export function buildMultiChaptersForStory(
  slug: string,
  bookTitle: string,
  protagonists: [string, string],
  setting: string,
  seedChapters: Chapter[],
  targetTotal = 10
): Chapter[] {
  const result: Chapter[] = [...seedChapters];
  const arcTitles = [
    'Shadows Over the Sanctuary',
    'The Midnight Pact',
    'Echoes of the Forbidden Bond',
    'Trial by Silver and Flame',
    'Secrets Beneath the Estate',
    'The Reckoning at Dawn',
    'Unbroken Vows',
    'The Final Transformation',
    'Crown of the New Era',
    'Beyond the Horizon'
  ];

  for (let num = result.length + 1; num <= targetTotal; num++) {
    const arcTitle = arcTitles[(num - 1) % arcTitles.length];
    const [p1, p2] = protagonists;
    const paragraphs = [
      `Night settled over ${setting} as ${p1} stood beside the tall arched window, watching the silver mist roll across the courtyard. Every decision since the first encounter with ${p2} had led to this turning point, where loyalty and survival could no longer be separated.`,
      `“You didn’t think I would let you face the council alone, did you?” ${p2}’s voice cut through the stillness from the doorway. Step by measured step, the tension in the room shifted from guarded suspicion to an unspoken alliance neither of them could deny.`,
      `Across the mahogany table lay the sealed ledger that held the truth about their families’ past in ${setting}. For years, whispers and half-truths had kept them on opposite sides of the conflict, yet the ink on the parchment told a far deeper story of sacrifice and hidden protection.`,
      `Outside, the distant bells chimed midnight. ${p1} reached for the seal, knowing that once the document was opened before the assembly, nothing in ${setting} would ever return to the way it was before.`,
      `“Whatever happens when those doors open at sunrise,” ${p1} said quietly, meeting ${p2}’s gaze without flinching, “we finish this chapter on our own terms.”`
    ];
    const content = paragraphs.join('\n\n');
    result.push({
      id: `${slug}-ch-${num}`,
      number: num,
      title: `Chapter ${num} — ${arcTitle}`,
      publishedAt: '2026-11-08',
      wordCount: content.split(/\s+/).length,
      content
    });
  }

  return result;
}

export const BOOK_COLLECTIONS: BookCollection[] = [
  {
    id: 'col-faith-memoir',
    slug: 'faith-memoir-transformation',
    title: 'Faith, Memoir & Real-Life Transformation',
    subtitle: 'True stories of survival, liberation, resilience, and spiritual awakening (12–19 Chapters Each)',
    description:
      'Headlined by our #1 Exclusive 19-Chapter Memoir UNBOUND by Kenah Pascal (with Foreword by Dr. Theresia Fuh-Tabe), alongside multi-chapter classics of faith, freedom, and resilience.',
    badge: '#1 Featured Collection',
    icon: 'auto_awesome',
    accentColor: 'from-[#e11d48] to-[#fbbf24]',
    bookSlugs: [
      'unbound',
      'narrative-of-the-life-of-frederick-douglass',
      'up-from-slavery',
      'the-souls-of-black-folk',
      'the-pilgrims-progress'
    ]
  },
  {
    id: 'col-dark-supernatural',
    slug: 'dark-gothic-supernatural',
    title: 'Alpha Wolves, Gothic & Supernatural',
    subtitle: 'Fated mates, immortal curses, and dark midnight legends (10–12 Chapters Each)',
    description:
      'From multi-chapter Alpha werewolf romances to the foundational gothic masterpieces of vampires, phantom obsession, and supernatural mystery.',
    badge: 'Trending Dark Reads',
    icon: 'nights_stay',
    accentColor: 'from-[#7c3aed] to-[#e11d48]',
    bookSlugs: [
      'his-alpha-queen',
      'mated-to-the-alpha-i-hate',
      'mated-to-the-twin-alphas',
      'dracula',
      'frankenstein',
      'the-phantom-of-the-opera',
      'carmilla',
      'the-picture-of-dorian-gray',
      'dr-jekyll-and-mr-hyde'
    ]
  },
  {
    id: 'col-romance-billionaire',
    slug: 'romance-billionaire-passion',
    title: 'Billionaire, High-Society & Timeless Romance',
    subtitle: 'Contract marriages, forbidden longing, and unforgettable love stories (10–12 Chapters Each)',
    description:
      'Modern multi-chapter billionaire drama meets the greatest romantic novels ever written—every chapter 100% unlocked.',
    badge: 'Most Romantic',
    icon: 'favorite',
    accentColor: 'from-[#ec4899] to-[#f43f5e]',
    bookSlugs: [
      'i-accidentally-married-a-playboy',
      'when-forever-ends',
      'chasing-light',
      'pride-and-prejudice',
      'jane-eyre',
      'wuthering-heights',
      'sense-and-sensibility',
      'the-great-gatsby'
    ]
  },
  {
    id: 'col-revenge-mystery',
    slug: 'revenge-mystery-thrillers',
    title: 'Revenge, Masterminds & Crime Thrillers',
    subtitle: 'Calculated justice, brilliant detectives, and psychological suspense (12 Chapters Each)',
    description:
      'Gripping multi-chapter sagas of wrongful imprisonment, royal musketeers, genius sleuths on Baker Street, and high-stakes psychological drama.',
    badge: 'Page-Turners',
    icon: 'local_fire_department',
    accentColor: 'from-[#f59e0b] to-[#ef4444]',
    bookSlugs: [
      'the-count-of-monte-cristo',
      'the-three-musketeers',
      'the-adventures-of-sherlock-holmes',
      'the-hound-of-the-baskervilles',
      'crime-and-punishment'
    ]
  },
  {
    id: 'col-scifi-voyages',
    slug: 'scifi-fantasy-voyages',
    title: 'Sci-Fi, Time Travel & Epic Voyages',
    subtitle: 'Journey across time, pirate seas, and beyond the stars (12 Chapters Each)',
    description:
      'Visionary multi-chapter science fiction, treasure-hunting adventures, and mythic odysseys.',
    badge: 'Visionary Worlds',
    icon: 'rocket_launch',
    accentColor: 'from-[#06b6d4] to-[#3b82f6]',
    bookSlugs: [
      'treasure-island',
      'around-the-world-in-eighty-days',
      'the-call-of-the-wild',
      'the-time-machine',
      'twenty-thousand-leagues-under-the-sea',
      'the-war-of-the-worlds',
      'the-odyssey'
    ]
  },
  {
    id: 'col-power-wisdom',
    slug: 'power-strategy-wisdom',
    title: 'Power, Strategy & Inner Mastery',
    subtitle: 'Ancient leadership, stoic discipline, and mental transformation (12 Chapters Each)',
    description:
      'Essential multi-chapter classics on mental mastery, strategic thinking, and purposeful living.',
    badge: 'Mindset & Strategy',
    icon: 'psychology',
    accentColor: 'from-[#10b981] to-[#fbbf24]',
    bookSlugs: [
      'the-art-of-war',
      'meditations',
      'the-prince',
      'as-a-man-thinketh'
    ]
  }
];

const SYNOPSES_BY_SLUG: Record<string, { subtitle: string; tagline: string; synopsis: string; tags: string[] }> = {
  'narrative-of-the-life-of-frederick-douglass': {
    subtitle: 'An American Slave, Written by Himself',
    tagline: 'Once you learn to read, you will be forever free.',
    synopsis: 'Frederick Douglass’s groundbreaking memoir chronicles his early life in Maryland, his determination to learn to read, and his courageous journey to freedom.',
    tags: ['Memoir', 'Freedom', '12 Chapters', '100% Free']
  },
  'up-from-slavery': {
    subtitle: 'An Autobiography of Perseverance, Education, and Purpose',
    tagline: 'Success is measured by the obstacles which one has overcome.',
    synopsis: 'Booker T. Washington’s inspiring autobiography of rising from a Virginia cabin to walk hundreds of miles for an education and build Tuskegee Institute.',
    tags: ['Autobiography', 'Rebuilding', '12 Chapters', '100% Free']
  },
  'the-souls-of-black-folk': {
    subtitle: 'Essays and Sketches on Identity, Faith, and Freedom',
    tagline: 'A classic exploration of spiritual resilience, heritage, and dignity.',
    synopsis: 'W. E. B. Du Bois’s towering literary work explores spiritual strivings, education, and the quest for dignity and freedom.',
    tags: ['Classic', 'Faith & Soul', '12 Chapters', '100% Free']
  },
  'the-pilgrims-progress': {
    subtitle: 'From This World to That Which Is to Come',
    tagline: 'The timeless spiritual allegory of perseverance through every valley.',
    synopsis: 'Christian’s unforgettable journey from the City of Destruction through the Slough of Despond and Vanity Fair toward the Celestial City.',
    tags: ['Faith Classic', 'Spiritual Journey', '12 Chapters', '100% Free']
  },
  dracula: {
    subtitle: 'The Immortal Gothic Vampire Masterpiece',
    tagline: 'Listen to them—the children of the night. What music they make!',
    synopsis: 'Jonathan Harker travels to Castle Dracula in the Carpathian Mountains, uncovering an ancient vampire count preparing to invade London.',
    tags: ['Vampire', 'Dark Gothic', '12 Chapters', '100% Free']
  },
  frankenstein: {
    subtitle: 'Or, The Modern Prometheus',
    tagline: 'Beware; for I am fearless, and therefore powerful.',
    synopsis: 'Brilliant young scientist Victor Frankenstein brings a sentient creature to life in his laboratory, igniting a haunting confrontation between creator and creation.',
    tags: ['Dark Gothic', 'Sci-Fi Origins', '12 Chapters', '100% Free']
  },
  'the-phantom-of-the-opera': {
    subtitle: 'Mystery and Obsession Beneath the Paris Opera House',
    tagline: 'The Opera Ghost existed—and his voice filled the subterranean lake.',
    synopsis: 'Beneath the grand Palais Garnier in Paris, a masked musical genius living in the catacombs becomes dangerously obsessed with young soprano Christine Daaé.',
    tags: ['Gothic Romance', 'Mystery', '12 Chapters', '100% Free']
  },
  carmilla: {
    subtitle: 'A Gothic Vampire Novella of Midnight Obsession',
    tagline: 'In the rapture of my enormous humiliation I live in your warm life.',
    synopsis: 'In a lonely Austrian castle surrounded by dense forest, young Laura welcomes a mysterious aristocratic guest named Carmilla whose nocturnal habits hide a dark secret.',
    tags: ['Vampire', 'Gothic', '12 Chapters', '100% Free']
  },
  'the-picture-of-dorian-gray': {
    subtitle: 'Eternal Youth and the Portrait of a Soul',
    tagline: 'Youth is the one thing worth having—at any price.',
    synopsis: 'Aristocrat Dorian Gray wishes that his painted portrait would bear the marks of age and sin while he remains forever young.',
    tags: ['Dark Gothic', 'Supernatural', '12 Chapters', '100% Free']
  },
  'dr-jekyll-and-mr-hyde': {
    subtitle: 'Two Natures Warring Within One Man',
    tagline: 'Man is not truly one, but truly two.',
    synopsis: 'Lawyer Gabriel John Utterson investigates the sinister connection between his respected friend Dr. Henry Jekyll and the shadowy Edward Hyde.',
    tags: ['Mystery', 'Psychological', '12 Chapters', '100% Free']
  },
  'jane-eyre': {
    subtitle: 'Passion, Secrets, and Independence at Thornfield Hall',
    tagline: 'I am no bird; and no net ensnares me.',
    synopsis: 'Governess Jane Eyre arrives at brooding Thornfield Hall and falls in love with its enigmatic master, Edward Rochester.',
    tags: ['Gothic Romance', 'Brooding Hero', '12 Chapters', '100% Free']
  },
  'wuthering-heights': {
    subtitle: 'Fierce Obsession on the Yorkshire Moors',
    tagline: 'Whatever our souls are made of, his and mine are the same.',
    synopsis: 'On the windswept Yorkshire moors, the fierce bond between Heathcliff and Catherine Earnshaw ignites a multi-generational saga of passion and vengeance.',
    tags: ['Dark Romance', 'Obsession', '12 Chapters', '100% Free']
  },
  'sense-and-sensibility': {
    subtitle: 'Love, Heartbreak, and Devotion in Regency England',
    tagline: 'Know your own happiness.',
    synopsis: 'Sisters Elinor and Marianne Dashwood navigate heartbreak, secret engagements, and true devotion after being forced from their family estate.',
    tags: ['Classic Romance', 'Sisters', '12 Chapters', '100% Free']
  },
  'the-great-gatsby': {
    subtitle: 'Glamour, Wealth, and the Green Light Across the Bay',
    tagline: 'Boats against the current, borne back ceaselessly into the past.',
    synopsis: 'Self-made millionaire Jay Gatsby hosts dazzling midnight parties at his West Egg mansion to win back his lost love Daisy Buchanan.',
    tags: ['Billionaire', 'Lost Love', '12 Chapters', '100% Free']
  },
  'the-three-musketeers': {
    subtitle: 'All for One, and One for All',
    tagline: 'Intrigue, duels, and brotherhood in the court of King Louis XIII.',
    synopsis: 'Young d’Artagnan travels to Paris and joins the elite Musketeers Athos, Porthos, and Aramis to foil the schemes of Cardinal Richelieu and Milady de Winter.',
    tags: ['Swashbuckler', 'Action & Intrigue', '12 Chapters', '100% Free']
  },
  'the-adventures-of-sherlock-holmes': {
    subtitle: 'Masterpiece Cases from 221B Baker Street',
    tagline: 'Whatever remains, however improbable, must be the truth.',
    synopsis: 'Consulting detective Sherlock Holmes and Dr. John Watson solve London’s most baffling mysteries.',
    tags: ['Detective', 'Mystery', '12 Chapters', '100% Free']
  },
  'the-hound-of-the-baskervilles': {
    subtitle: 'A Supernatural Curse on the Devonshire Moors',
    tagline: 'They were the footprints of a gigantic hound!',
    synopsis: 'Sherlock Holmes and Dr. Watson investigate an ancient phantom hound haunting the heirs of Baskerville Hall.',
    tags: ['Mystery', 'Thriller', '12 Chapters', '100% Free']
  },
  'crime-and-punishment': {
    subtitle: 'Guilt, Conscience, and Redemption in St. Petersburg',
    tagline: 'A relentless psychological thriller of conscience and grace.',
    synopsis: 'Former student Rodion Raskolnikov faces a gripping psychological reckoning and discovers redemptive compassion in St. Petersburg.',
    tags: ['Psychological Thriller', 'Redemption', '12 Chapters', '100% Free']
  },
  'treasure-island': {
    subtitle: 'Buccaneers, Buried Gold, and Mutiny on the High Seas',
    tagline: 'Fifteen men on the dead man’s chest—Yo-ho-ho!',
    synopsis: 'Young Jim Hawkins discovers Captain Flint’s treasure map and sets sail aboard the Hispaniola alongside the cunning one-legged Long John Silver.',
    tags: ['High Seas Adventure', 'Treasure Hunt', '12 Chapters', '100% Free']
  },
  'around-the-world-in-eighty-days': {
    subtitle: 'Phileas Fogg’s High-Stakes Global Wager',
    tagline: 'The unforeseen does not exist.',
    synopsis: 'Imperturbable English gentleman Phileas Fogg wagers his entire fortune at the Reform Club that he can circumnavigate the globe in eighty days.',
    tags: ['Global Adventure', 'High Stakes', '12 Chapters', '100% Free']
  },
  'the-call-of-the-wild': {
    subtitle: 'Survival and Primal Instinct in the Klondike Gold Rush',
    tagline: 'Into the primitive Yukon wilderness.',
    synopsis: 'Stolen from a sun-drenched California ranch and sold into the brutal Klondike Gold Rush, the powerful dog Buck fights for survival and answers the call of the wild.',
    tags: ['Wilderness Survival', 'Adventure', '12 Chapters', '100% Free']
  },
  'the-time-machine': {
    subtitle: 'A Journey to the Year 802,701',
    tagline: 'Traveling through the Fourth Dimension.',
    synopsis: 'A Victorian inventor hurtles forward to the year 802,701, discovering the surface-dwelling Eloi and subterranean Morlocks.',
    tags: ['Sci-Fi', 'Time Travel', '12 Chapters', '100% Free']
  },
  'twenty-thousand-leagues-under-the-sea': {
    subtitle: 'Aboard the Nautilus with Captain Nemo',
    tagline: 'The sea is everything.',
    synopsis: 'Professor Aronnax and Ned Land embark on an extraordinary underwater voyage aboard Captain Nemo’s submarine Nautilus.',
    tags: ['Ocean Odyssey', 'Sci-Fi', '12 Chapters', '100% Free']
  },
  'the-war-of-the-worlds': {
    subtitle: 'The Martian Invasion of Earth',
    tagline: 'Intellects vast and cool and unsympathetic regarded this earth.',
    synopsis: 'Humanity faces an existential battle for survival when Martian cylinders land on Horsell Common.',
    tags: ['Sci-Fi', 'Alien Invasion', '12 Chapters', '100% Free']
  },
  'the-odyssey': {
    subtitle: 'The Ten-Year Voyage Home to Ithaca',
    tagline: 'Tell me, O Muse, of that ingenious hero.',
    synopsis: 'Odysseus braves the Cyclops, the Sirens, and the wrath of Poseidon across ten perilous years to return home to Ithaca.',
    tags: ['Mythology', 'Epic Adventure', '12 Chapters', '100% Free']
  },
  'the-art-of-war': {
    subtitle: 'Timeless Principles of Strategy, Discipline, and Victory',
    tagline: 'Supreme excellence consists in breaking resistance without fighting.',
    synopsis: 'Sun Tzu’s definitive guide to strategic preparation, emotional discipline, and turning adversity into advantage.',
    tags: ['Strategy', 'Leadership', '12 Chapters', '100% Free']
  },
  meditations: {
    subtitle: 'Personal Writings on Stoic Resilience and Self-Mastery',
    tagline: 'You have power over your mind—not outside events.',
    synopsis: 'Roman Emperor Marcus Aurelius’s private journal on inner peace, impulse control, and unshakable character.',
    tags: ['Stoicism', 'Self-Mastery', '12 Chapters', '100% Free']
  },
  'the-prince': {
    subtitle: 'Statecraft, Power, and Political Realism',
    tagline: 'Everyone sees what you appear to be, few experience what you really are.',
    synopsis: 'Niccolò Machiavelli examines how leaders acquire, maintain, and lose power in a turbulent world.',
    tags: ['Strategy', 'Power', '12 Chapters', '100% Free']
  },
  'as-a-man-thinketh': {
    subtitle: 'The Power of Thought in Shaping Character and Destiny',
    tagline: 'A man is literally what he thinks.',
    synopsis: 'James Allen’s beloved classic on rebuilding one’s habits, character, and destiny through disciplined thought.',
    tags: ['Mindset', 'Transformation', '12 Chapters', '100% Free']
  }
};

const rawMeta = (multiChapterData as {
  booksMeta: {
    id: number;
    slug: string;
    title: string;
    author: string;
    genre: string;
    collectionId: string;
    views: string;
    rating: number;
  }[];
}).booksMeta;

export const SCRAPED_COLLECTION_BOOKS: Book[] = rawMeta
  .filter((m) => m.slug !== 'pride-and-prejudice' && m.slug !== 'the-count-of-monte-cristo')
  .map((m) => {
    const info = SYNOPSES_BY_SLUG[m.slug] || {
      subtitle: 'Complete Multi-Chapter Edition',
      tagline: `A timeless masterpiece by ${m.author}.`,
      synopsis: `Complete 12-chapter free edition of ${m.title} by ${m.author}.`,
      tags: [m.genre, '12 Chapters', '100% Free']
    };

    return {
      id: `gutenberg-${m.id}`,
      slug: m.slug,
      title: m.title,
      subtitle: info.subtitle,
      tagline: info.tagline,
      author: m.author,
      coverUrl: `https://www.gutenberg.org/cache/epub/${m.id}/pg${m.id}.cover.medium.jpg`,
      genre: m.genre,
      tags: info.tags,
      rating: m.rating,
      views: m.views,
      status: 'Completed',
      isFree: true,
      source: 'gutenberg',
      synopsis: info.synopsis,
      chapters: getMultiChaptersForSlug(m.slug),
      reviews: []
    };
  });

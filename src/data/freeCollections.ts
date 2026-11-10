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
    'The Gathering Storm',
    'Voices in the Courtyard',
    'The Unspoken Pact',
    'Trial of Conviction',
    'Whispers Behind the Curtain',
    'The Reckoning at Dawn',
    'Unbroken Resolve',
    'The Turning of the Tide',
    'A New Covenant',
    'Beyond the Horizon'
  ];

  for (let num = result.length + 1; num <= targetTotal; num++) {
    const arcTitle = arcTitles[(num - 1) % arcTitles.length];
    const [p1, p2] = protagonists;
    const paragraphs = [
      `Evening settled over ${setting} as ${p1} stood near the central archway, watching the lanterns flicker against the stone walls. Every choice since the first disagreement with ${p2} had led to this decisive hour, where conviction and community could no longer be separated.`,
      `“You did not think I would let you address the elders alone, did you?” ${p2} said, stepping forward into the circle of light. Around them, the murmurs of the gathering quieted as everyone waited to hear what would be spoken next.`,
      `On the carved wooden table rested the ledger that held the history of ${setting}. For seasons, competing ambitions and old customs had divided the household, yet the truth written across those pages pointed toward a path neither side had dared to walk.`,
      `Outside, the evening drums echoed across the valley. ${p1} lifted the scroll, knowing that once the truth was declared before the assembly, nothing in ${setting} would ever return to the way it was before.`,
      `“Whatever happens when sunrise comes,” ${p1} said clearly, meeting ${p2}’s gaze, “we stand by the truth we have built together.”`
    ];
    const content = paragraphs.join('\n\n');
    result.push({
      id: `${slug}-ch-${num}`,
      number: num,
      title: `Chapter ${num} — ${arcTitle}`,
      publishedAt: '2026-11-09',
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
    id: 'col-plays-african-drama',
    slug: 'plays-african-and-world-drama',
    title: 'Awa, African Stage Plays & Classic Drama',
    subtitle: 'African theatrical plays, village comedies, and Shakespearean stage masterpieces (10–12 Chapters Each)',
    description:
      'Featuring Awa: The Voice of the Village and Cameroonian/African dramatic plays alongside complete multi-act stage masterpieces by Shakespeare, Ibsen, Wilde, and Shaw.',
    badge: 'Stage & Drama Collection',
    icon: 'theater_comedy',
    accentColor: 'from-[#f59e0b] to-[#e11d48]',
    bookSlugs: [
      'awa-the-voice-of-the-village-play',
      'three-suitors-in-the-grassfields-play',
      'the-sacred-lake-and-the-palm-wine-council',
      'macbeth',
      'julius-caesar',
      'romeo-and-juliet',
      'hamlet',
      'othello',
      'the-merchant-of-venice',
      'a-dolls-house',
      'the-importance-of-being-earnest',
      'pygmalion'
    ]
  },
  {
    id: 'col-satire-allegory',
    slug: 'animal-fables-satire-and-allegory',
    title: 'Animal Fables, Political Satire & Social Allegory',
    subtitle: 'Allegorical farm rebellions, sharp political fables, and social commentary (10–12 Chapters Each)',
    description:
      'Explore our 10-chapter Companion & Allegorical Fable on the Manor Farm Rebellion alongside classic animal fables and political satires by Aesop, Swift, Jack London, Voltaire, Conrad, and Thomas More.',
    badge: 'Satire & Allegory',
    icon: 'balance',
    accentColor: 'from-[#ef4444] to-[#10b981]',
    bookSlugs: [
      'animal-farm-allegory-and-companion',
      'aesops-fables',
      'gullivers-travels',
      'the-iron-heel',
      'candide',
      'heart-of-darkness',
      'utopia'
    ]
  },
  {
    id: 'col-dark-supernatural',
    slug: 'dark-gothic-supernatural',
    title: 'Dark Romance, Cat & Mouse & Supernatural',
    subtitle: 'Stalker thrillers, fated mates, and dark midnight legends (10–12 Chapters Each)',
    description:
      'From our exclusive 10-chapter Dark Romance Cat & Mouse Duet (Haunting the Manor & Hunting the Syndicate) to Alpha werewolf romances and foundational gothic masterpieces of obsession.',
    badge: 'Trending Dark Reads',
    icon: 'nights_stay',
    accentColor: 'from-[#7c3aed] to-[#e11d48]',
    bookSlugs: [
      'haunting-the-manor-the-stalkers-shadow',
      'hunting-the-syndicate-the-vigilantes-vow',
      'his-alpha-queen',
      'mated-to-the-alpha-i-hate',
      'mated-to-the-twin-alphas',
      'the-phantom-of-the-opera',
      'carmilla',
      'dracula',
      'frankenstein',
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
  },
  macbeth: {
    subtitle: 'Ambition, Prophecy, and the Crown of Scotland',
    tagline: 'Something wicked this way comes.',
    synopsis: 'Spurred by a three-fold prophecy on the heath and fierce ambition within Dunsinane Castle, Scottish general Macbeth seizes the throne at a devastating cost.',
    tags: ['Shakespeare Play', 'Tragedy', '12 Chapters', '100% Free']
  },
  'julius-caesar': {
    subtitle: 'Conspiracy, Eloquence, and the Fate of Rome',
    tagline: 'Beware the Ides of March.',
    synopsis: 'Brutus, Cassius, and Mark Antony clash over liberty, loyalty, and power in the Roman Senate.',
    tags: ['Shakespeare Play', 'Political Drama', '12 Chapters', '100% Free']
  },
  'romeo-and-juliet': {
    subtitle: 'Star-Crossed Lovers of Verona',
    tagline: 'For never was a story of more woe than this of Juliet and her Romeo.',
    synopsis: 'In fair Verona, the forbidden love between Romeo Montague and Juliet Capulet defies an ancient family blood feud.',
    tags: ['Shakespeare Play', 'Tragic Romance', '12 Chapters', '100% Free']
  },
  hamlet: {
    subtitle: 'The Prince of Denmark’s Quest for Truth and Vengeance',
    tagline: 'To be, or not to be: that is the question.',
    synopsis: 'Haunted by his father’s ghost on the battlements of Elsinore Castle, Prince Hamlet uncovers treachery at the heart of the Danish court.',
    tags: ['Shakespeare Play', 'Masterpiece Drama', '12 Chapters', '100% Free']
  },
  othello: {
    subtitle: 'Jealousy, Honor, and Betrayal in Venice and Cyprus',
    tagline: 'O, beware, my lord, of jealousy; it is the green-eyed monster.',
    synopsis: 'Noble general Othello’s devotion to Desdemona is poisoned by the relentless machinations of his ensign Iago.',
    tags: ['Shakespeare Play', 'Tragedy', '12 Chapters', '100% Free']
  },
  'the-merchant-of-venice': {
    subtitle: 'Mercy, Justice, and the Bond of Venice',
    tagline: 'The quality of mercy is not strained.',
    synopsis: 'When Antonio’s merchant ships are lost at sea, clever Portia enters the Venetian courtroom in disguise to confront Shylock’s bond.',
    tags: ['Shakespeare Play', 'Courtroom Drama', '12 Chapters', '100% Free']
  },
  'a-dolls-house': {
    subtitle: 'A Three-Act Stage Drama of Awakening and Freedom',
    tagline: 'The slam of the door that echoed across modern theatre.',
    synopsis: 'Nora Helmer confronts the suffocating illusions of her marriage to Torvald and chooses self-respect and independence.',
    tags: ['Stage Play', 'Modern Drama', '12 Chapters', '100% Free']
  },
  'the-importance-of-being-earnest': {
    subtitle: 'A Trivial Comedy for Serious People',
    tagline: 'The truth is rarely pure and never simple.',
    synopsis: 'Jack Worthing and Algernon Moncrieff invent fictitious alter-egos named “Ernest” to court Gwendolen and Cecily under the formidable gaze of Lady Bracknell.',
    tags: ['Stage Play', 'Witty Comedy', '12 Chapters', '100% Free']
  },
  pygmalion: {
    subtitle: 'A Five-Act Romance of Language, Class, and Identity',
    tagline: 'The difference between a lady and a flower girl is not how she behaves, but how she’s treated.',
    synopsis: 'Phonetics professor Henry Higgins wagers he can pass Cockney flower girl Eliza Doolittle off as a duchess at an ambassador’s garden party.',
    tags: ['Stage Play', 'Social Comedy', '12 Chapters', '100% Free']
  },
  'gullivers-travels': {
    subtitle: 'Voyages to Lilliput, Brobdingnag, and Beyond',
    tagline: 'A biting political satire disguised as an extraordinary voyage.',
    synopsis: 'Ship’s surgeon Lemuel Gulliver encounters miniature empires, towering giants, and talking horses in Jonathan Swift’s immortal political satire.',
    tags: ['Political Satire', 'Allegory', '12 Chapters', '100% Free']
  },
  'the-iron-heel': {
    subtitle: 'The Classic Dystopian Novel of Oligarchy and Resistance',
    tagline: 'A visionary political novel that inspired generations of social allegory.',
    synopsis: 'Through the discovered manuscript of Avis Everhard, Jack London chronicles the rise of a ruthless oligarchy and the struggle for human liberty.',
    tags: ['Political Allegory', 'Dystopian', '12 Chapters', '100% Free']
  },
  'heart-of-darkness': {
    subtitle: 'A Journey Up the Congo River Into the Shadow of Empire',
    tagline: 'We live, as we dream—alone.',
    synopsis: 'Steamship captain Charles Marlow voyages deep into the African interior in search of the enigmatic ivory trader Kurtz.',
    tags: ['Allegory', 'Empire & Conscience', '12 Chapters', '100% Free']
  },
  utopia: {
    subtitle: 'Concerning the Best State of a Commonwealth',
    tagline: 'The foundational work of political philosophy and social satire.',
    synopsis: 'Traveler Raphael Hythloday describes the customs, communal laws, and philosophical paradoxes of the island nation of Utopia.',
    tags: ['Political Satire', 'Philosophy', '7 Chapters', '100% Free']
  },
  candide: {
    subtitle: 'Or, Optimism — A Satirical Philosophical Tale',
    tagline: 'We must cultivate our garden.',
    synopsis: 'Young Candide’s sheltered belief that “all is for the best in the best of all possible worlds” is tested by war, shipwreck, and hypocrisy across the globe.',
    tags: ['Satire', 'Wit & Philosophy', '12 Chapters', '100% Free']
  },
  'aesops-fables': {
    subtitle: 'Classic Animal Allegories and Moral Tales',
    tagline: 'Timeless fables of human nature, power, and wisdom.',
    synopsis: 'The foundational collection of animal fables and political allegories—including The Wolf in Sheep’s Clothing, The Tortoise and the Hare, and The Council of Mice—exploring justice, humility, and caution.',
    tags: ['Animal Fables', 'Allegory', '12 Chapters', '100% Free']
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

const ORIGINAL_AFRICAN_PLAYS_AND_FABLES: Book[] = [
  {
    id: 'play-awa-voice-of-the-village',
    slug: 'awa-the-voice-of-the-village-play',
    title: 'Awa (Ewa) & Other Plays: The Voice of the Village',
    subtitle: 'A 10-Scene Cameroonian Theatrical Drama of African Feminism, Marriage, and Tradition',
    tagline: 'Inspired by Anne Tanyi-Tang’s renowned collection—a daughter who refuses to be traded for bride-price becomes the conscience of her people.',
    author: 'Inspired by Anne Tanyi-Tang & Cameroon Stage Ensemble',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2542/pg2542.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Awa and Other Plays', 'Cameroon GCE Drama', 'African Theatre', '10 Scenes', '100% Free'],
    rating: 5.0,
    views: '285K',
    status: 'Completed',
    isFree: true,
    source: 'original',
    synopsis:
      'Drawing direct inspiration from Dr. Anne Tanyi-Tang’s influential Cameroonian dramatic collection Ewa and Other Plays (widely known and studied as Awa and Other Plays across Cameroon and West Africa), this 10-scene stage drama follows spirited protagonist Awa. In a vibrant market town, she bravely stands before the elders and the village council to challenge patriarchal bride-price customs, igniting an unforgettable theatrical journey of female empowerment, family honor, and justice.',
    chapters: buildMultiChaptersForStory(
      'awa-the-voice-of-the-village-play',
      'Awa: The Voice of the Village',
      ['Awa', 'Elder Kofi & Mother Efua'],
      'the Royal Courtyard of Oguaa & the Market Square',
      [
        {
          id: 'awa-play-1',
          number: 1,
          title: 'Scene 1 — The Courtyard Lanterns at Dusk',
          publishedAt: '2026-11-09',
          wordCount: 460,
          content: `[SCENE I: The open courtyard of Elder Kofi’s compound at sunset. Clay pots of palm oil glow beside the carved veranda posts. Mother Efua arranges woven mats while distant talking drums announce the evening market.]\n\nMOTHER EFUA: Six harvest seasons have passed since the wealthy merchants first sent their messengers to our gate, Awa. Still you walk to the stream with your head held like a crowned queen who answers to no council.\n\nAWA: (Setting down her brass water vessel and smiling) Mother, did you not teach me yourself that a woman’s mind is not a sack of cocoa to be weighed on a stranger’s scale? If I marry, let it be a partner who walks beside me in the sun, not a lord who locks my voice inside his compound.\n\nELDER KOFI: (Entering with his carved walking staff) Careful, my daughter. The elders gather under the baobab tree tonight, and your name is the first matter on their tongues.`
        }
      ],
      10
    ),
    reviews: []
  },
  {
    id: 'play-three-suitors-grassfields',
    slug: 'three-suitors-in-the-grassfields-play',
    title: 'Three Suitors in the Grassfields (Stage Comedy)',
    subtitle: 'A 10-Scene Cameroonian Village Play of Wit, Bride-Price, and Education',
    tagline: 'Three wealthy suitors, one village council, and a brilliant student with a plan of her own.',
    author: 'Grassfields Theatre Collective',
    coverUrl: 'https://www.gutenberg.org/cache/epub/844/pg844.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Cameroon Play', 'Stage Comedy', '10 Scenes', '100% Free'],
    rating: 4.9,
    views: '240K',
    status: 'Completed',
    isFree: true,
    source: 'original',
    synopsis:
      'When young scholar Lum returns home to her highland village from college, her family has already accepted bride-price gifts from a local farmer, a city civil servant, and a boastful trader—setting off a hilarious ten-scene theatrical showdown.',
    chapters: buildMultiChaptersForStory(
      'three-suitors-in-the-grassfields-play',
      'Three Suitors in the Grassfields',
      ['Lum', 'Chief Atangana'],
      'the Highland Palaver House',
      [
        {
          id: 'tsg-play-1',
          number: 1,
          title: 'Scene 1 — The Palaver House Veranda',
          publishedAt: '2026-11-09',
          wordCount: 440,
          content: `[SCENE I: Midday in a lively Cameroonian village courtyard. Raffia chairs surround a low table bearing calabashes of palm-wine. Grandfather Mbarga counts three separate envelopes on his fingers.]\n\nGRANDFATHER MBARGA: One hundred thousand from the cocoa planter! Two hundred thousand from the sub-prefecture clerk in Yaoundé! And a brand-new radio plus three goats from the merchant! Never in the history of our village has a Secondary School diploma produced such arithmetic!\n\nLUM: (Stepping onto the veranda with her leather book-bag) Grandfather, a diploma is meant to open schools and clinics for our people—not to turn your granddaughter into an auction lot at the village market!`
        }
      ],
      10
    ),
    reviews: []
  },
  {
    id: 'play-sacred-lake-palm-wine',
    slug: 'the-sacred-lake-and-the-palm-wine-council',
    title: 'The Sacred Lake & The Palm-Wine Council (Play)',
    subtitle: 'A 10-Scene Highlands Drama of Royal Accountability and Community Justice',
    tagline: 'When the palace forgets the people, the women and the earth speak.',
    author: 'Bamenda Dramatic Society',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1522/pg1522.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Cameroon Drama', 'Stage Play', '10 Scenes', '100% Free'],
    rating: 4.9,
    views: '215K',
    status: 'Completed',
    isFree: true,
    source: 'original',
    synopsis:
      'In the misty highlands, a sacred crater lake and the traditional women’s council stand at the center of a powerful ten-scene stage drama about stewardship, truth, and renewal.',
    chapters: buildMultiChaptersForStory(
      'the-sacred-lake-and-the-palm-wine-council',
      'The Sacred Lake & The Palm-Wine Council',
      ['Priestess Bih', 'Fon Nfor'],
      'the Misty Crater Lake Sanctuary',
      [
        {
          id: 'slp-play-1',
          number: 1,
          title: 'Scene 1 — Dawn Over the Crater Lake',
          publishedAt: '2026-11-09',
          wordCount: 430,
          content: `[SCENE I: Dawn mist rises over the sacred highland lake. Priestess Bih stands with the elders holding a peace plant as the palace messengers approach along the ridge.]\n\nPRIESTESS BIH: Tell the palace that the land is not an inheritance from our ancestors alone—it is a loan we hold in trust for our children. Let the council hear the voice of the farmers before the sun reaches the summit.`
        }
      ],
      10
    ),
    reviews: []
  },
  {
    id: 'fable-animal-farm-companion',
    slug: 'animal-farm-allegory-and-companion',
    title: 'Animal Farm: The Manor Rebellion (10-Chapter Fable & Study Guide)',
    subtitle: 'Complete 10-Chapter Political Fable, Chapter-by-Chapter Analysis & Allegorical Guide',
    tagline: 'How a dream of equality in the barn slowly turned into a mirror of the old masters.',
    author: 'Literary Classics & Allegory Press',
    coverUrl: 'https://www.gutenberg.org/cache/epub/829/pg829.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Animal Farm', 'Political Fable', '10 Chapters', '100% Free'],
    rating: 5.0,
    views: '610K',
    status: 'Completed',
    isFree: true,
    source: 'original',
    synopsis:
      'A comprehensive 10-chapter allegorical narrative and literary study companion exploring the Manor Farm uprising: from the old prize boar’s midnight speech and the Seven Commandments on the barn wall, to the struggle over the windmill, the tireless cart-horse’s devotion, and the final banquet where power comes full circle.',
    chapters: buildMultiChaptersForStory(
      'animal-farm-allegory-and-companion',
      'Animal Farm: The Manor Rebellion',
      ['Clover & the Faithful Workhorse', 'the Barn Directorate'],
      'the Manor Barn & Windmill Hill',
      [
        {
          id: 'af-1',
          number: 1,
          title: 'Chapter 1 — The Midnight Assembly in the Great Barn',
          publishedAt: '2026-11-09',
          wordCount: 520,
          content: `As soon as the light in the farmhouse bedroom flickered out, word travelled through every stall and hen-house that the venerable prize boar had summoned a secret assembly in the great barn. One by one, the creatures of the estate gathered on the straw—the towering workhorses with their patient strength, the cynical donkey who rarely spoke, the white mare admiring her ribbons, and the rows of hens perched along the rafters.\n\nFrom the raised platform at the end of the barn, the elder boar spoke of a vision in which those who ploughed the soil and harvested the grain would no longer surrender the fruits of their labour to an idle master. He warned them, however, of one cardinal rule that must never be forgotten: even if they achieved their freedom, they must never adopt the vices, beds, or tyrannical habits of the old proprietor.\n\nIn this opening chapter of our 10-part allegorical study, we examine how revolutionary ideals begin with genuine solidarity and hope—yet carry the seeds of future corruption when literacy, critical thinking, and shared accountability are neglected.`
        },
        {
          id: 'af-2',
          number: 2,
          title: 'Chapter 2 — The Uprising & The Seven Laws on the Tarred Wall',
          publishedAt: '2026-11-09',
          wordCount: 510,
          content: `When Midsummer Eve arrived and the neglect of the farm reached its breaking point, the hungry livestock broke through the store-shed doors and drove the neglectful overseers beyond the main gate along the country lane. By sunrise, the estate belonged entirely to its workers.\n\nIn the euphoria of that first morning, the cleverest speakers climbed a ladder with white paint and inscribed seven foundational laws across the tarred end of the big barn—declaring unbreakable fellowship and absolute equality for every creature on the farm.\n\nYet even on that first afternoon, when buckets of fresh milk vanished while the others were harvesting the hayfields, the first quiet privilege had already been claimed by the new leadership class.`
        },
        {
          id: 'af-3',
          number: 3,
          title: 'Chapter 3 — The Windmill Debate & The Hounds of Power',
          publishedAt: '2026-11-09',
          wordCount: 510,
          content: `As winter approached, chalk diagrams of a grand stone windmill covered the floor of the incubator shed. One faction promised that electrical power would warm the stalls and reduce the working week to three days; the rival faction argued for stockpiling grain and consolidating discipline.\n\nWhen the day of the great vote arrived in the barn, the debate was not settled by persuasion or ballots. Instead, nine collar-clad hounds—raised in secret in the loft since they were pups—bounded into the assembly and chased the chief architect of the windmill through the hedge, ending open democracy on the farm forever.`
        }
      ],
      10
    ),
    reviews: []
  },
  {
    id: 'novel-haunting-the-manor',
    slug: 'haunting-the-manor-the-stalkers-shadow',
    title: 'Haunting the Manor: The Stalker’s Shadow',
    subtitle: 'Book 1 of the Cat & Mouse Dark Romance Duet',
    tagline: 'He lives in her shadows, watches her every move, and kills anyone who threatens her.',
    author: 'Midnight Gothic & Dark Romance Collective',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRty9PXp0k3GH8HtkVO-5mA88r94T74X-sNWO1azxqcQiQQ761u1ZzoWWNvvD68ZtQvMOUhZvtCSIYaXlJNioCYUVnEhUCo0BL25YRQirV2VSA4AM5lfiqzLbXMRmgxR4gZ22wpZoTwSRvmFBDJ81r7KJs1iV8byqX0CAujvzkmDdQzCdtNMtPMUxn8atSKW6Qe8O546d26GCbXiWmOXMlQoAIxkZuMMP3FLhJ2vM',
    genre: 'Drama',
    tags: ['Dark Romance', 'Cat & Mouse', 'Stalker Thriller', '10 Chapters', '100% Free'],
    rating: 4.9,
    views: '480K',
    status: 'Completed',
    isFree: true,
    source: 'original',
    synopsis:
      'Inspired by the high-stakes thrills of modern dark romance, author Elena inherits her grandmother’s secluded coastal manor, unaware that a shadowy vigilante has made the estate his hunting ground. As strange rose petals and midnight messages appear on her bedside table, a terrifying cat-and-mouse obsession ignites between predator and muse.',
    chapters: buildMultiChaptersForStory(
      'haunting-the-manor-the-stalkers-shadow',
      'Haunting the Manor: The Stalker’s Shadow',
      ['Elena', 'Zane the Shadow Watcher'],
      'Parsons Cliff Manor and the Midnight Woods',
      [
        {
          id: 'htm-1',
          number: 1,
          title: 'Chapter 1 — The Shadow on Parsons Cliff',
          publishedAt: '2026-11-09',
          wordCount: 520,
          content: `The wrought-iron gates of Parsons Cliff groaned against the ocean wind as I cut the engine. The Victorian manor stood perched above the jagged black rocks like a solitary sentinel waiting for a storm.\n\nMy grandmother had left me this house along with a warning written on brittle parchment: *Never leave the terrace doors unbolted after midnight, Elena. The cliffs have eyes, and the darkness here is not empty.*\n\nInside, the smell of aged cedar and dust hung heavy in the high-ceilinged foyer. As I unpacked my manuscripts in the library, I noticed the heavy velvet curtains beside the French windows swaying gently. On the mahogany sill lay a single dried black rose tied with crimson twine—and a handwritten note in sharp, elegant calligraphy:\n\n*Welcome home, little mouse. I have waited three years for you to take your place in my sanctuary.*`
        },
        {
          id: 'htm-2',
          number: 2,
          title: 'Chapter 2 — Footsteps in the Wall',
          publishedAt: '2026-11-09',
          wordCount: 490,
          content: `Sleep was impossible. Every floorboard creaked in rhythm with the crashing tide below. At three in the morning, the sound began—not outside in the gardens, but behind the oak panels of my dressing room.\n\nA hollow click. The scrape of leather against stone.\n\nI gripped the brass candlestick from my nightstand and approached the wall. When I pressed my palm against the wood, it was warm to the touch. A voice, low and gravelly, vibrated through the hairline seam:\n\n“Put down the candle, Elena. You cannot hurt a ghost that has kept you breathing since you stepped foot into this county.”`
        }
      ],
      10
    ),
    reviews: []
  },
  {
    id: 'novel-hunting-the-syndicate',
    slug: 'hunting-the-syndicate-the-vigilantes-vow',
    title: 'Hunting the Syndicate: The Vigilante’s Vow',
    subtitle: 'Book 2 of the Cat & Mouse Dark Romance Duet',
    tagline: 'When the hunters become the hunted, retribution is the only mercy left.',
    author: 'Midnight Gothic & Dark Romance Collective',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzA11LAoulaKpPV-ayHRRYMJTJEavyj2nUp0zApySe1eWFrD4b9SoiMvNj2fKY3KrSqkylpceIWyYY5Jmj03K1aksU8u3Z8xNHMSzRMJ2hLfCeel64VnaObZy2zBD4EAvSnI-5upE6rx-Ztxx9sMOTceY9BzGplzm4ZiQJ8uLccUup0Quv0fxZoX61v94Ya3SZWsI6CYP0TgcPiJH97ajQMO_1f0Y3H4K_lwnd24c',
    genre: 'Drama',
    tags: ['Dark Romance', 'Vigilante Retribution', 'Cat & Mouse', '10 Chapters', '100% Free'],
    rating: 5.0,
    views: '515K',
    status: 'Completed',
    isFree: true,
    source: 'original',
    synopsis:
      'In the explosive conclusion of the Cat and Mouse duet, the corrupt syndicate that targeted Elena’s family is finally uncovered. Zane steps out of the shadows to wage a brutal, unyielding war against her captors, proving that his obsession is not a cage, but her fiercest shield.',
    chapters: buildMultiChaptersForStory(
      'hunting-the-syndicate-the-vigilantes-vow',
      'Hunting the Syndicate: The Vigilante’s Vow',
      ['Elena', 'Zane'],
      'the Underground Vaults and the Waterfront Docks',
      [
        {
          id: 'hts-1',
          number: 1,
          title: 'Chapter 1 — Out of the Shadows',
          publishedAt: '2026-11-09',
          wordCount: 510,
          content: `For months, he had been a phantom in the peripheral vision of my life—a silhouette on the tree line, a hand guiding me out of danger when the syndicate’s enforcers raided the town.\n\nNow he stood directly before me under the warehouse floodlights, dressed in black tactical gear with silver rings adorning his bruised knuckles. His amber eyes bore into mine with an intensity that burned the air between us.\n\n“The game of hide and seek is over, Elena,” Zane murmured, his voice sending a shiver down my spine. “They took you from my territory. That means they signed their own death warrant.”\n\n“I don’t need an executioner, Zane,” I breathed, refusing to look away.\n\nHe stepped closer until his chest pressed against mine. “You don’t have an executioner, little mouse. You have me.”`
        }
      ],
      10
    ),
    reviews: []
  }
];

export const SCRAPED_COLLECTION_BOOKS: Book[] = [
  ...ORIGINAL_AFRICAN_PLAYS_AND_FABLES,
  ...rawMeta
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
        status: 'Completed' as const,
        isFree: true,
        source: 'gutenberg' as const,
        synopsis: info.synopsis,
        chapters: getMultiChaptersForSlug(m.slug),
        reviews: []
      };
    })
];

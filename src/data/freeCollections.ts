import type { Book } from './books';

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

export const BOOK_COLLECTIONS: BookCollection[] = [
  {
    id: 'col-faith-memoir',
    slug: 'faith-memoir-transformation',
    title: 'Faith, Memoir & Real-Life Transformation',
    subtitle: 'True stories of survival, liberation, resilience, and spiritual awakening',
    description:
      'Headlined by our #1 Exclusive Memoir UNBOUND by Kenah Pascal (with Foreword by Dr. Theresia Fuh-Tabe), alongside historic autobiographical masterpieces of resilience and freedom.',
    badge: '#1 Featured Collection',
    icon: 'auto_awesome',
    accentColor: 'from-[#e11d48] to-[#fbbf24]',
    bookSlugs: [
      'unbound',
      'narrative-of-the-life-of-frederick-douglass',
      'up-from-slavery',
      'the-souls-of-black-folk'
    ]
  },
  {
    id: 'col-dark-supernatural',
    slug: 'dark-gothic-supernatural',
    title: 'Alpha Wolves, Gothic & Supernatural',
    subtitle: 'Fated mates, immortal curses, and dark midnight legends',
    description:
      'From trending Alpha werewolf romances to the foundational gothic masterpieces of vampires, monsters, and immortal obsession.',
    badge: 'Trending Dark Reads',
    icon: 'nights_stay',
    accentColor: 'from-[#7c3aed] to-[#e11d48]',
    bookSlugs: [
      'his-alpha-queen',
      'mated-to-the-alpha-i-hate',
      'mated-to-the-twin-alphas',
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
    subtitle: 'Contract marriages, forbidden longing, and unforgettable love stories',
    description:
      'Modern billionaire drama meets the greatest romantic novels ever written—every chapter 100% unlocked.',
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
      'the-great-gatsby'
    ]
  },
  {
    id: 'col-revenge-mystery',
    slug: 'revenge-mystery-thrillers',
    title: 'Revenge, Masterminds & Crime Thrillers',
    subtitle: 'Calculated justice, brilliant detectives, and psychological suspense',
    description:
      'Gripping tales of wrongful imprisonment, genius sleuths on Baker Street, and high-stakes psychological drama.',
    badge: 'Page-Turners',
    icon: 'local_fire_department',
    accentColor: 'from-[#f59e0b] to-[#ef4444]',
    bookSlugs: [
      'the-count-of-monte-cristo',
      'the-adventures-of-sherlock-holmes',
      'the-hound-of-the-baskervilles',
      'crime-and-punishment'
    ]
  },
  {
    id: 'col-scifi-voyages',
    slug: 'scifi-fantasy-voyages',
    title: 'Sci-Fi, Time Travel & Epic Voyages',
    subtitle: 'Journey across time, beneath the oceans, and beyond the stars',
    description:
      'Visionary science fiction and mythic odysseys that shaped modern imagination.',
    badge: 'Visionary Worlds',
    icon: 'rocket_launch',
    accentColor: 'from-[#06b6d4] to-[#3b82f6]',
    bookSlugs: [
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
    subtitle: 'Ancient leadership, stoic discipline, and mental transformation',
    description:
      'Essential classics on mental mastery, strategic thinking, and purposeful living.',
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

export const SCRAPED_COLLECTION_BOOKS: Book[] = [
  // COLLECTION 1: FAITH, MEMOIR & TRANSFORMATION
  {
    id: 'gutenberg-23',
    slug: 'narrative-of-the-life-of-frederick-douglass',
    title: 'Narrative of the Life of Frederick Douglass',
    subtitle: 'An American Slave, Written by Himself',
    tagline: 'Once you learn to read, you will be forever free.',
    author: 'Frederick Douglass',
    coverUrl: 'https://www.gutenberg.org/cache/epub/23/pg23.cover.medium.jpg',
    genre: 'Memoir & Faith',
    tags: ['Memoir', 'Freedom', 'Resilience', '100% Free'],
    rating: 5.0,
    views: '310K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Frederick Douglass’s groundbreaking 1845 memoir chronicles his early life in bondage in Maryland, his secret determination to teach himself to read and write, his spiritual resolve, and his courageous escape to freedom in the North.',
    chapters: [
      {
        id: 'fd-1',
        number: 1,
        title: 'Chapter I — Birth and Early Childhood in Talbot County',
        publishedAt: '2026-11-08',
        wordCount: 620,
        content: `I was born in Tuckahoe, near Hillsborough, and about twelve miles from Easton, in Talbot county, Maryland. I have no accurate knowledge of my age, never having seen any authentic record containing it. By far the larger part of the slaves know as little of their ages as horses know of theirs, and it is the wish of most masters within my knowledge to keep their slaves thus ignorant. I do not remember to have ever met a slave who could tell of his birthday. They seldom come nearer to it than planting-time, harvest-time, cherry-time, spring-time, or fall-time.\n\nMy mother was named Harriet Bailey. She was the daughter of Isaac and Betsey Bailey, both colored, and quite dark. My mother was of a darker complexion than either my grandmother or grandfather.\n\nMy mother and I were separated when I was but an infant—before I knew her as my mother. It is a common custom, in the part of Maryland from which I ran away, to part children from their mothers at a very early age. Frequently, before the child has reached its twelfth month, its mother is taken from it, and hired out on some farm a considerable distance off.`
      },
      {
        id: 'fd-2',
        number: 2,
        title: 'Chapter VI — The Power of Literacy in Baltimore',
        publishedAt: '2026-11-08',
        wordCount: 580,
        content: `Very soon after I went to live with Mr. and Mrs. Auld, she very kindly commenced to teach me the A, B, C. After I had learned this, she assisted me in learning to spell words of three or four letters. Just at this point of my progress, Mr. Auld found out what was going on, and at once forbade Mrs. Auld to instruct me further, telling her, among other things, that it was unlawful, as well as unsafe, to teach a slave to read.\n\n“If you give a nigger an inch, he will take an ell. A nigger should know nothing but to obey his master—to do as he is told to do. Learning would spoil the best nigger in the world. Now,” said he, “if you teach that nigger how to read, there would be no keeping him. It would forever unfit him to be a slave.”\n\nThese words sank deep into my heart, stirred up sentiments within that lay slumbering, and called into existence an entirely new train of thought. It was a new and special revelation, explaining dark and mysterious things, with which my youthful understanding had struggled, but struggled in vain. I now understood what had been to me a most perplexing difficulty—to wit, the white man's power to enslave the black man. It was a grand achievement, and I prized it highly. From that moment, I understood the pathway from slavery to freedom.`
      },
      {
        id: 'fd-3',
        number: 3,
        title: 'Chapter X — The Turning Point of Courage',
        publishedAt: '2026-11-08',
        wordCount: 540,
        content: `You have seen how a man was made a slave; you shall see how a slave was made a man.\n\nThis battle with Mr. Covey was the turning-point in my career as a slave. It rekindled the few expiring embers of freedom, and revived within me a sense of my own manhood. It recalled the departed self-confidence, and inspired me again with a determination to be free. The gratification afforded by the triumph was a full compensation for whatever else might follow, even death itself.\n\nMy long-crushed spirit rose, cowardice departed, bold defiance took its place; and I now resolved that, however long I might remain a slave in form, the day had passed forever when I could be a slave in fact.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-2376',
    slug: 'up-from-slavery',
    title: 'Up From Slavery',
    subtitle: 'An Autobiography of Perseverance, Education, and Purpose',
    tagline: 'Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome.',
    author: 'Booker T. Washington',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2376/pg2376.cover.medium.jpg',
    genre: 'Memoir & Faith',
    tags: ['Autobiography', 'Rebuilding', 'Education', '100% Free'],
    rating: 4.9,
    views: '245K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Born into slavery in a Virginia log cabin, Booker T. Washington walked hundreds of miles to Hampton Institute, slept beneath a wooden sidewalk, and rose to build Tuskegee Institute from the ground up.',
    chapters: [
      {
        id: 'ufs-1',
        number: 1,
        title: 'Chapter I — A Slave Among Slaves',
        publishedAt: '2026-11-08',
        wordCount: 590,
        content: `I was born a slave on a plantation in Franklin County, Virginia. I am not quite sure of the exact place or exact date of my birth, but at any rate I suspect I must have been born somewhere and at some time. As nearly as I have been able to learn, I was born near a cross-roads post-office called Hale's Ford, and the year was 1858 or 1859.\n\nMy life had its beginning in the midst of the most miserable, desolate, and discouraging surroundings. This was so, however, not because my owners were especially cruel, for they were not, as compared with many others. I was born in a typical log cabin, about fourteen by sixteen feet square. In this cabin I lived with my mother and a brother and sister till after the Civil War, when we were all declared free.`
      },
      {
        id: 'ufs-2',
        number: 2,
        title: 'Chapter III — The Struggle for an Education',
        publishedAt: '2026-11-08',
        wordCount: 640,
        content: `One day, while at work in the coal-mine, I happened to overhear two miners talking about a great school for coloured people somewhere in Virginia. This was the first time that I had ever heard anything about any kind of school or college that was more pretentious than the little coloured school in our town.\n\nIn the darkness of the mine I crept closer to the two men who were talking. I heard one tell the other that not only was the school established for the members of my race, but that opportunities were provided by which poor but worthy students could work out all or a part of the cost of board, and at the same time be taught some trade or industry.\n\nI resolved at once to go to that school, although I had no idea where it was, or how many miles away, or how I was going to reach it; I remembered only that I was on fire constantly with one ambition, and that was to go to Hampton. This thought was with me day and night.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-408',
    slug: 'the-souls-of-black-folk',
    title: 'The Souls of Black Folk',
    subtitle: 'Essays and Sketches on Identity, Faith, and Freedom',
    tagline: 'Herein lie buried many things which if read with patience may show the strange meaning of being Black at the dawning of the Twentieth Century.',
    author: 'W. E. B. Du Bois',
    coverUrl: 'https://www.gutenberg.org/cache/epub/408/pg408.cover.medium.jpg',
    genre: 'Memoir & Faith',
    tags: ['Classic Literature', 'Faith & Soul', 'History', '100% Free'],
    rating: 4.9,
    views: '198K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'W. E. B. Du Bois’s towering literary work explores spiritual resilience, the Sorrow Songs, double-consciousness, and the quest for dignity and education in post-Reconstruction America.',
    chapters: [
      {
        id: 'sbf-1',
        number: 1,
        title: 'Chapter I — Of Our Spiritual Strivings',
        publishedAt: '2026-11-08',
        wordCount: 610,
        content: `Between me and the other world there is ever an unasked question: unasked by some through feelings of delicacy; by others through the difficulty of rightly framing it. All, nevertheless, flutter round it. They approach me in a half-hesitant sort of way, eye me curiously or compassionately, and then, instead of saying directly, How does it feel to be a problem? they say, I know an excellent colored man in my town; or, I fought at Mechanicsville; or, Do not these Southern outrages make your blood boil? At these I smile, or am interested, or reduce the boiling to a simmer, as the occasion may require. To the real question, How does it feel to be a problem? I answer seldom a word.\n\nAfter the Egyptian and Indian, the Greek and Roman, the Teuton and Mongolian, the Negro is a sort of seventh son, born with a veil, and gifted with second-sight in this American world,—a world which yields him no true self-consciousness, but only lets him see himself through the revelation of the other world. It is a peculiar sensation, this double-consciousness, this sense of always looking at one's self through the eyes of others, of measuring one's soul by the tape of a world that looks on in amused contempt and pity.`
      }
    ],
    reviews: []
  },

  // COLLECTION 2: DARK GOTHIC, VAMPIRE & SUPERNATURAL
  {
    id: 'gutenberg-345',
    slug: 'dracula',
    title: 'Dracula',
    subtitle: 'The Immortal Gothic Vampire Masterpiece',
    tagline: 'Listen to them—the children of the night. What music they make!',
    author: 'Bram Stoker',
    coverUrl: 'https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg',
    genre: 'Fantasy',
    tags: ['Vampire', 'Dark Gothic', 'Supernatural', '100% Free'],
    rating: 4.9,
    views: '420K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Young English solicitor Jonathan Harker travels to Castle Dracula in the Carpathian Mountains of Transylvania, only to discover that his aristocratic host is an ancient undead predator preparing to invade London.',
    chapters: [
      {
        id: 'drac-1',
        number: 1,
        title: 'Chapter I — Jonathan Harker’s Journal: The Road to Transylvania',
        publishedAt: '2026-11-07',
        wordCount: 680,
        content: `3 May. Bistritz.—Left Munich at 8:35 P. M., on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late. Buda-Pesth seems a wonderful place, from the glimpse which I got of it from the train and the little I could walk through the streets. I feared to go very far from the station, as we had arrived late and would start as near the correct time as possible.\n\nThe impression I had was that we were leaving the West and entering the East; the most western of splendid bridges over the Danube, which is here of noble width and depth, took us among the traditions of Turkish rule.\n\nJust before I was leaving, the old lady came up to my room and said in a very hysterical way: “Must you go? Oh! young Herr, must you go?” She was in such an excited state that she seemed to have lost her grip of what German she knew, and mixed it all up with some other language which I did not know at all. I was just able to follow her by asking many questions. When I told her that I must go at once, and that I was engaged on important business, she asked again: “Do you know what day it is?” I answered that it was the fourth of May. She shook her head as she said again: “Oh, yes! I know that! I know that, but do you know what day it is? It is the eve of St. George’s Day. Do you not know that to-night, when the clock strikes midnight, all the evil things in the world will have full sway?”`
      },
      {
        id: 'drac-2',
        number: 2,
        title: 'Chapter II — Castle Dracula at Midnight',
        publishedAt: '2026-11-07',
        wordCount: 620,
        content: `5 May. The Castle.—The grey of the morning has passed, and the sun is high over the distant horizon, which seems jagged, whether with trees or hills I know not, for it is so far off that big things and little are mixed. I am not sleepy, and, as I am not to be called till I awake, naturally I write till sleep comes.\n\nWithin, stood a tall old man, clean shaven save for a long white moustache, and clad in black from head to foot, without a single speck of colour about him anywhere. He held in his hand an antique silver lamp, in which the flame burned without chimney or globe of any kind, throwing long quivering shadows as it flickered in the draught of the open door.\n\nThe old man motioned me in with his right hand with a courtly gesture, saying in excellent English, but with a strange intonation: “Welcome to my house! Enter freely and of your own will!” He made no motion of stepping to meet me, but stood like a statue, as though his gesture of welcome had fixed him into stone. The instant, however, that I had stepped over the threshold, he moved impulsively forward, and holding out his hand grasped mine with a strength which made me wince, an effect which was not lessened by the fact that it seemed as cold as ice—more like the hand of a dead than a living man.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-84',
    slug: 'frankenstein',
    title: 'Frankenstein; Or, The Modern Prometheus',
    subtitle: 'Ambition, Creation, and the Price of Obsession',
    tagline: 'Beware; for I am fearless, and therefore powerful.',
    author: 'Mary Wollstonecraft Shelley',
    coverUrl: 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg',
    genre: 'Fantasy',
    tags: ['Dark Gothic', 'Sci-Fi Origins', 'Tragedy', '100% Free'],
    rating: 4.8,
    views: '365K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Driven by aconsuming desire to conquer death itself, brilliant young scientist Victor Frankenstein brings a sentient creature to life in his Ingolstadt laboratory—unleashing a haunting confrontation between creator and creation.',
    chapters: [
      {
        id: 'frank-1',
        number: 1,
        title: 'Letter I — St. Petersburgh, Dec. 11th, 17—',
        publishedAt: '2026-11-07',
        wordCount: 560,
        content: `You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.\n\nI am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes.`
      },
      {
        id: 'frank-2',
        number: 2,
        title: 'Chapter V — A Dreary Night of November',
        publishedAt: '2026-11-07',
        wordCount: 600,
        content: `It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.\n\nHow can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath; his hair was of a lustrous black, and flowing; his teeth of a pearly whiteness; but these luxuriances only formed a more horrid contrast with his watery eyes.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-174',
    slug: 'the-picture-of-dorian-gray',
    title: 'The Picture of Dorian Gray',
    subtitle: 'Eternal Youth and the Portrait of a Soul',
    tagline: 'There is only one thing in the world worse than being talked about, and that is not being talked about.',
    author: 'Oscar Wilde',
    coverUrl: 'https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Dark Gothic', 'Supernatural', 'Classic', '100% Free'],
    rating: 4.9,
    views: '290K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Dazzling young aristocrat Dorian Gray wishes that his painted portrait would age and bear the scars of his sins while he remains forever young and unblemished.',
    chapters: [
      {
        id: 'dg-1',
        number: 1,
        title: 'Chapter I — The Studio of Basil Hallward',
        publishedAt: '2026-11-07',
        wordCount: 620,
        content: `The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.\n\nFrom the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flamelike as theirs.\n\nIn the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-43',
    slug: 'dr-jekyll-and-mr-hyde',
    title: 'The Strange Case of Dr. Jekyll and Mr. Hyde',
    subtitle: 'Two Natures Warring Within One Man',
    tagline: 'Man is not truly one, but truly two.',
    author: 'Robert Louis Stevenson',
    coverUrl: 'https://www.gutenberg.org/cache/epub/43/pg43.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Mystery', 'Psychological', 'Gothic', '100% Free'],
    rating: 4.8,
    views: '215K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'London lawyer Gabriel John Utterson investigates the sinister connection between his respected friend Dr. Henry Jekyll and the ruthless, shadowy Edward Hyde.',
    chapters: [
      {
        id: 'jh-1',
        number: 1,
        title: 'Chapter I — Story of the Door',
        publishedAt: '2026-11-07',
        wordCount: 580,
        content: `Mr. Utterson the lawyer was a man of a rugged countenance that was never lighted by a smile; cold, scanty and embarrassed in discourse; backward in sentiment; lean, long, dusty, dreary and yet somehow lovable. At friendly meetings, and when the wine was to his taste, something eminently human beaconed from his eye; something indeed which never found its way into his talk, but which spoke not only in these silent symbols of the after-dinner face, but more often and loudly in the acts of his life.\n\nIt chanced on one of these rambles that their way led them down a by-street in a busy quarter of London. The street was small and what is called quiet, but it drove a thriving trade on the week-days.`
      }
    ],
    reviews: []
  },

  // COLLECTION 3: ROMANCE, BILLIONAIRE & HIGH SOCIETY
  {
    id: 'gutenberg-1260',
    slug: 'jane-eyre',
    title: 'Jane Eyre',
    subtitle: 'Passion, Secrets, and Independence at Thornfield Hall',
    tagline: 'I am no bird; and no net ensnares me; I am a free human being with an independent will.',
    author: 'Charlotte Brontë',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1260/pg1260.cover.medium.jpg',
    genre: 'Romance',
    tags: ['Gothic Romance', 'Brooding Hero', '100% Free'],
    rating: 4.9,
    views: '340K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Orphaned governess Jane Eyre arrives at the brooding estate of Thornfield Hall and falls deeply in love with its enigmatic master, Edward Rochester—until a terrifying secret locked in the attic threatens to tear them apart.',
    chapters: [
      {
        id: 'je-1',
        number: 1,
        title: 'Chapter I — Gateshead Hall',
        publishedAt: '2026-11-06',
        wordCount: 590,
        content: `There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question.\n\nI was glad of it: I never liked long walks, especially on chilly afternoons: dreadful to me was the coming home in the raw twilight, with nipped fingers and toes, and a heart saddened by the chidings of Bessie, the nurse, and humbled by the consciousness of my physical inferiority to Eliza, John, and Georgiana Reed.`
      },
      {
        id: 'je-2',
        number: 2,
        title: 'Chapter XII — First Meeting on the Moonlit Lane',
        publishedAt: '2026-11-06',
        wordCount: 560,
        content: `Aottle-green surge of hills rose around Thornfield. On the causeway I heard a horse approaching at a rapid trot through the rising mist. A huge dog bounded ahead through the twilight—and then horse and rider crashed upon the sheet of ice covering the lane.\n\n“Are you injured, sir?” I asked, stepping out from the stile.\n\nHe had a dark face, with stern features and a heavy brow; his eyes and gathered eyebrows looked ireful and thwarted just now. That stranger on the icy lane was Mr. Edward Fairfax Rochester, master of Thornfield Hall.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-768',
    slug: 'wuthering-heights',
    title: 'Wuthering Heights',
    subtitle: 'Fierce Obsession on the Yorkshire Moors',
    tagline: 'Whatever our souls are made of, his and mine are the same.',
    author: 'Emily Brontë',
    coverUrl: 'https://www.gutenberg.org/cache/epub/768/pg768.cover.medium.jpg',
    genre: 'Romance',
    tags: ['Dark Romance', 'Revenge', 'Obsession', '100% Free'],
    rating: 4.8,
    views: '275K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'On the windswept Yorkshire moors, the tempestuous bond between foundling Heathcliff and Catherine Earnshaw ignites a multi-generational saga of passion, betrayal, and vengeance.',
    chapters: [
      {
        id: 'wh-1',
        number: 1,
        title: 'Chapter I — 1801: A Visit to Wuthering Heights',
        publishedAt: '2026-11-06',
        wordCount: 570,
        content: `1801.—I have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with. This is certainly a beautiful country! In all England, I do not believe that I could have fixed on a situation so completely removed from the stir of society. A perfect misanthropist’s heaven: and Mr. Heathcliff and I are such a suitable pair to divide the desolation between us.\n\nWuthering Heights is the name of Mr. Heathcliff’s dwelling. ‘Wuthering’ being a significant provincial adjective, descriptive of the atmospheric tumult to which its station is exposed in stormy weather.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-64317',
    slug: 'the-great-gatsby',
    title: 'The Great Gatsby',
    subtitle: 'Glamour, Wealth, and the Green Light Across the Bay',
    tagline: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://www.gutenberg.org/cache/epub/64317/pg64317.cover.medium.jpg',
    genre: 'Billionaire',
    tags: ['Billionaire', 'Jazz Age', 'Lost Love', '100% Free'],
    rating: 4.9,
    views: '490K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Mysterious self-made millionaire Jay Gatsby throws lavish midnight parties at his West Egg mansion with one singular obsession: winning back Daisy Buchanan across the water.',
    chapters: [
      {
        id: 'gg-1',
        number: 1,
        title: 'Chapter I — West Egg and the Green Light',
        publishedAt: '2026-11-06',
        wordCount: 640,
        content: `In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.\n\n“Whenever you feel like criticizing anyone,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”\n\nHe didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.\n\nOnly Gatsby, the man who gives his name to this book, was exempt from my reaction—Gatsby, who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away.`
      }
    ],
    reviews: []
  },

  // COLLECTION 4: REVENGE, MYSTERY & CRIME THRILLERS
  {
    id: 'gutenberg-1661',
    slug: 'the-adventures-of-sherlock-holmes',
    title: 'The Adventures of Sherlock Holmes',
    subtitle: 'Twelve Masterpiece Cases from 221B Baker Street',
    tagline: 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    author: 'Arthur Conan Doyle',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Detective', 'Mystery', 'Thriller', '100% Free'],
    rating: 5.0,
    views: '430K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Consulting detective Sherlock Holmes and his loyal companion Dr. John Watson unravel London’s most baffling mysteries—beginning with the unforgettable Irene Adler in “A Scandal in Bohemia.”',
    chapters: [
      {
        id: 'sh-1',
        number: 1,
        title: 'Adventure I — A Scandal in Bohemia',
        publishedAt: '2026-11-05',
        wordCount: 650,
        content: `To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind.\n\nHe was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil from men’s motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-2852',
    slug: 'the-hound-of-the-baskervilles',
    title: 'The Hound of the Baskervilles',
    subtitle: 'A Supernatural Curse on the Devonshire Moors',
    tagline: 'Mr. Holmes, they were the footprints of a gigantic hound!',
    author: 'Arthur Conan Doyle',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2852/pg2852.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Mystery', 'Gothic Thriller', 'Sherlock Holmes', '100% Free'],
    rating: 4.9,
    views: '260K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'After Sir Charles Baskerville is found dead on the grim Devonshire moors with monstrous footprints nearby, Sherlock Holmes and Dr. Watson race to protect the last heir from an ancient family curse.',
    chapters: [
      {
        id: 'hb-1',
        number: 1,
        title: 'Chapter I — Mr. Sherlock Holmes',
        publishedAt: '2026-11-05',
        wordCount: 580,
        content: `Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before.\n\nIt was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a “Penang lawyer.” Just under the head was a broad silver band nearly an inch across. “To James Mortimer, M.R.C.S., from his friends of the C.C.H.,” was engraved upon it, with the date “1884.”`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-2554',
    slug: 'crime-and-punishment',
    title: 'Crime and Punishment',
    subtitle: 'Guilt, Conscience, and Redemption in St. Petersburg',
    tagline: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
    author: 'Fyodor Dostoevsky',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2554/pg2554.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Psychological Thriller', 'Redemption', 'Classic', '100% Free'],
    rating: 4.9,
    views: '380K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Impoverished former student Rodion Raskolnikov convinces himself that he is above ordinary moral law—only to face a relentless psychological reckoning and the redemptive compassion of Sonia.',
    chapters: [
      {
        id: 'cp-1',
        number: 1,
        title: 'Part I, Chapter I — An Exceptionally Hot Evening in July',
        publishedAt: '2026-11-05',
        wordCount: 610,
        content: `On an exceptionally hot evening early in July a young man came out of the garret in which he lodged in S. Place and walked slowly, as though in hesitation, towards K. bridge.\n\nHe had successfully avoided meeting his landlady on the staircase. His garret was under the roof of a high, five-storied house and was more like a cupboard than a room. The landlady who provided him with garret, dinners, and attendance, lived on the floor below, and every time he went out he was obliged to pass her kitchen, the door of which invariably stood open. And each time he passed, the young man had a sick, frightened feeling, which made him scowl and feel ashamed.`
      }
    ],
    reviews: []
  },

  // COLLECTION 5: SCI-FI, TIME TRAVEL & EPIC VOYAGES
  {
    id: 'gutenberg-35',
    slug: 'the-time-machine',
    title: 'The Time Machine',
    subtitle: 'A Journey to the Year 802,701',
    tagline: 'We are always getting away from the present moment.',
    author: 'H. G. Wells',
    coverUrl: 'https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg',
    genre: 'Fantasy',
    tags: ['Sci-Fi', 'Time Travel', 'Future World', '100% Free'],
    rating: 4.8,
    views: '295K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'A Victorian scientist builds a machine capable of traveling through the Fourth Dimension and hurtles forward to the year 802,701—discovering a divided humanity of surface-dwelling Eloi and subterranean Morlocks.',
    chapters: [
      {
        id: 'tm-1',
        number: 1,
        title: 'Chapter I — The Fourth Dimension',
        publishedAt: '2026-11-04',
        wordCount: 590,
        content: `The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burned brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses.\n\n“You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. The geometry, for instance, they taught you at school is founded on a misconception.”`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-164',
    slug: 'twenty-thousand-leagues-under-the-sea',
    title: 'Twenty Thousand Leagues Under the Sea',
    subtitle: 'Aboard the Nautilus with Captain Nemo',
    tagline: 'The sea is everything. Its breath is pure and healthy.',
    author: 'Jules Verne',
    coverUrl: 'https://www.gutenberg.org/cache/epub/164/pg164.cover.medium.jpg',
    genre: 'Fantasy',
    tags: ['Adventure', 'Ocean Odyssey', 'Sci-Fi', '100% Free'],
    rating: 4.9,
    views: '270K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Professor Pierre Aronnax and harpooner Ned Land are captured aboard the futuristic submarine Nautilus, commanded by the brilliant and enigmatic Captain Nemo.',
    chapters: [
      {
        id: 'ttl-1',
        number: 1,
        title: 'Part I, Chapter I — A Shifting Reef',
        publishedAt: '2026-11-04',
        wordCount: 570,
        content: `The year 1866 was signalised by a remarkable incident, a mysterious and puzzling phenomenon, which doubtless no one has yet forgotten. Not to mention rumours which agitated the maritime population and excited the public mind, even in the interior of continents, seafaring men were particularly excited.\n\nFor some time past vessels had been met by “an enormous thing,” a long object, spindle-shaped, occasionally phosphorescent, and infinitely larger and more rapid in its movements than a whale.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-36',
    slug: 'the-war-of-the-worlds',
    title: 'The War of the Worlds',
    subtitle: 'The Martian Invasion of Earth',
    tagline: 'No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man’s.',
    author: 'H. G. Wells',
    coverUrl: 'https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg',
    genre: 'Fantasy',
    tags: ['Sci-Fi', 'Alien Invasion', 'Survival', '100% Free'],
    rating: 4.8,
    views: '250K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'When strange metallic cylinders crash onto Horsell Common near London, humanity faces a relentless invasion by towering Martian fighting-machines armed with the Heat-Ray.',
    chapters: [
      {
        id: 'wotw-1',
        number: 1,
        title: 'Book I, Chapter I — The Eve of the War',
        publishedAt: '2026-11-04',
        wordCount: 610,
        content: `No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man’s and yet as mortal as his own; that as men busied themselves about their various concerns they were scrutinised and studied, perhaps almost as narrowly as a man with a microscope might scrutinise the transient creatures that swarm and multiply in a drop of water.\n\nYet across the gulf of space, minds that are to our minds as ours are to those of the beasts that perish, intellects vast and cool and unsympathetic, regarded this earth with envious eyes, and slowly and surely drew their plans against us.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-1727',
    slug: 'the-odyssey',
    title: 'The Odyssey',
    subtitle: 'The Ten-Year Voyage Home to Ithaca',
    tagline: 'Of all creatures that breathe and move upon the earth, nothing is bred that is weaker than man.',
    author: 'Homer',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1727/pg1727.cover.medium.jpg',
    genre: 'Fantasy',
    tags: ['Mythology', 'Epic Adventure', 'Classic', '100% Free'],
    rating: 4.9,
    views: '330K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Following the fall of Troy, Greek hero Odysseus braves the Cyclops, the Sirens, and the wrath of Poseidon across ten perilous years to reunite with his wife Penelope and son Telemachus in Ithaca.',
    chapters: [
      {
        id: 'od-1',
        number: 1,
        title: 'Book I — The Council of the Gods',
        publishedAt: '2026-11-04',
        wordCount: 580,
        content: `Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home.\n\nAt that time all the other Greeks who had escaped destruction were safe at home and had survived both war and sea; Odysseus alone, longing for his wife and his return home, was detained by the nymph Calypso in her vaulted cave.`
      }
    ],
    reviews: []
  },

  // COLLECTION 6: POWER, STRATEGY & INNER MASTERY
  {
    id: 'gutenberg-132',
    slug: 'the-art-of-war',
    title: 'The Art of War',
    subtitle: 'Timeless Principles of Strategy, Discipline, and Victory',
    tagline: 'Supreme excellence consists in breaking the enemy’s resistance without fighting.',
    author: 'Sun Tzu',
    coverUrl: 'https://www.gutenberg.org/cache/epub/132/pg132.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Strategy', 'Leadership', 'Wisdom', '100% Free'],
    rating: 5.0,
    views: '510K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Translated by Lionel Giles, Sun Tzu’s ancient military treatise remains the definitive guide to strategy, preparation, emotional discipline, and turning adversity into advantage.',
    chapters: [
      {
        id: 'aow-1',
        number: 1,
        title: 'Chapter I — Laying Plans',
        publishedAt: '2026-11-03',
        wordCount: 540,
        content: `Sun Tzu said: The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.\n\nThe art of war, then, is governed by five constant factors, to be taken into account in one’s deliberations, when seeking to determine the conditions obtaining in the field. These are: (1) The Moral Law; (2) Heaven; (3) Earth; (4) The Commander; (5) Method and discipline.\n\nAll warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.`
      },
      {
        id: 'aow-2',
        number: 2,
        title: 'Chapter III — Attack by Stratagem',
        publishedAt: '2026-11-03',
        wordCount: 520,
        content: `Sun Tzu said: In the practical art of war, the best thing of all is to take the enemy’s country whole and intact; to shatter and destroy it is not so good. So, too, it is better to recapture an army entire than to destroy it.\n\nHence to fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy’s resistance without fighting.\n\nIf you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-2680',
    slug: 'meditations',
    title: 'Meditations',
    subtitle: 'Personal Writings on Stoic Resilience and Self-Mastery',
    tagline: 'You have power over your mind—not outside events. Realize this, and you will find strength.',
    author: 'Marcus Aurelius',
    coverUrl: 'https://www.gutenberg.org/cache/epub/2680/pg2680.cover.medium.jpg',
    genre: 'Memoir & Faith',
    tags: ['Stoicism', 'Mindset', 'Self-Mastery', '100% Free'],
    rating: 5.0,
    views: '460K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Written in his military tent while on campaign, Roman Emperor Marcus Aurelius’s private journal offers timeless counsel on inner peace, impulse control, gratitude, and unshakable character.',
    chapters: [
      {
        id: 'med-1',
        number: 1,
        title: 'Book II — Begin the Morning With Purpose',
        publishedAt: '2026-11-03',
        wordCount: 560,
        content: `Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial. All these things happen to them by reason of their ignorance of what is good and evil. But I who have seen the nature of the good that it is beautiful, and of the bad that it is ugly, and the nature of him who does wrong, that it is akin to me, not only of the same blood or seed, but that it participates in the same intelligence and the same portion of the divinity, I can neither be injured by any of them, for no one can fix on me what is ugly, nor can I be angry with my kinsman, nor hate him.\n\nDo every act of thy life as if it were thy last, laying aside all carelessness and passionate aversion from the commands of reason, and all hypocrisy, and self-love, and discontent with the portion which has been given to thee.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-1232',
    slug: 'the-prince',
    title: 'The Prince',
    subtitle: 'Statecraft, Power, and Political Realism',
    tagline: 'Everyone sees what you appear to be, few experience what you really are.',
    author: 'Niccolò Machiavelli',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1232/pg1232.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Strategy', 'Power', 'Philosophy', '100% Free'],
    rating: 4.8,
    views: '310K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'Florentine diplomat Niccolò Machiavelli examines how leaders acquire, maintain, and lose power in a turbulent world.',
    chapters: [
      {
        id: 'pr-1',
        number: 1,
        title: 'Chapter I — How Many Kinds of Principalities There Are',
        publishedAt: '2026-11-03',
        wordCount: 490,
        content: `All states, all powers, that have held and hold rule over men have been and are either republics or principalities. Principalities are either hereditary, in which the family has been long established; or they are new.\n\nThe new are either entirely new, as was Milan to Francesco Sforza, or they are, as it were, members annexed to the hereditary state of the prince who has acquired them, as was the kingdom of Naples to that of the King of Spain.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-4507',
    slug: 'as-a-man-thinketh',
    title: 'As a Man Thinketh',
    subtitle: 'The Power of Thought in Shaping Character and Destiny',
    tagline: 'A man is literally what he thinks, his character being the complete sum of all his thoughts.',
    author: 'James Allen',
    coverUrl: 'https://www.gutenberg.org/cache/epub/4507/pg4507.cover.medium.jpg',
    genre: 'Memoir & Faith',
    tags: ['Mindset', 'Transformation', 'Self-Help Classic', '100% Free'],
    rating: 5.0,
    views: '390K',
    status: 'Completed',
    isFree: true,
    source: 'gutenberg',
    synopsis:
      'James Allen’s beloved classic reveals how every person holds the key to rebuilding their life, habits, and circumstances by cultivating disciplined, purposeful thoughts.',
    chapters: [
      {
        id: 'amt-1',
        number: 1,
        title: 'Chapter I — Thought and Character',
        publishedAt: '2026-11-03',
        wordCount: 580,
        content: `The aphorism, “As a man thinketh in his heart so is he,” not only embraces the whole of a man’s being, but is so comprehensive as to reach out to every condition and circumstance of his life. A man is literally what he thinks, his character being the complete sum of all his thoughts.\n\nAs the plant springs from, and could not be without, the seed, so every act of a man springs from the hidden seeds of thought, and could not have appeared without them. This applies equally to those acts called “spontaneous” and “unpremeditated” as to those which are deliberately executed.\n\nAct is the blossom of thought, and joy and suffering are its fruits; thus does a man garner in the sweet and bitter fruitage of his own husbandry.`
      }
    ],
    reviews: []
  }
];

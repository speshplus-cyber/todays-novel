const fs = require('fs');
const path = require('path');

// 1. Make multiChapterData.json lean: Keep booksMeta, keep chapter metadata (id, number, title, publishedAt, wordCount), but make content a short preview.
const multiPath = 'D:/todays-novel-app/src/data/multiChapterData.json';
const raw = JSON.parse(fs.readFileSync(multiPath, 'utf8'));

const leanChaptersBySlug = {};
for (const [slug, chapters] of Object.entries(raw.chaptersBySlug || {})) {
  leanChaptersBySlug[slug] = chapters.map(c => ({
    id: c.id,
    number: c.number,
    title: c.title,
    publishedAt: c.publishedAt,
    wordCount: c.wordCount,
    content: (c.content || '').slice(0, 150) + '...'
  }));
}

const leanMultiData = {
  booksMeta: raw.booksMeta,
  chaptersBySlug: leanChaptersBySlug
};

fs.writeFileSync(multiPath, JSON.stringify(leanMultiData));
console.log('Successfully updated multiChapterData.json to lean version. New size:', fs.statSync(multiPath).size);

// 2. Export remaining original stories to individual chapters files
function buildMultiChaptersForStory(slug, titlePrefix, characters, setting, starterScenes, totalScenes = 10) {
  const chapters = [];
  const sceneThemes = [
    'The Gathering of Whispers',
    'Challenging the Elders and the Oath',
    'Confrontation in the Shadows',
    'The Secret Message Delivered',
    'The Trial of Truth and Tradition',
    'The Turn of the Tide',
    'A Sacrifice Demanded',
    'The Dawn of Revolution',
    'The Final Stand for Honor',
    'A New Horizon for the Free'
  ];
  for (let i = 1; i <= totalScenes; i++) {
    const starter = starterScenes.find(s => s.number === i);
    if (starter) {
      chapters.push(starter);
    } else {
      const theme = sceneThemes[i - 1] || ('Act ' + i + ' — The Resolution');
      const sceneTitle = 'Scene ' + i + ' — ' + theme;
      const char1 = characters[0] || 'The Hero';
      const char2 = characters[1] || 'The Adversary';
      const content = '=== ' + sceneTitle.toUpperCase() + ' ===\n\n' +
        'Setting: ' + setting + '. The atmosphere is charged with tension.\n\n' +
        char1 + ': "We have walked under this cloud long enough. If we do not speak now, the truth will be buried beneath the soil of our ancestors!"\n\n' +
        char2 + ': "Do you dare defy the council? Tradition was carved into stone long before your father learned to walk."\n\n' +
        char1 + ': "Tradition that suffocates its own children is not wisdom—it is fear wearing a crown. Today, we choose life."\n\n' +
        'The onlookers murmur. The drumbeats slow, then erupt in a rhythmic cadence that reverberates across the hills.\n\n' +
        char2 + ': "Then let heaven be the judge between your conviction and our law."\n\n' +
        'With a decisive movement, ' + char1 + ' turns toward the gathered assembly. The stage dims to an amber glow as destiny shifts into motion.';
      chapters.push({
        id: slug + '-' + i,
        number: i,
        title: sceneTitle,
        publishedAt: '2026-11-09',
        wordCount: 480,
        content: content
      });
    }
  }
  return chapters;
}

const origSlugs = [
  {
    slug: 'awa-the-voice-of-the-village-play',
    title: 'Awa: The Voice of the Village',
    chars: ['Awa', 'Elder Kofi & Mother Efua'],
    setting: 'the Royal Courtyard of Oguaa & the Market Square',
    starter: [{ id: 'awa-play-1', number: 1, title: 'Scene 1 — The Courtyard Lanterns at Dusk', publishedAt: '2026-11-09', wordCount: 520, content: 'Under the ancient Baobab tree, lanterns flickered against the twilight. Awa stood motionless before the council of elders, her gaze unwavering despite the heavy silence pressing down upon the courtyard.\n\nElder Kofi cleared his throat, leaning forward on his carved stool. "Awa, daughter of Nkwanta, the bride-price has been settled. Chief Bawa has sent fifty bags of salt, twelve cattle, and royal cloths of gold. Why do your feet hesitate to cross his threshold?"\n\nAwa lifted her chin, the red beads around her neck catching the lantern light. "Because, respected Elder, a marriage forged in coins and cattle without the consent of the heart is not a marriage—it is an auction. And my life is not livestock to be bartered in the evening market."\n\nA gasp rippled through the gathered kin. Mother Efua gripped her wrap tightly, her eyes wide with terror and pride.\n\n"You speak of rebellion!" Chief Bawa’s envoy roared, stepping into the center circle. "The customs of our ancestors cannot be rewritten by a defiant maiden!"\n\n"If our ancestors lived today," Awa answered with steady calm, "they would weep to see custom weaponized to chain their daughters. If you want Chief Bawa’s wealth, return it yourself. My destiny belongs to God, to my people, and to myself."\n\nWith those words, the courtyard ignited into fierce debate. The old order had been shaken, and the voice of the village would never be silenced again.' }]
  },
  {
    slug: 'three-suitors-in-the-grassfields-play',
    title: 'Three Suitors in the Grassfields',
    chars: ['Juliette', 'Atangana & Father Mbarga'],
    setting: 'the Grassfields Homestead Veranda',
    starter: [{ id: 'suitors-1', number: 1, title: 'Scene 1 — The Three Envoys Arrive', publishedAt: '2026-11-09', wordCount: 490, content: 'The morning mist clung to the rolling hills of the Grassfields. On the veranda of Papa Mbarga, three distinct delegations waited, each representing a wealthy suitor eager to win the hand of Juliette, the educated daughter of the compound.\n\nThere was the wealthy civil servant Ndi, wearing a three-piece suit in the tropical heat; the flamboyant merchant Sangoi, flaunting Italian shoes; and the traditional title-holder Chief Medza, accompanied by a praise singer.\n\nPapa Mbarga beamed, stroking his chin as he looked at the gifts piled high: crates of champagne, sacks of rice, and fat envelopes.\n\n"Juliette!" Mbarga shouted into the inner room. "Come greet your future! A daughter is the greatest bank a wise father can possess!"\n\nJuliette stepped out onto the veranda, dressed in her university graduation sash, holding a briefcase rather than a tray of food.\n\n"Father," she smiled calmly, eyeing the three anxious suitors. "I have reviewed the balance sheet of your proposals. And I regret to inform you that this company is taking itself public. I am marrying my intellect, my freedom, and my own career first."\n\nThe praise singer stopped mid-note. Papa Mbarga dropped his calabash. The battle of tradition and modern autonomy had begun.' }]
  },
  {
    slug: 'the-sacred-lake-and-the-palm-wine-council',
    title: 'The Sacred Lake & The Palm Wine Council',
    chars: ['Nkeng', 'Fon of Kom & High Priestess Bih'],
    setting: 'the Misty Shores of Lake Awing',
    starter: [{ id: 'lake-1', number: 1, title: 'Scene 1 — The Ripples on Lake Awing', publishedAt: '2026-11-09', wordCount: 510, content: 'Dawn broke over the crater hills surrounding Lake Awing. The sacred waters lay still as black glass, reflecting the silhouette of the Fon’s royal council gathered beside the sacrificial altar.\n\nNkeng, a young environmental scholar born in the kingdom, stood before the king with satellite maps and soil samples clutched in his weathered hands.\n\n"Your Majesty," Nkeng pleaded, his voice breaking through the solemn drone of ceremonial flutes. "The foreign mining consortium has promised gold for your treasury, but their chemical runoffs will poison Lake Awing within three seasons. Once the sacred waters die, the ancestral fish die, and the land will turn to barren clay!"\n\nHigh Priestess Bih stepped forward, tossing cowrie shells onto the sacred stones. "The spirits do not speak of gold, Nkeng. They speak of drought and sorrow if greed enters our gates."\n\nThe Fon shifted in his leopard-skin throne. "Nkeng, you come with papers from the city, but the palace needs schools and hospitals. How can we refuse the wealth of nations?"\n\n"True wealth, my King," Nkeng replied, kneeling to touch the sacred soil, "is leaving our children a kingdom where the water can still be drunk without poison."' }]
  },
  {
    slug: 'animal-farm-allegory-and-companion',
    title: 'Animal Farm: The Manor Rebellion',
    chars: ['Napoleon & Squealer', 'Boxer & Snowball'],
    setting: 'the Big Barn & Windmill Hill',
    starter: [{ id: 'farm-1', number: 1, title: 'Chapter 1 — The Song of Beasts and Liberty', publishedAt: '2026-11-09', wordCount: 530, content: 'Under the dim rafters of the Big Barn, Old Major’s dying prophecy still echoed in the hearts of the animals. Mr. Jones, drunk on gin at the Red Lion, had forgotten to feed the beasts of Manor Farm. Hunger, that sharpest of spurs, drove the cows to break through the store-shed door, and when the whip cracked in the dark, the rebellion erupted not by conspiracy, but by the irresistible thirst for dignity.\n\nBy sunrise, Manor Farm was renamed Animal Farm. The Seven Commandments were painted in gleaming white letters across the barn wall, terminating in the golden creed:\n\nALL ANIMALS ARE EQUAL.\n\nBoxer, the great cart-horse whose muscles seemed carved from granite, tossed his mane and vowed, "I will work harder!" Snowball drew elaborate diagrams in chalk for a windmill that would electrify the stalls and grant every creature warmth and leisure.\n\nYet from the shadows of the harness-room, Napoleon, the silent Berkshire boar, watched with cold, calculating eyes. Liberty was sweet in the summer dawn, but power, he knew, was sweeter still—and the seeds of betrayal had already been planted in the orchard milk.' }]
  },
  {
    slug: 'haunting-the-manor-the-stalkers-shadow',
    title: 'Haunting the Manor: The Stalker’s Shadow',
    chars: ['Adeline', 'Zade Meadows'],
    setting: 'the Secluded Gothic Estate of Parsons Manor',
    starter: [{ id: 'htm-1', number: 1, title: 'Chapter 1 — Eyes in the Willow Trees', publishedAt: '2026-11-09', wordCount: 520, content: 'Parsons Manor stood like a stone sentinel amid the weeping willows, shrouded in perpetual coastal fog. When I inherited the gothic estate from my eccentric grandmother, I sought quiet refuge to write my novels—a solitary haven away from the suffocating glare of the city.\n\nBut solitude is an illusion when someone decides you belong to them.\n\nIt began with small things: a single black calla lily placed on the grand piano while I slept; my antique music box playing in the dead of midnight; the distinct scent of spiced whiskey and rainwater lingering in my study after the French doors were locked tight.\n\nTonight, standing on the balcony as thunder shook the Victorian eaves, I saw him.\n\nA tall silhouette stood at the edge of the iron gates, perfectly still in the torrential rain. His dark coat whipped in the gale, but his obsidian eyes were fixed straight on mine—unblinking, possessive, and terrifyingly patient.\n\nA whisper of wind carried the chill into my bones. He wasn’t a ghost trying to haunt my house.\n\nHe was a predator, and I had just stepped into his cage.' }]
  },
  {
    slug: 'hunting-the-syndicate-the-vigilantes-vow',
    title: 'Hunting the Syndicate: The Vigilante’s Vow',
    chars: ['Elena', 'Zane'],
    setting: 'the Waterfront Warehouses of the Steel District',
    starter: [{ id: 'hts-1', number: 1, title: 'Chapter 1 — Out of the Shadows', publishedAt: '2026-11-09', wordCount: 510, content: 'For months, he had been a phantom in the peripheral vision of my life—a silhouette on the tree line, a hand guiding me out of danger when the syndicate’s enforcers raided the town.\n\nNow he stood directly before me under the warehouse floodlights, dressed in black tactical gear with silver rings adorning his bruised knuckles. His amber eyes bore into mine with an intensity that burned the air between us.\n\n"The game of hide and seek is over, Elena," Zane murmured, his voice sending a shiver down my spine. "They took you from my territory. That means they signed their own death warrant."\n\n"I don’t need an executioner, Zane," I breathed, refusing to look away.\n\nHe stepped closer until his chest pressed against mine. "You don’t have an executioner, little mouse. You have me."' }]
  }
];

const outDir = 'D:/todays-novel-app/src/data/chapters';
origSlugs.forEach(item => {
  const chapters = buildMultiChaptersForStory(item.slug, item.title, item.chars, item.setting, item.starter, 10);
  fs.writeFileSync(path.join(outDir, `${item.slug}.json`), JSON.stringify(chapters, null, 2));
  console.log(`Saved ${chapters.length} chapters for ${item.slug}`);
});

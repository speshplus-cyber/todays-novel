export interface Chapter {
  id: string;
  number: number;
  part?: string;
  title: string;
  content: string;
  wordCount: number;
  publishedAt: string;
}

export interface Review {
  id: string;
  readerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  author: string;
  authorBio?: string;
  forewordBy?: string;
  coverUrl: string;
  genre: string;
  tags: string[];
  rating: number;
  views: string;
  status: 'Completed' | 'Ongoing';
  isExclusive?: boolean;
  isPriority?: boolean;
  isFree?: boolean;
  synopsis: string;
  chapters: Chapter[];
  reviews: Review[];
  source?: 'original' | 'gutenberg' | 'custom';
}

export const GENRES = [
  'Discover',
  'Memoir & Faith',
  'Romance',
  'Werewolf',
  'Billionaire',
  'Fantasy',
  'Drama'
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'unbound-kenah-pascal',
    slug: 'unbound',
    title: 'UNBOUND',
    subtitle: 'Rescued from Substance Use — A Memoir of Addiction, Rehabilitation, Rebuilding, and Transformation',
    tagline: 'For everyone who has ever believed that their worst chapter was their whole story.',
    author: 'Kenah Pascal',
    forewordBy: 'Dr. Theresia Fuh-Tabe',
    authorBio:
      'Kenah Pascal grew up in Cameroon in a vibrant household where his father had three wives under one roof, and studied at GBHS Government School and PSS Bafut boarding school. A lover of music with big dreams, he found himself drawn into the quiet trap of substance use—where temporary relief turned into years of dependency, broken trust, isolation, and exhaustion. After reaching a turning point and entering Living Vine Rehab Center in Bamenda, Kenah learned the tools of accountability, resilience, and faith. Rebuilding from the ground up—working in a warehouse taping 186 boxes a day, writing in his notebook, earning a certificate, opening a restaurant and other small businesses, and becoming a devoted father to his son—Kenah Pascal wrote UNBOUND so that anyone trapped in the shadows knows that a craving is not a command, your past is not your identity, and the final word is not survival, but transformation.',
    coverUrl: '/covers/unbound-cover.svg',
    genre: 'Memoir & Faith',
    tags: [
      'Exclusive #1',
      'Memoir',
      'Living Vine Bamenda',
      'Faith & Rescue',
      '100% Free'
    ],
    rating: 5.0,
    views: '842K',
    status: 'Completed',
    isExclusive: true,
    isPriority: true,
    isFree: true,
    synopsis:
      '“There was a time when I thought my story began with drugs. I was wrong. The drugs were only the chapter where everything became visible.”\n\nIn UNBOUND: Rescued from Substance Use, Kenah Pascal shares his complete, unfiltered memoir of addiction, rehabilitation, rebuilding, and transformation—introduced with a clinical and spiritual Foreword by Dr. Theresia Fuh-Tabe ("Faith, Rescue, and Thriving"). From childhood memories in a house shared by three mothers, school days at GBHS Government School and PSS Bafut, and his refuge in music, to the first escape into smoke, the years lost in the shadows, walking through the door of Living Vine Rehab Center in Bamenda, taping 186 boxes a day in a warehouse, and emerging two years later as a father, certificate holder, and restaurant & business owner—this book is written for everyone who has ever believed that their worst chapter was their whole story.',
    source: 'original',
    chapters: [
      {
        id: 'unbound-ch-1',
        number: 1,
        part: 'Front Matter',
        title: 'Foreword by Dr. Theresia Fuh-Tabe — Faith, Rescue, and Thriving',
        publishedAt: '2026-11-10',
        wordCount: 745,
        content: `Foreword by
Dr. Theresia Fuh-Tabe.
Faith, Rescue, and Thriving.

There are stories that begin with triumph, and there are stories that begin in the quiet shadows — the places where a person realizes they are slipping, sinking, or simply surviving instead of living. At the time of writing the foreword to this highly inspiring, and timely book, the entire world is experiencing one crisis or another, for the case of Cameroon and its neighboring countries, addiction is subtly but steadily eating the lives of the youths. This book begins open in those shadows. It begins where destruction felt close enough to touch, where addiction whispered promises it never kept, and where hope seemed like something meant for other people. And yet, it is precisely in those places that God does His most extraordinary work.

This foreword is not written from a distance. It is written from the perspective of someone who has witnessed, cared for and treated individuals with acute, and chronic addictions. Writing this foreword couldn’t be more apt, as a psychiatric mental health professional, with almost a decade of experience in providing care to individuals with several forms of psychiatric and mental condition, including substance use disorders. I have seen the slow unraveling that addiction brings, the way it creeps into routines, relationships, and identity. Addiction to cannabis is often dismissed, minimized, or misunderstood, but anyone who has lived through it knows the truth: bondage is bondage, no matter what form it takes. And when the chains tighten, the soul aches for freedom.

But freedom rarely arrives in a single moment. It comes through a series of small rescues — some quiet, some dramatic — and through the relentless grace of a God who refuses to give up on His children. This book is a testimony to that grace. This foreword stands as a reminder that rescue is real. It is possible. It is available. And it often begins with a single, desperate prayer: “Lord, help me.”

There is a point in every journey where a person realizes they cannot save themselves. For some, it comes suddenly; for others, it comes slowly, like a sunrise revealing the damage done in the dark. In this story, destruction was not just external — it was internal. It was spiritual. It was emotional. It was the kind of destruction that convinces a person they are beyond repair. But God specializes in repair. In our darkest season, God meets us with compassion and reminds us that our lives still matter. He rebuilds what addiction tried to tear down. He restores what shame tried to bury. He rescues not because we are strong, but because He is. He restores my soul …

Addiction is not a straight line. It is a cycle — temptation, surrender, regret, resolve, and sometimes relapse. Addiction may not always look dramatic from the outside, but inside, it can feel like a storm that never fully passes. It numbs. It distracts. It promises peace but delivers emptiness.

This book does not shy away from that reality. It does not pretend the battle was easy or quick. It tells the truth: rehab was hard. Withdrawal was hard. Facing life without the familiar escape was hard. And relapse — the moment that feels like failure — was perhaps the hardest of all.

But relapse is not the end of the story. It is a chapter, not the conclusion. It is a reminder that healing is a process, not an event. And it is often the moment when God’s grace becomes most visible. His strength is made perfect when we are at our weakest point.

Every recovery story has a turning point. In this one, the turning point was faith — not the vague kind, but the kind that anchors a person when everything else feels unstable. The kind that whispers, “You are still loved. You are still chosen. You are still redeemable. You are made for more”

Faith did not erase the struggle, but it transformed it. It provided strength when motivation ran out. It provided community when isolation felt easier. It provided purpose when addiction had stripped purpose away.

This foreword invites readers to see faith as a lifeline — the very thing that makes restoration possible. This book is more than a testimony; it is a guide. It is written for:
• Those battling addiction who feel alone
• Those who have relapsed and believe they have failed
• Those in rehab or sober houses wonder if change is possible
• Those whose loved ones are struggling and don’t know how to help
• Those who believe God has forgotten them

The message is simple: You are not beyond rescue. You are not beyond healing. You are not beyond hope. God sees you, He is El Roi—the God who sees you.

The journey described in these pages is proof that God can take what was meant for destruction and turn it into a story of deliverance. It is proof that relapse does not disqualify you from redemption. It is proof that addiction does not define your identity. Your identity is in Christ Jesus.

As you turn the page and step into this testimony, I encourage you to read with an open heart. Let honesty challenge you. Let the vulnerability move you. Let faith inspire you. And let the story remind you that no matter how deep the pit, God’s arm is long enough to reach you.

This foreword is not just an introduction. It is an invitation — to healing, to hope, to restoration, and to the belief that your life can be transformed, just as the life behind these words was transformed.

May these pages guide you. May they strengthen you. May they help you uncover, discover, and recover the lost years. And may they lead you toward the purpose and freedom you were created for, even as I leave you with this bible verse Psalm 23: 3.`
      },
      {
        id: 'unbound-ch-2',
        number: 2,
        part: 'Front Matter',
        title: "Author's Note",
        publishedAt: '2026-11-10',
        wordCount: 74,
        content: `AUTHOR'S NOTE

This is a personal memoir. Some names have been changed to ordinary names to protect privacy. The emotional truth and major events are presented from the narrator's perspective. The rehabilitation section has been expanded with general recovery concepts, but it does not claim specific clinical practices at Living Vine Rehab Center beyond the author's own experience.

For everyone who has ever believed that their worst chapter was their whole story.`
      },
      {
        id: 'unbound-ch-3',
        number: 3,
        part: 'Introduction',
        title: 'Introduction — The Man I Became',
        publishedAt: '2026-11-10',
        wordCount: 222,
        content: `INTRODUCTION
The Man I Became

There was a time when I thought my story began with drugs.

I was wrong.

The drugs were only the chapter where everything became visible.

Before the smoke, there was a boy. There was a family. There were schools, laughter, music, friendships, disappointment, ambition and pain. There were things I understood and things I did not have the words to explain.

Then came the first escape.

The first high did not feel like destruction. It felt like relief. That is why this story is not simply about drugs. It is about what happens when a person finds relief in the wrong place and keeps returning until the relief becomes a prison.

I lost things.

I hurt people.

I lied.

I stole.

I disappeared.

I went to rehabilitation.

I learned that being clean and being healed were not the same thing.

And then something else happened.

I began to build.

This book is not written from the place of a man who is waiting to survive. It is written from the place of a man who learned to live, rebuild and evolve.

I used to think the goal was to become the person I was before addiction.

Now I know the goal is greater than that.

The goal is to become better.

This is the story of how I became unbound.`
      },
      {
        id: 'unbound-ch-4',
        number: 4,
        part: 'PART ONE: BEFORE THE SMOKE',
        title: 'Chapter 1 — The House We Shared',
        publishedAt: '2026-11-10',
        wordCount: 315,
        content: `PART ONE
BEFORE THE SMOKE

Chapter 1 — The House We Shared

I grew up in a house that was full of people and still had empty spaces.

My father had three wives, and we all grew up under one roof. It was not the kind of family arrangement I knew how to explain when I was young. It was simply the world I was born into. Different mothers. Different children. Different personalities. One house. One father. One roof over all of us.

Living together taught me things before I understood that I was learning them. I learned how to read a room before I spoke. I learned when to keep quiet. I learned that attention was not always evenly shared and that adults carried their own disappointments. I learned that children could be surrounded by family and still learn to keep certain feelings to themselves.

My mother worked hard. She carried responsibilities that sometimes seemed too large for one person. My father had his own way of moving through the family, and as a child I did not have the words to understand everything I saw. I only knew that there were moments when I wanted his attention, moments when I wanted approval, and moments when I decided it was safer not to ask.

I was not born broken.

That matters to me now.

When people hear the word addiction, they sometimes want a simple explanation. They want one bad friend, one bad decision, one weak character. My story was not that simple. There were many small things: family dynamics, emotions I did not know how to express, pressure, curiosity, the desire to belong, and the desire to escape.

But there was also joy.

There were ordinary mornings. There were jokes, arguments, meals, chores, noise, cousins, siblings and the strange comfort of knowing that somebody was always nearby.

I had a childhood before I had an addiction.

I want to remember that boy.

He deserves to be remembered for more than what happened to him later.`
      },
      {
        id: 'unbound-ch-5',
        number: 5,
        part: 'PART ONE: BEFORE THE SMOKE',
        title: 'Chapter 2 — School, Laughter, and the Boy I Was',
        publishedAt: '2026-11-10',
        wordCount: 308,
        content: `Chapter 2 — School, Laughter, and the Boy I Was

Some of my best memories were made at school.

At GBHS Government School, I was not walking around thinking about addiction. I was a student. I had friends. I laughed. I played. I worried about assignments, teachers, exams and the small dramas that felt like the end of the world when you were young.

There were days when school felt like freedom.

I remember the kind of laughter that starts for no serious reason and becomes impossible to stop. Someone would say something stupid. Somebody else would add to it. Before long, half the group was laughing.

Those moments matter because addiction later tried to convince me that I had never known happiness without a substance.

That was a lie.

I had known happiness.

I had known friendship.

I had known music.

I had known ambition.

I had known the feeling of coming home from school tired but satisfied.

Later, I moved on to PSS Bafut, a boarding school. Boarding school changed the rhythm of life. You learned to live around other people constantly. You learned independence in small ways. You made friendships quickly because everyone was sharing the same environment.

There were funny moments, embarrassing moments and ordinary moments that I did not know I would one day miss.

School also taught me something about identity. At school, people knew you for different things: the funny one, the quiet one, the clever one, the stubborn one, the athlete, the musician, the troublemaker.

I liked being known for what I could do.

I liked the feeling that I had a future.

If someone had told that younger version of me that one day I would spend hours thinking about where the next high would come from, I would not have believed them.

That boy had dreams.

That boy had choices.

That boy was still becoming himself.`
      },
      {
        id: 'unbound-ch-6',
        number: 6,
        part: 'PART ONE: BEFORE THE SMOKE',
        title: 'Chapter 3 — Music Was My Refuge',
        publishedAt: '2026-11-10',
        wordCount: 280,
        content: `Chapter 3 — Music Was My Refuge

Music was my comfort before drugs became my escape.

When I could not explain what I felt, music could say it for me. When the house felt loud, I could put on music and disappear into the sound without destroying anything. When I was disappointed, music gave the feeling somewhere to go.

I did not realize how important that was until much later.

The devil uses what you love.

Sometimes the thing that begins as comfort can become a doorway into something destructive when it gets connected to the wrong people, places and habits. Music itself was never my enemy. My love for it was not the problem. The problem was that the world around the music gradually changed.

The songs, the gatherings, the people, the late nights, the atmosphere — they became connected in my mind.

At first, I could enjoy music without anything else.

Then I started enjoying certain environments because of what came with them.

That distinction became dangerous.

I began to associate freedom with being intoxicated. I told myself I was more creative when I was high. I believed I understood music differently. I thought sober people were missing something.

The drug did not need to destroy everything I loved.

It only needed to attach itself to something I loved.

That is how control works sometimes. It does not always arrive by taking things away. Sometimes it arrives by convincing you that the thing hurting you is part of the thing that makes you feel alive.

I wish I had understood that earlier.

Music was never the devil.

The escape was.

And eventually I had to learn how to love music again without needing to disappear inside it.`
      },
      {
        id: 'unbound-ch-7',
        number: 7,
        part: 'PART ONE: BEFORE THE SMOKE',
        title: 'Chapter 4 — The First Escape',
        publishedAt: '2026-11-10',
        wordCount: 285,
        content: `Chapter 4 — The First Escape

The first time I used, I was not thinking about addiction.

I was thinking about relief.

That difference is important.

The first experience felt like someone had turned down the volume of my mind. My body relaxed. My thoughts slowed. Problems that had felt enormous suddenly seemed far away.

For a few minutes, I believed I had found the answer to a question I had never known how to ask.

How do I stop feeling everything?

The answer seemed simple.

Smoke.

I did not understand the price.

The substances I was using became a cocktail that changed the way I thought, felt and behaved. The first high felt like freedom. The next one felt like something I needed. Soon the distance between wanting and needing became impossible to see.

The drug did not introduce itself as destruction.

It introduced itself as relief.

That is why the beginning was so dangerous.

I started believing that I had discovered something other people were too afraid to understand. I felt smarter. I felt different. I felt untouchable.

I was not untouchable.

I was becoming dependent.

When the high disappeared, the pain returned harder. My chest tightened. My skin crawled. I became restless and irritable. Sleep became difficult. My appetite changed. My mind kept returning to the same thought: when can I use again?

I had mistaken temporary numbness for healing.

They are not the same thing.

Healing asks you to face pain.

The drug asked me to postpone it.

I chose the easier answer for far too long.`
      },
      {
        id: 'unbound-ch-8',
        number: 8,
        part: 'PART ONE: BEFORE THE SMOKE',
        title: 'Chapter 5 — The First Line I Crossed',
        publishedAt: '2026-11-10',
        wordCount: 256,
        content: `Chapter 5 — The First Line I Crossed

Addiction did not only change what I consumed. It changed what I was willing to do.

I began with explanations.

I was borrowing.

I would replace it.

I only needed enough for today.

I was not hurting anyone.

Those sentences became a private language of addiction.

One day, I crossed a line I never thought I would cross. A family member had money saved for something important. I knew where it was.

I took it.

I remember the lie I told myself more clearly than I remember the details of the theft. I told myself I would return the money. I told myself this was temporary.

Then I used.

The high did not feel like victory.

It felt empty.

That was the beginning of a pattern: the more I used, the more I lied; the more I lied, the more I isolated myself; the more I isolated myself, the easier it became to use.

I stopped answering calls.

I stopped showing up.

I avoided people who knew me before the addiction.

I was not only hiding from them.

I was hiding from the evidence.

Every familiar face reminded me that I had changed.

And I did not want to change back.

I wanted the next high.

That was when I understood something frightening: addiction can make a person betray the values they once thought were permanent.

I had crossed a line.

Then another.

Then another.

Each one became easier because the previous one had already changed my definition of what I was capable of.`
      },
      {
        id: 'unbound-ch-9',
        number: 9,
        part: 'PART TWO: THE YEARS I LOST',
        title: 'Chapter 6 — The Man I Became',
        publishedAt: '2026-11-10',
        wordCount: 268,
        content: `PART TWO
THE YEARS I LOST

Chapter 6 — The Man I Became

There was a period when I genuinely believed I was the cleverest person in the room.

Anyone who did not smoke seemed foolish to me.

I looked at sober people and thought they were living inside a smaller version of reality. I believed I had discovered something they could not understand. I could see things they could not see. I thought I was more fearless, more creative, more intelligent.

That was not confidence.

It was distorted thinking.

The drug had become a filter over my mind.

I became suspicious. I overthought conversations. I interpreted ordinary looks as judgment. I could become irritable over small things. I struggled to sleep. My appetite could disappear. My body became restless. I sweated, shook and felt uncomfortable when I could not use. My thoughts raced. My attention became trapped around getting, using and recovering from the substance.

The strange thing was that I could explain all of this away.

I called it being different.

I called it being awake.

I called it freedom.

I was actually becoming less free every day.

I began to lose interest in ordinary things. Food became secondary. Hygiene became inconsistent. Time became unimportant. Relationships became obstacles if they interfered with using.

The person I thought was powerful was becoming smaller.

The drug had convinced me that I was the only clever person in the room while it was quietly taking control of the room inside my own head.

I was not smarter than everyone.

I was trapped.

And because I believed I was smarter than the trap, I kept walking deeper into it.`
      },
      {
        id: 'unbound-ch-10',
        number: 10,
        part: 'PART TWO: THE YEARS I LOST',
        title: 'Chapter 7 — The People I Hurt',
        publishedAt: '2026-11-10',
        wordCount: 266,
        content: `Chapter 7 — The People I Hurt

Addiction has a way of making the person using it feel like the only person suffering.

I thought about my pain constantly.

I did not think enough about the pain I was causing.

My mother called. I ignored her.

People reached out. I disappeared.

Family trusted me. I lied.

People gave me chances. I used those chances to find another way to use.

The worst part was how ordinary my lies became.

I could lie while looking directly into someone's eyes.

I could say I was fine while my body was demanding the next hit.

I could promise tomorrow would be different while already planning tonight.

There was one moment when I saw the cost of my behavior clearly. I remembered taking money that was not mine and then acting normal around the person I had stolen from.

She trusted me.

I had turned that trust into fuel for addiction.

That memory stayed with me.

Eventually, I realized that addiction had not only taken pieces of me. It had taken pieces of the people around me too: their peace, their trust, their sleep, their confidence in me.

I cannot rewrite those moments.

What I can do is tell the truth about them.

I was responsible for the things I did.

But responsibility is not the same as believing I was beyond redemption.

That distinction became important in recovery.

If I only hated myself, I would eventually use the pain of that hatred as another reason to escape.

I needed something harder.

I needed accountability.

I needed to admit what I had done and become the kind of person who no longer needed to repeat it.`
      },
      {
        id: 'unbound-ch-11',
        number: 11,
        part: 'PART TWO: THE YEARS I LOST',
        title: 'Chapter 8 — The Shadow Within',
        publishedAt: '2026-11-10',
        wordCount: 334,
        content: `Chapter 8 — The Shadow Within

By then, I was living two lives.

There was the person people remembered.

And there was the person the drug was creating.

The shadow life was built around symptoms I had once dismissed. Restlessness. Trembling. Sweating. Insomnia. Changes in appetite. Irritability. Racing thoughts. Paranoia. Emotional numbness. Cravings that felt louder than ordinary thoughts.

Sometimes I could not sit still.

Sometimes I could not sleep.

Sometimes I slept for too long because being unconscious was easier than being present.

My mind became a courtroom where everyone was guilty except me.

If someone questioned me, they were against me.

If someone advised me, they were foolish.

If someone refused to give me money, they did not understand.

If someone told me to stop, they were trying to control me.

The irony was almost unbearable.

I hated people controlling me while the substance controlled nearly everything I did.

I began to believe I was chosen, different and more intelligent than people who did not use. I could look at someone living an ordinary life and think, “You don't understand life.”

But they were eating.

Sleeping.

Working.

Laughing.

Planning.

Living.

I was the one counting hours until the next opportunity.

The drug had changed my definition of freedom.

Freedom became the ability to get high whenever I wanted.

But if I could not choose not to get high, was that freedom?

That question stayed with me.

At my worst, I felt like the substance was the only thing keeping me normal. Without it, I shook. Without it, I sweated. Without it, I became restless and afraid. Without it, my thoughts seemed unbearable.

That is one of addiction's cruelest tricks.

It creates the wound and then convinces you the poison is the medicine.

I was no longer using only because I wanted pleasure.

I was using to escape withdrawal, discomfort, fear and myself.

The shadow within me was not some supernatural creature.

It was the collection of choices, habits, cravings, excuses and pain that I had allowed to grow.

And I was getting tired of feeding it.`
      },
      {
        id: 'unbound-ch-12',
        number: 12,
        part: 'PART TWO: THE YEARS I LOST',
        title: "Chapter 9 — Ashes Don't Feel Pain",
        publishedAt: '2026-11-10',
        wordCount: 280,
        content: `Chapter 9 — Ashes Don't Feel Pain

There is a point where a person can become so used to pain that pain stops surprising him.

I remember lying on the bathroom floor.

My body was exhausted. My stomach hurt. My hands shook. My heart felt wrong. I had been sick, and the room seemed to move between silence and noise.

I looked at myself and felt almost nothing.

That scared me more than the physical symptoms.

I was not planning my death.

But I had reached a place where life and death no longer felt very different.

That is what I mean when I say ashes don't feel pain.

Ashes are what remains after something has already burned.

I felt burned out.

Then I saw a younger person caught in the same world. For a moment, I saw myself in him. He still had a version of the future I had been throwing away.

I wanted to tell him to run.

But I was still running from myself.

That was the moment I understood that I could not rescue everyone while refusing to rescue me.

Soon after, the consequences became impossible to ignore.

Withdrawal was not simply discomfort. It affected my body, sleep, emotions and thinking. I experienced shaking, sweating, stomach problems, agitation and terrifying mental noise. I felt trapped between wanting to stop and wanting relief.

That period became the bridge to rehabilitation.

I had reached the place where my own strength, as I understood it, was no longer enough.

For years I had believed asking for help meant weakness.

Now I understood that refusing help had nearly destroyed me.

The most important step was not pretending I could handle everything.

It was admitting that I needed help.

And that admission became the beginning of my rescue.`
      },
      {
        id: 'unbound-ch-13',
        number: 13,
        part: 'PART TWO: THE YEARS I LOST',
        title: 'Chapter 10 — The Door to Living Vine',
        publishedAt: '2026-11-10',
        wordCount: 332,
        content: `Chapter 10 — The Door to Living Vine

Going to rehabilitation was not a movie scene.

There was no magical music playing in the background.

I was afraid.

I was ashamed.

Part of me wanted help.

Another part of me wanted to run.

I entered Living Vine Rehab Center in Bamenda carrying more than a body that needed to stop using. I carried guilt, anger, denial, memories, cravings and a version of myself I no longer trusted.

The first thing rehabilitation forced me to understand was that stopping the substance was only part of the work.

I had to learn how to live without the ritual around it.

I had to face mornings without smoke.

I had to sit with discomfort.

I had to hear other people's stories.

I had to hear my own story without turning it into an excuse.

I had to accept that recovery would require repetition.

At first, I wanted a quick solution.

I wanted somebody to tell me exactly how many days it would take before I stopped thinking about drugs.

But recovery does not work like that.

Treatment can provide structure, support, counseling, education and tools. Evidence-based recovery approaches also emphasize peer and community support, coping skills and planning for high-risk situations. But the work continues beyond the treatment setting.

Inside rehab, I began to notice the difference between craving and command.

A craving could be intense without being an instruction.

A thought could appear without becoming an action.

An emotion could hurt without needing to be escaped.

Those were simple sentences.

They changed my life.

I also learned that people in rehabilitation were not one type of person. Some were angry. Some were quiet. Some were ashamed. Some were funny. Some wanted to leave. Some wanted another chance.

And some, like me, were learning for the first time that addiction had changed more than their bodies.

It had changed their relationships with themselves.

I did not leave Living Vine as a perfect man.

I left with tools.

The rest of the story would depend on what I did with them.`
      },
      {
        id: 'unbound-ch-14',
        number: 14,
        part: 'PART TWO: THE YEARS I LOST',
        title: 'Chapter 11 — The Noise That Comes After',
        publishedAt: '2026-11-10',
        wordCount: 286,
        content: `Chapter 11 — The Noise That Comes After

The first days away from active use were strange.

I expected happiness.

Instead, I felt empty.

The substance was gone, but the thoughts remained.

The silence after chaos can be frightening.

I had spent so long filling every uncomfortable moment that ordinary life felt too quiet.

I had to relearn simple things: sleeping, eating, talking, sitting still, looking at people without wondering what they thought of me.

I also had to face guilt.

Not the useful kind that tells you to make things right.

The destructive kind that says, “You are what you did.”

There is a difference.

I had stolen.

I had lied.

I had disappeared.

I had hurt people.

Those things were true.

But they did not have to become my permanent identity.

I began writing again.

The notebook became a place where I could say what I could not say aloud.

Sometimes the entries were ugly.

Sometimes they were only one sentence.

Sometimes I wrote the same fear ten different ways.

But writing gave me another place to put the pressure.

I also began learning how to recognize danger before it became disaster. A difficult day. Too much isolation. Money in my pocket. A familiar street. An old contact. A thought that said, “You can handle just one.”

Recovery required me to take those signs seriously.

Modern recovery guidance also emphasizes identifying high-risk situations, understanding triggers, developing coping strategies and making an immediate plan when cravings or recurrence appear.

I was beginning to understand that recovery was not about becoming a man who never struggled.

It was about becoming a man who knew what to do when he struggled.`
      },
      {
        id: 'unbound-ch-15',
        number: 15,
        part: 'PART THREE: RESCUED, REBUILT, UNBOUND',
        title: 'Chapter 12 — The Door Still Opens',
        publishedAt: '2026-11-10',
        wordCount: 215,
        content: `PART THREE
RESCUED, REBUILT, UNBOUND

Chapter 12 — The Door Still Opens

My mother's house looked the same.

The paint. The doorway. The familiar smell.

But I was different.

She did not need a speech from me.

She needed honesty.

So I sat down and told her I wanted to rebuild.

She gave me a place to begin, but she also gave me boundaries.

No lies.

No using.

No hiding.

No pretending everything was fine when it wasn't.

At first, I resisted the rules because I still thought independence meant nobody could tell me what to do.

Then I understood something.

There is a difference between control and accountability.

Accountability was helping me become someone I could trust.

My mother did not ask me to become the boy I had been.

She told me something that stayed with me:

“You are not supposed to become who you were. You are supposed to become better.”

That sentence changed the direction of my recovery.

I stopped trying to recover my old identity.

I started building a new one.

I did not want to be the man before addiction.

I wanted to be wiser than that man.

More honest.

More disciplined.

More present.

More responsible.

Recovery stopped being about going backward.

It became about moving forward.`
      },
      {
        id: 'unbound-ch-16',
        number: 16,
        part: 'PART THREE: RESCUED, REBUILT, UNBOUND',
        title: 'Chapter 13 — Learning to Live Again',
        publishedAt: '2026-11-10',
        wordCount: 288,
        content: `Chapter 13 — Learning to Live Again

Normal life was harder than I expected.

Getting a job sounded simple.

It was not.

I had to wake up on time. Show up. Follow instructions. Work with people. Manage frustration. Go home tired without looking for a chemical shortcut.

I found work in a warehouse.

Nobody there knew my history.

That was both comforting and frightening.

They did not see the addict.

They saw a worker.

For a while, that was exactly what I needed.

I taped boxes.

I lifted things.

I sweated.

I got tired.

I earned money honestly.

One day I taped 186 boxes.

My feet hurt.

My body was exhausted.

But I had not used.

I opened my notebook and wrote:

Today I taped 186 boxes. My feet hurt. But I didn't use. And I am still here.

At the time, “still here” meant survival.

I did not know that one day it would mean something much bigger.

Then came temptation.

I saw someone from my old life.

David.

He knew the version of me that smoked, lied and disappeared.

He offered me the old escape as if he were offering me something harmless.

For a moment, I missed it.

Not the destruction.

The feeling.

The illusion.

That is what temptation often does. It edits the past.

It shows you the laughter and hides the bathroom floor.

It shows you the high and hides the withdrawal.

It shows you the freedom and hides the chains.

I walked away.

That night, I wrote:

I saw my past today. He smiled. I didn't smile back.

That was not the end of temptation.

It was the beginning of a new response to it.`
      },
      {
        id: 'unbound-ch-17',
        number: 17,
        part: 'PART THREE: RESCUED, REBUILT, UNBOUND',
        title: 'Chapter 14 — Two Years Later',
        publishedAt: '2026-11-10',
        wordCount: 254,
        content: `Chapter 14 — Two Years Later

Two years changed more than the number of days on a calendar.

I earned a certificate.

I started a restaurant.

I began working on other small businesses.

And I became a father.

My son changed the way I understood responsibility.

The first time I held him, I understood that someone would know me as Dad.

Not addict.

Not thief.

Not ghost.

Dad.

But I also learned not to make another person the only reason I stayed clean.

My son could give my life purpose, but I had to believe my own life was valuable too.

That was one of the deepest lessons of recovery.

I was worth saving before I became a father.

I was worth saving before I earned the certificate.

I was worth saving before the restaurant.

The businesses did not rescue me.

The certificate did not rescue me.

My son did not rescue me.

They became part of the life I built after I chose to rescue myself.

That distinction matters.

Because recovery is not only about removing something.

It is about creating something worth protecting.

My problems changed.

I still had bills.

Business problems.

Fatigue.

Responsibilities.

Bad days.

Difficult decisions.

But I was grateful for those problems.

They belonged to a life.

A real one.

I no longer measured success by how long I could avoid dying.

I measured it by what I could build.

That was when survival began turning into thriving.`
      },
      {
        id: 'unbound-ch-18',
        number: 18,
        part: 'PART THREE: RESCUED, REBUILT, UNBOUND',
        title: 'Chapter 15 — The Effects of Addiction',
        publishedAt: '2026-11-10',
        wordCount: 412,
        content: `Chapter 15 — The Effects of Addiction

For years, I thought the worst effect of addiction was the drug itself.

I was wrong.

The drug was only one part of the damage.

Addiction changed my thinking.

It changed my body.

It changed my relationships.

It changed my relationship with money.

It changed my relationship with trust.

It changed the way I saw ordinary people.

It made me believe that everyone else was foolish while I was the clever one.

It made me mistake numbness for peace.

It made me believe that cravings were commands.

It made me lie to people who loved me.

It made me steal from someone who trusted me.

It made me disappear from my own life.

It made music, friendship, money, streets and memories become connected to a world I had to eventually learn how to leave.

It took time.

It took dignity.

It took opportunities.

It took pieces of relationships.

But it did not take everything.

That is the part I understand now.

Addiction had effects.

But addiction did not get the final word.

I am not writing this book to glorify the darkness.

I am writing it because darkness can make a person believe the story is already finished.

Mine was not.

The boy from the house with three wives was still there.

The student from GBHS Government School was still there.

The boy who went to PSS Bafut was still there.

The person who found comfort in music was still there.

The son my mother prayed for was still there.

The man who wrote in a notebook was still there.

He had been buried under years of choices.

But buried is not the same as gone.

I used to think rescue meant somebody coming to pull me out.

Now I understand rescue differently.

People helped me.

My mother loved me.

Friends reminded me of who I had been.

Rehabilitation gave me structure and tools.

Recovery gave me another way to live.

But I had to choose what to do with all of it.

That choice became a thousand choices.

And those choices became a life.

Today I have a son.

I have a certificate.

I have a restaurant.

I have other businesses.

I have responsibilities.

I have problems.

I have dreams.

Most importantly, I have a life that I no longer want to escape from.

The devil is not dead.

The past is not erased.

I still know what it feels like to want the old silence.

But I know something now that I did not know then:

A craving is not a command.

Pain is not an emergency.

A bad day is not a ruined life.

And my past is not my identity.

I am not the boy who disappeared.

I am not the man addiction created.

I am the man who came back, rebuilt, and kept becoming.

I used to write, “I'm still here.”

Now I write something different:

I am here.

I am building.

I am growing.

I am evolving.

I am UNBOUND.`
      },
      {
        id: 'unbound-ch-19',
        number: 19,
        part: 'Closing',
        title: 'Closing Note',
        publishedAt: '2026-11-10',
        wordCount: 68,
        content: `CLOSING NOTE

Recovery is a process of change. It can include treatment, support, counseling, peer connection, new routines, coping skills and the rebuilding of purpose. The central lesson of this memoir is not that one person can do everything alone. It is that help can open the door, but the person must keep walking through it.

The final word is not survival. It is transformation.`
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        readerName: 'Dr. Theresia Fuh-Tabe',
        rating: 5,
        comment:
          'A deeply honest testimony that speaks directly to the crisis facing our youths today. Rescue is real, and this book is a beacon of hope and clinical and spiritual truth.',
        date: 'Nov 10, 2026'
      },
      {
        id: 'rev-2',
        readerName: 'Emmanuel N. (Bamenda)',
        rating: 5,
        comment:
          'From GBHS and PSS Bafut to Living Vine Rehab Center and rebuilding a life as a father and business owner—Kenah Pascal’s honesty in Chapter 13 ("I saw my past today. He smiled. I didn’t smile back.") gave me chills. Thank you for making the entire 19-part book free.',
        date: 'Nov 10, 2026'
      },
      {
        id: 'rev-3',
        readerName: 'Grace M.',
        rating: 5,
        comment:
          '“You are not supposed to become who you were. You are supposed to become better.” Every young person and parent needs to read UNBOUND.',
        date: 'Nov 10, 2026'
      }
    ]
  },
  {
    id: 'stitch-his-alpha-queen',
    slug: 'his-alpha-queen',
    title: 'His Alpha Queen',
    subtitle: 'The Wolf Queen’s Legacy',
    author: 'Elena Thorne',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBde_6Qu9yOonAnis0agCEa2_0jQapZhkegOwoyHmviJa-xT-IConG6nI8lXJwBKz_F83l88k_rWFeIZ7qBxHnfDBRio21rcqqE-Mu0wliqInH6rPLv0s2n_rBUnnqjaSf4oPyqKb_I3R-sVW6Mg9EIufjaiJs60Zd-EswVMCH42heYHKrPaK08KFEmY8cyABBTxeevdzzN7RxbxQL03Y5-elVopNrwLgWKkz1N87E',
    genre: 'Werewolf',
    tags: ['Alpha', 'Queen', '100% Free'],
    rating: 4.8,
    views: '142K',
    status: 'Completed',
    isFree: true,
    synopsis:
      'Amidst a dark moonlit pine forest, a regal werewolf queen with glowing amber eyes reclaims her birthright and commands the loyalty of the northern packs.',
    source: 'custom',
    chapters: [
      {
        id: 'haq-1',
        number: 1,
        title: 'Chapter 1 — The Silver Crown',
        publishedAt: '2026-11-01',
        wordCount: 410,
        content: `The pine needles were coated in frost as the northern packs gathered beneath the full moon. For seven winters they believed the royal bloodline had been extinguished.\n\nThey were wrong.\n\nStepping out from the shadow of the ancient watchtower, Lyra let her cloak fall. The mark of the Alpha Queen burned silver against her collarbone, and the entire forest fell silent.`
      }
    ],
    reviews: []
  },
  {
    id: 'stitch-mated-to-the-alpha',
    slug: 'mated-to-the-alpha-i-hate',
    title: 'MATED TO THE ALPHA I HATE',
    subtitle: 'Rival Hearts Under a Cursed Moon',
    author: 'Luna Vance',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzA11LAoulaKpPV-ayHRRYMJTJEavyj2nUp0zApySe1eWFrD4b9SoiMvNj2fKY3KrSqkylpceIWyYY5Jmj03K1aksU8u3Z8xNHMSzRMJ2hLfCeel64VnaObZy2zBD4EAvSnI-5upE6rx-Ztxx9sMOTceY9BzGplzm4ZiQJ8uLccUup0Quv0fxZoX61v94Ya3SZWsI6CYP0TgcPiJH97ajQMO_1f0Y3H4K_lwnd24c',
    genre: 'Werewolf',
    tags: ['Werewolf', 'Enemies', '100% Free'],
    rating: 4.9,
    views: '198K',
    status: 'Ongoing',
    isFree: true,
    synopsis:
      'Under a crimson eclipse, two rival wolf shifters bound by centuries of pack feud discover a mate bond neither can sever.',
    source: 'custom',
    chapters: [
      {
        id: 'mta-1',
        number: 1,
        title: 'Chapter 1 — The Crimson Eclipse',
        publishedAt: '2026-11-02',
        wordCount: 390,
        content: `The border treaty was supposed to bring peace between our territories. Instead, the moment Kaelen’s hand closed around mine for the blood oath, the eclipse turned the sky ruby red—and the mate bond snapped into place.`
      }
    ],
    reviews: []
  },
  {
    id: 'stitch-alpha-king-wolfless-luna',
    slug: 'the-alpha-king-and-his-wolfless-luna',
    title: 'The Alpha King And His Wolfless Luna',
    subtitle: 'Crowned in Shadow',
    author: 'Seraphina Blake',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgZ8kQv5tv_0Gertkirbta6PsjBLYfKvIiXOsd3LX__6cuzKh0lYkn2b1yNOJYIiuoSq_CKh_1zYTEAoVtpzXMfKuQGO0XyJ246K_viFoQjimIasoT7q7GvLGp0vx6ezTeu5E3rY6OmKLhaea7ObrnzgJYJfE7JwRCn6iWL9tvJJS8mxs0rz-W0A8IedeFC6oTS3wK-CsDpshk8khfgopA0aUCY_E7pY35Dw2s-e0',
    genre: 'Fantasy',
    tags: ['Fantasy', 'Luna', '100% Free'],
    rating: 4.7,
    views: '113.3K',
    status: 'Completed',
    isFree: true,
    synopsis:
      'Outcast for having no wolf spirit of her own, she is summoned before the colossal shadow sovereign—only to discover her quiet heart holds the ancient magic his kingdom lost.',
    source: 'custom',
    chapters: [
      {
        id: 'akwl-1',
        number: 1,
        title: 'Chapter 1 — The Girl Without a Wolf',
        publishedAt: '2026-11-03',
        wordCount: 420,
        content: `Every eighteen-year-old in the Silver Vale shifted on the night of the solstice. Every single one except me. Yet when the Alpha King’s carriage arrived at dawn, it was my name written on the royal summons.`
      }
    ],
    reviews: []
  },
  {
    id: 'stitch-ends-editors-choice',
    slug: 'ends',
    title: 'ENDS',
    subtitle: 'Psychological Romance',
    author: 'V. C. hollowed',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRty9PXp0k3GH8HtkVO-5mA88r94T74X-sNWO1azxqcQiQQ761u1ZzoWWNvvD68ZtQvMOUhZvtCSIYaXlJNioCYUVnEhUCo0BL25YRQirV2VSA4AM5lfiqzLbXMRmgxR4gZ22wpZoTwSRvmFBDJ81r7KJs1iV8byqX0CAujvzkmDdQzCdtNMtPMUxn8atSKW6Qe8O546d26GCbXiWmOXMlQoAIxkZuMMP3FLhJ2vM',
    genre: 'Romance',
    tags: ['Rejected', 'Wedding', 'Psychological Romance'],
    rating: 4.8,
    views: '92.4K',
    status: 'Completed',
    isFree: true,
    synopsis:
      'He bought her family debts and held her in his ivory estate, yet on the eve of her arranged wedding, every secret between them shattered.',
    source: 'custom',
    chapters: [
      {
        id: 'ends-1',
        number: 1,
        title: 'Chapter 1 — The Ivory Estate',
        publishedAt: '2026-11-04',
        wordCount: 380,
        content: `The chandelier above the grand staircase chimed in the midnight draft. On the marble floor lay the veil I was supposed to wear at dawn, surrounded by crimson rose petals and the truth Julian had hidden for three years.`
      }
    ],
    reviews: []
  },
  {
    id: 'stitch-mated-twin-alphas',
    slug: 'mated-to-the-twin-alphas',
    title: 'Mated to the Twin Alphas',
    subtitle: 'Fresh Release',
    author: 'Bella Clytesk',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDla4inEwAbKW8SNL5tNZztqCGUMLHzGuLoFk9PvIh9mgQmd2rXqQIDKJ7TE15PB029uSr8eCX6Y0kedOjUh0wExN-UuhvMFmGhJnYuG7XTDebZMSyHJOBi-8e9LhOYYFpBuSyLySGFDsj7n_-gNqfH__XRXNbUXAugZDVYtclNmPW_vTHQltVKI_51I-DGN8osSDwQASFkrBOcAxqKYUpSstVjpoHu9Qj0e0mGNrg',
    genre: 'Werewolf',
    tags: ['Fresh Release', 'Twin Alphas', '100% Free'],
    rating: 4.9,
    views: '74.1K',
    status: 'Ongoing',
    isFree: true,
    synopsis:
      'Two cursed leaders, one sacred mate bond neither is willing to share until an ancient enemy strikes at the heart of their pack.',
    source: 'custom',
    chapters: [
      {
        id: 'mtta-1',
        number: 1,
        title: 'Chapter 1 — Double Bond',
        publishedAt: '2026-11-05',
        wordCount: 350,
        content: `No wolf in recorded history had ever drawn two silver threads from the Moon Goddess. Yet as the twin brothers stepped into the clearing, both of their eyes blazed gold.`
      }
    ],
    reviews: []
  },
  {
    id: 'stitch-accidentally-married-playboy',
    slug: 'i-accidentally-married-a-playboy',
    title: 'I Accidentally Married a Playboy',
    subtitle: 'Billionaire Romance',
    author: 'claire V.',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUJ30dTRxvoJT2Vh6bbbHO5nhBmD1UsB50KBoasG81WnqPxuYc928J4WGbLskzcUHTWsOsOsGiyl2h0dIVLFMNjI2IKerT1M6hAvXr2TjrXfXCxJb8rgr9hS9k9w7sr1bF7nkV6C7xXCUCy54h2_qJGJTOlxkMl__D4vTiFpRSa9GkX4uypfYO9pEprvzuzgtMFFA1uGvXKzCAj3T_bH7UkF120XM_AXdwdUMNKoCPQ',
    genre: 'Billionaire',
    tags: ['Billionaire Romance', 'Contract Marriage', '100% Free'],
    rating: 4.8,
    views: '60.2K',
    status: 'Completed',
    isFree: true,
    synopsis:
      'What started as a mistaken courthouse signature in Las Vegas turns into a high-society whirlwind when the city’s most notorious billionaire heir refuses to sign the annulment.',
    source: 'custom',
    chapters: [
      {
        id: 'iamp-1',
        number: 1,
        title: 'Chapter 1 — The Las Vegas Clause',
        publishedAt: '2026-11-06',
        wordCount: 410,
        content: `“Read page four again,” Damien said, swirling his sparkling water in the penthouse lounge. “There is no annulment clause. For the next twelve months, you are Mrs. Sterling.”`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-1342',
    slug: 'pride-and-prejudice',
    title: 'Pride and Prejudice',
    subtitle: 'Heartfelt Classic Romance',
    author: 'Jane Austen',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
    genre: 'Romance',
    tags: ['Romance', 'Slow Burn', '100% Free'],
    rating: 4.9,
    views: '112.0K',
    status: 'Completed',
    isFree: true,
    synopsis:
      'Spirited Elizabeth Bennet navigates society, family expectations, and her own quick judgments when the wealthy, aloof Mr. Fitzwilliam Darcy arrives in Hertfordshire.',
    source: 'gutenberg',
    chapters: [
      {
        id: 'pp-1',
        number: 1,
        title: 'Chapter 1 — First Impressions at Netherfield',
        publishedAt: '2026-10-12',
        wordCount: 510,
        content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.`
      }
    ],
    reviews: []
  },
  {
    id: 'gutenberg-1184',
    slug: 'the-count-of-monte-cristo',
    title: 'The Count of Monte Cristo',
    subtitle: 'Betrayal, Hope, and Ultimate Justice',
    author: 'Alexandre Dumas',
    coverUrl: 'https://www.gutenberg.org/cache/epub/1184/pg1184.cover.medium.jpg',
    genre: 'Drama',
    tags: ['Redemption', 'Justice', '100% Free'],
    rating: 4.9,
    views: '88.7K',
    status: 'Completed',
    isFree: true,
    synopsis:
      'Wrongfully imprisoned on the eve of his wedding, young sailor Edmond Dantès endures fourteen years in the grim fortress of Château d’If before escaping to uncover the treasure of Monte Cristo.',
    source: 'gutenberg',
    chapters: [
      {
        id: 'cmc-1',
        number: 1,
        title: 'Chapter 1 — Marseilles: The Arrival',
        publishedAt: '2026-10-08',
        wordCount: 540,
        content: `On the 24th of February, 1815, the look-out at Notre-Dame de la Garde signalled the three-master, the Pharaon, from Smyrna, Trieste, and Naples.`
      }
    ],
    reviews: []
  }
];

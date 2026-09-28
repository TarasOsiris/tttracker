export type SessionType = "technique" | "match" | "serve" | "physical" | "freeplay";

export type Drill = {
  slug: string;
  emoji: string;
  title: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  level: "Beginner" | "Intermediate" | "All levels";
  sessionType: SessionType;
  intro: string;
  blocks: { title: string; items: { name: string; minutes: number; note?: string }[] }[];
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const sessionTypeLabel: Record<SessionType, string> = {
  technique: "Technique",
  match: "Match Play",
  serve: "Serve Practice",
  physical: "Physical",
  freeplay: "Free Play",
};

export const drills: Drill[] = [
  {
    slug: "beginner-fundamentals",
    emoji: "🏓",
    title: "Beginner fundamentals",
    short: "The four basic strokes, in the order coaches teach them.",
    metaTitle: "Beginner Table Tennis Training Plan (60 min)",
    metaDescription:
      "A 60-minute beginner table tennis practice plan: warm-up, forehand and backhand drive, push, basic footwork and a cool-down. Free and printable.",
    level: "Beginner",
    sessionType: "technique",
    intro:
      "If you're new to table tennis (or coming back after years of garage ping pong), this session builds the four strokes everything else rests on. Do it two or three times a week and log each session so you can see the consistency build.",
    blocks: [
      {
        title: "Warm-up",
        items: [
          { name: "Light jog and arm circles", minutes: 3 },
          { name: "Shadow strokes: forehand and backhand", minutes: 3, note: "Slow, full swings without a ball" },
          { name: "Easy rally, any stroke", minutes: 4 },
        ],
      },
      {
        title: "Main block",
        items: [
          { name: "Forehand drive, crosscourt", minutes: 10, note: "Aim for 20 in a row before speeding up" },
          { name: "Backhand drive, crosscourt", minutes: 10 },
          { name: "Backhand push to backhand", minutes: 8, note: "Keep it low over the net" },
          { name: "Forehand – backhand alternate (1-1)", minutes: 8 },
        ],
      },
      {
        title: "Play & cool-down",
        items: [
          { name: "Games to 11, serve and first-ball attack only", minutes: 10 },
          { name: "Stretch shoulders, wrists, calves", minutes: 4 },
        ],
      },
    ],
    tips: [
      { title: "Count your rally", body: "Say the number out loud. It turns a vague drill into a measurable goal." },
      { title: "Ready position first", body: "Knees bent, weight forward, bat in front. Most beginner errors start before the swing." },
      { title: "Log it with RPE", body: "Rate how hard it felt. As fundamentals settle, the same session will start to feel easier." },
    ],
    faqs: [
      { q: "How often should a beginner practise?", a: "Two to three sessions a week of about an hour is enough to improve steadily without burning out." },
      { q: "Should beginners learn topspin straight away?", a: "Learn a consistent flat drive and push first. Topspin comes naturally once your stroke and footwork are stable." },
      { q: "Can I do this alone?", a: "You need a partner or a robot for most of it. Alone, do shadow strokes and serve practice instead." },
    ],
  },
  {
    slug: "footwork-drills",
    emoji: "👟",
    title: "Footwork drills",
    short: "Falkenberg, side-to-side and in-and-out movement.",
    metaTitle: "Table Tennis Footwork Drills: 50-Minute Session",
    metaDescription:
      "Improve your table tennis footwork with a 50-minute session: side-to-side, Falkenberg, random footwork and in-and-out drills.",
    level: "Intermediate",
    sessionType: "technique",
    intro:
      "Most points are lost to feet, not hands. This session drills the movement patterns that let you hit every ball from a balanced position. Keep sets short and intense, and rest between them.",
    blocks: [
      {
        title: "Warm-up",
        items: [
          { name: "Skipping or light jog", minutes: 3 },
          { name: "Shadow side-steps with strokes", minutes: 4 },
          { name: "Forehand and backhand crosscourt rally", minutes: 5 },
        ],
      },
      {
        title: "Main block",
        items: [
          { name: "Two-point forehand: middle & wide forehand", minutes: 8, note: "Sets of 60 s on, 30 s off" },
          { name: "Falkenberg (BH – FH from BH corner – FH wide)", minutes: 10 },
          { name: "In-and-out: short push then long topspin", minutes: 8 },
          { name: "Random to the forehand half", minutes: 7 },
        ],
      },
      {
        title: "Cool-down",
        items: [{ name: "Easy rally and stretching", minutes: 5 }],
      },
    ],
    tips: [
      { title: "Small steps, then a big one", body: "Adjust with small shuffles. Save the big step for wide balls only." },
      { title: "Recover to neutral", body: "After every shot, return to the middle. That return step is the drill." },
      { title: "Track intensity", body: "Footwork sessions are tiring. Log them with a high RPE and balance the week around them." },
    ],
    faqs: [
      { q: "What is the Falkenberg drill?", a: "A three-ball pattern: backhand from the backhand corner, pivot forehand from the same corner, then a wide forehand. It's named after Swedish coach Karl-Olof Falkenberg." },
      { q: "How long should footwork sets be?", a: "30–60 seconds of work with equal or longer rest. Quality drops fast when you're tired." },
      { q: "Can I train footwork without a table?", a: "Yes. Shadow footwork with a bat in front of a mirror is a great 10-minute daily habit." },
    ],
  },
  {
    slug: "serve-and-receive",
    emoji: "🎯",
    title: "Serve & receive",
    short: "Short backspin, long fast serves and reading spin.",
    metaTitle: "Table Tennis Serve Practice Plan: Serve & Receive (50 min)",
    metaDescription:
      "A 50-minute table tennis serve and receive practice: short backspin, long serves, side-spin variations and receiving drills.",
    level: "All levels",
    sessionType: "serve",
    intro:
      "Every point starts with a serve, yet it's the most under-practised shot. This plan needs only a bucket of balls for the serve half, and a partner for receive. Pair it with our sister site TT Serves for technique breakdowns.",
    blocks: [
      {
        title: "Warm-up",
        items: [
          { name: "Wrist and shoulder mobility", minutes: 3 },
          { name: "Easy rally", minutes: 4 },
        ],
      },
      {
        title: "Serve (bucket of balls)",
        items: [
          { name: "Short backspin, bounce twice on their side", minutes: 8, note: "Target: a towel near the net" },
          { name: "Long fast serve to the corners", minutes: 6 },
          { name: "Side-spin / side-backspin with the same motion", minutes: 8 },
        ],
      },
      {
        title: "Receive (with partner)",
        items: [
          { name: "Push or flick against short serves", minutes: 8 },
          { name: "Attack long serves", minutes: 6 },
          { name: "Serve + third ball, play the point out", minutes: 7 },
        ],
      },
    ],
    tips: [
      { title: "Same motion, different spin", body: "The best serves look identical until contact. Practise disguise, not just spin." },
      { title: "Count good serves", body: "Out of 20, how many landed where you wanted? Put the number in your session notes." },
      { title: "Check the rules", body: "Toss at least 16 cm, from an open palm, and keep the ball visible." },
    ],
    faqs: [
      { q: "How many serves should I practise?", a: "A bucket of 50–100 balls per session is plenty. Focus on quality and placement." },
      { q: "What's the most important serve to learn first?", a: "A short backspin serve. It stops opponents attacking and sets up your third ball." },
      { q: "Where can I learn more serve techniques?", a: "TT Serves covers 20+ serves, from pendulum to reverse and tomahawk, with step-by-step guides." },
    ],
  },
  {
    slug: "multiball-training",
    emoji: "🧺",
    title: "Multiball training",
    short: "High-repetition feeding to groove strokes fast.",
    metaTitle: "Multiball Table Tennis Drills: 40-Minute Session",
    metaDescription:
      "A 40-minute multiball table tennis session: topspin, footwork and backspin-to-topspin drills with a feeder. Great for building consistency.",
    level: "Intermediate",
    sessionType: "technique",
    intro:
      "Multiball packs hundreds of repetitions into a short session. One player feeds from a basket, the other hits. Swap every set so you both train, and both get feeding practice.",
    blocks: [
      {
        title: "Warm-up",
        items: [{ name: "Easy rally and shadow strokes", minutes: 6 }],
      },
      {
        title: "Main block (sets of 20–30 balls)",
        items: [
          { name: "Forehand topspin, fixed spot", minutes: 6 },
          { name: "Backhand topspin, fixed spot", minutes: 6 },
          { name: "Topspin against backspin, alternating wings", minutes: 8 },
          { name: "Random placement, whole table", minutes: 8 },
        ],
      },
      {
        title: "Cool-down",
        items: [{ name: "Collect balls, stretch", minutes: 6 }],
      },
    ],
    tips: [
      { title: "Feeder sets the pace", body: "Start slow and speed up only when the player hits 8/10 on target." },
      { title: "Short sets", body: "20–30 balls per set keeps technique sharp. Fatigue grooves bad habits." },
      { title: "Log both roles", body: "Log it as a technique session, noting what you fed and what you hit." },
    ],
    faqs: [
      { q: "How many balls do I need for multiball?", a: "At least 60–100 so you're not constantly collecting. Training balls are cheap." },
      { q: "Is multiball better than regular drills?", a: "It's better for repetitions and footwork; regular rallies are better for timing against a real ball. Use both." },
      { q: "Can beginners do multiball?", a: "Yes, with slow, predictable feeds to one spot. It's one of the fastest ways to learn a stroke." },
    ],
  },
  {
    slug: "forehand-backhand-consistency",
    emoji: "🔁",
    title: "Forehand & backhand consistency",
    short: "Long rallies, targets and transition work.",
    metaTitle: "Forehand & Backhand Consistency Drills for Table Tennis",
    metaDescription:
      "A 55-minute table tennis consistency session: target rallies, down-the-line, forehand-backhand transition and counter-hitting.",
    level: "All levels",
    sessionType: "technique",
    intro:
      "Consistency wins more matches than winners. This session is built around rally-count goals so every drill has a clear finish line. Write the best count in your notes and try to beat it next week.",
    blocks: [
      {
        title: "Warm-up",
        items: [
          { name: "Mobility and shadow strokes", minutes: 4 },
          { name: "Forehand and backhand crosscourt", minutes: 6 },
        ],
      },
      {
        title: "Main block",
        items: [
          { name: "Forehand crosscourt, goal: 50 in a row", minutes: 10 },
          { name: "Backhand crosscourt, goal: 50 in a row", minutes: 10 },
          { name: "Down-the-line: FH to BH", minutes: 8 },
          { name: "Transition: 2 BH – 1 FH", minutes: 10 },
        ],
      },
      {
        title: "Play",
        items: [{ name: "Rally games: point only counts after 5 balls", minutes: 7 }],
      },
    ],
    tips: [
      { title: "70% power", body: "Consistency drills aren't about speed. Stay relaxed and find your rhythm." },
      { title: "Pick a target", body: "Put a small object on the table. Aim to land near it, not just 'on the table'." },
      { title: "Track your record", body: "Note your best rally count in the session. Seeing it grow is motivating." },
    ],
    faqs: [
      { q: "How many balls in a row is good?", a: "50 crosscourt drives without a miss is a solid club-level benchmark; 100 is excellent." },
      { q: "Why is my backhand less consistent?", a: "Usually the elbow drifts back or the bat angle opens. Keep the elbow forward and use a short swing." },
      { q: "Should I play games or drill?", a: "Both. Drill for 70–80% of the session, then test it in games at the end." },
    ],
  },
  {
    slug: "match-play-prep",
    emoji: "🏆",
    title: "Match-play preparation",
    short: "Serve-receive patterns and pressure games before a tournament.",
    metaTitle: "Table Tennis Match Preparation Session (Pre-Tournament)",
    metaDescription:
      "A 60-minute table tennis match-prep session: serve-and-third-ball patterns, pressure games and tactical play before a league match or tournament.",
    level: "Intermediate",
    sessionType: "match",
    intro:
      "In the week before a league match or tournament, shift from technique to decision-making. This session drills your go-to patterns and adds pressure so match day feels familiar. Log the practice games as matches to see your win rate.",
    blocks: [
      {
        title: "Warm-up",
        items: [
          { name: "Jog, dynamic stretches", minutes: 4 },
          { name: "FH / BH rally and short game", minutes: 6 },
        ],
      },
      {
        title: "Patterns",
        items: [
          { name: "Your best serve + third-ball attack", minutes: 10 },
          { name: "Receive + fourth ball", minutes: 8 },
          { name: "Start at 8–8, 9–9, deuce (pressure games)", minutes: 10 },
        ],
      },
      {
        title: "Match play",
        items: [
          { name: "Best of 5 against a practice partner", minutes: 18, note: "Log it as a match with game scores" },
          { name: "Cool-down and review", minutes: 4 },
        ],
      },
    ],
    tips: [
      { title: "Two serves are enough", body: "Pick two serves you trust. Match day is not the time to experiment." },
      { title: "Scout with opponent notes", body: "Record style and handedness for each opponent so you can plan next time." },
      { title: "Taper the load", body: "Keep the day before a tournament short and light. Your heatmap will still show the streak." },
    ],
    faqs: [
      { q: "How should I train the week before a tournament?", a: "Reduce volume, keep intensity, and focus on serve-receive patterns and pressure situations." },
      { q: "What are pressure games?", a: "Games that start at a close score like 8–8 or 9–9, so every point matters from the first serve." },
      { q: "Should I log practice matches?", a: "Yes. Logging practice and tournament matches separately shows whether your practice form carries over." },
    ],
  },
];

export const totalMinutes = (d: Drill) =>
  d.blocks.reduce((sum, b) => sum + b.items.reduce((s, i) => s + i.minutes, 0), 0);

export const drillCount = (d: Drill) => d.blocks.reduce((sum, b) => sum + b.items.length, 0);

export const getDrill = (slug: string | undefined) => drills.find((d) => d.slug === slug);

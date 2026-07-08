// daveDemoScript.js — all copy for the /dave/demo experience.
// Content lives here so DaveDemoPage.jsx stays pure logic and copy can iterate
// without touching the component. FULLY SCRIPTED: no AI, no fetch, no backend.
// Frank is a fictional guide; every business's "Dave" has their own name.

export const meta = {
  title: 'See a Living Guide — The Dave Method | NextMonth',
  description:
    'Step into a demonstration of a NextMonth living guide: ask a 31-year expert what he checks first, and why.',
};

// Persistent honesty badge — rendered on every stage.
export const badge =
  'Demonstration — Frank is a fictional guide built to show how a real capture behaves.';

// Stage 1 — ENTER
export const enter = {
  eyebrow: 'A NextMonth Living Guide · Recognising Excellence',
  headline: 'Step into the goods-in bay.',
  scene: [
    "It's 6:40am. The first lorry of the morning is backed onto the bay, curtain-side already open, and the chilled air is rolling out over the concrete before anyone's had a coffee.",
    'Pallets wait in the half-dark — chilled food and cut flowers, stacked and shrink-wrapped. The temperature probe hangs on its hook by the door, exactly where it always is.',
    'The driver wants a signature. Frank wants a reading first.',
  ],
  cta: 'Meet Frank',
};

// Stage 2 — MEET THE GUIDE
export const guide = {
  name: 'Frank',
  initials: 'F',
  role: 'Goods-In Supervisor',
  business: 'Fenwick & Rowe · Chilled Food & Flower Distribution',
  tenure: '31 years on this floor',
  voiceLine:
    'Everyone asks me the same six things. Now you can ask them without waiting for me to get back from lunch.',
  cta: 'Ask Frank',
};

// Stage 3 — ASK.  A scripted question tree.
// Each answer opens with attribution framing (the system citing Frank), then
// Frank in first person, then a mono source line. Follow-ups unlock 2–3 more chips.
export const attribution = 'Frank explained exactly this:';

// Chips shown before any question is asked. Q4 and Q5 are reachable only as
// follow-ups (Q4 from Q2/Q3, Q5 from Q3/Q4) — never as an opening chip.
export const openingChips = ['q1', 'q2'];

export const questions = {
  q1: {
    id: 'q1',
    chip: 'What do you check first when a chilled delivery arrives?',
    answer: [
      "First thing, before anyone touches a door — I read the trailer temperature straight off the unit on the front of the box. That's the readout, not the paperwork. If the readout's wrong, nothing after it matters.",
      "Then I put the probe in the middle pallet. Not the front one. Everybody reaches for the front pallet because it's right there by the doors — but the front sits nearest the fridge unit, so it always reads coldest. It tells you what you want to hear. The middle pallet tells you the truth about the whole load.",
    ],
    source: 'Captured 14 Feb · Validated against incident log & SOP-7 · Goods-in module 2 of 5',
    followUps: ['q2', 'q3'],
  },
  q2: {
    id: 'q2',
    chip: 'What would a new starter get wrong here?',
    answer: [
      "Three things, nearly every time. They trust the temperature printed on the delivery note instead of probing it themselves — paper never kept anything cold. They sign the note before they've taken a reading, and the moment your name's on it, it's your load. And they let a driver who's running late rush them.",
      "The driver's schedule is not your problem. The reject decision is. Slow down, take the reading, then talk.",
    ],
    source: 'Captured 14 Feb · Validated against incident log & SOP-7 · Goods-in module 3 of 5',
    followUps: ['q3', 'q4'],
  },
  q3: {
    id: 'q3',
    chip: 'When do you reject a load?',
    answer: [
      "Two ways a load fails. The easy one: the middle-pallet probe comes back above threshold. That's a reject — no negotiation, no 'it's only half a degree.'",
      "The one that catches people out: the number can be right and the load still wrong. If I see ice crystals refrozen on the packaging, or the readings jump around front-to-back, that fridge failed somewhere on the road and recovered before it reached me. Compliant on the probe, spoiled in the box. I reject that too.",
    ],
    source: 'Captured 14 Feb · Validated against incident log & SOP-7 · Goods-in module 4 of 5',
    followUps: ['q4', 'q5'],
  },
  q4: {
    id: 'q4',
    chip: 'Why the middle pallet and not the front?',
    answer: [
      "Because you measure where the system is weakest, not where it's easiest to reach. The front's convenient — and that's exactly why it lies to you. The middle pallet is the honest sample.",
      "That rule works on a lot more than lorries. Anywhere you're checking whether something's really fine, don't check the part that's built to look fine.",
    ],
    source: 'Captured 14 Feb · Validated against SOP-7 · Goods-in module 4 of 5',
    followUps: ['q5'],
  },
  q5: {
    id: 'q5',
    chip: "What happens if you're not in that day?",
    answer: [
      "Before this? Chaos — or they'd phone me on my holiday to ask which pallet to probe.",
      "Now? You just did the thing they'd have phoned me for. That's the whole point.",
    ],
    source: 'Captured 14 Feb · Validated against incident log · Goods-in module 5 of 5',
    followUps: [],
  },
};

// Prompt shown once every question has been asked.
export const askExhausted =
  "That's the six things everyone asks. Ready to see if it stuck?";

// Stage 4 — CHECK.  One question, chip answers, Frank's one-line explanation.
export const check = {
  eyebrow: 'One quick check',
  question:
    'The delivery note says 2.8°C. The front pallet probes at 3.1°C. What do you do next?',
  options: [
    { id: 'a', label: 'Probe the middle pallet before any signature', correct: true },
    { id: 'b', label: "Sign the note — 3.1°C is under threshold, close enough", correct: false },
    { id: 'c', label: "Reject the load — the note and the probe don't agree", correct: false },
  ],
  // Shown after answering, whether right or wrong (teaches the right move either way).
  explanation:
    "Frank: The note and the front pallet don't even agree — and the front always reads cold anyway. You don't sign, and you don't reject yet. You probe the middle pallet. That's the reading the whole load lives or dies on.",
  correctToast: 'That\'s the one.',
  incorrectToast: 'Not quite — here\'s Frank.',
};

// Stage 5 — THE TURN (close to sales)
export const turn = {
  eyebrow: 'Recognition at scale',
  paragraphs: [
    'You just learned Frank\'s judgement in ninety seconds — without interrupting him, without looking stupid, and without waiting for him to become available. New starters can do this five times over. Nobody ever knows it took five.',
    'This is what NextMonth does: we recognise the contribution of your best people and turn their experience into a living business brain that helps everyone grow.',
  ],
  primaryCta: { label: 'Work out what your Frank is worth', href: '/dave#calculator' },
  secondaryCta: { label: 'Book a floor-walk audit', href: '/#founding' },
};

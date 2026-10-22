export type FestivalDay = 1 | 2 | 3;
export type EventVisual = 'code' | 'chip' | 'terminal' | 'paper' | 'shield' | 'cad' | 'auction' | 'race' | 'bridge' | 'boat' | 'blocks' | 'quest' | 'mystery' | 'plane' | 'bug' | 'forge' | 'synapse' | 'cyber';
export type EventType = 'hackathon-software' | 'hackathon-hardware' | 'flagship' | 'fun' | 'workshop';
export type CategoryFilter = 'all' | EventType;

export interface FestivalEvent {
  id: string;
  name: string;
  eventType: EventType;
  category: string;
  visual: EventVisual;
  description: string;
  overview: string;
  rules: string[];
  rulesConfirmed: boolean;
  format: string | null;
  teamSize: string | null;
  fee: string | null;

  schedule: {
    days: FestivalDay[]; // Empty until confirmed; multi-day events can use [1, 2].
    time: string | null; // Human-readable time in IST.
    venue: string | null;
  };
  registrationUrl: string | null;
  featured?: boolean;
  sessions?: string[];
  duration?: string | null;
  prerequisites?: string | null;
  organizerExperience?: string | null;
}

const pendingDetails = {
  rules: [],
  rulesConfirmed: false,
  format: null,
  teamSize: null,
  fee: null,

  schedule: { days: [], time: null, venue: null },
  registrationUrl: null,
};

export const competitions: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'software-hackathon', name: 'Hackathon (Software)', eventType: 'hackathon-software', category: 'Software', visual: 'code', featured: true,
    description: 'Turn a problem into a working prototype. Build, test, and bring your ideas to life.',
    overview: 'A software innovation challenge for builders who want to create useful digital solutions. Continues across Day 1, Day 2, and Day 3.',
    fee: '₹499 (+ ₹100/participant for accommodation)',

    schedule: { days: [1, 2, 3], time: '2:00 PM Onwards', venue: '1 Room Full Day' },
  },
  {
    ...pendingDetails,
    id: 'hardware-hackathon', name: 'Hackathon (Hardware)', eventType: 'hackathon-hardware', category: 'Hardware', visual: 'chip', featured: true,
    description: 'Connect circuits, code, and creativity to build something you can put your hands on.',
    overview: 'Explore physical prototyping and embedded systems through a hardware challenge. Continues across Day 1, Day 2, and Day 3.',
    fee: '₹499 (+ ₹100/participant for accommodation)',

    schedule: { days: [1, 2, 3], time: '2:00 PM Onwards', venue: '1 Room Full Day' },
  },
  {
    ...pendingDetails,
    id: 'cp-rush', name: 'CP Rush (Competitive Programming)', eventType: 'flagship', category: 'Algorithms', visual: 'terminal',
    description: 'Find the pattern. Design the algorithm. Put your problem-solving skills to the test.',
    overview: 'Solve programming problems that challenge your reasoning and algorithmic speed. The contest platform, scoring system, and problem sets will be announced by the organizers.',
    fee: '₹89',

    schedule: { days: [1], time: '10:00 AM – 11:30 AM', venue: '1 Room (1st Half)' },
  },
  {
    ...pendingDetails,
    id: 'ctf', name: 'Hack CTF', eventType: 'flagship', category: 'Cybersecurity', visual: 'shield', featured: true,
    description: 'Follow the clues, decode the challenge, and capture the flag.',
    overview: 'A cybersecurity competition centered on solving security puzzles in the event environment. Challenge categories, platform access, and scoring rules will be announced.',
    fee: '₹150 (Team of 2–4)',
    teamSize: '2–4 Members',
    managedBy: 'Energy',
    schedule: { days: [1], time: '12:00 PM – 5:00 PM', venue: '1 Room (1st Half)' },
  },
  {
    ...pendingDetails,
    id: 'technical-paper', name: 'Technical Paper Presentation', eventType: 'flagship', category: 'Research', visual: 'paper',
    description: 'Share your research, explain your thinking, and make a compelling technical case.',
    overview: 'Present a technical paper and communicate its motivation, methods, and findings. Topics, abstract guidelines, and review criteria are to be announced.',
    fee: 'Free',

    schedule: { days: [2], time: '10:00 AM Onwards', venue: 'Biotech Seminar Hall / Textile Seminar Hall' },
  },
  {
    ...pendingDetails,
    id: 'cad', name: 'Clash of CAD (CADathon)', eventType: 'flagship', category: 'Aerospace + Civicon', visual: 'cad',
    description: 'Translate an engineering idea into a precise digital design.',
    overview: 'An engineering design competition by Civicon. The design brief, supported CAD software, deliverables, and judging criteria will be announced.',
    fee: '₹49',

    schedule: { days: [2], time: '11:00 AM – 1:00 PM', venue: 'Civicon Room (3–4 Hour Competition)' },
  },
  {
    ...pendingDetails,
    id: 'auto-forge', name: 'Auto Forge', eventType: 'flagship', category: 'Automotive', visual: 'forge',
    description: 'Engineer your way through automotive challenges that test design, mechanics, and ingenuity.',
    overview: 'Auto Forge is an automotive engineering challenge organized by SAE. Challenge details and evaluation criteria will be announced.',
    fee: 'Free',

    schedule: { days: [3], time: '10:00 AM – 1:00 PM', venue: '1 Projector Room' },
  },
];

export const funEvents: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'ipl-auction', name: 'IPL Auction', eventType: 'fun', category: 'Strategy', visual: 'auction',
    description: 'Think like a franchise. Balance your picks and build your dream cricket squad.',
    overview: 'A cricket auction strategy event. The player pool, budget, squad constraints, auction process, and scoring format will be announced before registration.',
    fee: '₹200',

    schedule: { days: [1], time: '5:00 PM – 8:00 PM', venue: 'Central Stage' },
  },
  {
    ...pendingDetails,
    id: 'minecraft', name: 'Minecraft Competition', eventType: 'fun', category: 'Civicon + Aerospace', visual: 'blocks',
    description: 'Bring your imagination into a world built one block at a time.',
    overview: 'A Minecraft building competition organized by Civicon. Server requirements, build objectives, and competition rules will be announced.',
    fee: '₹39',

    schedule: { days: [1], time: '2:00 PM – 4:00 PM', venue: 'Civicon Room' },
  },
  {
    ...pendingDetails,
    id: 'atv-racing', name: 'ATV Racing (Timed Challenge)', eventType: 'fun', category: 'Racing', visual: 'race',
    description: 'Take on a timed challenge where every second counts.',
    overview: 'An ATV racing challenge against the clock organized by SAE. Vehicle setup, course, and timing rules will be announced.',
    format: 'Timed challenge',
    fee: '₹109',

    schedule: { days: [2, 3], time: '1:00 PM Onwards', venue: 'Omfed Area' },
  },
  {
    ...pendingDetails,
    id: 'bug-hunting', name: 'Bug Hunting', eventType: 'fun', category: 'Debugging', visual: 'bug',
    description: 'Track down elusive bugs, squash them before time runs out, and prove you have the sharpest eye in the room.',
    overview: 'A fast-paced debugging challenge where participants hunt for bugs hidden in code and systems. Platform and rules will be announced.',
    fee: '₹79',

    schedule: { days: [2], time: '3:00 PM – 5:00 PM', venue: 'Civicon Room' },
  },
  {
    ...pendingDetails,
    id: 'hanging-highway', name: 'Hanging Highway – Bridge Making', eventType: 'fun', category: 'Bridge Making', visual: 'bridge',
    description: 'Build a bridge between a bold idea and a structure that holds.',
    overview: 'A bridge-making competition testing structural thinking and construction. Materials and load-bearing tests will be conducted on site.',
    fee: '₹39',


    schedule: { days: [3], time: '2:00 PM – 5:00 PM', venue: 'D402 – Civicon' },
  },
  {
    ...pendingDetails,
    id: 'boat-building', name: 'Boat Building', eventType: 'fun', category: 'Design + Build', visual: 'boat',
    description: 'Explore balance, buoyancy, and a little ingenuity. Can your design stay afloat?',
    overview: 'Design and build a boat for an engineering buoyancy challenge organized by Zairza. Materials, size limits, and water testing will be announced.',
    fee: 'Free',

    schedule: { days: [3], time: '2:00 PM – 4:00 PM', venue: '1 Room' },
  },
  {
    ...pendingDetails,
    id: 'synapse', name: 'Synapse – The Killer Code', eventType: 'fun', category: 'Biozo', visual: 'synapse',
    description: 'A deadly line of code. A race against time. Can you crack the sequence before it\'s too late?',
    overview: 'Synapse – The Killer Code is a high-stakes puzzle event by Biozo. The challenge format, clue systems, and rules will be announced.',
    fee: '₹89',

    schedule: { days: [3], time: '3:00 PM – 5:00 PM', venue: 'Outside' },
  },
];

export const workshops: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'rc-plane', name: 'RC-Plane Workshop', eventType: 'workshop', category: 'Practical Aerospace', visual: 'plane',
    description: 'From lift to landing: explore the fundamentals of designing and flying RC aircraft.',
    overview: 'A practical introduction to aircraft design, aerodynamics, and flight control. Explore how RC aircraft components work together, learn the assembly process, and see flight demonstrations.',
    sessions: ['Aircraft design and aerodynamic fundamentals', 'RC components: airframe, propulsion, radio, and flight controls', 'Assembly walkthrough and control setup', 'Flight demonstrations and discussion'],
    fee: 'Free',

    duration: '2 Hours', prerequisites: null,
    organizerExperience: null,
    schedule: { days: [1], time: '3:00 PM – 5:00 PM', venue: 'Aerospace Room (Projector)' },
  },
  {
    ...pendingDetails,
    id: 'arduino', name: 'Arduino + ESP32 Workshop', eventType: 'workshop', category: 'Electronics + Code', visual: 'chip',
    description: 'Start with a circuit. Add a few lines of code. Make your first interactive project.',
    overview: 'Get introduced to Arduino and ESP32 through basic electronics, sensors, and actuators. Build circuits, write programs, and explore practical embedded projects.',
    sessions: ['Arduino and ESP32 microcontroller fundamentals', 'Basic electronics, sensors, and actuators', 'Hands-on circuit building and programming', 'Simple practical projects and troubleshooting'],
    fee: 'Free',

    duration: '3 Hours', prerequisites: null,
    schedule: { days: [2], time: '2:00 PM – 5:00 PM', venue: 'Projector Room' },
  },
  {
    ...pendingDetails,
    id: 'cybersecurity', name: 'CyberSecurity Workshop', eventType: 'workshop', category: 'Security', visual: 'cyber',
    description: 'Understand how attacks work — and how to stop them.',
    overview: 'A hands-on cybersecurity workshop covering core security concepts, common vulnerabilities, and defensive techniques.',
    sessions: ['Threat landscape and attack fundamentals', 'Common vulnerabilities and exploit techniques', 'Defensive strategies and tools', 'Hands-on lab exercises'],
    fee: 'Free',

    duration: '1 Hour', prerequisites: null,
    schedule: { days: [3], time: '4:00 PM – 5:00 PM', venue: 'Hackathon Room' },
  },
];

/** All events in display order: hackathons first, then flagship, fun, workshops. */
export const allEvents: FestivalEvent[] = [
  ...competitions,
  ...funEvents,
  ...workshops,
];

export function filterEventsByDay(events: FestivalEvent[], day: FestivalDay | 'all') {
  return day === 'all' ? events : events.filter(event => event.schedule.days.includes(day));
}

/** Filter events by category for the unified event hub. */
export function filterByCategory(events: FestivalEvent[], filter: CategoryFilter): FestivalEvent[] {
  if (filter === 'all') return events;
  return events.filter(e => e.eventType === filter);
}

/** Only confirmed HTTPS Google Forms / Unstop destinations become active links. */
export function registrationHref(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const isGoogleForm = url.hostname === 'forms.gle' ||
      (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')) ||
      (url.hostname === 'forms.google.com');
    const isUnstop = url.hostname === 'unstop.com' || url.hostname === 'www.unstop.com';
    return isGoogleForm || isUnstop ? url.href : null;
  } catch {
    return null;
  }
}

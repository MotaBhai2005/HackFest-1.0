export type FestivalDay = 1 | 2 | 3;
export type EventVisual = 'code' | 'chip' | 'terminal' | 'paper' | 'shield' | 'cad' | 'auction' | 'race' | 'bridge' | 'boat' | 'blocks' | 'quest' | 'mystery' | 'plane';

export interface FestivalEvent {
  id: string;
  name: string;
  category: string;
  visual: EventVisual;
  description: string;
  overview: string;
  rules: string[];
  rulesConfirmed: boolean;
  format: string | null;
  teamSize: string | null;
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
  schedule: { days: [], time: null, venue: null },
  registrationUrl: null,
};

export const competitions: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'software-hackathon', name: 'Hackathon (Software)', category: 'Software', visual: 'code', featured: true,
    description: 'Turn a problem into a working prototype. Build, test, and bring your ideas to life.',
    overview: 'A software innovation challenge for builders who want to create useful digital solutions. Problem statements, the build window, submission requirements, and judging criteria will be announced by the organizers.',
  },
  {
    ...pendingDetails,
    id: 'hardware-hackathon', name: 'Hackathon (Hardware)', category: 'Hardware', visual: 'chip', featured: true,
    description: 'Connect circuits, code, and creativity to build something you can put your hands on.',
    overview: 'Explore physical prototyping and embedded systems through a hardware challenge. The brief, available components, equipment policy, safety guidelines, and evaluation criteria are to be announced.',
  },
  {
    ...pendingDetails,
    id: 'competitive-programming', name: 'Competitive Programming', category: 'Algorithms', visual: 'terminal',
    description: 'Find the pattern. Design the algorithm. Put your problem-solving skills to the test.',
    overview: 'Solve programming problems that challenge your reasoning and algorithmic thinking. The contest platform, permitted languages, scoring system, and competition duration will be published with the rules.',
  },
  {
    ...pendingDetails,
    id: 'technical-paper', name: 'Technical Paper Presentation', category: 'Research', visual: 'paper',
    description: 'Share your research, explain your thinking, and make a compelling technical case.',
    overview: 'Present a technical paper and communicate its motivation, methods, and findings. Topics, abstract requirements, presentation length, submission deadlines, and review criteria are to be announced.',
  },
  {
    ...pendingDetails,
    id: 'ctf', name: 'CTF (Cybersecurity)', category: 'Cybersecurity', visual: 'shield', featured: true,
    description: 'Follow the clues, decode the challenge, and capture the flag.',
    overview: 'A cybersecurity competition centered on solving security puzzles in the event environment. Challenge categories, platform access, permitted tools, and scoring details will be announced.',
  },
  {
    ...pendingDetails,
    id: 'cad', name: 'CAD Competition', category: 'Aerospace + Civicon', visual: 'cad',
    description: 'Translate an engineering idea into a precise digital design.',
    overview: 'An engineering design competition by Aerospace + Civicon. The design brief, supported CAD software, deliverables, and judging criteria are to be announced.',
  },
];

export const funEvents: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'ipl-auction', name: 'IPL Auction', category: 'Strategy', visual: 'auction',
    description: 'Think like a franchise. Balance your picks and build your dream cricket squad.',
    overview: 'A cricket auction strategy event. The player pool, budget, squad constraints, auction process, and scoring format will be announced before registration.',
  },
  {
    ...pendingDetails,
    id: 'atv-racing', name: 'ATV Racing (Timed Challenge)', category: 'Racing', visual: 'race',
    description: 'Take on a timed challenge where every second counts.',
    overview: 'An ATV racing challenge against the clock. The organizers will confirm the vehicle setup, course, eligibility, safety requirements, and timing rules.',
    format: 'Timed challenge',
  },
  {
    ...pendingDetails,
    id: 'hanging-highway', name: 'Hanging Highway', category: 'Bridge Making', visual: 'bridge',
    description: 'Build a bridge between a bold idea and a structure that holds.',
    overview: 'A bridge-making event exploring structural thinking and construction. Materials, dimensions, loading procedure, and evaluation criteria are to be announced.',
  },
  {
    ...pendingDetails,
    id: 'boat-building', name: 'Boat Building', category: 'Design + Build', visual: 'boat',
    description: 'Explore balance, buoyancy, and a little ingenuity. Can your design stay afloat?',
    overview: 'Design and build a boat for an engineering challenge. Construction materials, size limits, testing conditions, and judging details will be announced by the organizers.',
  },
  {
    ...pendingDetails,
    id: 'minecraft', name: 'Minecraft Competition', category: 'Civicon + Aerospace', visual: 'blocks',
    description: 'Bring your imagination into a world built one block at a time.',
    overview: 'A Minecraft competition with its final format to be confirmed by Civicon + Aerospace. Game edition, server requirements, build objectives, and competition rules are to be announced.',
  },
  {
    ...pendingDetails,
    id: 'sae-quest', name: 'SAE-Quest', category: 'Name + Format TBD', visual: 'quest',
    description: 'A new challenge is taking shape. Stay tuned for the next transmission.',
    overview: 'SAE-Quest is a working title. The event name, competition format, objectives, and participation requirements are being refined and will be announced.',
  },
  {
    ...pendingDetails,
    id: 'murder-mystery', name: 'Murder Mystery', category: 'Biozo', visual: 'mystery',
    description: 'Connect the clues, question the evidence, and unravel the mystery.',
    overview: 'A mystery-solving event by Biozo. The story format, participation structure, clue system, and rules are to be announced.',
  },
];

export const workshops: FestivalEvent[] = [
  {
    ...pendingDetails,
    id: 'rc-plane', name: 'RC-Plane Workshop', category: 'Practical Aerospace', visual: 'plane',
    description: 'From lift to landing: explore the fundamentals of designing and flying RC aircraft.',
    overview: 'A practical introduction to aircraft design, aerodynamics, and flight control. Explore how RC aircraft components work together, learn the assembly process, and see flight principles in action through demonstrations. Session timings and the final hands-on format are to be announced.',
    sessions: ['Aircraft design and aerodynamic fundamentals', 'RC components: airframe, propulsion, radio, and flight controls', 'Assembly walkthrough and control setup', 'Flight demonstrations and discussion'],
    duration: null, prerequisites: null,
    // Add only verified organizer experience here; do not imply a corporate partnership.
    organizerExperience: null,
  },
  {
    ...pendingDetails,
    id: 'arduino', name: 'Arduino Workshop', category: 'Electronics + Code', visual: 'chip',
    description: 'Start with a circuit. Add a few lines of code. Make your first interactive project.',
    overview: 'Get introduced to Arduino and microcontrollers through basic electronics, sensors, and actuators. Build circuits, write programs, and explore simple practical projects that connect code to the physical world. Session timings, materials, and kit availability are to be announced.',
    sessions: ['Arduino and microcontroller fundamentals', 'Basic electronics, sensors, and actuators', 'Hands-on circuit building and programming', 'Simple practical projects and troubleshooting'],
    duration: null, prerequisites: null,
  },
];

export function filterEventsByDay(events: FestivalEvent[], day: FestivalDay | 'all') {
  return day === 'all' ? events : events.filter(event => event.schedule.days.includes(day));
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

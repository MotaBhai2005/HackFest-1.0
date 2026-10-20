import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import { competitions, filterEventsByDay, funEvents, workshops } from '../data/events';
import type { FestivalDay } from '../data/events';
import MagneticDots from '../components/ui/MagneticDots';

const catalogs = {
  '/events': {
    code: '01 / COMPETITIONS', title: 'Build. Solve. Compete.',
    description: 'Six ways to challenge your thinking. Explore the technical competitions at HACKFEST 2026 and find your next challenge.',
    events: competitions,
  },
  '/fun-events': {
    code: '02 / FUN EVENTS', title: 'Beyond the code.',
    description: 'Strategy, speed, construction, and a little mystery. Explore the other side of HACKFEST across three festival days.',
    events: funEvents,
  },
  '/workshops': {
    code: '03 / WORKSHOPS', title: 'Learn it. Build it.',
    description: 'Get closer to the engineering. Explore practical aerospace and electronics through workshops built around hands-on learning.',
    events: workshops,
  },
};

export type CatalogPath = keyof typeof catalogs;

export default function CatalogPage({ path }: { path: CatalogPath }) {
  const catalog = catalogs[path];
  const [day, setDay] = useState<FestivalDay | 'all'>('all');
  const events = filterEventsByDay(catalog.events, day);
  const pendingCount = catalog.events.filter(event => !event.schedule.days.length).length;

  return (
    <>
      <header className="catalog-header">
        <div className="max-w-7xl mx-auto relative">
          <a href="/" className="font-mono text-xs font-bold hover:underline">← BACK TO HOME</a>
          <p className="festival-eyebrow mt-10">HACKFEST 2026 // {catalog.code}</p>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display font-bold text-[clamp(2.5rem,7vw,7rem)] uppercase leading-none tracking-tighter mt-3 max-w-5xl">{catalog.title}</motion.h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed">{catalog.description}</p>
          <div className="font-mono text-xs font-bold mt-8 flex flex-wrap gap-4"><span>STARTING 04 NOV 2026</span><span>ALL TIMES IN IST</span><span>[ {catalog.events.length} {path === '/workshops' ? 'WORKSHOPS' : 'EVENTS'} ]</span></div>
        </div>
      </header>
      <section className="bg-hack-black px-4 md:px-8 py-12 md:py-20 relative overflow-hidden" aria-label={path === '/workshops' ? 'Workshops' : 'Events'}>
        <MagneticDots />
        <div className="max-w-7xl mx-auto relative z-[1]">
          {path === '/fun-events' && <>
            <div className="day-filters" role="group" aria-label="Filter fun events by festival day">
              {(['all', 1, 2, 3] as const).map(value => <button key={value} className={`day-filter ${day === value ? 'is-active' : ''}`} aria-pressed={day === value} onClick={() => setDay(value)}>{value === 'all' ? 'All Events' : `Day ${value}`}</button>)}
            </div>
            {pendingCount > 0 && <p className="text-white/70 text-sm leading-relaxed mt-5 mb-8">Day assignments are being finalized. {pendingCount} {pendingCount === 1 ? 'event is' : 'events are'} awaiting a schedule and {pendingCount === 1 ? 'appears' : 'appear'} under All Events.</p>}
          </>}
          <p className="font-mono text-xs text-hack-yellow mb-6" role="status" aria-live="polite">{events.length} {path === '/workshops' ? 'workshops' : 'events'}{day !== 'all' ? ` scheduled for Day ${day}` : ' to explore'}</p>
          {events.length ? <div className={`festival-grid ${path === '/workshops' ? 'workshop-grid' : ''}`}>{events.map(event => <EventCard key={event.id} event={event} index={catalog.events.indexOf(event)} />)}</div> : <div className="schedule-empty">
            <span className="font-display text-6xl text-hack-red" aria-hidden="true">[ ? ]</span>
            <h2 className="font-display font-bold text-2xl text-hack-yellow mt-4">Day {day} schedule coming soon</h2>
            <p className="text-white/70 text-sm mt-3">Events will appear here once their day assignments are confirmed.</p>
            <button className="festival-button mt-6" onClick={() => setDay('all')}>Explore All Fun Events →</button>
          </div>}
        </div>
      </section>
    </>
  );
}

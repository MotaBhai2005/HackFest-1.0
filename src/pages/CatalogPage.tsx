import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import { allEvents, competitions, filterEventsByDay, filterByCategory, funEvents, workshops } from '../data/events';
import type { FestivalDay, CategoryFilter } from '../data/events';
import MagneticDots from '../components/ui/MagneticDots';

const catalogs = {
  '/events': {
    code: '01 / ALL EVENTS', title: 'Build. Solve. Compete.',
    description: 'Every event at HACKFEST 2026 — from the main hackathons to flagship competitions, fun events, and hands-on workshops. Find your challenge.',
    events: allEvents,
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

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: 'all',                label: 'All Events' },
  { value: 'hackathon-software', label: 'Software Hackathon' },
  { value: 'hackathon-hardware', label: 'Hardware Hackathon' },
  { value: 'flagship',           label: 'Flagship Events' },
  { value: 'fun',                label: 'Fun Events' },
  { value: 'workshop',           label: 'Workshops' },
];

const CATEGORY_LABEL_MAP: Record<CategoryFilter, string> = {
  'all':                'All Events',
  'hackathon-software': 'Software Hackathon',
  'hackathon-hardware': 'Hardware Hackathon',
  'flagship':           'Flagship Events',
  'fun':                'Fun Events',
  'workshop':           'Workshops',
};

export default function CatalogPage({ path }: { path: CatalogPath }) {
  const catalog = catalogs[path];
  const [day, setDay] = useState<FestivalDay | 'all'>('all');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const isHub = path === '/events';

  // Pipeline: category filter → day filter
  const byCategory = isHub ? filterByCategory(catalog.events, category) : catalog.events;
  const events = filterEventsByDay(byCategory, day);

  const pendingCount = byCategory.filter(event => !event.schedule.days.length).length;

  // Status label
  const typeLabel = category === 'workshop' || category === 'all' && path === '/workshops' ? 'workshops' : 'events';
  const filterLabel = isHub && category !== 'all' ? ` · ${CATEGORY_LABEL_MAP[category]}` : '';
  const dayLabel = day !== 'all' ? ` · Day ${day}` : ' to explore';

  return (
    <>
      <header className="catalog-header">
        <div className="max-w-7xl mx-auto relative">
          <a href="/" className="font-mono text-xs font-bold hover:underline">← BACK TO HOME</a>
          <p className="festival-eyebrow mt-10">HACKFEST 2026 // {catalog.code}</p>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display font-bold text-[clamp(2.5rem,7vw,7rem)] uppercase leading-none tracking-tighter mt-3 max-w-5xl">{catalog.title}</motion.h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed">{catalog.description}</p>
          <div className="font-mono text-xs font-bold mt-8 flex flex-wrap gap-4">
            <span>STARTING 04 NOV 2026</span>
            <span>ALL TIMES IN IST</span>
            <span>[ {catalog.events.length} {path === '/workshops' ? 'WORKSHOPS' : 'EVENTS'} ]</span>
          </div>
        </div>
      </header>

      <section className="bg-hack-black px-4 md:px-8 py-12 md:py-20 relative overflow-hidden" aria-label={path === '/workshops' ? 'Workshops' : 'Events'}>
        <MagneticDots />
        <div className="max-w-7xl mx-auto relative z-[1]">

          {/* ── Category filter row (unified hub only) ── */}
          {isHub && (
            <div className="day-filters category-filters" role="group" aria-label="Filter events by category">
              {CATEGORY_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`day-filter ${category === value ? 'is-active' : ''}`}
                  aria-pressed={category === value}
                  onClick={() => { setCategory(value); setDay('all'); }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* ── Day filter row (hub + fun-events) ── */}
          {(isHub || path === '/fun-events') && (
            <>
              <div className="day-filters" role="group" aria-label="Filter events by festival day">
                {(['all', 1, 2, 3] as const).map(value => (
                  <button
                    key={value}
                    className={`day-filter ${day === value ? 'is-active' : ''}`}
                    aria-pressed={day === value}
                    onClick={() => setDay(value)}
                  >
                    {value === 'all' ? 'All Days' : `Day ${value}`}
                  </button>
                ))}
              </div>
              {pendingCount > 0 && day === 'all' && (
                <p className="text-white/70 text-sm leading-relaxed mt-5 mb-2">
                  Day assignments are being finalised. {pendingCount} {pendingCount === 1 ? 'event is' : 'events are'} awaiting a schedule and {pendingCount === 1 ? 'appears' : 'appear'} under All Days.
                </p>
              )}
            </>
          )}

          {/* ── Status count ── */}
          <p className="font-mono text-xs text-hack-yellow mb-6 mt-4" role="status" aria-live="polite">
            {events.length} {typeLabel}{filterLabel}{dayLabel}
          </p>

          {/* ── Event grid or empty state ── */}
          {events.length ? (
            <div className={`festival-grid ${category === 'workshop' || path === '/workshops' ? 'workshop-grid' : ''}`}>
              {events.map(event => (
                <EventCard key={event.id} event={event} index={catalog.events.indexOf(event)} />
              ))}
            </div>
          ) : (
            <div className="schedule-empty">
              <span className="font-display text-6xl text-hack-red" aria-hidden="true">[ ? ]</span>
              <h2 className="font-display font-bold text-2xl text-hack-yellow mt-4">
                {day !== 'all' ? `Day ${day} schedule coming soon` : 'No events found'}
              </h2>
              <p className="text-white/70 text-sm mt-3">
                {day !== 'all'
                  ? 'Events will appear here once their day assignments are confirmed.'
                  : 'Try a different filter combination.'}
              </p>
              <button
                className="festival-button mt-6"
                onClick={() => { setCategory('all'); setDay('all'); }}
              >
                Explore All Events →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

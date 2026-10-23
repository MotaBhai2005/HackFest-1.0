import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import { allEvents, competitions, filterEventsByDay, filterByCategory, funEvents, workshops } from '../data/events';
import type { FestivalDay, CategoryFilter } from '../data/events';
import MagneticDots from '../components/ui/MagneticDots';

const catalogs = {
  '/events': {
    code: '01 / ALL EVENTS', title: 'Build. Solve. Compete.',
    description: 'Every event at HACKFEST 2026 — from HackOUTR hackathon editions to flagship competitions, fun events, and hands-on workshops. Find your challenge.',
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
  { value: 'all',      label: 'All Events' },
  { value: 'hackoutr', label: 'HackOUTR' },
  { value: 'flagship', label: 'Flagship Events' },
  { value: 'fun',      label: 'Fun Events' },
  { value: 'workshop', label: 'Workshops' },
];

const CATEGORY_LABEL_MAP: Record<CategoryFilter, string> = {
  'all':                'All Events',
  'hackoutr':           'HackOUTR',
  'hackathon-software': 'HackOUTR Software Edition',
  'hackathon-hardware': 'HackOUTR Hardware Edition',
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
  const typeLabel = category === 'workshop' || category === 'all' && path === '/workshops' ? 'workshops' : category === 'hackoutr' ? 'hackathon editions' : 'events';
  const filterLabel = isHub && category !== 'all' ? ` · ${CATEGORY_LABEL_MAP[category]}` : '';
  const dayLabel = day !== 'all' ? ` · Day ${day}` : ' to explore';

  return (
    <>
      <header className="catalog-header">
        <div className="max-w-7xl mx-auto relative">
          <a href="/" className="font-mono text-xs font-bold hover:underline inline-flex items-center gap-1 text-black/80 hover:text-black">← BACK TO HOME</a>
          <p className="festival-eyebrow mt-3 sm:mt-4 text-black/70">HACKFEST 2026 // {catalog.code}</p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight mt-2 max-w-5xl text-hack-black"
          >
            {catalog.title}
          </motion.h1>
          <p className="mt-2.5 sm:mt-3 max-w-2xl text-xs sm:text-sm text-black/80 leading-relaxed">{catalog.description}</p>
          <div className="font-mono text-[11px] sm:text-xs font-bold mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-black/70">
            <span>STARTING 04 NOV 2026</span>
            <span>·</span>
            <span>ALL TIMES IN IST</span>
            <span>·</span>
            <span>[ {catalog.events.length} {path === '/workshops' ? 'WORKSHOPS' : 'EVENTS'} ]</span>
          </div>
        </div>
      </header>

      <section className="bg-hack-black px-4 md:px-8 py-8 md:py-12 relative overflow-hidden" aria-label={path === '/workshops' ? 'Workshops' : 'Events'}>
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

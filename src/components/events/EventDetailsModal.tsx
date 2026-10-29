import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { FestivalEvent } from '../../data/events';
import { RegistrationButton } from './EventCard';
import RulebookButton from './RulebookButton';
import Breadcrumb, { type BreadcrumbItem } from '../ui/Breadcrumb';

interface EventDetailsModalProps {
  event: FestivalEvent;
  isOpen: boolean;
  onClose: () => void;
}

/* ── Chamfered border wrapper (top-left / bottom-right diagonal) ── */
function ChamferCard({
  children,
  className = '',
  innerClass = '',
  cut = 10,
}: {
  children: React.ReactNode;
  className?: string;
  innerClass?: string;
  cut?: number;
}) {
  const poly = `polygon(${cut}px 0%, 100% 0%, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, 0% 100%, 0% ${cut}px)`;
  return (
    <div
      className={`bg-white/15 ${className}`}
      style={{ clipPath: poly }}
    >
      <div
        className={`bg-[#0b0e1a] ${innerClass}`}
        style={{
          clipPath: `polygon(${cut}px 0%, 100% 0%, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, 0% 100%, 0% ${cut}px)`,
          margin: '1px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Chamfered chip badge ── */
function Chip({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`inline-block ${accent ? 'bg-hack-yellow' : 'bg-white/20'}`}
      style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
    >
      <div
        className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-0.5 ${accent ? 'bg-hack-yellow text-black' : 'bg-transparent text-hack-yellow'}`}
        style={{
          clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
          margin: accent ? '0' : '1px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Section heading with divider line ── */
function SectionHeading({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[10px] font-bold text-hack-yellow/60 shrink-0 tracking-widest">{number}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-hack-yellow/30 to-transparent" />
      <span className="font-mono text-[10px] font-bold text-hack-yellow tracking-[0.2em] uppercase shrink-0">
        {label}
      </span>
    </div>
  );
}

export default function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  /* ── Section counter ── */
  let secIdx = 0;
  const nextSec = () => String(++secIdx).padStart(2, '0');

  const CHAMFER = 18;
  const chamferPoly = `polygon(${CHAMFER}px 0%, 100% 0%, 100% calc(100% - ${CHAMFER}px), calc(100% - ${CHAMFER}px) 100%, 0% 100%, 0% ${CHAMFER}px)`;

  const isHackoutr = event.eventType === 'hackoutr' || event.id.includes('hackoutr');
  const modalBreadcrumbs: BreadcrumbItem[] = [
    { label: 'HACKFEST 2026', href: '/' },
  ];

  if (event.eventType === 'workshop') {
    modalBreadcrumbs.push({ label: 'Workshops', href: '/workshops' });
  } else if (event.eventType === 'fun') {
    modalBreadcrumbs.push({ label: 'Fun Events', href: '/fun-events' });
  } else {
    modalBreadcrumbs.push({ label: 'Events', href: '/events' });
    if (isHackoutr) {
      modalBreadcrumbs.push({ label: 'HackOUTR', href: '/events#hackoutr' });
    }
  }

  modalBreadcrumbs.push({ label: event.name });

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${event.id}`}
        >
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Modal Shell ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            {/* Outer chamfer border layer */}
            <div
              className="flex flex-col flex-1 min-h-0 bg-gradient-to-br from-amber-400/25 via-white/10 to-red-600/20"
              style={{ clipPath: chamferPoly }}
            >
              {/* Inner surface */}
              <div
                className="flex flex-col flex-1 min-h-0 bg-gradient-to-br from-[#0b0e18] via-[#080b14] to-[#06080f] overflow-hidden"
                style={{
                  clipPath: chamferPoly,
                  margin: '1px',
                }}
              >
                {/* Ambient glow blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -top-16 right-0 w-64 h-64 rounded-full bg-red-600/10 blur-[80px]" />
                  <div className="absolute bottom-0 -left-8 w-56 h-56 rounded-full bg-amber-400/8 blur-[70px]" />
                </div>

                {/* ── HEADER ── */}
                <div className="relative shrink-0 p-5 sm:p-7 border-b border-white/8">
                  {/* Subtle scanline on header */}
                  <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

                  {/* Breadcrumb Trail */}
                  <div className="mb-3.5 relative z-10">
                    <Breadcrumb items={modalBreadcrumbs} theme="dark" />
                  </div>

                  <div className="flex items-start justify-between gap-3 flex-wrap relative">
                    {/* Chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip accent>{event.category}</Chip>
                      {event.fee && <Chip>{event.fee}</Chip>}
                    </div>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close dialog"
                      className="group relative shrink-0 cursor-pointer"
                    >
                      <div
                        className="bg-white/20 group-hover:bg-red-500/60 transition-colors duration-200"
                        style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' }}
                      >
                        <div
                          className="font-mono text-[10px] font-bold text-white/70 group-hover:text-white px-4 py-1.5 uppercase tracking-widest transition-colors bg-[#0b0e18] group-hover:bg-red-900/50"
                          style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)', margin: '1px' }}
                        >
                          ✕ ESC
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Title */}
                  <h2
                    id={`modal-title-${event.id}`}
                    className="font-display font-black text-2xl sm:text-3xl md:text-[2.2rem] text-white uppercase mt-4 leading-none tracking-tight"
                  >
                    {event.name}
                  </h2>

                  {/* Schedule meta row */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-3">
                    {event.schedule.days.length > 0 ? (
                      <span className="font-mono text-xs text-hack-yellow font-bold">
                        {event.schedule.days.map((d) => `Day ${d}`).join(' + ')}
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-white/40">Day TBA</span>
                    )}
                    <span className="text-white/20 text-xs">·</span>
                    <span className="font-mono text-xs text-white/60">
                      {event.schedule.time && event.schedule.time !== 'TBA'
                        ? `${event.schedule.time} IST`
                        : 'Time TBA'}
                    </span>
                    {event.schedule.venue && (
                      <>
                        <span className="text-white/20 text-xs">·</span>
                        <span className="font-mono text-xs text-white/50">{event.schedule.venue}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* ── BODY (scrollable) ── */}
                <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 space-y-7">

                  {/* Early Bird Offer Banner if active */}
                  {event.earlyBird && (
                    <div className="p-4 bg-hack-yellow/15 border-2 border-hack-yellow relative overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-hack-yellow text-hack-black px-1.5 py-0.5">
                              FLASH OFFER
                            </span>
                            <span className="font-mono text-xs font-bold text-hack-yellow">
                              EARLY BIRD REGISTRATION ACTIVE
                            </span>
                          </div>
                          <p className="text-sm text-neutral-200 mt-1.5 leading-relaxed">
                            Lock in your team slot at <strong className="text-hack-yellow font-bold text-base">{event.earlyBird.price}</strong>{' '}
                            <span className="line-through text-white/50 text-xs">({event.earlyBird.regularPrice})</span>! Offer valid strictly till <strong className="text-white underline">{event.earlyBird.deadline}</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overview */}
                  <div>
                    <SectionHeading number={nextSec()} label="Overview" />
                    <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-300">
                      {event.overview}
                    </p>
                  </div>

                  {/* Sessions */}
                  {event.sessions && event.sessions.length > 0 && (
                    <div>
                      <SectionHeading number={nextSec()} label="Sessions & Topics" />
                      <ul className="space-y-2">
                        {event.sessions.map((session) => (
                          <li key={session} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-neutral-300">
                            <span className="text-hack-yellow mt-[3px] text-[10px] shrink-0">▶</span>
                            {session}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Organizer experience */}
                  {event.organizerExperience && (
                    <div>
                      <SectionHeading number={nextSec()} label="From the Organizers" />
                      <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-300">
                        {event.organizerExperience}
                      </p>
                    </div>
                  )}

                  {/* Rules & Guidelines */}
                  <div>
                    <SectionHeading
                      number={nextSec()}
                      label={event.sessions ? 'Guidelines & Prerequisites' : 'Rules & Guidelines'}
                    />

                    {/* Official Rulebook card if available */}
                    {event.rulebookUrl && (
                      <div className="mb-4">
                        <a
                          href={event.rulebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 p-3.5 bg-hack-yellow/10 border-2 border-hack-yellow hover:bg-hack-yellow/20 transition-all text-white"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl shrink-0" aria-hidden="true">📋</span>
                            <div>
                              <div className="font-mono text-xs font-bold text-hack-yellow uppercase tracking-wider group-hover:text-amber-300">
                                Official Rule Book & Guidelines
                              </div>
                              <div className="text-[11px] text-neutral-300 mt-0.5">
                                View tournament guidelines, rubrics, and detailed rules on Google Drive
                              </div>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold px-3 py-1.5 bg-hack-yellow text-hack-black uppercase tracking-wider group-hover:bg-white transition-colors shrink-0 flex items-center gap-1">
                            <span>Open</span>
                            <span aria-hidden="true">↗</span>
                          </span>
                        </a>
                      </div>
                    )}

                    {!event.rulesConfirmed && !event.rulebookUrl && (
                      <p className="text-xs text-white/40 italic mb-2.5">
                        Final rules to be announced by the organizers.
                      </p>
                    )}
                    {event.rules.length > 0 && (
                      <ul className="space-y-2">
                        {event.rules.map((rule) => (
                          <li key={rule} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-neutral-300">
                            <span className="text-hack-yellow/60 mt-[3px] text-[10px] shrink-0">◆</span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Specifications Matrix */}
                  <div>
                    <SectionHeading number={nextSec()} label="Specifications Matrix" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(
                        [
                          { label: 'Participation Format', value: event.format, highlight: false },
                          { label: 'Team Size', value: event.teamSize, highlight: false },
                          {
                            label: 'Registration Fee',
                            value: event.earlyBird
                              ? `${event.earlyBird.price} (Early Bird till ${event.earlyBird.deadline} · Regular ${event.earlyBird.regularPrice})`
                              : event.fee,
                            highlight: true,
                          },
                          { label: 'Venue', value: event.schedule.venue, highlight: false },
                          ...(event.sessions
                            ? [
                                { label: 'Duration', value: event.duration, highlight: false },
                                { label: 'What to Bring', value: event.prerequisites, highlight: false },
                              ]
                            : []),
                        ] as { label: string; value?: string; highlight: boolean }[]
                      ).map(({ label, value, highlight }) => (
                        <ChamferCard key={label} cut={8} innerClass="p-3">
                          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-hack-yellow/70 font-bold block">
                            {label}
                          </span>
                          <span
                            className={`mt-1.5 block text-sm font-semibold leading-snug ${
                              highlight ? 'text-hack-yellow' : 'text-white'
                            } ${!value ? 'text-white/30 italic text-xs' : ''}`}
                          >
                            {value || 'To Be Announced'}
                          </span>
                        </ChamferCard>
                      ))}
                    </div>
                  </div>

                  {/* Requirements alert box */}
                  {event.requirements && (
                    <div>
                      <SectionHeading number={nextSec()} label="Requirements & Equipment" />
                      <div className="relative overflow-hidden">
                        <div
                          className="bg-amber-400/20 p-[1px]"
                          style={{ clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)' }}
                        >
                          <div
                            className="bg-amber-400/5 px-4 py-3"
                            style={{ clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)' }}
                          >
                            <p className="text-sm text-neutral-200 leading-relaxed">{event.requirements}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Event Coordinators */}
                  {event.coordinators && event.coordinators.length > 0 && (
                    <div>
                      <SectionHeading number={nextSec()} label="Event Coordinators" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {event.coordinators.map((coordinator) => (
                          <ChamferCard key={coordinator.name} cut={7} innerClass="p-3">
                            <span className="font-mono text-xs font-bold text-white uppercase block leading-tight">
                              {coordinator.name}
                            </span>
                            {coordinator.phone && (
                              <a
                                href={`tel:${coordinator.phone.replace(/[^0-9+]/g, '')}`}
                                className="font-mono text-[11px] text-hack-yellow hover:text-amber-300 transition-colors mt-1.5 inline-flex items-center gap-1.5"
                              >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                                </svg>
                                {coordinator.phone}
                              </a>
                            )}
                          </ChamferCard>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── FOOTER ── */}
                <div className="relative shrink-0 border-t border-white/8 bg-white/[0.02] backdrop-blur-sm px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4">
                  {/* Meta text */}
                  <div className="font-mono text-[11px] text-white/40 min-w-0">
                    <span className="text-hack-yellow font-bold text-xs">{event.name}</span>
                    <span className="mx-2 text-white/20">·</span>
                    <span>
                      {event.schedule.days.length
                        ? `Day${event.schedule.days.length > 1 ? 's' : ''}: ${event.schedule.days.join(', ')}`
                        : 'Schedule TBA'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {/* Rulebook action button if available */}
                    {event.rulebookUrl && (
                      <a
                        href={event.rulebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] sm:text-xs font-bold border border-hack-yellow/70 text-hack-yellow hover:bg-hack-yellow hover:text-hack-black px-3 py-2 uppercase tracking-wider transition-colors inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Rulebook</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}

                    {/* Close ghost button */}
                    <button
                      type="button"
                      onClick={onClose}
                      className="group cursor-pointer"
                    >
                      <div
                        className="bg-white/15 group-hover:bg-white/25 transition-colors"
                        style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' }}
                      >
                        <div
                          className="font-mono text-[10px] font-bold text-white/60 group-hover:text-white transition-colors px-4 py-2 uppercase tracking-widest bg-[#0b0e18] group-hover:bg-[#141820]"
                          style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)', margin: '1px' }}
                        >
                          Close
                        </div>
                      </div>
                    </button>

                    {/* Register CTA */}
                    <RegistrationButton event={event} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Corner accent marks (thin 1px, only at two diagonal corners) ── */}
            {/* top-left */}
            <div className="pointer-events-none absolute top-0 left-0" style={{ transform: 'translate(-1px,-1px)' }}>
              <div className="w-5 h-[1px] bg-hack-yellow" />
              <div className="w-[1px] h-5 bg-hack-yellow" />
            </div>
            {/* bottom-right */}
            <div className="pointer-events-none absolute bottom-0 right-0" style={{ transform: 'translate(1px,1px)' }}>
              <div className="w-5 h-[1px] bg-hack-yellow absolute bottom-0 right-0" />
              <div className="w-[1px] h-5 bg-hack-yellow absolute bottom-0 right-0" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(modalContent, document.body);
}

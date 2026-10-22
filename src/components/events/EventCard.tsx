import { motion } from 'framer-motion';
import { brutalistEntrance } from '../../lib/animations';
import type { FestivalEvent } from '../../data/events';
import { registrationHref } from '../../data/events';
import EventVisual from './EventVisual';

export function RegistrationButton({ event }: { event: FestivalEvent }) {
  const href = registrationHref(event.registrationUrl);
  return href ? (
    <a className="festival-button" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Register Now for ${event.name} (opens in a new tab)`}>
      Register Now <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span className="registration-pending">Registration Coming Soon</span>
  );
}

export default function EventCard({ event, index }: { event: FestivalEvent; index: number }) {
  return (
    <motion.article
      id={event.id}
      className="festival-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      custom={index % 3}
      variants={brutalistEntrance}
      whileHover={{ x: -8, y: -8, transition: { duration: 0.2 } }}
    >
      <EventVisual visual={event.visual} code={String(index + 1).padStart(2, '0')} />
      <div className="festival-card-content">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="festival-eyebrow">{event.category}</p>
          {event.fee && (
            <span className="font-mono text-xs font-bold text-hack-yellow border border-hack-yellow/40 bg-hack-yellow/10 px-2 py-0.5 tracking-wider">
              {event.fee}
            </span>
          )}
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight uppercase">{event.name}</h2>
        <p className="text-sm text-white/75 leading-relaxed">{event.description}</p>
        <p className="font-mono text-xs text-hack-yellow leading-relaxed">
          {event.schedule.days.length ? event.schedule.days.map(day => `Day ${day}`).join(' + ') : 'Day to be announced'}
          {' · '}{event.schedule.time ? `${event.schedule.time} IST` : 'Time to be announced'}
        </p>

        <details className="event-details" open={window.location.hash === `#${event.id}` ? true : undefined}>
          <summary>View {event.sessions ? 'workshop' : 'event'} details <span aria-hidden="true">+</span></summary>
          <div className="event-details-body">
            <h3>Overview</h3>
            <p>{event.overview}</p>
            {event.sessions && <><h3>Sessions & learning</h3><ul>{event.sessions.map(session => <li key={session}>{session}</li>)}</ul></>}
            {event.organizerExperience && <><h3>From the organizers</h3><p>{event.organizerExperience}</p></>}
            <h3>Rules & guidelines</h3>
            {!event.rulesConfirmed && <p>Final rules and guidelines to be announced by the organizers.</p>}
            {event.rules.length > 0 && <ul>{event.rules.map(rule => <li key={rule}>{rule}</li>)}</ul>}
            <dl className="event-facts">
              <div><dt>Participation format</dt><dd>{event.format || 'To Be Announced'}</dd></div>
              <div><dt>Team size</dt><dd>{event.teamSize || 'To Be Announced'}</dd></div>
              <div><dt>Registration Fee</dt><dd className="text-hack-yellow font-bold">{event.fee || 'Free / To Be Announced'}</dd></div>
              <div><dt>Schedule</dt><dd>{event.schedule.days.length ? event.schedule.days.map(day => `Day ${day}`).join(' + ') : 'To Be Announced'}{event.schedule.time ? ` · ${event.schedule.time} IST` : ' · Time TBA'}</dd></div>
              <div><dt>Venue</dt><dd>{event.schedule.venue || 'To Be Announced'}</dd></div>
              {event.sessions && <>
                <div><dt>Duration</dt><dd>{event.duration || 'To Be Announced'}</dd></div>
                <div><dt>What to bring</dt><dd>{event.prerequisites || 'Equipment and prerequisites to be announced'}</dd></div>
              </>}
            </dl>
          </div>
        </details>
        <div className="mt-auto pt-3"><RegistrationButton event={event} /></div>
      </div>
    </motion.article>
  );
}

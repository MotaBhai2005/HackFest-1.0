import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = fileURLToPath(new URL('../', import.meta.url));
// Keep generated modules beneath node_modules so the existing React dependency
// resolves normally, and remove only this test's temporary directory afterward.
const output = mkdtempSync(join(root, 'node_modules/.festival-test-'));
after(() => rmSync(output, { recursive: true, force: true }));
writeFileSync(join(output, 'package.json'), '{"type":"commonjs"}');
execFileSync(process.execPath, [
  join(root, 'node_modules/typescript/bin/tsc'),
  'src/lib/countdown.ts', 'src/data/events.ts', 'src/pages/CatalogPage.tsx',
  'src/components/sections/Sponsors.tsx', 'src/components/sections/GuestSpeaker.tsx',
  'src/components/layout/Navbar.tsx',
  '--module', 'commonjs', '--moduleResolution', 'node', '--target', 'ES2020',
  '--jsx', 'react-jsx', '--esModuleInterop', '--skipLibCheck', '--strict',
  '--outDir', output,
], { cwd: root, stdio: 'pipe' });
const require = createRequire(import.meta.url);
const { countdownAt } = require(join(output, 'lib/countdown.js'));
const { festival, festivalStart, sponsorshipMailto } = require(join(output, 'data/festival.js'));
const { allEvents, competitions, funEvents, workshops, filterEventsByDay, registrationHref } = require(join(output, 'data/events.js'));
// Initialize Motion's server environment before providing the location fixture.
require('framer-motion');
globalThis.window = { location: { hash: '', pathname: '/events' } };
const CatalogPage = require(join(output, 'pages/CatalogPage.js')).default;
const EventCard = require(join(output, 'components/events/EventCard.js')).default;
const Sponsors = require(join(output, 'components/sections/Sponsors.js')).default;
const GuestSpeaker = require(join(output, 'components/sections/GuestSpeaker.js')).default;
const Navbar = require(join(output, 'components/layout/Navbar.js')).default;

test('countdown uses 4 November IST, independent of visitor timezone', () => {
  const originalTZ = process.env.TZ;
  const [hour, minute, second] = festival.startTimeIST.split(':').map(Number);
  const expected = Date.UTC(2026, 10, 4, hour, minute, second) - 330 * 60000;
  assert.equal(festival.startDate, '2026-11-04');
  try {
    for (const timeZone of ['UTC', 'Asia/Kolkata', 'America/Los_Angeles']) {
      process.env.TZ = timeZone;
      assert.equal(Date.parse(festivalStart), expected);
      assert.equal(countdownAt(expected - 86400000).display, '01d 00:00:00');
    }
  } finally {
    if (originalTZ === undefined) delete process.env.TZ;
    else process.env.TZ = originalTZ;
  }
});

test('countdown handles critical, zero, elapsed, and configured opening hour', () => {
  const target = Date.parse(festivalStart);
  assert.equal(countdownAt(target - 11000).phase, 'idle');
  assert.equal(countdownAt(target - 10000).phase, 'critical');
  assert.equal(countdownAt(target - 1).display, '00d 00:00:01');
  assert.equal(countdownAt(target).phase, 'live');
  assert.equal(countdownAt(target + 86400000).secondsLeft, 0);
  assert.equal(countdownAt(target + 86400000).display, '00d 00:00:00');
  assert.equal(countdownAt(Date.parse('2026-11-04T00:00:00+05:30'), Date.parse('2026-11-04T09:30:00+05:30')).display, '00d 09:30:00');
});

test('catalog includes every requested event and supports valid organizer metadata', () => {
  assert.deepEqual([competitions.length, funEvents.length, workshops.length], [7, 7, 3]);
  const all = [...competitions, ...funEvents, ...workshops];
  assert.equal(new Set(all.map(event => event.id)).size, 17);
  for (const event of all) {
    assert.ok(event.schedule.days.every(day => [1, 2, 3].includes(day)));
    if (event.registrationUrl) assert.ok(registrationHref(event.registrationUrl));
    assert.ok(Array.isArray(event.rules));
    assert.ok(event.description && event.overview);
  }
  assert.ok(workshops.every(event => event.sessions.length > 0));
});

test('day filters exclude unassigned events and support later single- and multi-day assignments', () => {
  const unassigned = funEvents.map(event => ({ ...event, schedule: { ...event.schedule, days: [] } }));
  assert.equal(filterEventsByDay(unassigned, 'all').length, 7);
  for (const day of [1, 2, 3]) assert.equal(filterEventsByDay(unassigned, day).length, 0);
  const assigned = [
    { ...funEvents[0], schedule: { ...funEvents[0].schedule, days: [1, 3] } },
    { ...funEvents[2], schedule: { ...funEvents[2].schedule, days: [2] } },
    unassigned[1],
  ];
  assert.deepEqual(filterEventsByDay(assigned, 1).map(event => event.id), ['ipl-auction']);
  assert.deepEqual(filterEventsByDay(assigned, 2).map(event => event.id), ['atv-racing']);
  assert.deepEqual(filterEventsByDay(assigned, 3).map(event => event.id), ['ipl-auction']);
  assert.equal(filterEventsByDay(assigned, 'all').length, 3);
});

test('only HTTPS Google Forms and Unstop registrations become active', () => {
  for (const value of [null, '', '/register', 'javascript:alert(1)', 'http://unstop.com/event', 'https://unstop.com.attacker.test/event', 'https://attacker.test/?next=forms.gle', 'https://docs.google.com/document/test', 'https://user:secret@unstop.com/event']) {
    assert.equal(registrationHref(value), null);
  }
  for (const value of ['https://forms.gle/test-fixture', 'https://docs.google.com/forms/d/e/test-fixture/viewform', 'https://unstop.com/test-fixture']) {
    assert.equal(registrationHref(value), value);
  }
});

test('event rendering keeps missing registrations inactive and configured registrations external', () => {
  const pending = renderToStaticMarkup(React.createElement(EventCard, { event: { ...competitions[0], registrationUrl: null, rulesConfirmed: false, rules: [] }, index: 0 }));
  assert.match(pending, /Registration Coming Soon/);
  assert.doesNotMatch(pending, /target="_blank"/);
  assert.match(pending, /Final rules and guidelines to be announced/);
  const html = renderToStaticMarkup(React.createElement(EventCard, {
    event: { ...competitions[0], registrationUrl: 'https://forms.gle/test-fixture' }, index: 0,
  }));
  assert.match(html, /href="https:\/\/forms.gle\/test-fixture" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /Register Now/);
});

test('all three catalog pages render their event details and fun-event day filters', () => {
  for (const [path, events] of [['/events', allEvents], ['/fun-events', funEvents], ['/workshops', workshops]]) {
    const html = renderToStaticMarkup(React.createElement(CatalogPage, { path }));
    for (const event of events) {
      assert.ok(html.includes(event.name));
      assert.ok(html.includes(`id="${event.id}"`));
    }
    assert.equal((html.match(/<details/g) || []).length, events.length);
    if (path === '/fun-events') {
      assert.match(html, /Day 1/);
      assert.match(html, /Day 2/);
      assert.match(html, /Day 3/);
      assert.match(html, /aria-pressed="true"/);
      if (funEvents.some(event => !event.schedule.days.length)) assert.match(html, /awaiting a schedule/);
    }
  }
});

test('sponsor draft, mystery speakers, and shared navigation contain no invented contacts', () => {
  const original = festival.sponsorship.email;
  festival.sponsorship.email = 'organizers@example.test';
  try {
    const href = sponsorshipMailto();
    assert.ok(href.startsWith('mailto:organizers@example.test?'));
    const query = new URLSearchParams(href.split('?')[1]);
    assert.equal(query.get('subject'), festival.sponsorship.subject);
    assert.equal(query.get('body'), festival.sponsorship.body);
    assert.match(renderToStaticMarkup(React.createElement(Sponsors)), /Sponsor Us/);
  } finally { festival.sponsorship.email = original; }
  const speakers = renderToStaticMarkup(React.createElement(GuestSpeaker));
  assert.equal((speakers.match(/To Be Announced/g) || []).length, festival.speakers.length);
  assert.doesNotMatch(speakers, /XENON_BYTE|NOVA_LEAK/);
  const nav = renderToStaticMarkup(React.createElement(Navbar));
  for (const href of ['/', '/#about', '/events', '/#sponsors']) assert.ok(nav.includes(`href="${href}"`));
});

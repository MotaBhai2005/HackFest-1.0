# HACKFEST 2026

Existing React + TypeScript + Vite festival site, with Tailwind, Framer Motion, and GSAP. No new runtime dependencies are required.

## Organizer content

- `src/data/festival.ts`: event date, provisional opening time in IST, sponsorship email and email draft, sponsor placeholders, and mystery speaker slots.
- `src/data/events.ts`: all competitions, fun events, and workshops. Each entry supports description, overview, rules, participation format, team size, schedule, and registration URL. Workshops also support sessions, duration, prerequisites, and verified organizer experience.
- `src/data/navigation.ts`: shared navigation links.

The countdown targets **4 November 2026 in Asia/Kolkata (UTC+05:30)**. Until the opening hour is confirmed, `startTimeIST: '00:00:00'` counts down to the calendar date and the UI explicitly says the start time is TBA. Set `startTimeIST` in `HH:mm:ss` format and `startTimeConfirmed: true` when finalized. The target is absolute, independent of the visitor's timezone and page refreshes. At the provisional target it says the event day has arrived; at a confirmed target it switches to live without inventing a hackathon duration.

Before publishing registration announcements, set the official address in `festival.sponsorship.email`. No official email was present in the existing project, so the empty default opens a sponsorship draft with the recipient left blank and displays a contact-pending message. Do not add an invented address.

For each event:

1. Replace `registrationUrl: null` with its actual HTTPS Google Form (`forms.gle`, `docs.google.com/forms/...`, or `forms.google.com`) or Unstop URL. Valid links open in a new tab with `noopener noreferrer`; empty, malformed, unsupported, or insecure links stay “Registration Coming Soon”.
2. Assign `schedule.days: [1]`, `[2]`, `[3]`, or multiple days, such as `[1, 2]`, only when confirmed. Empty arrays remain visible under All Events and never appear under an assumed day. Set `schedule.time` and `schedule.venue` separately. All displayed times are IST.
3. Add confirmed `rules`, set `rulesConfirmed: true`, and fill `format` and `teamSize`. Missing information is shown as To Be Announced.
4. Update workshop `sessions`, `duration`, and `prerequisites` as needed. `organizerExperience` is optional and should contain only verified experience. No Boeing involvement or partnership is currently claimed.

The shared `pendingDetails` object provides safe defaults. Override individual fields on the relevant event; do not change the shared defaults to update one event. Proposed workshop learning topics are editable independently of timings and registration.

## Development and checks

The visual reference is commit `1275d7f`, including the animation update in `de53d25`. The original intro, hero artwork, periodic logo jitter, RGB hover displacement, and parallax are retained. `src/styles/effects.css` gives the recovered RGB keyframes unique names so speaker styling cannot accidentally change the hero again. Mystery speaker cards reuse the original white information panels, square image frames, RGB glitches, and hover lift. The compact event preview reuses the original magnetic dot background and animated protocol links.

The crosshair keeps its original spring movement and hover rotation. It is mounted outside page animations, uses pointer capability rather than screen width, and remains visible against both yellow and black. Touch input uses the normal device behavior; the system cursor is hidden only while the custom mouse cursor is active.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

The build runs the existing TypeScript check and production Vite build. This project has no configured lint script or linter. Tests cover IST countdown boundaries, registration destination validation, and configurable day filters using Node's built-in test runner and the installed TypeScript compiler.

## Routes and hosting

The homepage retains its existing hero, effects, about, registration discovery, prize pool, and FAQ sections. Its event content is a compact featured preview. Catalogs use native links at `/events`, `/fun-events`, and `/workshops`; details expand inline on each event card. The build creates `dist/events/index.html`, `dist/fun-events/index.html`, and `dist/workshops/index.html`, so the current GitHub Pages workflow supports direct visits and refreshes without a server rewrite or a new router dependency. Root-relative assets work from nested pages, with the existing Vite `base: '/'` deployment setting. Hosting under a repository subpath would require updating this existing base-path convention.

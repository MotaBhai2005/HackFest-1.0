/** Organizer settings. Times are local to Asia/Kolkata (UTC+05:30). */
export const festival = {
  name: 'HACKFEST 2026',
  startDate: '2026-11-04',
  // Provisional midnight counts down to the date, not a confirmed opening hour.
  startTimeIST: '00:00:00',
  startTimeConfirmed: false,
  timeZone: 'Asia/Kolkata',
  utcOffset: '+05:30',
  sponsorship: {
    // Set the official organizer address here. No address has been confirmed.
    email: '',
    subject: 'Sponsorship enquiry — HACKFEST 2026',
    body: 'Hello HACKFEST team,\n\nI would like to discuss sponsoring HACKFEST 2026.\n\nOrganization:\nContact name:\nContact details:\nSponsorship interests:\n',
    placeholders: ['Your Brand Here', 'Build With Us', 'Power New Ideas', 'Join the Lineup'],
  },
  speakers: ['SIGNAL_01', 'SIGNAL_02', 'SIGNAL_03'],
};

export const festivalStart = `${festival.startDate}T${festival.startTimeIST}${festival.utcOffset}`;

export function sponsorshipMailto() {
  return `mailto:${festival.sponsorship.email}?subject=${encodeURIComponent(festival.sponsorship.subject)}&body=${encodeURIComponent(festival.sponsorship.body)}`;
}

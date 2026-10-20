import { festivalStart } from '../data/festival';

export interface CountdownState {
  phase: 'idle' | 'critical' | 'zero' | 'live';
  display: string;
  secondsLeft: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function countdownAt(now: number, target = Date.parse(festivalStart)): CountdownState {
  const secondsLeft = Math.max(0, Math.ceil((target - now) / 1000));
  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  return {
    phase: secondsLeft === 0 ? 'live' : secondsLeft <= 10 ? 'critical' : 'idle',
    display: `${pad(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    secondsLeft,
  };
}

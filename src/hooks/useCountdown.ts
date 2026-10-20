import { useState, useEffect, useRef } from 'react';
import { countdownAt, type CountdownState } from '../lib/countdown';
import { festival } from '../data/festival';

export function useCountdown(): CountdownState {
  const [state, setState] = useState(() => countdownAt(Date.now()));
  const previousSeconds = useRef(state.secondsLeft);

  useEffect(() => {
    const tick = () => {
      const next = countdownAt(Date.now());
      // Preserve the breach only when crossing a confirmed start time.
      // Refreshing after the start never resets the clock or replays the breach.
      if (festival.startTimeConfirmed && previousSeconds.current > 0 && next.phase === 'live') {
        next.phase = 'zero';
      }
      previousSeconds.current = next.secondsLeft;
      setState(next);
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, []);

  return state;
}

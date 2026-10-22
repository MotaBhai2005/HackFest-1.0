import type { EventVisual as Visual } from '../../data/events';

const paths: Record<Visual, string[]> = {
  code: ['M36 30 14 50l22 20M64 30l22 20-22 20M58 20 42 80'],
  chip: ['M28 28h44v44H28zM38 38h24v24H38zM36 14v14m14-14v14m14-14v14M36 72v14m14-14v14m14-14v14M14 36h14M14 50h14M14 64h14M72 36h14M72 50h14M72 64h14'],
  terminal: ['M12 22h76v56H12zM12 34h76M25 45l12 10-12 10M48 65h20'],
  paper: ['M26 12h34l16 16v60H26zM60 12v20h16M36 44h28M36 56h28M36 68h18'],
  shield: ['M50 12 82 25v25c0 20-32 38-32 38S18 70 18 50V25zM37 48v18h26V48zM42 48v-8a8 8 0 0 1 16 0v8'],
  cad: ['M50 14 82 32v36L50 86 18 68V32zM18 32l32 18 32-18M50 50v36M35 5h30M35 95h30M8 36v28M92 36v28'],
  auction: ['M35 20 65 50 51 64 21 34zM57 56l24 24M26 77h36v9H26zM65 20l8-8M78 35h12'],
  race: ['M14 68h72M25 68l7-30h36l10 30M33 38l8-16h18l9 16M24 68v14h14V68M64 68v14h14V68M35 54h5M60 54h5'],
  bridge: ['M10 72h80M24 24v60M76 24v60M24 30q26 60 52 0M36 53v19M50 60v12M64 53v19M10 70l14-40M90 70 76 30'],
  boat: ['M14 62h72L70 80H30zM50 15v47M45 23 23 54h22zM55 30l20 24H55zM10 89q10-7 20 0t20 0t20 0t20 0'],
  blocks: ['M28 12 48 24 28 36 8 24zM8 24v24l20 12 20-12V24M28 36v24M72 42 92 54 72 66 52 54zM52 54v24l20 12 20-12V54M72 66v24'],
  quest: ['M50 12 85 50 50 88 15 50zM42 37a10 10 0 1 1 16 8c-7 4-8 6-8 12M50 65v3'],
  mystery: ['M65 40a23 23 0 1 1-46 0 23 23 0 0 1 46 0zM59 58l24 24M28 40h28M42 26v28'],
  plane: ['M50 10 57 40l31 17v8L57 55v20l12 9v5l-19-5-19 5v-5l12-9V55L12 65v-8l31-17z'],
  bug: ['M50 38a16 16 0 1 0 0 32 16 16 0 0 0 0-32zM50 38v-14M42 41l-10-10M58 41l10-10M34 54H20M66 54h14M36 66l-8 10M64 66l8 10'],
  forge: ['M50 30a20 20 0 1 0 0 40 20 20 0 0 0 0-40zM50 40v20M40 50h20M22 22l12 12M78 22 66 34M22 78l12-12M78 78 66 66'],
  synapse: ['M50 50m-8 0a8 8 0 1 0 16 0 8 8 0 1 0-16 0M50 42V20M58 46l18-12M58 54l18 12M50 58v22M42 54 24 66M42 46 24 34M26 18a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM74 18a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM80 72a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 72a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM44 82a6 6 0 1 0 0 12 6 6 0 0 0 0-12z'],
  cyber: ['M50 12 82 25v25c0 20-32 38-32 38S18 70 18 50V25zM38 50h24M38 62h24M38 38h10M62 38h-6M50 26v12M26 40h6M68 40h-6M26 60h6M68 60h-6'],
};

export default function EventVisual({ visual, code }: { visual: Visual; code: string }) {
  return (
    <div className="event-visual" aria-hidden="true">
      <span className="event-visual-code">{code} // HACKFEST_26</span>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="bevel">
        {paths[visual].map((d, i) => <path key={i} d={d} />)}
      </svg>
      <span className="event-visual-marker">[ OPEN_POSSIBILITIES ]</span>
    </div>
  );
}

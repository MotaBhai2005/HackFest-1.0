import type { FestivalEvent } from '../../data/events';

export default function ProblemStatementsButton({ event }: { event: FestivalEvent }) {
  if (!event.problemStatementsUrl) return null;

  return (
    <a
      className="w-full py-2.5 px-3 border border-hack-yellow/40 hover:border-hack-yellow bg-hack-yellow/5 hover:bg-hack-yellow/10 flex justify-between items-center text-xs font-mono font-bold text-hack-yellow hover:text-white transition-colors"
      href={event.problemStatementsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View problem statements for ${event.name} (opens in a new tab)`}
    >
      <span>View Problem Statements</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

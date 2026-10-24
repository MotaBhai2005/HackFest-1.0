export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

export default function Breadcrumb({
  items,
  theme = 'light',
  className = '',
}: BreadcrumbProps) {
  const isDark = theme === 'dark';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-mono text-xs uppercase tracking-wider ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2" role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className={`font-bold ${
                    isDark ? 'text-hack-yellow' : 'text-black'
                  }`}
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`cursor-pointer transition-colors duration-150 underline-offset-4 hover:underline ${
                    isDark
                      ? 'text-white/60 hover:text-white'
                      : 'text-black/70 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  className={`transition-colors duration-150 underline-offset-4 hover:underline ${
                    isDark
                      ? 'text-white/60 hover:text-white'
                      : 'text-black/70 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={
                    isDark ? 'text-white/60' : 'text-black/70'
                  }
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`select-none ${
                    isDark ? 'text-white/30' : 'text-black/40'
                  }`}
                >
                  //
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

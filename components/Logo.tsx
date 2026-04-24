import Link from 'next/link';

/**
 * Logo — Santa Carmem Notícias
 *
 * Marca institucional: selo circular com sol nascendo sobre a lavoura,
 * monograma SC e wordmark serif. Construída em SVG inline para manter
 * nitidez em qualquer DPI e permitir theming via CSS.
 *
 * Props:
 *  - compact: exibe apenas o símbolo (ideal para mobile e rodapés).
 *  - variant: 'auto' (light em claro, gold em escuro), 'light' ou 'dark'.
 */
type LogoProps = {
  compact?: boolean;
  variant?: 'auto' | 'light' | 'dark';
  className?: string;
};

function Simbolo({ size = 40 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      className="shrink-0"
    >
      <g transform="translate(100, 100)">
        <circle r="95" fill="#1F6B3A" />
        <circle r="95" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.25" />
        <path d="M -95,0 A 95,95 0 0 1 95,0 Z" fill="#E8F1F9" />
        <circle cx="0" cy="-15" r="22" fill="#E8B23A" />
        <g stroke="#E8B23A" strokeWidth="3" strokeLinecap="round">
          <line x1="-45" y1="-15" x2="-35" y2="-15" />
          <line x1="35" y1="-15" x2="45" y2="-15" />
          <line x1="-32" y1="-45" x2="-25" y2="-38" />
          <line x1="25" y1="-38" x2="32" y2="-45" />
          <line x1="0" y1="-48" x2="0" y2="-40" />
        </g>
        <path
          d="M -95,0 Q -60,-5 -30,0 Q 0,5 30,0 Q 60,-5 95,0 L 95,95 L -95,95 Z"
          fill="#1F6B3A"
        />
        <path
          d="M -95,15 Q -50,10 -20,15 Q 10,20 40,15 Q 70,10 95,15 L 95,95 L -95,95 Z"
          fill="#17532C"
        />
        <path
          d="M -95,35 Q -40,30 -10,35 Q 20,40 50,35 Q 75,30 95,35 L 95,95 L -95,95 Z"
          fill="#103E21"
        />
        <text
          x="0"
          y="70"
          textAnchor="middle"
          fontFamily="Georgia, 'Source Serif 4', serif"
          fontWeight="700"
          fontSize="48"
          fill="#E8B23A"
          letterSpacing="-1"
        >
          SC
        </text>
        <g fill="#E8B23A" opacity="0.85">
          <ellipse cx="-52" cy="55" rx="3" ry="5" transform="rotate(-20 -52 55)" />
          <ellipse cx="-45" cy="65" rx="3" ry="5" transform="rotate(-10 -45 65)" />
          <ellipse cx="52" cy="55" rx="3" ry="5" transform="rotate(20 52 55)" />
          <ellipse cx="45" cy="65" rx="3" ry="5" transform="rotate(10 45 65)" />
        </g>
      </g>
    </svg>
  );
}

export function Logo({ compact = false, variant = 'auto', className = '' }: LogoProps) {
  // Classes de cor por variante — "auto" troca conforme dark mode.
  const wordmarkColor =
    variant === 'light'
      ? 'text-ink-light'
      : variant === 'dark'
        ? 'text-white'
        : 'text-ink-light dark:text-white';

  const subtitleColor =
    variant === 'light'
      ? 'text-brand-700'
      : variant === 'dark'
        ? 'text-amber-300'
        : 'text-brand-700 dark:text-amber-300';

  const ruleColor =
    variant === 'light'
      ? 'bg-editoria-agro'
      : variant === 'dark'
        ? 'bg-amber-400'
        : 'bg-editoria-agro dark:bg-amber-400';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group ${className}`}
      aria-label="Santa Carmem Notícias — Página inicial"
    >
      <Simbolo size={compact ? 36 : 48} />

      {!compact && (
        <span className="flex flex-col leading-tight">
          <span
            className={`font-serif font-bold text-xl sm:text-2xl tracking-tight ${wordmarkColor}`}
          >
            Santa Carmem
          </span>
          <span
            aria-hidden="true"
            className={`h-[2px] w-full my-1 ${ruleColor} opacity-80`}
          />
          <span
            className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] ${subtitleColor}`}
          >
            Notícias
          </span>
        </span>
      )}
    </Link>
  );
}

import { Link } from 'react-router-dom'

interface MarcaProps {
  className?: string
  /** Versão inclinada com os "brilhos" verdes, usada em destaques. */
  comBrilho?: boolean
}

/** Símbolo do Fila Zero: a senha de papel (ticket) já validada com o check. */
export function LogoMarca({ className = 'h-10 w-10', comBrilho = false }: MarcaProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false">
      <g transform={comBrilho ? 'rotate(-14 26 30)' : undefined}>
        <path
          d="M12 6h28a6 6 0 0 1 6 6v32l-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4-2-2V12a6 6 0 0 1 6-6z"
          className="fill-navy"
        />
        <rect x="14" y="13" width="24" height="4.5" rx="2.25" fill="#fff" />
        <path d="M16 30l7 6 13-13" fill="none" className="stroke-lima" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {comBrilho && (
        <g className="stroke-lima" strokeWidth="3.5" strokeLinecap="round">
          <path d="M47 4l-2 7" />
          <path d="M54 12l-6 4" />
        </g>
      )}
    </svg>
  )
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Fila Zero - início">
      <LogoMarca className="h-10 w-10" />
      <span className={`font-display text-xl font-black tracking-tight ${claro ? 'text-white' : 'text-navy'}`}>
        Fila <span className="relative">Zero<span className="absolute -bottom-0.5 left-0 h-1 w-full rounded-full bg-lima" aria-hidden="true" /></span>
      </span>
    </Link>
  )
}

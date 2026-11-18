import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Fila Zero - início">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-forest text-lg font-black text-white">FZ</span>
      <span className="text-lg font-black tracking-tight text-ink">Fila Zero</span>
    </Link>
  )
}

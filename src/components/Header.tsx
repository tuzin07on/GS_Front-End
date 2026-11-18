import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const links = [
  ['/', 'Início'],
  ['/unidades', 'Unidades'],
  ['/meus-agendamentos', 'Meus agendamentos'],
  ['/sobre', 'Sobre'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-bold transition ${
                  isActive ? 'bg-lima-soft text-navy' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contato" className="ml-2 btn-primary px-4 py-2.5 text-sm">Contato</Link>
        </nav>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 font-bold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Menu mobile">
          <div className="page-shell grid gap-1">
            {links.concat([['/contato', 'Contato'], ['/integrantes', 'Integrantes'], ['/faq', 'FAQ']]).map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `rounded-lg px-3 py-3 font-bold hover:bg-lima-soft ${isActive ? 'bg-lima-soft text-navy' : 'text-slate-700'}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}


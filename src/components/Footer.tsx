import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const equipe = [
  ['Arthur Cordão', '570313'],
  ['Guilherme Novaes', '570444'],
  ['Jeferson Faria', '573038'],
  ['Josué Menezes', '569220'],
]

const linkClasse = 'text-slate-300 transition hover:text-lima'

export function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.8fr_1.4fr]">
        <div>
          <Logo claro />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
            Atendimento público com mais previsibilidade, menos espera e mais tempo para o cidadão.
          </p>
        </div>
        <nav aria-label="Navegação do rodapé">
          <p className="font-bold text-lima">Navegação</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className={linkClasse} to="/unidades">Unidades</Link>
            <Link className={linkClasse} to="/meus-agendamentos">Meus agendamentos</Link>
            <Link className={linkClasse} to="/faq">FAQ</Link>
          </div>
        </nav>
        <nav aria-label="Projeto">
          <p className="font-bold text-lima">Projeto</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className={linkClasse} to="/sobre">Sobre</Link>
            <Link className={linkClasse} to="/integrantes">Integrantes</Link>
            <Link className={linkClasse} to="/contato">Contato</Link>
          </div>
        </nav>
        <div>
          <p className="font-bold text-lima">Equipe · 1TDSR</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
            {equipe.map(([nome, rm]) => (
              <li key={rm}>
                <p className="font-bold">{nome}</p>
                <p className="text-slate-300">RM {rm}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-slate-300 sm:flex-row sm:justify-between">
          <span>Global Solution 2026/2 · FIAP · CitizenTech</span>
          <span>ODS 9 · ODS 10 · ODS 11</span>
        </div>
      </div>
    </footer>
  )
}

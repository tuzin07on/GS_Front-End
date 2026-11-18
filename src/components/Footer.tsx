import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="page-shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-black">Fila Zero</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Atendimento público com mais previsibilidade, menos espera e mais tempo para o cidadão.
          </p>
        </div>
        <div>
          <p className="font-bold">Navegação</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link to="/unidades">Unidades</Link>
            <Link to="/meus-agendamentos">Meus agendamentos</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="font-bold">Projeto</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link to="/sobre">Sobre</Link>
            <Link to="/integrantes">Integrantes</Link>
            <Link to="/contato">Contato</Link>
          </div>
        </div>
        <div>
          <p className="font-bold">CitizenTech</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">ODS 9 · ODS 10 · ODS 11</p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        Global Solution 2026/2 · FIAP · 1TDSR
      </div>
    </footer>
  )
}

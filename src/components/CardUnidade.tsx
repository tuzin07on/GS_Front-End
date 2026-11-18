import { Link } from 'react-router-dom'
import type { Unidade } from '../types/api'

export function CardUnidade({ unidade }: { unidade: Unidade }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-lima-soft px-3 py-1 text-xs font-black text-navy">Unidade pública</span>
        <span className="text-sm font-bold text-slate-500">{unidade.guiches} guichês</span>
      </div>
      <h2 className="mt-5 text-xl font-black">{unidade.nmUnidade}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{unidade.dsEndereco} · {unidade.nmBairro}</p>
      <p className="mt-4 text-sm font-bold text-slate-700">
        Atendimento: {String(unidade.hrAbertura).padStart(2, '0')}:00 às {String(unidade.hrFechamento).padStart(2, '0')}:00
      </p>
      <div className="mt-auto flex gap-3 pt-6">
        <Link to={`/unidades/${unidade.cdUnidade}`} className="btn-secondary flex-1">Ver unidade</Link>
        <Link to={`/agendar/${unidade.cdUnidade}`} className="btn-primary flex-1">Agendar</Link>
      </div>
    </article>
  )
}

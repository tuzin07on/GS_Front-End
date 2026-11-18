import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { MensagemErro } from '../components/MensagemErro'
import { EstadoVazio } from '../components/EstadoVazio'
import { listarServicosDaUnidade } from '../services/servicoService'
import { buscarUnidade } from '../services/unidadeService'
import type { Servico, Unidade } from '../types/api'

export function UnidadeDetalhe() {
  const { id } = useParams()
  const unidadeId = Number(id)
  const [unidade, setUnidade] = useState<Unidade | null>(null)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    if (!Number.isInteger(unidadeId) || unidadeId <= 0) {
      setError('A unidade informada não é válida.'); setLoading(false); return
    }
    setLoading(true); setError('')
    try {
      const [unit, serviceList] = await Promise.all([buscarUnidade(unidadeId), listarServicosDaUnidade(unidadeId)])
      setUnidade(unit); setServicos(serviceList)
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro inesperado.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [unidadeId])

  if (loading) return <section className="section page-shell"><Loading label="Carregando unidade..." /></section>
  if (error) return <section className="section page-shell"><MensagemErro message={error} onRetry={() => void load()} /></section>
  if (!unidade) return <section className="section page-shell"><EstadoVazio title="Unidade não encontrada" message="Não foi possível localizar a unidade." /></section>

  return (
    <section className="section">
      <div className="page-shell">
        <Link to="/unidades" className="text-sm font-bold text-navy">← Voltar para unidades</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="card p-7 sm:p-9">
            <span className="rounded-full bg-lima-soft px-3 py-1 text-xs font-black text-navy">Unidade</span>
            <h1 className="mt-5 text-3xl font-black sm:text-4xl">{unidade.nmUnidade}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{unidade.dsEndereco}, {unidade.nmBairro}, {unidade.nmCidade}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold uppercase text-slate-500">Horário</p><p className="mt-1 font-black">{unidade.hrAbertura}:00 — {unidade.hrFechamento}:00</p></div>
              <div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold uppercase text-slate-500">Guichês</p><p className="mt-1 font-black">{unidade.guiches} atendimentos por horário</p></div>
            </div>
            <Link to={`/agendar/${unidade.cdUnidade}`} className="btn-primary mt-8 w-full sm:w-auto">Agendar nesta unidade</Link>
          </div>
          <aside className="card p-7">
            <p className="eyebrow">Serviços cadastrados</p>
            <h2 className="text-2xl font-black">Escolha o que precisa</h2>
            {servicos.length === 0 ? (
              <div className="mt-5"><EstadoVazio title="Nenhum serviço encontrado" message="Não há serviços cadastrados na API." /></div>
            ) : (
              <ul className="mt-5 grid gap-3">
                {servicos.map((servico) => (
                  <li key={servico.cdServico} className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-black">{servico.nmServico}</p>
                    <p className="mt-1 text-sm text-slate-500">{servico.nrDuracaoMin} min · documentos: {servico.dsDocumentos}</p>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Botao } from '../components/Botao'
import { EstadoVazio } from '../components/EstadoVazio'
import { Loading } from '../components/Loading'
import { MensagemErro } from '../components/MensagemErro'
import { StatusBadge } from '../components/StatusBadge'
import { atualizarAgendamento } from '../services/agendamentoService'
import { listarAgendamentosCidadao } from '../services/cidadaoService'
import { getCidadaoId, setCidadaoId } from '../lib/storage'
import type { Agendamento } from '../types/api'

export function MeusAgendamentos() {
  const [id, setId] = useState(getCidadaoId()?.toString() ?? '')
  const [items, setItems] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const load = async (citizenId = Number(id), options: { preserveMessage?: boolean; preserveResults?: boolean } = {}) => {
    if (!Number.isInteger(citizenId) || citizenId <= 0) { setError('Informe um código de cidadão válido.'); return }
    setLoading(true); setError('')
    if (!options.preserveMessage) setMessage('')
    if (!options.preserveResults) setItems([])
    try { setItems(await listarAgendamentosCidadao(citizenId)); setCidadaoId(citizenId) }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível consultar os agendamentos.') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    const current = getCidadaoId()
    if (current) void load(current)
  }, [])

  const cancel = async (item: Agendamento) => {
    if (!window.confirm('Deseja cancelar este agendamento?')) return
    setSending(item.cdAgendamento); setError(''); setMessage('')
    try {
      await atualizarAgendamento(item.cdAgendamento, { status: 'CANCELADO' })
      setMessage('Agendamento cancelado com sucesso.')
      await load(Number(id), { preserveMessage: true, preserveResults: true })
    } catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível cancelar o agendamento.') }
    finally { setSending(null) }
  }

  return (
    <section className="section">
      <div className="page-shell max-w-5xl">
        <p className="eyebrow">Área do cidadão</p>
        <h1 className="title">Meus agendamentos</h1>
        <p className="body-copy mt-4">Consulte seus horários e cancele um agendamento quando estiver dentro do prazo permitido.</p>

        <div className="card mt-8 p-6">
          <label className="label" htmlFor="citizen-code">Seu código de cidadão</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input id="citizen-code" type="number" min="1" className="field mt-0" value={id} onChange={(e) => setId(e.target.value)} placeholder="Ex.: 3" />
            <Botao type="button" onClick={() => void load()} disabled={loading}>{loading ? 'Consultando...' : 'Consultar'}</Botao>
          </div>
        </div>

        <div className="mt-8">
          {error && <div className="mb-5"><MensagemErro message={error} /></div>}
          {message && <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-800" role="status">{message}</div>}
          {loading && <Loading label="Buscando seus agendamentos..." />}
          {!loading && !error && items.length === 0 && <EstadoVazio title="Nenhum agendamento encontrado" message="Você ainda não possui agendamentos cadastrados para este código." />}
          {!loading && !error && items.length > 0 && (
            <div className="grid gap-5">
              {items.map((item) => {
                const statusAllowsCancel = item.status === 'AGENDADO' || item.status === 'CONFIRMADO'
                const cancellationDeadline = Date.parse(`${item.dtAgendamento}-03:00`) - 2 * 60 * 60 * 1000
                const canCancel = statusAllowsCancel && cancellationDeadline >= Date.now()
                return (
                  <article key={item.cdAgendamento} className="card p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-sm font-bold text-slate-500">Agendamento #{item.cdAgendamento}</p>
                        <h2 className="mt-1 text-xl font-black">{item.servico.nmServico}</h2>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div><p className="text-xs font-bold uppercase text-slate-500">Data</p><p className="mt-1 font-bold">{new Date(item.dtAgendamento).toLocaleString('pt-BR')}</p></div>
                      <div><p className="text-xs font-bold uppercase text-slate-500">Unidade</p><p className="mt-1 font-bold">{item.unidade.nmUnidade}</p></div>
                      <div><p className="text-xs font-bold uppercase text-slate-500">Documentos</p><p className="mt-1 text-sm text-slate-600">{item.servico.dsDocumentos}</p></div>
                    </div>
                    {typeof item.esperaMin === 'number' && <p className="mt-4 text-sm font-bold text-forest">Espera estimada: {item.esperaMin} min</p>}
                    {statusAllowsCancel && !canCancel && <p className="mt-4 text-sm text-slate-600">O prazo para cancelar este horário já terminou. O cancelamento precisa ser feito até 2 horas antes.</p>}
                    {canCancel && (
                      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <Botao variant="danger" type="button" disabled={sending === item.cdAgendamento} onClick={() => void cancel(item)}>
                          {sending === item.cdAgendamento ? 'Cancelando...' : 'Cancelar agendamento'}
                        </Botao>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </div>
        <p className="mt-8 text-sm text-slate-500">Ainda não agendou? <Link to="/unidades" className="font-black text-forest underline">Escolha uma unidade.</Link></p>
      </div>
    </section>
  )
}


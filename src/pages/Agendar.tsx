import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Botao } from '../components/Botao'
import { Loading } from '../components/Loading'
import { MensagemErro } from '../components/MensagemErro'
import { buscarUnidade, listarHorariosUnidade } from '../services/unidadeService'
import { listarServicosDaUnidade } from '../services/servicoService'
import { criarAgendamento } from '../services/agendamentoService'
import { criarCidadao } from '../services/cidadaoService'
import { getCidadaoId, setCidadaoId } from '../lib/storage'
import { mascaraCpf, mascaraTelefone, somenteDigitos } from '../lib/formatters'
import type { HorarioDisponivel, Servico, Unidade } from '../types/api'

interface FormState {
  cidadaoId: string
  cdServico: string
  dataAgendamento: string
  dtAgendamento: string
  nome: string
  cpf: string
  email: string
  telefone: string
  nascimento: string
  bairro: string
}

const initial: FormState = {
  cidadaoId: '', cdServico: '', dataAgendamento: '', dtAgendamento: '', nome: '', cpf: '',
  email: '', telefone: '', nascimento: '', bairro: '',
}

function localDateInputValue() {
  const date = new Date()
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

function isValidCpf(value: string) {
  const cpf = value.replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const checkDigit = (length: number) => {
    const sum = cpf.slice(0, length).split('').reduce((total, digit, index) => {
      return total + Number(digit) * (length + 1 - index)
    }, 0)
    const remainder = (sum * 10) % 11
    return remainder === 10 ? 0 : remainder
  }

  return checkDigit(9) === Number(cpf[9]) && checkDigit(10) === Number(cpf[10])
}

export function Agendar() {
  const { idUnidade } = useParams()
  const unidadeId = Number(idUnidade)
  const navigate = useNavigate()
  const [unidade, setUnidade] = useState<Unidade | null>(null)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([])
  const [form, setForm] = useState<FormState>({ ...initial, cidadaoId: getCidadaoId()?.toString() ?? '' })
  const [newCitizen, setNewCitizen] = useState(!getCidadaoId())
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [loadingHorarios, setLoadingHorarios] = useState(false)
  const [refreshHorarios, setRefreshHorarios] = useState(0)
  const [error, setError] = useState('')
  const [horarioError, setHorarioError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('')
      try {
        const [unit, serviceList] = await Promise.all([buscarUnidade(unidadeId), listarServicosDaUnidade(unidadeId)])
        setUnidade(unit); setServicos(serviceList)
      } catch (err) { setError(err instanceof Error ? err.message : 'Erro inesperado.') }
      finally { setLoading(false) }
    }
    if (Number.isInteger(unidadeId) && unidadeId > 0) void load()
    else { setError('Unidade inválida.'); setLoading(false) }
  }, [unidadeId])

  useEffect(() => {
    const data = form.dataAgendamento
    if (!data || !Number.isInteger(unidadeId) || unidadeId <= 0) {
      setHorarios([])
      setHorarioError('')
      setLoadingHorarios(false)
      return
    }

    let active = true
    setLoadingHorarios(true)
    setHorarioError('')
    setHorarios([])
    void listarHorariosUnidade(unidadeId, data)
      .then((available) => { if (active) setHorarios(available) })
      .catch((err) => { if (active) setHorarioError(err instanceof Error ? err.message : 'Não foi possível consultar os horários.') })
      .finally(() => { if (active) setLoadingHorarios(false) })
    return () => { active = false }
  }, [unidadeId, form.dataAgendamento, refreshHorarios])

  const servicoSelecionado = servicos.find((s) => String(s.cdServico) === form.cdServico)
  const horarioSelecionado = horarios.find((h) => h.dataHora === form.dtAgendamento)
  const dataExtenso = form.dataAgendamento
    ? new Date(`${form.dataAgendamento}T00:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
    : ''
  const dataFormatada = dataExtenso.charAt(0).toUpperCase() + dataExtenso.slice(1)

  const set = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))

  const validate = () => {
    if (!form.cdServico || !form.dataAgendamento || !form.dtAgendamento) return 'Selecione o serviço, a data e um horário disponível.'
    if (!newCitizen && (!form.cidadaoId || Number(form.cidadaoId) <= 0)) return 'Informe seu código de cidadão.'
    if (newCitizen) {
      if (!form.nome.trim() || !form.cpf || !form.telefone || !form.nascimento || !form.bairro.trim()) {
        return 'Preencha os dados obrigatórios do cadastro do cidadão.'
      }
      if (!isValidCpf(form.cpf)) return 'Informe um CPF válido.'
      if (![10, 11].includes(somenteDigitos(form.telefone).length)) return 'Informe um celular com DDD.'
      if (new Date(`${form.nascimento}T00:00:00`) >= new Date(new Date().toDateString())) return 'Informe uma data de nascimento no passado.'
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Informe um e-mail válido ou deixe o campo em branco.'
    }
    const date = new Date(form.dtAgendamento)
    if (Number.isNaN(date.getTime()) || date <= new Date()) return 'Escolha um horário futuro.'
    return ''
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(''); setSuccess('')
    const validation = validate()
    if (validation) { setError(validation); return }
    setSending(true)
    try {
      let cidadaoId = Number(form.cidadaoId)
      const cadastroNovo = newCitizen
      if (newCitizen) {
        const citizen = await criarCidadao({
          nmCidadao: form.nome.trim(),
          nrCpf: somenteDigitos(form.cpf),
          dsEmail: form.email.trim() || undefined,
          nrTelefone: somenteDigitos(form.telefone),
          dtNascimento: form.nascimento,
          nmBairro: form.bairro.trim(),
        })
        cidadaoId = citizen.cdCidadao
        setCidadaoId(cidadaoId)
        setNewCitizen(false)
        setForm((current) => ({ ...current, cidadaoId: String(cidadaoId) }))
      } else setCidadaoId(cidadaoId)

      await criarAgendamento(cidadaoId, {
        cdUnidade: unidadeId,
        cdServico: Number(form.cdServico),
        dtAgendamento: form.dtAgendamento,
      })
      setSuccess(cadastroNovo ? `Pronto! Seu horário está garantido. Seu código de cidadão é ${cidadaoId}.` : 'Pronto! Seu horário está garantido.')
      setTimeout(() => navigate('/meus-agendamentos', { state: { agendado: true, novoCodigo: cadastroNovo ? cidadaoId : null } }), 1500)
    } catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível criar o agendamento.') }
    finally { setSending(false) }
  }

  if (loading) return <section className="section page-shell"><Loading label="Preparando agendamento..." /></section>
  if (error && !unidade) return <section className="section page-shell"><MensagemErro message={error} /></section>

  return (
    <section className="section">
      <div className="page-shell max-w-4xl">
        <Link to={`/unidades/${unidadeId}`} className="text-sm font-bold text-navy">← Voltar para a unidade</Link>
        <div className="mt-6">
          <p className="eyebrow">Novo agendamento</p>
          <h1 className="title">Agende seu atendimento</h1>
          <p className="body-copy mt-4">{unidade?.nmUnidade} · {unidade?.nmCidade}</p>
        </div>

        <form onSubmit={submit} className="card mt-8 p-6 sm:p-8">
          {error && <div className="mb-6"><MensagemErro title="Não foi possível concluir o agendamento." message={error} /></div>}
          {success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-800" role="status">{success}</div>}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="servico">Serviço *</label>
              <select id="servico" className="field" value={form.cdServico} onChange={(e) => set('cdServico', e.target.value)} required>
                <option value="">Selecione o serviço</option>
                {servicos.map((s) => <option key={s.cdServico} value={s.cdServico}>{s.nmServico}</option>)}
              </select>
              {servicoSelecionado && (
                <div className="mt-3 rounded-2xl border border-lima-soft bg-lima-soft/70 p-4 text-sm" aria-live="polite">
                  <p className="font-black text-navy">Duração média: {servicoSelecionado.nrDuracaoMin} min</p>
                  <p className="mt-1 text-slate-700"><span className="font-bold">Leve no dia:</span> {servicoSelecionado.dsDocumentos}</p>
                </div>
              )}
              {!loading && servicos.length === 0 && <p className="mt-2 text-sm text-slate-600" role="status">Esta unidade não oferece serviços para agendamento neste momento.</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="data">Data do atendimento *</label>
              <input id="data" type="date" min={localDateInputValue()} className="field" value={form.dataAgendamento} onChange={(e) => setForm((current) => ({ ...current, dataAgendamento: e.target.value, dtAgendamento: '' }))} required />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="horario">Horário disponível *</label>
              <select id="horario" className="field" value={form.dtAgendamento} onChange={(e) => set('dtAgendamento', e.target.value)} required disabled={!form.dataAgendamento || loadingHorarios || Boolean(horarioError)}>
                <option value="">{!form.dataAgendamento ? 'Selecione uma data primeiro' : loadingHorarios ? 'Buscando horários...' : 'Selecione um horário'}</option>
                {horarios.map((item) => (
                  <option key={item.dataHora} value={item.dataHora} disabled={item.lotado || item.passado}>
                    {item.horario} · {item.passado ? 'horário passado' : item.lotado ? 'lotado' : `${item.vagas} ${item.vagas === 1 ? 'vaga' : 'vagas'}`}
                  </option>
                ))}
              </select>
              {horarioError && <div className="mt-3"><MensagemErro title="Não foi possível consultar os horários." message={horarioError} onRetry={() => setRefreshHorarios((current) => current + 1)} /></div>}
              {form.dataAgendamento && !loadingHorarios && !horarioError && horarios.length === 0 && <p className="mt-2 text-sm text-slate-600" role="status">Não há horários disponíveis para esta data.</p>}
              <p className="mt-2 text-xs text-slate-500">A lista mostra horários livres e sinaliza vagas esgotadas. A API confirma as regras do agendamento no envio.</p>
            </div>

            <div className="sm:col-span-2 rounded-2xl bg-slate-50 p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-black">Identificação do cidadão</p>
                  <p className="mt-1 text-sm text-slate-500">Sem login: use seu código ou faça um cadastro rápido.</p>
                </div>
                <button type="button" className="text-sm font-black text-navy underline" onClick={() => setNewCitizen((value) => !value)}>
                  {newCitizen ? 'Já tenho um código' : 'Quero me cadastrar'}
                </button>
              </div>
            </div>

            {!newCitizen ? (
              <div className="sm:col-span-2">
                <label className="label" htmlFor="cidadaoId">Seu código de cidadão *</label>
                <input id="cidadaoId" type="number" min="1" className="field" value={form.cidadaoId} onChange={(e) => set('cidadaoId', e.target.value)} required />
              </div>
            ) : (
              <>
                <div className="sm:col-span-2"><label className="label" htmlFor="nome">Nome completo *</label><input id="nome" className="field" value={form.nome} onChange={(e) => set('nome', e.target.value)} /></div>
                <div><label className="label" htmlFor="cpf">CPF *</label><input id="cpf" inputMode="numeric" maxLength={14} placeholder="000.000.000-00" className="field" value={form.cpf} onChange={(e) => set('cpf', mascaraCpf(e.target.value))} autoComplete="off" /></div>
                <div><label className="label" htmlFor="telefone">Celular *</label><input id="telefone" type="tel" inputMode="numeric" maxLength={15} placeholder="(11) 91234-5678" className="field" value={form.telefone} onChange={(e) => set('telefone', mascaraTelefone(e.target.value))} autoComplete="tel-national" /></div>
                <div><label className="label" htmlFor="email">E-mail</label><input id="email" type="email" className="field" value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
                <div><label className="label" htmlFor="nascimento">Data de nascimento *</label><input id="nascimento" type="date" className="field" value={form.nascimento} onChange={(e) => set('nascimento', e.target.value)} /></div>
                <div className="sm:col-span-2"><label className="label" htmlFor="bairro">Bairro *</label><input id="bairro" className="field" value={form.bairro} onChange={(e) => set('bairro', e.target.value)} /></div>
              </>
            )}
          </div>
          {servicoSelecionado && horarioSelecionado && (
            <div className="mt-8 rounded-2xl bg-navy p-5 text-white" aria-live="polite">
              <p className="text-xs font-black uppercase tracking-widest text-lima">Resumo do agendamento</p>
              <p className="mt-2 text-lg font-black">{servicoSelecionado.nmServico}</p>
              <p className="mt-1 text-sm text-white/90">{unidade?.nmUnidade} · {dataFormatada} às {horarioSelecionado.horario}</p>
              <p className="mt-3 text-xs text-white/70">Chegue com 10 minutos de antecedência. Cancelamentos até 2 horas antes.</p>
            </div>
          )}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link to={`/unidades/${unidadeId}`} className="btn-secondary">Cancelar</Link>
            <Botao type="submit" variant="destaque" disabled={sending}>{sending ? 'Enviando...' : 'Confirmar agendamento'}</Botao>
          </div>
        </form>
      </div>
    </section>
  )
}


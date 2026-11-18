export interface Unidade {
  cdUnidade: number
  nmUnidade: string
  dsEndereco: string
  nmBairro: string
  nmCidade: string
  guiches: number
  hrAbertura: number
  hrFechamento: number
}

export interface Servico {
  cdServico: number
  nmServico: string
  dsServico?: string | null
  dsDocumentos: string
  nrDuracaoMin: number
}

export interface CidadaoResumo {
  cdCidadao: number
  nmCidadao: string
}

export interface UnidadeResumo {
  cdUnidade: number
  nmUnidade: string
}

export interface ServicoResumo {
  cdServico: number
  nmServico: string
  dsDocumentos: string
}

export type StatusAgendamento = 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'ATENDIDO' | 'FALTOU'

export interface Agendamento {
  cdAgendamento: number
  cidadao: CidadaoResumo
  unidade: UnidadeResumo
  servico: ServicoResumo
  dtAgendamento: string
  dtCriacao: string
  status: StatusAgendamento
  esperaMin?: number | null
}

export interface HorarioDisponivel {
  horario: string
  dataHora: string
  vagas: number
  lotado: boolean
  passado: boolean
}

export interface AgendamentoRequest {
  cdUnidade: number
  cdServico: number
  dtAgendamento: string
}

export interface AgendamentoUpdate {
  status: StatusAgendamento
  dtAgendamento?: string
}

export interface Cidadao {
  cdCidadao: number
  nmCidadao: string
  nrCpf: string
  dsEmail?: string | null
  nrTelefone: string
  dtNascimento: string
  nmBairro: string
}

export interface CidadaoRequest {
  nmCidadao: string
  nrCpf: string
  dsEmail?: string
  nrTelefone: string
  dtNascimento: string
  nmBairro: string
}

export interface ApiError {
  timestamp?: string
  status?: number
  erro?: string
  mensagem?: string
  caminho?: string
  campos?: Record<string, string>
}


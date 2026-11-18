import { request } from './api'
import type { Agendamento, AgendamentoRequest, AgendamentoUpdate } from '../types/api'

export const criarAgendamento = (cidadaoId: number, payload: AgendamentoRequest) =>
  request<Agendamento>(`/cidadaos/${cidadaoId}/agendamentos`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const atualizarAgendamento = (id: number, payload: AgendamentoUpdate) =>
  request<Agendamento>(`/agendamentos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

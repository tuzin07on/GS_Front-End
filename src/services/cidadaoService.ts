import { request } from './api'
import type { Agendamento, Cidadao, CidadaoRequest } from '../types/api'

export const buscarCidadao = (id: number) => request<Cidadao>(`/cidadaos/${id}`)
export const criarCidadao = (payload: CidadaoRequest) =>
  request<Cidadao>('/cidadaos', { method: 'POST', body: JSON.stringify(payload) })
export const listarAgendamentosCidadao = (id: number) =>
  request<Agendamento[]>(`/cidadaos/${id}/agendamentos`)

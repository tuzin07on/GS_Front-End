import { request } from './api'
import type { Agendamento, HorarioDisponivel, Unidade } from '../types/api'

export const listarUnidades = () => request<Unidade[]>('/unidades')
export const buscarUnidade = (id: number) => request<Unidade>(`/unidades/${id}`)
export const listarAgendamentosUnidade = (id: number) =>
  request<Agendamento[]>(`/unidades/${id}/agendamentos`)
export const listarHorariosUnidade = (id: number, data: string) =>
  request<HorarioDisponivel[]>(`/unidades/${id}/horarios?data=${encodeURIComponent(data)}`)


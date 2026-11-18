import { request } from './api'
import type { Servico, Unidade } from '../types/api'

export const listarServicos = () => request<Servico[]>('/servicos')
export const buscarServico = (id: number) => request<Servico>(`/servicos/${id}`)
export const listarUnidadesDoServico = (id: number) => request<Unidade[]>(`/servicos/${id}/unidades`)

export async function listarServicosDaUnidade(unidadeId: number) {
  const servicos = await listarServicos()
  const disponibilidade = await Promise.all(servicos.map(async (servico) => {
    const unidades = await listarUnidadesDoServico(servico.cdServico)
    return unidades.some((unidade) => unidade.cdUnidade === unidadeId)
  }))
  return servicos.filter((_, index) => disponibilidade[index])
}


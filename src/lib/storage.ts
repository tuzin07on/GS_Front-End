/** Chave usada para guardar o código do cidadão no localStorage. */
const KEY = 'fila-zero-cidadao-id'

/** Retorna o código salvo no aparelho ou null se estiver ausente ou inválido. */
export function getCidadaoId(): number | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  const id = Number(raw)
  return Number.isFinite(id) && id > 0 ? id : null
}

/** Salva no aparelho o código do cidadão retornado pela API. */
export function setCidadaoId(id: number) {
  localStorage.setItem(KEY, String(id))
}

/** Remove o código salvo, permitindo informar outro cidadão. */
export function clearCidadaoId() {
  localStorage.removeItem(KEY)
}

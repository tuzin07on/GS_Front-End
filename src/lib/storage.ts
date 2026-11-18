const KEY = 'fila-zero-cidadao-id'

export function getCidadaoId(): number | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  const id = Number(raw)
  return Number.isFinite(id) && id > 0 ? id : null
}

export function setCidadaoId(id: number) {
  localStorage.setItem(KEY, String(id))
}

export function clearCidadaoId() {
  localStorage.removeItem(KEY)
}

/** Mantem so os digitos de um texto (ex.: "123.456" -> "123456"). */
export function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, '')
}

/** Formata CPF enquanto o cidadao digita: 000.000.000-00 */
export function mascaraCpf(valor: string) {
  const d = somenteDigitos(valor).slice(0, 11)
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

/** Formata celular/telefone com DDD: (11) 91234-5678 ou (11) 1234-5678 */
export function mascaraTelefone(valor: string) {
  const d = somenteDigitos(valor).slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

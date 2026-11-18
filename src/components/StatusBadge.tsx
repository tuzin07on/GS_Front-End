import type { StatusAgendamento } from '../types/api'

const labels: Record<StatusAgendamento, string> = {
  AGENDADO: 'Agendado',
  CONFIRMADO: 'Confirmado',
  CANCELADO: 'Cancelado',
  ATENDIDO: 'Atendido',
  FALTOU: 'Faltou',
}

export function StatusBadge({ status }: { status: StatusAgendamento }) {
  const style =
    status === 'CANCELADO' ? 'bg-red-50 text-red-700' :
    status === 'ATENDIDO' ? 'bg-emerald-50 text-emerald-700' :
    status === 'FALTOU' ? 'bg-amber-50 text-amber-700' :
    'bg-mint text-forest'
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${style}`}>{labels[status]}</span>
}

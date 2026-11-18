interface Props {
  label: string
  quantidade?: number
  colunas?: 1 | 3
}

/** Formato dos cards "brilhando" enquanto a API responde (o Render pode demorar para acordar). */
export function EsqueletoCards({ label, quantidade = 3, colunas = 3 }: Props) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className={`grid gap-6 ${colunas === 3 ? 'md:grid-cols-2 xl:grid-cols-3' : ''}`} aria-hidden="true">
        {Array.from({ length: quantidade }, (_, i) => (
          <div key={i} className="card grid gap-4 p-6">
            <div className="esqueleto h-5 w-28 rounded-full" />
            <div className="esqueleto h-6 w-3/4" />
            <div className="esqueleto h-4 w-full" />
            <div className="esqueleto h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
    </div>
  )
}

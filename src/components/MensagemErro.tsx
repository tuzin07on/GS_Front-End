export function MensagemErro({ message, title = 'Não foi possível carregar esta informação.', onRetry }: { message: string; title?: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800" role="alert">
      <p className="font-black">{title}</p>
      <p className="mt-1 text-sm">{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white">Tentar novamente</button>}
    </div>
  )
}


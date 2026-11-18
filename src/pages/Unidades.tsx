import { useEffect, useState } from 'react'
import { CardUnidade } from '../components/CardUnidade'
import { EstadoVazio } from '../components/EstadoVazio'
import { Loading } from '../components/Loading'
import { MensagemErro } from '../components/MensagemErro'
import { listarUnidades } from '../services/unidadeService'
import type { Unidade } from '../types/api'

export function Unidades() {
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    try { setUnidades(await listarUnidades()) }
    catch (err) { setError(err instanceof Error ? err.message : 'Erro inesperado.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [])

  return (
    <section className="section">
      <div className="page-shell">
        <p className="eyebrow">Atendimento</p>
        <h1 className="title">Encontre uma unidade</h1>
        <p className="body-copy mt-4 max-w-2xl">Consulte unidades públicas cadastradas na plataforma e escolha onde deseja realizar seu atendimento.</p>
        <div className="mt-10">
          {loading && <Loading label="Buscando unidades..." />}
          {!loading && error && <MensagemErro message={error} onRetry={() => void load()} />}
          {!loading && !error && unidades.length === 0 && <EstadoVazio title="Nenhuma unidade encontrada" message="Não há unidades cadastradas para consulta neste momento." />}
          {!loading && !error && unidades.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {unidades.map((unidade) => <CardUnidade key={unidade.cdUnidade} unidade={unidade} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

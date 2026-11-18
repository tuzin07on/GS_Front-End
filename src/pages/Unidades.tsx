import { useEffect, useMemo, useState } from 'react'
import { CardUnidade } from '../components/CardUnidade'
import { EstadoVazio } from '../components/EstadoVazio'
import { EsqueletoCards } from '../components/EsqueletoCards'
import { MensagemErro } from '../components/MensagemErro'
import { listarUnidades } from '../services/unidadeService'
import type { Unidade } from '../types/api'

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function Unidades() {
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busca, setBusca] = useState('')

  const filtradas = useMemo(() => {
    const termo = normalizar(busca.trim())
    if (!termo) return unidades
    return unidades.filter((u) => normalizar(`${u.nmUnidade} ${u.nmBairro} ${u.nmCidade} ${u.dsEndereco}`).includes(termo))
  }, [busca, unidades])

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
        {!loading && !error && unidades.length > 0 && (
          <div className="mt-8 max-w-xl">
            <label className="label" htmlFor="busca-unidade">Buscar por nome, bairro ou cidade</label>
            <input
              id="busca-unidade"
              type="search"
              className="field"
              placeholder="Ex.: Itaquera, Lapa, Guarulhos"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <p className="mt-2 text-sm text-slate-500" role="status" aria-live="polite">
              {filtradas.length} {filtradas.length === 1 ? 'unidade encontrada' : 'unidades encontradas'}
            </p>
          </div>
        )}
        <div className="mt-10">
          {loading && <EsqueletoCards label="Buscando unidades..." />}
          {!loading && error && <MensagemErro message={error} onRetry={() => void load()} />}
          {!loading && !error && unidades.length === 0 && <EstadoVazio title="Nenhuma unidade encontrada" message="Não há unidades cadastradas para consulta neste momento." />}
          {!loading && !error && unidades.length > 0 && filtradas.length === 0 && (
            <EstadoVazio title="Nenhuma unidade para essa busca" message="Tente outro nome de bairro ou cidade, ou limpe o campo de busca." />
          )}
          {!loading && !error && filtradas.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtradas.map((unidade, i) => (
                <div key={unidade.cdUnidade} className="animate-subir" style={{ animationDelay: `${Math.min(i, 8) * 0.07}s` }}>
                  <CardUnidade unidade={unidade} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

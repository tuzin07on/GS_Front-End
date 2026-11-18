import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="section">
      <div className="page-shell text-center">
        <p className="eyebrow">404</p>
        <h1 className="title">Página não encontrada</h1>
        <p className="body-copy mx-auto mt-4 max-w-xl">O endereço informado não existe no Fila Zero.</p>
        <Link to="/" className="btn-primary mt-8">Voltar ao início</Link>
      </div>
    </section>
  )
}

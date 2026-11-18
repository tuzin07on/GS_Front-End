import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

const titulos: Array<[RegExp, string]> = [
  [/^\/$/, 'Início'],
  [/^\/unidades$/, 'Unidades'],
  [/^\/unidades\/\d+$/, 'Detalhes da unidade'],
  [/^\/agendar\/\d+$/, 'Agendar atendimento'],
  [/^\/meus-agendamentos$/, 'Meus agendamentos'],
  [/^\/sobre$/, 'Sobre'],
  [/^\/faq$/, 'Perguntas frequentes'],
  [/^\/contato$/, 'Contato'],
  [/^\/integrantes$/, 'Integrantes'],
]

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const pagina = titulos.find(([rota]) => rota.test(pathname))?.[1] ?? 'Página não encontrada'
    document.title = `${pagina} · Fila Zero`
  }, [pathname])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-navy focus:px-4 focus:py-3 focus:font-bold focus:text-white">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <div key={pathname} className="animate-pagina"><Outlet /></div>
      </main>
      <Footer />
    </div>
  )
}


import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Integrantes } from './pages/Integrantes'
import { Sobre } from './pages/Sobre'
import { Faq } from './pages/Faq'
import { Contato } from './pages/Contato'
import { Unidades } from './pages/Unidades'
import { UnidadeDetalhe } from './pages/UnidadeDetalhe'
import { Agendar } from './pages/Agendar'
import { MeusAgendamentos } from './pages/MeusAgendamentos'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/unidades/:id" element={<UnidadeDetalhe />} />
        <Route path="/agendar/:idUnidade" element={<Agendar />} />
        <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

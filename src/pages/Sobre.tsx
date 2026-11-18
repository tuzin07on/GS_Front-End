import { Link } from 'react-router-dom'

export function Sobre() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">Sobre o projeto</p>
          <h1 className="title">O Fila Zero é o “Waze das filas públicas”.</h1>
          <p className="body-copy mt-6">
            A solução foi pensada para reduzir o tempo perdido em filas de serviços públicos presenciais. O cidadão escolhe um serviço, consulta unidades, agenda um horário e acompanha seus agendamentos.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            ['ODS 9', 'Indústria, inovação e infraestrutura', 'Uso de dados e tecnologia para melhorar a infraestrutura de atendimento.'],
            ['ODS 10', 'Redução das desigualdades', 'Mais previsibilidade para quem tem menos tempo e recursos para esperar.'],
            ['ODS 11', 'Cidades e comunidades sustentáveis', 'Serviços públicos mais acessíveis e eficientes.'],
          ].map(([ods, title, text]) => (
            <article key={ods} className="card p-7">
              <span className="text-sm font-black text-navy">{ods}</span>
              <h2 className="mt-3 text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-navy p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-lima">Escopo</p>
          <h2 className="mt-3 text-3xl font-black">Agendamento e acompanhamento em unidades de atendimento público.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/80">
            O projeto contempla cidadãos, unidades, serviços e agendamentos. Login real, pagamento, chat com atendente, notificações reais e perfil administrador estão fora do escopo definido.
          </p>
          <Link to="/unidades" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-black text-navy">Começar agora</Link>
        </div>
      </div>
    </section>
  )
}

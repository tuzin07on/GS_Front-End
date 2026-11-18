import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <section className="section overflow-hidden">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">CitizenTech · atendimento público</p>
            <h1 className="title max-w-4xl text-5xl sm:text-6xl">
              Menos fila. Mais tempo para você.
            </h1>
            <p className="body-copy mt-6 max-w-2xl">
              O Fila Zero ajuda o cidadão a encontrar uma unidade, consultar o atendimento e marcar um horário com mais previsibilidade.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/unidades" className="btn-primary">Encontrar uma unidade</Link>
              <Link to="/sobre" className="btn-secondary">Entender a solução</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['01', 'Escolha o serviço'],
                ['02', 'Compare unidades'],
                ['03', 'Agende seu horário'],
              ].map(([number, text]) => (
                <div key={number} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="text-sm font-black text-navy">{number}</span>
                  <p className="mt-2 font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2rem] bg-navy p-7 text-white shadow-soft sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-lima">Como funciona</p>
              <div className="mt-8 grid gap-5">
                {[
                  ['01', 'Escolha o serviço', 'Encontre o atendimento que você precisa.'],
                  ['02', 'Veja as unidades', 'Consulte endereço, horário e capacidade.'],
                  ['03', 'Garanta seu horário', 'Faça o agendamento e acompanhe depois.'],
                ].map(([n, title, desc]) => (
                  <div key={n} className="flex gap-4 rounded-2xl bg-white/10 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-black text-navy">{n}</span>
                    <div><p className="font-black">{title}</p><p className="mt-1 text-sm leading-5 text-white/80">{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="page-shell">
          <p className="eyebrow">Por que existe?</p>
          <h2 className="title max-w-3xl">Serviço público deve respeitar o tempo de quem precisa dele.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Mais previsibilidade', 'Consulte informações da unidade antes de sair de casa.'],
              ['Mais autonomia', 'O cidadão escolhe quando e onde quer ser atendido.'],
              ['Mais eficiência', 'A solução ajuda a distribuir a demanda entre unidades.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-slate-200 p-7">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

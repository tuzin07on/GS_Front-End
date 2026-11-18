const integrantes = [
  {
    nome: 'Arthur Cordão',
    rm: '570313',
    turma: '1TDSR',
    github: 'https://github.com/tuzin07on',
    avatar: 'https://github.com/tuzin07on.png?size=192',
    linkedin: 'https://www.linkedin.com/in/arthur-cord%C3%A3o-galindo-4bb94434b',
  },
  {
    nome: 'Guilherme Novaes',
    rm: '570444',
    turma: '1TDSR',
    github: 'https://github.com/guilhermenovaes07-coder',
    avatar: 'https://github.com/guilhermenovaes07-coder.png?size=192',
    linkedin: 'https://www.linkedin.com/in/guilherme-novaes-115111278',
  },
  {
    nome: 'Jeferson Faria',
    rm: '573038',
    turma: '1TDSR',
    github: 'https://github.com/jfrfariaa',
    avatar: 'https://github.com/jfrfariaa.png?size=192',
    linkedin: 'https://www.linkedin.com/in/jefferson-faria-de-oliveira-7587582a9',
  },
  {
    nome: 'Josué Menezes',
    rm: '569220',
    turma: '1TDSR',
    github: 'https://github.com/josue-menezes',
    avatar: 'https://github.com/josue-menezes.png?size=192',
    linkedin: 'https://www.linkedin.com/in/josu%C3%A9-menezes-01b175282',
  },
]

export function Integrantes() {
  return (
    <section className="section">
      <div className="page-shell">
        <p className="eyebrow">Equipe</p>
        <h1 className="title">Integrantes do Fila Zero</h1>
        <p className="body-copy mt-4 max-w-2xl">Projeto Global Solution 2026/2 · turma 1TDSR.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {integrantes.map((item) => (
            <article key={item.rm} className="card flex min-w-0 gap-5 p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-lima-soft text-xl font-black text-navy">
                <span className="col-start-1 row-start-1" aria-hidden="true">
                  {item.nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('')}
                </span>
                <img
                  className="col-start-1 row-start-1 h-full w-full object-cover"
                  src={item.avatar}
                  alt={`Foto de ${item.nome}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-black">{item.nome}</h2>
                <p className="mt-1 text-sm text-slate-500">RM {item.rm} · {item.turma}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
                  <a className="text-navy underline" href={item.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${item.nome}`}>GitHub</a>
                  <a className="text-navy underline" href={item.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${item.nome}`}>LinkedIn</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


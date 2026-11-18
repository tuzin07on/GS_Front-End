const integrantes = [
  { nome: 'Arthur Cordão', rm: '570313', turma: '1TDSR', github: 'https://github.com/tuzin07on', linkedin: 'https://www.linkedin.com/in/arthur-cord%C3%A3o-galindo-4bb94434b' },
  { nome: 'Guilherme Novaes', rm: '570444', turma: '1TDSR', github: 'https://github.com/guilhermenovaes07-coder', linkedin: 'https://www.linkedin.com/in/guilherme-novaes-115111278' },
  { nome: 'Jeferson Faria', rm: '573038', turma: '1TDSR', github: 'https://github.com/jfrfariaa', linkedin: 'https://www.linkedin.com/in/jefferson-faria-de-oliveira-7587582a9' },
  { nome: 'Josué Menezes', rm: '569220', turma: '1TDSR', github: 'https://github.com/josue-menezes', linkedin: 'https://www.linkedin.com/in/josu%C3%A9-menezes-01b175282' },
]

export function Integrantes() {
  return (
    <section className="section">
      <div className="page-shell">
        <p className="eyebrow">Equipe</p>
        <h1 className="title">Integrantes do Fila Zero</h1>
        <p className="body-copy mt-4 max-w-2xl">Projeto Global Solution 2026/2 · turma 1TDSR.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {integrantes.map((item, index) => (
            <article key={item.rm} className="card flex gap-5 p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-mint text-xl font-black text-forest">{String(index + 1).padStart(2, '0')}</div>
              <div className="min-w-0">
                <h2 className="text-xl font-black">{item.nome}</h2>
                <p className="mt-1 text-sm text-slate-500">RM {item.rm} · {item.turma}</p>
                <div className="mt-4 flex gap-4 text-sm font-bold">
                  {item.github ? <a className="text-forest underline" href={item.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${item.nome}`}>GitHub</a> : <span className="text-slate-400">GitHub — adicionar</span>}
                  {item.linkedin ? <a className="text-forest underline" href={item.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${item.nome}`}>LinkedIn</a> : <span className="text-slate-400">LinkedIn — adicionar</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">Os perfis foram informados pela equipe. As fotos podem ser adicionadas antes da entrega, caso façam parte dos critérios avaliados.</p>
      </div>
    </section>
  )
}


const items = [
  ['Preciso fazer login?', 'Não. O Fila Zero identifica o cidadão por um código. Na primeira utilização, também é possível fazer um cadastro rápido.'],
  ['Posso cancelar um agendamento?', 'Sim. O cancelamento segue a regra do sistema e só pode ocorrer até 2 horas antes do horário marcado.'],
  ['O que acontece se o horário estiver lotado?', 'A API valida a capacidade da unidade. Se o limite de guichês daquele horário já estiver atingido, o sistema informa que o horário está lotado.'],
  ['Quais horários posso agendar?', 'O agendamento deve ser futuro, dentro do funcionamento da unidade e em horário cheio ou meia hora.'],
  ['Quais serviços estão disponíveis?', 'Os serviços são os cadastrados pela API. A disponibilidade de um serviço em uma unidade é validada pela regra de negócio do sistema.'],
]

export function Faq() {
  return (
    <section className="section">
      <div className="page-shell max-w-4xl">
        <p className="eyebrow">Ajuda</p>
        <h1 className="title">Perguntas frequentes</h1>
        <div className="mt-10 grid gap-4">
          {items.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer list-none font-black marker:hidden">{question}</summary>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

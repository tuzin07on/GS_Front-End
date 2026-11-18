import { useState } from 'react'
import type { FormEvent } from 'react'

export function Contato() {
  const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim()
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mailtoUrl, setMailtoUrl] = useState('')
  const [configError, setConfigError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!form.nome.trim()) next.nome = 'Informe seu nome.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Informe um e-mail válido.'
    if (form.mensagem.trim().length < 10) next.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
    setErrors(next)
    setMailtoUrl('')
    setConfigError('')
    if (Object.keys(next).length === 0) {
      if (!contactEmail) {
        setConfigError('O destino do contato ainda não foi configurado. A equipe pode definir VITE_CONTACT_EMAIL no ambiente do front.')
        return
      }
      const subject = encodeURIComponent('Contato pelo Fila Zero')
      const body = encodeURIComponent(`Nome: ${form.nome.trim()}\nE-mail para retorno: ${form.email.trim()}\n\n${form.mensagem.trim()}`)
      setMailtoUrl(`mailto:${contactEmail}?subject=${subject}&body=${body}`)
    }
  }

  return (
    <section className="section">
      <div className="page-shell grid gap-10 lg:grid-cols-[.75fr_1fr]">
        <div>
          <p className="eyebrow">Contato</p>
          <h1 className="title">Como podemos ajudar?</h1>
          <p className="body-copy mt-5">Envie uma mensagem sobre o projeto, experiência de uso ou dúvidas sobre o Fila Zero.</p>
        </div>
        <form onSubmit={submit} className="card p-6 sm:p-8" noValidate>
          {configError && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900" role="alert">{configError}</div>}
          {mailtoUrl && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900" role="status"><p className="font-bold">Sua mensagem está pronta para envio.</p><p className="mt-1 text-sm">Abra seu aplicativo de e-mail e confirme o envio por lá.</p><a className="mt-3 inline-flex rounded-xl bg-forest px-4 py-2 font-bold text-white" href={mailtoUrl}>Abrir aplicativo de e-mail</a></div>}
          <div className="grid gap-5">
            {[
              ['nome', 'Nome', 'text', 'Seu nome'],
              ['email', 'E-mail', 'email', 'voce@email.com'],
            ].map(([key, label, type, placeholder]) => (
              <div key={key}>
                <label className="label" htmlFor={key}>{label} *</label>
                <input id={key} type={type} className="field" placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setMailtoUrl(''); setConfigError('') }} aria-invalid={Boolean(errors[key])} />
                {errors[key] && <p className="mt-1 text-sm font-bold text-red-700">{errors[key]}</p>}
              </div>
            ))}
            <div>
              <label className="label" htmlFor="mensagem">Mensagem *</label>
              <textarea id="mensagem" rows={6} className="field resize-y" value={form.mensagem} onChange={(e) => { setForm({ ...form, mensagem: e.target.value }); setMailtoUrl(''); setConfigError('') }} aria-invalid={Boolean(errors.mensagem)} />
              {errors.mensagem && <p className="mt-1 text-sm font-bold text-red-700">{errors.mensagem}</p>}
            </div>
            <button className="btn-primary w-full sm:w-auto sm:justify-self-end" type="submit">Preparar mensagem</button>
          </div>
        </form>
      </div>
    </section>
  )
}


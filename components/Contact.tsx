'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function Contact({ email }: { email: string }) {
  const t = useTranslations('contact')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body    = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
  }

  const inputCls =
    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted'

  return (
    <section id="contact" className="bg-bg py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">{t('title')}</h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-accent2 mx-auto mb-4 rounded" />
        <p className="text-center text-muted mb-10">{t('subtitle')}</p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className={inputCls} placeholder={t('name')}  value={form.name}    onChange={set('name')}    required />
            <input className={inputCls} placeholder={t('email')} value={form.email}   onChange={set('email')}   type="email" required />
          </div>
          <textarea className={`${inputCls} resize-y`} placeholder={t('message')} rows={5} value={form.message} onChange={set('message')} required />
          <button
            type="submit"
            className="self-start px-8 py-3 rounded-full bg-gradient-to-r from-accent to-accent2 text-white font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,111,255,0.4)] transition-all"
          >
            {t('send')}
          </button>
        </form>
      </div>
    </section>
  )
}

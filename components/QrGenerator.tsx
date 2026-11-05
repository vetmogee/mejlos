'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import QRCode from 'qrcode'

type Output = { png: string; svg: string }

const options = { errorCorrectionLevel: 'M', margin: 2 } as const

export default function QrGenerator() {
  const t = useTranslations('qr')
  const [text, setText] = useState('')
  const [output, setOutput] = useState<Output | null>(null)
  const [tooLong, setTooLong] = useState(false)

  useEffect(() => {
    if (!text) {
      setOutput(null)
      setTooLong(false)
      return
    }

    // A slower run for older text must not overwrite the result for newer text.
    let stale = false

    Promise.all([
      QRCode.toDataURL(text, { ...options, width: 1024 }),
      QRCode.toString(text, { ...options, type: 'svg' }),
    ])
      .then(([png, svg]) => {
        if (stale) return
        setOutput({ png, svg: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` })
        setTooLong(false)
      })
      .catch(() => {
        // The only input-dependent failure is exceeding QR code capacity.
        if (stale) return
        setOutput(null)
        setTooLong(true)
      })

    return () => {
      stale = true
    }
  }, [text])

  const buttonClass =
    'flex-1 py-2 text-center text-sm border border-border text-white rounded hover:bg-surface transition-colors'

  return (
    <div className="h-full overflow-y-auto flex px-5 sm:px-8 py-5">
      <div className="m-auto w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-white mb-4">{t('title')}</h1>

        <label htmlFor="qr-text" className="block text-muted text-[11px] uppercase tracking-widest mb-2">
          {t('label')}
        </label>
        <textarea
          id="qr-text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="https://"
          rows={3}
          className="w-full resize-none bg-bg2 border border-border rounded p-3 text-base text-white placeholder:text-muted focus:outline-none focus:border-muted"
        />

        <div className="mt-4 mx-auto w-full max-w-[14rem] aspect-square">
          {output ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={output.png} alt={t('alt')} className="w-full h-full rounded" />
          ) : (
            <div
              role={tooLong ? 'alert' : undefined}
              className={`w-full h-full flex items-center justify-center p-6 text-center text-xs border border-dashed border-border rounded ${
                tooLong ? 'text-white' : 'text-muted'
              }`}
            >
              {tooLong ? t('tooLong') : t('empty')}
            </div>
          )}
        </div>

        {output && (
          <div className="mt-4 flex gap-3">
            <a href={output.png} download="qrcode.png" className={buttonClass}>{t('downloadPng')}</a>
            <a href={output.svg} download="qrcode.svg" className={buttonClass}>{t('downloadSvg')}</a>
          </div>
        )}
      </div>
    </div>
  )
}

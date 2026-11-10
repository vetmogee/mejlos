'use client'

import { useEffect, useRef, useState } from 'react'

// Live preview of a site: the iframe renders at a desktop viewport and is
// scaled down to fit the box, so it looks like a screenshot. It can't be
// interacted with; clicking it opens the real site.
const VIEW_W = 1280
const VIEW_H = 800

type Props = { url: string; title: string }

export default function SitePreview({ url, title }: Props) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const update = () => setScale(box.clientWidth / VIEW_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
      className="group block rounded-lg border border-border overflow-hidden bg-white/5"
    >
      <div ref={boxRef} className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
        {scale > 0 && (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            tabIndex={-1}
            aria-hidden
            onLoad={() => setLoaded(true)}
            className="absolute top-0 left-0 origin-top-left pointer-events-none border-0 transition-opacity duration-500"
            style={{
              width: VIEW_W,
              height: VIEW_H,
              transform: `scale(${scale})`,
              opacity: loaded ? 1 : 0,
            }}
          />
        )}
        <div className="absolute inset-0 transition-colors group-hover:bg-black/10" />
      </div>
    </a>
  )
}

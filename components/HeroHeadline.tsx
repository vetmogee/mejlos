'use client'

import { useEffect, useState } from 'react'
import { onIntroFinished } from '@/lib/introSignal'

const FONT_CYCLE_INTERVAL = 140

const FONTS = [
  'Poppins',
  'Playfair Display',
  'Righteous',
  'Pacifico',
  'Roboto Mono',
  'Oswald',
  'Abril Fatface',
  'Caveat',
  'Orbitron',
  'Merriweather',
]

function pickFont(exclude: string) {
  const options = FONTS.filter(f => f !== exclude)
  return options[Math.floor(Math.random() * options.length)]
}

export default function HeroHeadline({ name }: { name: string }) {
  const [font, setFont] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let intervalId: ReturnType<typeof setInterval> | undefined
    const unsubscribe = onIntroFinished(() => {
      intervalId = setInterval(
        () => setFont(prev => pickFont(prev ?? '')),
        FONT_CYCLE_INTERVAL,
      )
    })

    return () => {
      unsubscribe()
      clearInterval(intervalId)
    }
  }, [])

  return (
    <h1
      className="m-0 whitespace-nowrap text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white"
      style={{ fontFamily: font }}
    >
      {name}
    </h1>
  )
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#0a0a0f',
        bg2:     '#111118',
        surface: '#16161f',
        border:  '#2a2a3a',
        accent:  '#7c6fff',
        accent2: '#ff6fb0',
        muted:   '#888899',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

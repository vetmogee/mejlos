import LanguageSwitcher from './LanguageSwitcher'

type Props = { nickname: string; email: string; linkedin: string; github: string }

export default function NavBar({ nickname, email, linkedin, github }: Props) {
  const linkClass = 'text-muted hover:text-white transition-colors'

  return (
    <header className="shrink-0 px-5 sm:px-8 pt-[calc(1rem+env(safe-area-inset-top))]">
      <nav className="max-w-5xl mx-auto flex items-center justify-end sm:justify-between gap-4 pb-3 border-b border-border text-sm">
        <span className="hidden sm:inline font-semibold text-white select-none">{nickname}</span>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href={`mailto:${email}`} className={`${linkClass} hidden sm:inline`}>{email}</a>
          <a href={`mailto:${email}`} className={`${linkClass} sm:hidden`}>Email</a>
          <a href={linkedin} target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a>
          <a href={github} target="_blank" rel="noreferrer" className={linkClass}>GitHub</a>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  )
}

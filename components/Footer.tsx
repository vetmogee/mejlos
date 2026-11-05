type Props = { name: string; rights: string; instagram: string; facebook: string }

export default function Footer({ name, rights, instagram, facebook }: Props) {
  const linkClass = 'hover:text-white transition-colors'

  return (
    <footer className="shrink-0 px-5 sm:px-8 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="max-w-5xl mx-auto pt-3 border-t border-border text-muted text-xs flex items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} {name}. {rights}</p>
        <div className="shrink-0 flex items-center gap-4">
          <a href={instagram} target="_blank" rel="noreferrer" className={linkClass}>Instagram</a>
          <a href={facebook} target="_blank" rel="noreferrer" className={linkClass}>Facebook</a>
        </div>
      </div>
    </footer>
  )
}

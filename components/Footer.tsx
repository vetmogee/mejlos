export default function Footer({ name, rights }: { name: string; rights: string }) {
  return (
    <footer className="shrink-0 px-5 sm:px-8 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <p className="max-w-5xl mx-auto pt-3 border-t border-border text-muted text-xs">
        &copy; {new Date().getFullYear()} {name}. {rights}
      </p>
    </footer>
  )
}

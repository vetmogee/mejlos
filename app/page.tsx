// Fallback: middleware redirects / → /en, but this handles edge cases.
import { redirect } from 'next/navigation'
export default function RootPage() {
  redirect('/en')
}

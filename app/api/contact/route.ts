import { NextResponse } from 'next/server'

// Contact is handled client-side via mailto — this route is a no-op.
export function POST() {
  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'
import { skills, techTags } from '@/lib/data'

export function GET() {
  return NextResponse.json({ skills, tags: techTags })
}

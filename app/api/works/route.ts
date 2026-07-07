import { NextResponse } from 'next/server'
import { works } from '@/lib/data'

export function GET() {
  return NextResponse.json(works)
}

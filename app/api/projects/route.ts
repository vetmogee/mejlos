import { NextResponse } from 'next/server'
import { projects } from '@/lib/data'

export function GET() {
  return NextResponse.json(projects)
}

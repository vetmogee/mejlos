import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/data'

export function GET() {
  return NextResponse.json(siteConfig)
}

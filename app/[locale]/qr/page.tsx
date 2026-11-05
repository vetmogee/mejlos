import type { Metadata } from 'next'
import QrGenerator from '@/components/QrGenerator'

export const metadata: Metadata = {
  title: 'QR Code Generator — Duc Anh Nguyen',
}

export default function QrPage() {
  return <QrGenerator />
}

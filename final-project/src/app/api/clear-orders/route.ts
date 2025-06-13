
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: 'Orders cleared' })

  res.cookies.set('orders', '', {
    path: '/',
    maxAge: 0,
  })
  return res
}


export async function GET(req: NextRequest) {
  return NextResponse.json({ ok: true })
}

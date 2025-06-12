// app/api/checkout/route.ts
import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})

export async function POST(req: NextRequest) {
  const { cart } = await req.json()

  // 1. Crea la sesión de Stripe
  const line_items = cart.map((item: any) => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.product.name },
      unit_amount: Math.round(item.product.price * 100),
    },
    quantity: item.quantity,
  }))

  const origin = req.headers.get('origin')!
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${origin}/my-orders?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart?status=cancel`,
  })

  // 2. Lee la cookie “orders” existente (si la hay) y agrégale este session.id
  const prev = req.cookies.get('orders')?.value
  const arr: string[] = prev ? JSON.parse(prev) : []
  if (!arr.includes(session.id)) arr.push(session.id)

  // 3. Devuelve la URL y actualiza la cookie “orders”
  const res = NextResponse.json({ url: session.url })
  res.cookies.set('orders', JSON.stringify(arr), {
    path: '/',            // accesible en todo el sitio
    maxAge: 60 * 60 * 24 * 30, // 30 días
  })
  return res
}

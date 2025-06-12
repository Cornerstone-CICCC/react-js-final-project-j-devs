// src/app/my-orders/page.tsx
import Stripe from 'stripe'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import ClearOrdersButton from '@/components/ClearOrdersButton'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})

export default async function MyOrdersPage() {
  const cookieStore = await cookies()
  const cookieVal = cookieStore.get('orders')?.value
  const sessionIds: string[] = cookieVal ? JSON.parse(cookieVal) : []


  const results = await Promise.all(
    sessionIds.map(async (id) => {
      const session = await stripe.checkout.sessions.retrieve(id)
      const { data: lineItems } = await stripe.checkout.sessions.listLineItems(id, { limit: 100 })
      return { session, lineItems }
    })
  )

  
  const paidResults = results.filter(({ session }) => session.payment_status === 'paid')

 
  if (paidResults.length === 0) {
    return (
      <section className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
        <p className="mb-6">Oops, it seems there’s no valid order.</p>
        <Link
          href="/products"
          className="
            inline-block px-6 py-2 
            bg-gray-200 text-gray-800 
            rounded-md 
            hover:bg-gray-300 
            transition-colors duration-200
          "
        >
          Back to Catalog
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {paidResults.map(({ session, lineItems }, i) => {
        const paid = (session.amount_total! / 100).toFixed(2)
        return (
          <div key={session.id} className="mb-12">
            <h2 className="text-xl font-semibold mb-2">Order #{i + 1}</h2>
            <details className="group mb-4">
              <summary className="cursor-pointer text-blue-500 hover:underline flex items-center gap-1">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                View More
              </summary>
              <div className="mt-2 ml-4">
                <h3 className="text-lg font-semibold mb-1">Total Paid: ${paid}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  {lineItems.map((it) => (
                    <li key={it.id}>
                      {it.description}, qty: {it.quantity ?? 0}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        )
      })}

     
      <div className="flex justify-center gap-4 mb-6">
        <ClearOrdersButton />
      </div>

     
      <div className="text-center mt-2">
        <Link
          href="/products"
          className="
            px-6 py-2 
            bg-black text-white 
            rounded-md 
            hover:bg-gray-800 
            transition-colors duration-200
          "
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}


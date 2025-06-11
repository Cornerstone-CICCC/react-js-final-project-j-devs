// app/my-orders/page.tsx
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import Image from 'next/image'
import Link from 'next/link'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})

export default async function MyOrdersPage() {

  const cookieStore = await cookies()
  const cookieVal = cookieStore.get('orders')?.value
  const sessionIds: string[] = cookieVal ? JSON.parse(cookieVal) : []

  if (sessionIds.length === 0) {
    return (
      <section className="p-8">
        <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
        <p>Oops, it seems there’s no valid order.</p>
        <Link href="/products" className="mt-4 inline-block text-blue-600 underline">
          Back to Catalog
        </Link>
      </section>
    )
  }

  const allLineItems = await Promise.all(
    sessionIds.map((id) =>
      stripe.checkout.sessions.listLineItems(id, { limit: 100 })
    )
  )

  const allSessions = await Promise.all(
    sessionIds.map((id) => stripe.checkout.sessions.retrieve(id))
  )

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

  {allSessions.map((sess, i) => {
  const paidAmount = (sess.amount_total! / 100).toFixed(2);
  const lineItemsForSession = allLineItems[i].data;

  return (
    <div key={i} className="mb-12">

      <h2 className="text-xl font-semibold mb-2">Order #{i + 1}</h2>

      
      <details className="group mb-4">
        <summary className="cursor-pointer text-blue-500 hover:underline flex items-center gap-1">
          <span className="group-open:rotate-90 transition-transform">▶</span>
          View More
        </summary>

        <div className="mt-2 ml-4">
          <h3 className="text-lg font-semibold mb-1">
            Total Paid: ${paidAmount}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-200">
            {lineItemsForSession.map((item) => {
              const qty = item.quantity ?? 0;
              return (
                <li key={item.id}>
                  {item.description}, qty: {qty}
                </li>
              );
            })}
          </ul>
        </div>
      </details>
    </div>
  );
})}


      <div className="text-center mt-8">
        <Link
          href="/products"
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}

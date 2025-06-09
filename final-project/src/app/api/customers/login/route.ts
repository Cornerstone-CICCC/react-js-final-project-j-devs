import { connectDB } from "@/lib/mongodb"
import Customer from "@/models/Customer"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) {
    return NextResponse.json({error: "Please complete all input fields"}, {status: 400})
  }

  await connectDB()
  const foundCustomer = await Customer.findOne({ email })
  if (!foundCustomer) {
    return NextResponse.json({error: "Wrong account information"}, {status: 400})
  }
  const correctPassword = await bcrypt.compare(password, foundCustomer.password)
  if (!correctPassword) {
    return NextResponse.json({error: "Wrong account information"})
  }
  return NextResponse.json({logged: "Successfull"})
}
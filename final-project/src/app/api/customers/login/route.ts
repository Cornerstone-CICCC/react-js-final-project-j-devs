import { connectDB } from "@/lib/mongodb"
import Customer from "@/models/Customer"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

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
  const cookieStore = await cookies()
  
  cookieStore.set("logged", foundCustomer._id, {
    httpOnly: true,
    secure: true,
    path: '/'
  })
  
  // check for admin
  if (email === process.env.ADMIN_EMAIL) {
    cookieStore.set("admin", "true", {
      httpOnly: true,
      secure: true,
      path: '/',
      // expires: 60 * 60
    }) 
  }
  
  return NextResponse.json({logged: "Successfull"})
}
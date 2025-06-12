import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

// Get all Customers
export async function GET() {
  await connectDB()
  const customers = await Customer.find()
  return NextResponse.json(
    customers.map(cust => ({
      _id: cust._id.toString(),
      firstname: cust.firstname,
      lastname: cust.lastname,
      age: cust.age,
      email: cust.email,
      password: cust.password,
      role: cust.role
    }))
  )
}

// Create customer - sign up
export async function POST(req: Request) {
  const { firstname, lastname, age, email, password, role } = await req.json()
  if (!firstname || !lastname || !age || !email || !password) {
    return NextResponse.json({error: "Please complete all input fields"}, {status: 400})
  }
  
  await connectDB()
  const foundCustomer = await Customer.exists({ email })
  if (foundCustomer) {
    return NextResponse.json({error: "Account already registered"}, {status: 409})
  }
  
  const hashedPassword = await bcrypt.hash(password, 12)
  const customer = await Customer.create({ firstname, lastname, age, email, password: hashedPassword, role })
  console.log(customer)
  return NextResponse.json(customer)
}
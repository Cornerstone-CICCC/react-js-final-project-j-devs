import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

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

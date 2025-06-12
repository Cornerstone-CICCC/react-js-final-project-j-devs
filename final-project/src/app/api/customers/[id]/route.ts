import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: {params: Promise<{id:string}>}
) {
  await connectDB()
  const { id } = await params
  const customer = await Customer.findById(id)
  if (!customer) {
    return NextResponse.json({error: "This customer doesn't exist."})
  }
  return NextResponse.json(customer)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const customer = await Customer.findByIdAndDelete(id)
  if (!customer) {
    return NextResponse.json({error: "This customer doesn't exist."})
  }
  return NextResponse.json({message: "Customer has been deleted", customer})
}
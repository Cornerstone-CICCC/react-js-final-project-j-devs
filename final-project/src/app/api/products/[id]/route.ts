import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const product = await Product.findById(id)
  if (!product) {
    return NextResponse.json({error: "This product doesn't exist"})
  }
  return NextResponse.json(product)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const product = await Product.findByIdAndDelete(id)
  if (!product) {
    return NextResponse.json({error: "This product doesn't exist"})
  }
  return NextResponse.json({message: "Product has been deleted", product})
}
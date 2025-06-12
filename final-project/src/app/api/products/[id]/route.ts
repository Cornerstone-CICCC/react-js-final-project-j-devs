import { CustomerType } from "@/app/actions/customer.actions";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { ProductType } from "@/app/actions/product.actions";

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

export async function PUT(
  req: Request,
  { params }: {params: Promise<{id: string}>}
) {
  try {
    await connectDB()
    const { id } = await params
    const { name, price, description, size, image, stock, category } = await req.json()
    const updatedProd: Partial<ProductType> = { name, price, description, size, image, stock, category }
    const product = await Product.findByIdAndUpdate(id, updatedProd, {new: true})
    
    if (!product) {
      return NextResponse.json({error: "Product has not been found"}, {status: 404})
    }

    return NextResponse.json({message: "Updated user successfully", product})
  } 
  catch(err) {
    return NextResponse.json(err)
  }
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
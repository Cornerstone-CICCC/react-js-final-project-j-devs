import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// Get all products
export async function GET() {
  await connectDB()
  const products = await Product.find()
  return NextResponse.json(
    products.map(prod => ({
      _id: prod._id.toString(),
      name: prod.name,
      price: prod.price,
      description: prod.description,
      size: prod.size,
      image: prod.image,
      stock: prod.stock,
      category: prod.category
    }))
  )
}

// Create product
export async function POST(req: Request) {
  const { name, price, description, size, image, stock, category } = await req.json()
  if (!name || !price || !description || !size || !image || !stock || !category) {
    return NextResponse.json({error: "Please complete all input fields"}, {status: 400})
  }

  await connectDB()
  const foundProd = await Product.exists({ name, description })
  if (foundProd) {
    return NextResponse.json({error: "Product already in-store"}, {status: 409})
  }

  const product = await Product.create({ name, price, description, size, image, stock, category })
  return NextResponse.json(product)
}
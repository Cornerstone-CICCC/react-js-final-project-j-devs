// /app/api/products/route.ts

import { connectDB } from "@/lib/mongodb"
import { UploadImage } from "@/lib/upload-image"
import Product from "@/models/Product"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB()

  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const price = parseFloat(formData.get("price") as string)
    const description = formData.get("description") as string
    const stock = parseInt(formData.get("stock") as string)
    const category = formData.get("category") as string
    const size = formData.get("size")?.toString().split(",").map(s => s.trim()) || []

    const image = formData.get("image") as File

    if (!image) {
      return new Response("Image is required", { status: 400 })
    }

    const uploaded: any = await UploadImage(image, "products")

    await Product.create({
      name,
      price,
      description,
      size,
      image: uploaded.secure_url,
      stock,
      category
    })

    return new Response(JSON.stringify({ message: "Product created" }), { status: 201 })
  } catch (err) {
    console.error("Error in POST /api/products:", err)
    return new Response("Something went wrong", { status: 500 })
  }
}



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

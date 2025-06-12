import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { ProductType } from "@/app/actions/product.actions";

// GET /api/products/[id]
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "This product doesn't exist" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const { name, price, description, size, image, stock, category } = await req.json();

    const updatedProd: Partial<ProductType> = {
      name, price, description, size, image, stock, category
    };

    const product = await Product.findByIdAndUpdate(id, updatedProd, { new: true });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated product successfully", product });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update product", details: err }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return NextResponse.json({ error: "This product doesn't exist" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product has been deleted", product });
}

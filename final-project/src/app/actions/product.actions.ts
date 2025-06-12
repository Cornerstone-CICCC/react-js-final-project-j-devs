"use server"
import { connectDB } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Product from "@/models/Product"
import toast from "react-hot-toast"
import { UploadImage } from "@/lib/upload-image";
import { isValidObjectId } from "mongoose"; // Add this at the top






export interface ProductType {
  _id: string
  name: string
  price: number
  description: string
  size: string[]
  image: string
  stock: number
  category: string
}

// Get All Products
async function getAllProducts() {
  await connectDB()

  const products = await Product.find()
  return products.map(prod => ({
    _id: prod._id.toString(),
    name: prod.name,
    price: prod.price,
    description: prod.description,
    size: prod.size,
    image: prod.image,
    stock: prod.stock,
    category: prod.category
  }))
}

//Get Single Product

async function getProductById(id: string) {
  await connectDB();

  if (!isValidObjectId(id)) return null;

  const product = await Product.findById(id);
  if (!product) return null;

  return {
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    material: product.material, // <-- Add this

    description: product.description,
    size: product.size,
    image: product.image,
    stock: product.stock,
    category: product.category,
  };
}


// Add product



async function addProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const rawSizes = formData.getAll("size"); // checkbox or multiple
    const size = Array.isArray(rawSizes) ? rawSizes.map(String) : [String(rawSizes)];
    const image = formData.get("image") as File;
    const stock = parseInt(formData.get("stock") as string);
    const category = formData.get("category") as string;

    if (!image || !image.size) {
      throw new Error("Image is required.");
    }

    await connectDB();

    const existing = await Product.exists({ name, description });
    if (existing) {
      throw new Error("Product already exists.");
    }

    const uploadResult: any = await UploadImage(image, "products");

    await Product.create({
      name,
      price,
      description,
      size,
      image: uploadResult.secure_url,
      stock,
      category,
    });

    revalidatePath("/products");

  } catch (err) {
    console.error("Failed to add product:", err);
    throw err; // Handle in client with toast or error boundary
  }
}



// Update Product
async function updatedProdById (id: string) {

}

// Delete Product
async function deleteProduct (id: string) {
  await connectDB()
  await Product.findByIdAndDelete(id)
  revalidatePath("/products")
}


export  { 
  getAllProducts,
  addProduct,
  getProductById,
  updatedProdById,
  deleteProduct
}
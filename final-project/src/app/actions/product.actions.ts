"use server"
import { connectDB } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Product from "@/models/Product"
import toast from "react-hot-toast"

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
  await connectDB()
  const product = await Product.findById(id)
  if (!product) return null

  return {
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    size: product.size,
    image: product.image,
    stock: product.stock,
    category: product.category
  }
}

// Add product
async function addProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const price = formData.get("price") 
    const description = formData.get("description") as string
    const size = formData.get("size")
    const image = formData.get("image") as string
    const stock = formData.get("stock") 
    const category = formData.get("category") as string

    await connectDB()
    const foundProd = await Product.exists({ name, description })
    if (foundProd) {
      toast.error("Product already in-store")
      return
    }

    await Product.create({
      name,
      price,
      description,
      size,
      image,
      stock,
      category
    })
    toast.success("Added new Product")
  } catch (err) {
    console.error(err)
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


export default { 
  getAllProducts,
  addProduct,
  getProductById,
  updatedProdById,
  deleteProduct
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddProductForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("stock", stock)
      formData.append("category", category)
      formData.append("size", size) // You can handle comma splitting server-side
      if (imageFile) {
        formData.append("image", imageFile)
      }

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData
      })

      if (res.ok) {
        router.push("/products")
      } else {
        throw new Error("Product creation failed.")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full border p-2" />
      <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border p-2" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full border p-2" />
      <input type="text" placeholder="Sizes (comma-separated)" value={size} onChange={e => setSize(e.target.value)} required className="w-full border p-2" />
      <input type="text" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required className="w-full border p-2" />
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full border p-2" />
      <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full border p-2" />

      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover border" />
      )}

      <button disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded">
        {isSubmitting ? "Submitting..." : "Add Product"}
      </button>
    </form>
  )
}

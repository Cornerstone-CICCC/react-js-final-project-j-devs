'use client';

import '@/styles/components/admin.css';

import React, { useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/app/actions/product.actions"
import ProductDashboard from "./ProductDashboard"
import AddProductForm from "../products/add/page"

const products = await getAllProducts()

function Admin() {
  const [activeView, setActiveView] = useState("dashboard")
  const [productsState, setProducts] = useState(products)
  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: ""
  })
  const [editIndex, setEditIndex] = useState(null)

  const handleChange = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!productInput.name || !productInput.price || !productInput.image) return
    setProducts([...productsState, productInput])
    setProductInput({ name: "", description: "", category: "", price: "", image: "" })
  }

  const handleEdit = (index) => {
    setProductInput(productsState[index])
    setEditIndex(index)
    setActiveView("add")
  }

  const handleUpdate = () => {
    const updated = [...productsState]
    updated[editIndex] = productInput
    setProducts(updated)
    setProductInput({ name: "", description: "", category: "", price: "", image: "" })
    setEditIndex(null)
  }

  const handleDelete = (index) => {
    const updated = [...productsState]
    updated.splice(index, 1)
    setProducts(updated)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const previewURL = URL.createObjectURL(file)
    setProductInput((prev) => ({ ...prev, image: previewURL }))
  }

  return (
    <>
    {activeView === "dashboard" && (

         
      <ProductDashboard products={productsState} />
      
      )}
      <section>
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-[#e0e0e0] flex flex-col justify-center items-center gap-6">
            <p className="p-admin text-[#2c5d63] text-[30px] font-mono">YVR Admin Page</p>
            <ul className="space-y-2 font-medium">
              <button onClick={() => setActiveView("dashboard")} className={`flex items-center p-2 rounded-lg group ${activeView === "dashboard" ? "bg-[#a2c11c] text-[#283739]" : "text-[#283739] hover:bg-[#a2c11c] hover:text-[#283739]"}`}>
                <svg className="w-6 h-6 text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 18 20"><path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/><path d="M10.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm3.429 12.5H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/></svg>
                <span className="ms-3">Dashboard</span>
              </button>
              <button onClick={() => setActiveView("add")} className="flex items-center p-2 text-[#283739] rounded-lg hover:bg-[#a2c11c] hover:text-[#283739] group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 18 20"><path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/></svg>
                <span className="ms-3">Add Product</span>
              </button>
              <button onClick={() => setActiveView("logout")} className="flex items-center p-2 text-[#283739] rounded-lg hover:bg-[#a2c11c] hover:text-[#283739] group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/><path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/><path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/></svg>
                <Link href="/">
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </Link>
              </button>
            </ul>
          </div>
        </aside>

        <div className='p-4 sm:ml-64'>
          {activeView === "add" && (
<AddProductForm />
          )}
        </div>
      </section>
    </>
  )
}

export default Admin

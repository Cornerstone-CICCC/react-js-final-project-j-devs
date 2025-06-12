'use client';

import '@/styles/components/admin.css';

import React, { useState } from "react";
import Link from "next/link";

function Admin(){
    const [activeView, setActiveView] = useState("dashboard");

    const [products, setProducts] = useState([]);
    const [productInput, setProductInput] = useState({
    name: "",
    price: "",
    image: ""
    });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
  if (!productInput.name || !productInput.price || !productInput.image) return;
  setProducts([...products, productInput]);
  setProductInput({ name: "", price: "", image: "" });
};


const handleEdit = (index) => {
  setProductInput(products[index]);
  setEditIndex(index);
  setActiveView("add");
};


  const handleUpdate = () => {
    const updated = [...products];
    updated[editIndex] = productInput;
    setProducts(updated);
    setProductInput({ name: "", description: "", category: "", price: "", image: "" });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewURL = URL.createObjectURL(file);

  setProductInput((prev) => ({
    ...prev,
    image: previewURL
  }));
};


    return(
        <>
        <section>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#e0e0e0] flex flex-col justify-center items-center gap-6">
                    <p className="p-admin text-[#2c5d63] text-[30px] font-mono">YVR Admin Page</p>
                    <ul className="space-y-2 font-medium">

                            {/*Dashboard */}
                            <button
                            onClick={() => setActiveView("dashboard")}
                            className={`flex items-center p-2 rounded-lg group ${
                                activeView === "dashboard"
                                ? "bg-[#a2c11c] text-[#283739]"
                                : "text-[#283739] hover:bg-[#a2c11c] hover:text-[#283739]"
                            }`}
                            >
                            <svg className="w-6 h-6 text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
                            </svg>
                            <span className="ms-3">Dashboard</span>
                            </button>

                            {/*Add Product */}
                            <button
                            onClick={() => setActiveView("add")} className="flex items-center p-2 text-[#283739] rounded-lg hover:bg-[#a2c11c] hover:text-[#283739] group">
                            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <span className="ms-3">Add Product</span>
                            </button>

                            {/*Signup */}
                            <button
                            onClick={() => setActiveView("logout")} className="flex items-center p-2 text-[#283739] rounded-lg hover:bg-[#a2c11c] hover:text-[#283739] group">
                            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                            </svg>
                            <Link href="/">
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </Link>
                            
                            </button>
                    </ul>
                </div>
            </aside>

            {/*Content Display */}
            <div className='p-4 sm:ml-64'>
                {activeView === 'dashboard' && (
            <div className="flex flex-col h-full">
                <h2 className='text-2xl font-bold mb-4'>📊 YVR Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between  w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                        <img
                        className="p-8 rounded-t-lg h-96"
                        src={product.image}
                        alt={product.name}
                        />
                        <div className="px-5 pb-5">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                        </h5>
                        <div className="flex flex-col items-center justify-between mt-3">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${product.price}
                            </span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {product.description}
                            </span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {product.category}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-2">
                            <button
                            onClick={() => handleEdit(index)}
                            className="flex-1 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => handleDelete(index)}
                            className="flex-1 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                            >
                            Delete
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                    </div>
                    </div>
                    )}

                {activeView === "add" && (
                    <div>
                    <h2 className="text-2xl font-bold">✏️ Add Product View</h2>
                    
                        {/* Form */}
                        <div className="mb-6 space-y-2">

                            {/*Product Name */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={productInput.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />

                            {/*Description */}
                        <input
                            type="text"
                            name="description"
                            placeholder="Product Description"
                            value={productInput.description}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />

                            {/*Category */}
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={productInput.category}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />

                            {/*Price */}
                        <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={productInput.price}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />

                            {/*Image */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="border p-2 rounded w-full"
                        />
                        {editIndex !== null ? (
                            <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Update Product
                            </button>
                        ) : (
                            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Add Product
                            </button>
                        )}
                        </div>
                        
                        {/*Product Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between h-full">
                                <a href="#">
                                    <img className="p-8 rounded-t-lg" src={product.image} alt="product" />
                                </a>
                                <div className="px-5 pb-5">

                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {product.name}
                                    </h5>

                                    <div className="flex flex-col items-center justify-between mt-3">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{product.category}</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{product.description}</span>
                                    </div>
                                </div>
                                </div>
                            ))}
                            </div>
                    </div>
                )}

            </div>
        </section>
        </>
    );
}

export default Admin
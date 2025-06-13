"use server"
import { connectDB } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Customer from "@/models/Customer"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"

export interface CustomerType { 
  _id: string,
  firstname: string
  lastname: string
  age: number
  email: string
  password: string
  role: string
}

// Get All Customers

export async function getAllCustomers () {
  await connectDB()

  const customers = await Customer.find()
  return customers.map(cust => ({
    _id: cust._id.toString(),
    firstname: cust.firstname,
    lastname: cust.lastname,
    age: cust.age,
    email: cust.email,
    password: cust.password,
    role: cust.role
  }))
}

// Get Single Customer
export async function getCustomerById (id: string) {
  await connectDB()

  const customer = await Customer.findById(id) 
  if (!customer) return null

  return {
    _id: customer._id.toString(),
    firstname: customer.firstname,
    lastname: customer.lastname,
    age: customer.age,
    email: customer.email,
    password: customer.password,
    role: customer.role
  }
}

// Add Customer - sign up
export async function addCustomer (formData: FormData) {
  const firstname = formData.get("firstname") as string
  const lastname = formData.get("lastname") as string
  const age = formData.get("age")
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = "customer"

  await connectDB()
  const foundCustomer = await Customer.exists({ email })
  if (foundCustomer) {
    return { success: false, message: "This email is already registered." }
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  await Customer.create({ 
    firstname,
    lastname,
    age,
    email,
    password: hashedPassword,
    role
  })
  return { success: true, message: "Successfully signed up!" }
}
  
// Login customer
export async function loginCustomer (formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Complete all input fields" }
  }
  await connectDB()
  const foundCustomer = await Customer.findOne({ email })
  if (!foundCustomer) {
    return { success: false, message: "Wrong Login information" }
  }
  const correctPassword = await bcrypt.compare(password, foundCustomer.password)
  if (!correctPassword) {
    return { success: false, message: "Wrong Login information" }
  }

  const cookieStore = await cookies()

  cookieStore.set("logged", foundCustomer._id, {
    httpOnly: true,
    secure: true,
    path: '/'
  })
  // check for admin
  if (email === process.env.ADMIN_EMAIL) {
    cookieStore.set("admin", "true", {
      httpOnly: true,
      secure: true,
      path: '/',
    }) 
  }

  return { success: true, message: "Logged In!" }
}

export async function logoutCustomer (formData: FormData) {
  const cookieStore = await cookies()
  cookieStore.delete("logged")
}
  
// Delete Customer
export async function deleteCustomer(id: string) {
  await connectDB()
  await Customer.findByIdAndDelete(id)
  revalidatePath("/customer")
}
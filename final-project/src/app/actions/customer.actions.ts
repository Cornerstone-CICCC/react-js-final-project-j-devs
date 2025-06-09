"use server"
import { connectDB } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Customer from "@/models/Customer"
import toast from "react-hot-toast"
import bcrypt from 'bcrypt'

export interface CustomerType { 
  _id: string,
  firstname: string
  lastname: string
  age: number
  email: string
  password: string
}

// Get All Customers

async function getAllCustomers () {
  await connectDB()

  const customers = await Customer.find()
  return customers.map(cust => ({
    _id: cust._id.toString(),
    firstname: cust.firstname,
    lastname: cust.lastname,
    age: cust.age,
    email: cust.email,
    password: cust.password
  }))
}

// Get Single Customer
async function getCustomerById (id: string) {
  await connectDB()

  const customer = await Customer.findById(id) 
  if (!customer) return null

  return {
    _id: customer._id.toString(),
    firstname: customer.firstname,
    lastname: customer.lastname,
    age: customer.age,
    email: customer.email,
    password: customer.password
  }
}

// Add Customer - sign up
async function addCustomer (formData: FormData) {
  try {
    const firstname = formData.getAll("firstname")
    const lastname = formData.get("lastname") as string
    const age = formData.get("age")
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    await connectDB()
    const foundCustomer = await Customer.exists({ email })
    if (foundCustomer) {
      toast.error("This email is already registered.")
      return
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await Customer.create({ 
      firstname,
      lastname,
      age,
      email,
      password: hashedPassword
    })
    toast.success("Sign up successfull")

    // Add redirection to login or shop webpage
  } catch (err) {

  }
}

// Delete Customer
async function deleteCustomer(id: string) {
  await connectDB()
  const customer = await Customer.findByIdAndDelete(id)
  revalidatePath("/customer")
}

export default {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  deleteCustomer
}
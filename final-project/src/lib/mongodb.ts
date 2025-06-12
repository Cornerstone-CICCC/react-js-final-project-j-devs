import mongoose from "mongoose";

if (!process.env.MONGODB_URI) throw new Error("Missing MongoDB URI information")

const MONGODB_URI = process.env.MONGODB_URI

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return

  await mongoose.connect(MONGODB_URI, {
    dbName: "jdev_store"
  })
}
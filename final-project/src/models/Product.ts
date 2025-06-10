import mongoose from "mongoose";

const ProdcutSchema  = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String, require: true },
  size: { type: [], require: true },
  image: { type: String, require: true },
  stock: { type: Number, require: true },
  category: { type: String, require: true }
})

export default mongoose.models.Product || mongoose.model("Product", ProdcutSchema)
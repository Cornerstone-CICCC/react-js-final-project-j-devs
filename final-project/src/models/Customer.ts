import mongoose from "mongoose";

const CustomerSchema  = new mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  age: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true, default: "customer" }
})

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)
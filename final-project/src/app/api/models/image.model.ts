import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image_url: String,
    public_id: String,
  },
  { timestamps: true }
);

export const Image =
  mongoose.models.Image || mongoose.model("Image", imageSchema);
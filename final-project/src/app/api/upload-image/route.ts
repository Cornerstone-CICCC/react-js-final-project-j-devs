import { UploadImage } from "../../../lib/upload-image";
import { connectDB } from "../../../lib/mongodb";
import { Image } from "../models/image.model";

export async function POST(request: Request) {
  await connectDB();

  const formData = await request.formData();

  try {
    const image = formData.get("image") as File;

    if (image) {
      // upload the image
      const uploadResult: any = await UploadImage(image, "image-upload");

      console.log("Image Result: ", uploadResult);

      await Image.create({
        image_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      })
    }

    return Response.json(
      { message: "Image uploaded successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error uploading", error);
    return Response.json(
      { message: "Error uploading image." },
      { status: 400 }
    );
  }
}
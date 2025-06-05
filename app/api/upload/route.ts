import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "modia",
    });

    return NextResponse.json({ url: uploadRes.secure_url });
  } catch (error) {
    console.error("Error en upload:", error);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}

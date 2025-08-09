
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
   const body = await req.formData()
   try {
      const images: File[] = body.getAll("images") as File[]
      const imageUrls = (await Promise.all(images.map((image: File) => {
         return put(image.name, image, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
         })
      }))).map(blob => blob.url)
      return NextResponse.json({ imageUrls }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ isError: true, error: error }, { status: 500 });
   }
}
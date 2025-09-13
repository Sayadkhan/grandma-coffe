import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title");
    const author = formData.get("author");
    const date = formData.get("date");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    if (!title || !author || !content) {
      return NextResponse.json(
        { error: "Title, Author, and Content are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      imageUrl = uploadRes.secure_url;
    }

    const blog = await Blog.create({
      title,
      author,
      date,
      content,
      image: imageUrl,
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json(blogs, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// DELETE /api/blog/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update blog
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const formData = await req.formData();
    const updatedData = {
      title: formData.get("title"),
      author: formData.get("author"),
      date: formData.get("date"),
      content: formData.get("content"),
    };

    if (formData.get("image")) {
      updatedData.image = formData.get("image"); // (store properly if using cloud storage)
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

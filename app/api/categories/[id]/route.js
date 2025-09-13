import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// PATCH: Update Category
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    let updateData = {};

    // Detect if it's JSON or FormData
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (body.Featured !== undefined) updateData.Featured = body.Featured;
      if (body.New_Arrivable !== undefined)
        updateData.New_Arrivable = body.New_Arrivable;
    } else {
      // Handle FormData (for file upload)
      const formData = await req.formData();
      if (formData.get("name")) updateData.name = formData.get("name");
      if (formData.get("desc")) updateData.desc = formData.get("desc");
      if (formData.get("Featured") !== null)
        updateData.Featured = formData.get("Featured") === "true";
      if (formData.get("New_Arrivable") !== null)
        updateData.New_Arrivable = formData.get("New_Arrivable") === "true";

      // Handle image upload
      const imageFile = formData.get("image");
      if (imageFile && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadRes = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "categories" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        updateData.image = uploadRes.secure_url;
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET SINGLE CATEGORY
export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  console.log("Fetching category with ID:", id);

  try {
    const category = await Category.findById(id);
    if (!category) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE: Remove Category
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    console.log(id);

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Optional: Delete image from Cloudinary
    if (category.image) {
      const publicId = category.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`categories/${publicId}`);
    }

    await category.deleteOne();

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

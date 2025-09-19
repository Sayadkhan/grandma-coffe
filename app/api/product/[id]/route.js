import { NextResponse } from "next/server";

import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

// ✅ Get single product
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ Update product
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    let updateData = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // JSON update (e.g., toggles or regular fields)
      const body = await req.json();
      const fields = [
        "name",
        "slug",
        "shortDesc",
        "desc",
        "price",
        "stock",
        "discount",
        "discountType",
        "category",
        "tags",
        "variants",
      ];
      fields.forEach((f) => {
        if (body[f] !== undefined) updateData[f] = body[f];
      });
    } else {
      // FormData update (for image upload + variants)
      const formData = await req.formData();

      if (formData.get("name")) updateData.name = formData.get("name");
      if (formData.get("slug")) updateData.slug = formData.get("slug");
      if (formData.get("shortDesc"))
        updateData.shortDesc = formData.get("shortDesc");
      if (formData.get("desc")) updateData.desc = formData.get("desc");
      if (formData.get("price"))
        updateData.price = Number(formData.get("price"));
      if (formData.get("stock"))
        updateData.stock = Number(formData.get("stock"));
      if (formData.get("discount"))
        updateData.discount = Number(formData.get("discount"));
      if (formData.get("discountType"))
        updateData.discountType = formData.get("discountType");
      if (formData.get("category"))
        updateData.category = formData.get("category");
      if (formData.get("tags"))
        updateData.tags = formData
          .get("tags")
          .split(",")
          .map((t) => t.trim());

      // ✅ Handle variants (JSON string inside FormData)
      if (formData.get("variants")) {
        try {
          updateData.variants = JSON.parse(formData.get("variants"));
        } catch (e) {
          console.error("❌ Invalid variants format:", e);
          return NextResponse.json(
            { message: "Invalid variants format, must be JSON" },
            { status: 400 }
          );
        }
      }

      // ✅ Handle image upload
      const imageFiles = formData.getAll("images");
      if (imageFiles.length > 0) {
        const uploadedImages = [];
        for (const imageFile of imageFiles) {
          if (!imageFile || imageFile.size === 0) continue;
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          const uploadRes = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                { folder: "products", resource_type: "image" },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              )
              .end(buffer);
          });
          uploadedImages.push(uploadRes.secure_url);
        }
        if (uploadedImages.length > 0) updateData.images = uploadedImages;
      }
    }

    // ✅ Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Delete product
export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params; // 👈 await params
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product", error: error.message },
      { status: 500 }
    );
  }
}

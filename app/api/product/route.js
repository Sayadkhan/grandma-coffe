import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const slug = formData.get("slug");
    const shortDesc = formData.get("shortDesc") || "";
    const desc = formData.get("desc") || "";
    const price = parseFloat(formData.get("price")) || 0;
    const stock = parseInt(formData.get("stock"), 10) || 0;
    const discount = parseFloat(formData.get("discount")) || 0;
    const discountType = formData.get("discountType") || "percentage";
    const category = formData.get("category") || "";
    const tags =
      formData
        .get("tags")
        ?.split(",")
        .map((t) => t.trim()) || [];

    let variants = [];
    const variantsRaw = formData.get("variants");
    if (variantsRaw) {
      try {
        variants = JSON.parse(variantsRaw);
      } catch (e) {
        console.error("❌ Invalid variants format:", e);
        return NextResponse.json(
          { message: "Invalid variants format, must be JSON" },
          { status: 400 }
        );
      }
    }

    // 🔹 Handle image upload
    const files = formData.getAll("images");
    let uploadedImages = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadRes = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "products", resource_type: "image" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        uploadedImages.push(uploadRes.secure_url);
      }
    }

    // 🔹 Create product with variants
    const newProduct = await Product.create({
      name,
      slug,
      shortDesc,
      desc,
      price,
      stock,
      discount,
      discountType,
      category,
      tags,
      images: uploadedImages,
      variants, // ✅ added here
    });

    return NextResponse.json(
      { message: "✅ Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Product creation failed:", error);
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Filters
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Fetch products
    const products = await Product.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json(
      {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import cloudinary from "@/lib/cloudinary";

// POST: Create Category
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const desc = formData.get("desc");
    const imageFile = formData.get("image");

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let imageUrl = "";
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
      imageUrl = uploadRes.secure_url;
    }

    // Featured and New_Arrivable will use schema defaults automatically
    const category = await Category.create({
      name,
      desc,
      image: imageUrl,
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch categories with pagination

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = searchParams.has("page")
      ? parseInt(searchParams.get("page"))
      : null;
    const limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit"))
      : null;

    let categories, total, totalPages;

    if (page && limit) {
      const skip = (page - 1) * limit;

      [categories, total] = await Promise.all([
        Category.find({})
          .select("name desc image Featured New_Arrivable createdAt")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Category.countDocuments(),
      ]);

      totalPages = Math.ceil(total / limit);
    } else {
      categories = await Category.find({})
        .select("name desc image Featured New_Arrivable createdAt")
        .sort({ createdAt: -1 })
        .lean();
      total = categories.length;
      totalPages = 1;
    }

    return NextResponse.json({
      categories,
      totalPages,
      total,
      currentPage: page || 1,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import cloudinary from "@/lib/cloudinary";
// import { Customer } from "@/models/Customer";
import Customer from "../../../../models/Customer";
import { connectDB } from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const mobile = formData.get("mobile");
    const profileImage = formData.get("profileImage");

    if (!name || !email || !password || !mobile) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    if (profileImage && profileImage.name) {
      const bytes = await profileImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "coffee-band/customers" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      if (!uploadRes?.secure_url) {
        return NextResponse.json(
          { message: "Image upload failed" },
          { status: 500 }
        );
      }

      imageUrl = uploadRes.secure_url;
    }

    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      profileImage: imageUrl,
    });

    // Remove password before sending response
    const { password: _, ...customerData } = customer.toObject();

    return NextResponse.json(
      { message: "Customer created successfully", customer: customerData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

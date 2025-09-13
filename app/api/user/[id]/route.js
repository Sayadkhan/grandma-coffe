import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Customer from "@/models/Customer";
import { connectDB } from "@/lib/mongodb";

// Connect to DB before any requests
connectDB().catch((err) => console.error("DB connection error:", err));

/** GET /api/user/:id */
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const customer = await Customer.findById(id).select("-password");

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    console.error("GET customer API error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

/** PATCH /api/user/:id */
export async function PATCH(req, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const formData = await req.formData();

    const name = formData.get("name");
    const mobile = formData.get("mobile");
    const profileImage = formData.get("profileImage");
    const addresses = formData.get("addresses");
    const setPrimary = formData.get("setPrimary");

    const updateData = {};

    if (name) updateData.name = name;
    if (mobile) updateData.mobile = mobile;

    // Handle profile image update
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

      updateData.profileImage = uploadRes.secure_url;
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    // Handle full addresses update
    if (addresses) {
      const parsedAddresses = JSON.parse(addresses);

      // Ensure at least one primary address
      const hasPrimary = parsedAddresses.some((addr) => addr.isDefault);
      if (!hasPrimary && parsedAddresses.length > 0) {
        parsedAddresses[0].isDefault = true;
      }

      customer.addresses = parsedAddresses;
    }

    // Handle setting a primary address without replacing all
    if (setPrimary) {
      customer.addresses = customer.addresses.map((addr) => ({
        ...addr.toObject(),
        isDefault: addr._id.toString() === setPrimary,
      }));
    }

    // Update other fields
    Object.assign(customer, updateData);

    await customer.save();

    return NextResponse.json(
      {
        message: "Customer updated successfully",
        customer: customer.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH customer API error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// api/auth/me/route.js
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req) {
  try {
    await connectDB();

    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = await verifyAccessToken(accessToken);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.sub).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error("Me route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

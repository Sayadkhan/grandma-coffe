// api/auth/login/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.warn("⚠️ Invalid password for:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const accessToken = await signAccessToken({
      sub: user._id.toString(),
      email: user.email,
      role: user.role || "user",
    });
    const refreshToken = await signRefreshToken(user._id.toString());

    const res = NextResponse.json({ message: "Logged in" });

    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 10 * 60, // 10 minutes
      secure: process.env.NODE_ENV === "production",
    });

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}

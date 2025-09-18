import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashed });

  return NextResponse.json({ message: "User created", userId: newUser._id });
}

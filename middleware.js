// middleware.js
import { NextResponse } from "next/server";
import { signAccessToken, verifyAccessToken } from "./lib/auth";
// import { verifyAccessToken, signAccessToken } from "@/lib/auth";

export async function middleware(req) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    req.user = payload; // attach user info
    return NextResponse.next();
  } catch (err) {
    // Access token expired -> try refresh
    const refreshToken = req.cookies.get("refresh_token")?.value;
    if (!refreshToken)
      return NextResponse.redirect(new URL("/admin/login", req.url));

    try {
      const refreshPayload = await verifyRefreshToken(refreshToken);
      const newAccessToken = await signAccessToken({ sub: refreshPayload.sub });

      const res = NextResponse.next();
      res.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 10 * 60,
        secure: process.env.NODE_ENV === "production",
      });
      req.user = { sub: refreshPayload.sub };
      return res;
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};

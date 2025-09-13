import { cookies } from "next/headers";
import { getRefreshCookie, setRefreshCookie } from "@/lib/cookies";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/lib/auth";

export async function POST(req) {
  const cookieStore = cookies();
  const refreshToken = getRefreshCookie(cookieStore);
  if (!refreshToken) return new Response("No refresh token", { status: 401 });

  try {
    const payload = await verifyRefreshToken(refreshToken);

    // Generate new tokens
    const newAccessToken = await signAccessToken({ userId: payload.sub });
    const newRefreshToken = await signRefreshToken(payload.sub);

    // Update cookie
    setRefreshCookie(cookieStore, newRefreshToken);

    return new Response(JSON.stringify({ accessToken: newAccessToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return new Response("Invalid refresh token", { status: 401 });
  }
}

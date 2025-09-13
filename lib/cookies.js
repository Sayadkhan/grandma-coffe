import { cookies } from "next/headers";

export const REFRESH_COOKIE = "refresh_token";

export async function setRefreshCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: REFRESH_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearRefreshCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: REFRESH_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getRefreshCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE)?.value;
}

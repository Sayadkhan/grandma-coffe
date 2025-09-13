// lib/auth.js
import "server-only";
import { SignJWT, jwtVerify } from "jose";

const alg = "HS256";
const enc = async (secret) => new TextEncoder().encode(secret);

export const ACCESS_TTL = "10m";
export const REFRESH_TTL = "7d";

export async function signAccessToken(payload) {
  const secret = await enc(process.env.JWT_ACCESS_SECRET);
  return await new SignJWT({ ...payload, type: "access" })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .sign(secret);
}

export async function signRefreshToken(userId) {
  const secret = await enc(process.env.JWT_REFRESH_SECRET);
  return await new SignJWT({ sub: userId, type: "refresh" })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TTL)
    .sign(secret);
}

export async function verifyAccessToken(token) {
  const secret = await enc(process.env.JWT_ACCESS_SECRET);
  const { payload } = await jwtVerify(token, secret, { algorithms: [alg] });
  if (payload.type !== "access") throw new Error("Wrong token type");
  return payload;
}

export async function verifyRefreshToken(token) {
  const secret = await enc(process.env.JWT_REFRESH_SECRET);
  const { payload } = await jwtVerify(token, secret, { algorithms: [alg] });
  if (payload.type !== "refresh") throw new Error("Wrong token type");
  return payload;
}

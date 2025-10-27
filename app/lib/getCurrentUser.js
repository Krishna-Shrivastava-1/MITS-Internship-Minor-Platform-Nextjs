// lib/getCurrentUser.js
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

export async function getCurrentUser() {
  try {
    const token = cookies().get("authtoken")?.value
    if (!token) return null

    const secretKey = new TextEncoder().encode(process.env.SecretKey)
    const { payload } = await jwtVerify(token, secretKey)

    // you already store user data in token payload
    return payload // { id, email, role, ... }
  } catch (err) {
    console.error("Error verifying token in getCurrentUser:", err)
    return null
  }
}

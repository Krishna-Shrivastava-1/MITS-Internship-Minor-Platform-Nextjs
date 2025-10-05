import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("authtoken")?.value;
  const url = req.nextUrl.clone();
  const secretKey = new TextEncoder().encode(process.env.SecretKey);

  // Public pages
  const publicPaths = ["/login", "/"];
  
  try {
    if (token) {
      const { payload } = await jwtVerify(token, secretKey);

      // Redirect logged-in users away from /login
      if (url.pathname === "/login") {
        if (payload.role === "student") return NextResponse.redirect(new URL("/home", req.url));
        if (payload.role === "teacher") return NextResponse.redirect(new URL("/admin", req.url));
        if (payload.role === "superadmin") return NextResponse.redirect(new URL("/superadmin", req.url));
      }

      // Role-based access control
      if (url.pathname.startsWith("/home") && payload.role !== "student") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      if (url.pathname.startsWith("/admin") && payload.role !== "teacher") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      if (url.pathname.startsWith("/superadmin") && payload.role !== "superadmin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    }

    // No token → redirect to login for any protected page
    if (!token && !publicPaths.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // allow public pages
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/superadmin/:path*", "/admin/:path*", "/home/:path*", "/login"]
};

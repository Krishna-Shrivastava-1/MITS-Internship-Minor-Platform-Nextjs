import database from "@/Database/db";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secretAdminEmail = process.env.SecretAdminEmail
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    if (!code) return Response.json({ error: "No code found" }, { status: 400 });

    // Exchange code for token
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get Google user info
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`
    );
    const profile = await response.json();
    const { email, name, picture, id } = profile;
    // Connect DB
    await database();

    // Find or create user
    let studentExist = await studentModel.findOne({ email });
    const teacherisExist = await teacherModel.findOne({email})
    if (!studentExist && !teacherisExist) {
   studentExist=    await studentModel.create({
        name,
        email,
        googleId: id,
        profilePic: picture,
        enrollmentNumber:'',
        department:null
      });
    }
 const role = email === secretAdminEmail ? "superadmin" : studentExist?.role || teacherisExist?.role;
    // Create JWT
    const token = jwt.sign({ id: studentExist?._id || teacherisExist?._id ,role}, process.env.SecretKey, {
      expiresIn: "1d",
    });

    // Set cookie
    cookies().set("authtoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge:  24 * 60 * 60,
    });
   if (role === "student") {
  // If student missing enrollmentNumber or department → force setup page
  if (!studentExist.enrollmentNumber || !studentExist.department) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/setup-student-profile`
    );
  }
  return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/home`);
} else {
  return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`);
}
 
    
  } catch (error) {
    console.error("Google callback error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
}

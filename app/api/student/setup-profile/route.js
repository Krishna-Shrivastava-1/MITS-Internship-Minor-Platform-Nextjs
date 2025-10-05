import { NextResponse } from "next/server";


import jwt from "jsonwebtoken";
import database from "@/Database/db";
import { studentModel } from "@/models/student";

export async function PUT(req) {
  try {
    await database();
    const { enrollmentNumber, department } = await req.json();

    // Get user id from JWT cookie
    const token = req.cookies.get("authtoken")?.value;
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const decoded = jwt.verify(token, process.env.SecretKey);
const checkEnrollment = await studentModel.findOne({enrollmentNumber})
if(checkEnrollment){
    return NextResponse.json({
        message:'Invalid Enrollment Number',
        success:false
    })
}
    const updated = await studentModel.findByIdAndUpdate(
      decoded.id,
      { enrollmentNumber, department },
      { new: true }
    );
if(!updated){
    return NextResponse.json({
        message:'Something Went Wrong but it is not your fault',
        success:false
    })
}
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      student: updated,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

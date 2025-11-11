
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";





export async function POST(req, res) {
  try {
    const { name, email, password, department, enrollmentNumber ,role} = await req.json();
    await database();
    if (!name || !email || !password || !department ) {
      return NextResponse.json({
        message: "Please Fill All Fields",
        error: 401,
        success: false,
      });
    }
// console.log(role)
    const isUserExist = await studentModel.findOne({ email }) || await teacherModel.findOne({ email });
    if (isUserExist) {
      return NextResponse.json({
        message: "User Already Exist",
        success: false,
      });
    }
    const checkEnrollmentNumberExist = await studentModel.findOne({ enrollmentNumber })
    if (checkEnrollmentNumberExist) {
      return NextResponse.json({
        message: "Enrollment Number Already Exist",
        success: false,
      });
    }

    const hashpassword = await bcrypt.hash(password, 12);
    if(role === 'student' && enrollmentNumber){

      await studentModel.create({
        name,
        email,
        password: hashpassword,
        department,
        enrollmentNumber,
        role
      });
    }else{
        await teacherModel.create({
        name,
        email,
        password: hashpassword,
        department,
        role
      });
    }



    return NextResponse.json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Server Error",
      success: false,
    });
  }
}
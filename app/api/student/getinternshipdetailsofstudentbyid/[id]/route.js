import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { NextResponse } from "next/server";

// GET /api/student/:id/internships
export async function GET(req, { params }) {
  await database();
  const { id } = params;

  const internships = await internshipModel.find({ student: id }).sort({createdAt:-1});
  if(!internships){
    return NextResponse.json({message:'You Have No Internship Data Yet.',success:false})
  }
  return NextResponse.json({ success: true, internships });
}

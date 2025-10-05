import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { nocModel } from "@/models/nocRequest";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
try {
      await database();
  const { id } = params;
const {searchParams} = new URL(req.url)
const limit  = parseInt(searchParams.get("limit") || 10)
const page = parseInt(searchParams.get("page") || 1)
const totalNocRequestsCount = await nocModel.countDocuments({student:id})
  const nocRequests = await nocModel.find({ student: id }).sort({createdAt:-1}).skip((page-1)*limit).limit(limit);
  if(!nocRequests){
    return NextResponse.json({message:'You Have No NOC Applied Yet.',success:false})
  }
  return NextResponse.json({ success: true, nocRequests ,totalRequests:totalNocRequestsCount});
} catch (error) {
    console.log(error.message)
    return NextResponse.json({
        message:`Server Error : ${error.message}`,
        status:500,
        success:false
    })
}
}

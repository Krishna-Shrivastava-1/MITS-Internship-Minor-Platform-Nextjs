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
const status = searchParams.get("status") || ''
const query  ={student:id}
if (status) {
  if (status === 'Approve') {
    query.teacherAction = 'Approve';
    query.tAndPAction = 'Approve';
  } else if (status === 'Reject') {
    query.$or = [
      { teacherAction: 'Reject' },
      { tAndPAction: 'Reject' },
    ];
  } else if (status === 'Allow Edit') {
    query.teacherAction = 'Allow Edit';
  } else if (status === 'Pending') {
    query.$or = [
      { teacherAction: 'Pending' },
      { tAndPAction: 'Pending' },
    ];
  }
}
const totalNocRequestsCount = await nocModel.countDocuments(query)
  const nocRequests = await nocModel.find(query).sort({updatedAt:-1}).skip((page-1)*limit).limit(limit);
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

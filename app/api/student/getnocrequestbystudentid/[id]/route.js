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
const query = { student: id };

if (status && status !== 'all') {
  if (status === 'Approve') {
    // STRICT: Both must be approved
    query.teacherAction = 'Approve';
    query.tAndPAction = 'Approve';
  } 
  else if (status === 'Reject') {
    query.teacherAction = 'Reject';
    query.tAndPAction = 'Reject';
  } 
  else if (status === 'Allow Edit') {
    // Teacher allows edit
    query.teacherAction = 'Allow Edit';
  } 
else if (status === 'Pending') {
  query.$and = [
    { student: id },
    {
      teacherAction: { $in: ['Pending', 'Allow Edit','Approve'] },
    },
    {
      tAndPAction: 'Pending',
    },
  ];
  delete query.student;
}


}

const totalNocRequestsCount = await nocModel.countDocuments(query)
  const nocRequests = await nocModel.find(query).sort({updatedAt:-1}).skip((page-1)*limit).limit(limit);
  if(!nocRequests){
    return NextResponse.json({message:'You Have No NOC Applied Yet.',success:false})
  }
  // console.log(nocRequests)
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

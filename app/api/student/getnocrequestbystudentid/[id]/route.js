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
    // Either one rejected
    query.$or = [
      { teacherAction: 'Reject' },
      { tAndPAction: 'Reject' },
    ];
  } 
  else if (status === 'Allow Edit') {
    // Teacher allows edit
    query.teacherAction = 'Allow Edit';
  } 
  else if (status === 'Pending') {
    // ❗ We use $or, not mixed with other keys
    // So student must also match separately
    query.$and = [
      { student: id },
      {
        $or: [
          { teacherAction: 'Pending' },
          { tAndPAction: 'Pending' },
        ],
      },
    ];
    // Important: remove 'student' from root level when using $and
    delete query.student;
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

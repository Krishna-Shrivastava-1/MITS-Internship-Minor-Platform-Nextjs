import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { nocModel } from "@/models/nocRequest";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
try {
      await database();
  const { id } = params;

  const nocRequestData = await nocModel.findById(id)
  if(!nocRequestData){
    return NextResponse.json({message:'You Have No NOC Applied Yet.',success:false})
  }
  return NextResponse.json({ success: true, nocRequestData });
} catch (error) {
    console.log(error.message)
    return NextResponse.json({
        message:`Server Error : ${error.message}`,
        status:500,
        success:false
    })
}
}

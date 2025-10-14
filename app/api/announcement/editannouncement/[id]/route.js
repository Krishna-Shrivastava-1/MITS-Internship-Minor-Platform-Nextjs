import { NextResponse } from "next/server";

import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";
import { announcementModel } from "@/models/announcement";


export async function PUT(req, { params }) {
    try {
        const { id } = await params
      const { content, description, embeddedLink, expiresAt, active } = await req.json();
        await database()
   const updateAnnouncement = await announcementModel.findByIdAndUpdate(id,{
    content,
    description,
    embeddedLink,
    expiresAt,
    active
   },{new:true})
   if(!updateAnnouncement){
    return NextResponse.json({
        message:'Error in Updation',
        success:false
    })
   }
        return NextResponse.json({
            message: 'Updated Successfully',
            success: true,
            status: 201,
           updateAnnouncement
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
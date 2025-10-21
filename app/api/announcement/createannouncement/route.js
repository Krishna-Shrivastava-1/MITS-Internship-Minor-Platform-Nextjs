
import { NextResponse } from "next/server";
import database from "@/Database/db";
import { announcementModel } from "@/models/announcement";


export async function POST(req, res) {
    try {
        const { content, description, embeddedLink, expiresAt, active ,opportunityType} = await req.json();
        await database();
if(!content || !expiresAt || !opportunityType){
    return NextResponse.json({
        message:'Fill All Fields Properly',
        success:false,
        status:401
    })
}
        const createAnnouncement = await announcementModel.create({
            content,
            description,
            embeddedLink,
            expiresAt,
            active,
            opportunityType
        })
        if (!createAnnouncement) {
            return NextResponse.json({
                message: 'Announcement not created',
                success: false
            })
        }
        return NextResponse.json({
            message: "Announcement Created Successfully",
            success: true,
            createAnnouncement
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
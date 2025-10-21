
import { NextResponse } from "next/server";
import database from "@/Database/db";
import { announcementModel } from "@/models/announcement";


export async function GET(req, res) {
    try {
        const now = new Date()
        await database();

         await announcementModel.deleteMany({expiresAt:{$lte:now}})
     const getAnnouncement = await announcementModel.find().sort({created:-1})
        if (!getAnnouncement || getAnnouncement.length === 0) {
            return NextResponse.json({
                message: 'No Announcement found',
                success: false
            })
        }
        return NextResponse.json({
            message: "Announcement Fetched Successfully",
            success: true,
            getAnnouncement
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
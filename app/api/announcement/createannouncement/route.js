
import { NextResponse } from "next/server";
import database from "@/Database/db";
import { announcementModel } from "@/models/announcement";


export async function POST(req, res) {
    try {
        const { content, description, embeddedLink, expiresAt, active } = await req.json();
        await database();

        const createAnnouncement = await announcementModel.create({
            content,
            description,
            embeddedLink,
            expiresAt,
            active
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
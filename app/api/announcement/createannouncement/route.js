export const runtime = "nodejs";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import database from "@/Database/db";
import { announcementModel } from "@/models/announcement";

export async function POST(req) {
  try {
    const { content, description, embeddedLink, expiresAt, active, opportunityType } =
      await req.json();

    await database();
const count = await mongoose.connection.db.collection("announcements").countDocuments();
// console.log("Document count in collection:", count);

//     console.log("Connected DB:", mongoose.connection.db.databaseName);
//     console.log("Host:", mongoose.connection.host);
//     console.log("ReadyState:", mongoose.connection.readyState);
//     console.log("Collection used:", announcementModel.collection.name);

    if (!content || !expiresAt || !opportunityType) {
      return NextResponse.json({
        message: "Fill All Fields Properly",
        success: false,
        status: 401,
      });
    }

    const createAnnouncement = await announcementModel.create({
      content,
      description,
      embeddedLink,
      expiresAt,
      active,
      opportunityType,
    });

    await createAnnouncement.save();

    const directCheck = await mongoose.connection.db
      .collection("announcements")
      .findOne({ _id: createAnnouncement._id });
    // console.log("DirectCheck:", directCheck);

    // console.log("Created Announcement _id:", createAnnouncement._id);

    return NextResponse.json({
      message: "Announcement Created Successfully",
      success: true,
      createAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
}

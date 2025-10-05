import { NextResponse } from "next/server";

import database from "@/Database/db";
import { internshipModel } from "@/models/internship";


export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url)
        const dept = searchParams.get('dept')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const sessionYear = parseInt(searchParams.get("sessionyear") || "");
        const sessionHalf = searchParams.get("sessionhalf") || "";
        const year = parseInt(searchParams.get("year") || '');
        const semester = parseInt(searchParams.get("semester") || '');
        await database()

        if (!dept) {
            return NextResponse.json(
                { message: "Department parameter is missing", success: false },
                { status: 400 }
            );
        }
        const query = { department: dept }
        if (!isNaN(semester)) {
            query.semester = semester
        }
        if (!isNaN(year)) {
            query.year = year
        }
        if (!isNaN(sessionHalf)) {
            query.sessionHalf = sessionHalf
        }
        if (!isNaN(sessionYear)) {
            query.sessionYear = sessionYear
        }
        const totalInternshipData = await internshipModel.countDocuments(query)
        const internshipDetails = await internshipModel.find(query).sort({ createdAt: -1 }).populate("student").skip((page - 1) * limit).limit(limit)

        return NextResponse.json({
            message: 'Internship Found',
            success: true,
            status: 201,
            internshipData: internshipDetails,
            totalInternshipDocs: totalInternshipData,
            limit: limit,
            page
        })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
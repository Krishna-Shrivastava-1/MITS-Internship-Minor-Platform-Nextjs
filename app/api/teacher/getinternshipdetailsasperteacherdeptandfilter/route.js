import { NextResponse } from "next/server";

import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { studentModel } from "@/models/student";
import { redis } from "@/lib/redis";


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
        const exportType = searchParams.get("export") || "";
        // console.log(exportType)
        if (!dept) {
            return NextResponse.json(
                { message: "Department parameter is missing", success: false },
                { status: 400 }
            );
        }
        const cacheKey = `teacher:internships:${dept}:${year || "all"}:${semester || "all"}:${sessionYear || "all"}:${sessionHalf || "all"}:page${page}:limit${limit}`;
        // console.log(cacheKey)
        // getting from redis cache
        if (exportType === "excel") {
            // Always fetch fresh, skip cache
            console.log("Fetching fresh for Excel export");
        } else {
            // Try cache
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log("✅ Served from Redis cache");
                return NextResponse.json({
                    message: "Internship Found (Cache)",
                    success: true,
                    status: 200,
                    internshipData: cached.data,
                    totalInternshipDocs: cached.total,
                    limit,
                    page,
                    fromCache: true,
                });
            }
        }
        await database()
        // console.log(dept)
        const query = { department: dept }
        if (!isNaN(semester)) {
            query.semester = semester
        }
        if (!isNaN(year)) {
            query.yearOfStudy = year
        }
        if (sessionHalf) {
            query.sessionHalf = sessionHalf
        }
        if (!isNaN(sessionYear)) {
            query.sessionYear = sessionYear
        }
        let internshipDetails;
        if (exportType === "excel") {
            // No pagination, fetch all
            internshipDetails = await internshipModel
                .find(query)
                .sort({ createdAt: -1 })
                .populate({
                    path: "student",
                    select:
                        "-password -email -department -internshipDetails -nocRequests -googleId -createdAt -updatedAt -role",
                });
        } else {
            internshipDetails = await internshipModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate({
                    path: "student",
                    select:
                        "-password -email -department -internshipDetails -nocRequests -googleId -createdAt -updatedAt -role",
                });
        }
        //  internshipDetails = await internshipModel.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate({path:'student',select:'-password -email -department -internshipDetails -nocRequests -googleId -createdAt -updatedAt -role'})

        const totalInternshipData = await internshipModel.countDocuments(query)
        if (exportType !== "excel") {
            console.log('Setting in Redis')
            await redis.set(
                cacheKey,
                {
                    data: internshipDetails,
                    total: totalInternshipData,
                },
                {
                    ex: 900, // cache for 15 minutes
                }
            );
        }

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
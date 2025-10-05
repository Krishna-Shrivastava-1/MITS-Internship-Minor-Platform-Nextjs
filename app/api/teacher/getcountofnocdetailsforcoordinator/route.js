import { NextResponse } from "next/server";

import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { studentModel } from "@/models/student";
import { nocModel } from "@/models/nocRequest";


export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url)
        const dept = searchParams.get('dept') || ''

        await database()

        if (!dept) {
            return NextResponse.json(
                { message: "Department parameter is missing", success: false },
                { status: 400 }
            );
        }
        console.log(dept)

        const totalNocDetailCountPending = await nocModel.countDocuments({ department: dept, teacherAction: 'Pending' })
        const totalNocDetailCountApprove = await nocModel.countDocuments({ department: dept, teacherAction: 'Approve' })
        const totalNocDetailCountReject = await nocModel.countDocuments({ department: dept, teacherAction: 'Reject' })
        const totalNocDetailCountAllowEdit = await nocModel.countDocuments({ department: dept, teacherAction: 'Allow Edit' })


        return NextResponse.json({
            message: 'NOC Counts Found',
            success: true,
            status: 201,
            totalNocDetailCountPending,
            totalNocDetailCountApprove,
            totalNocDetailCountReject,
            totalNocDetailCountAllowEdit
        })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
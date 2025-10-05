import { NextResponse } from "next/server";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";


export async function GET(req, { params }) {
    try {
        const { id } = await params
        await database()
        const getStudentById = await studentModel.findById(id)

        if (!getStudentById) {
            return NextResponse.json({
                message: 'Student not Found',
                status: 401,
                success: false,
            })
        }
        return NextResponse.json({
            message: 'Student found',
            success: true,
            status: 201,
            user:getStudentById
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
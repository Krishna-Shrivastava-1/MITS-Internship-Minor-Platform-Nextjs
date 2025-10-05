import { NextResponse } from "next/server";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";


export async function GET(req, { params }) {
    try {
        const { id } = await params
        await database()
        const getUserById = await studentModel.findById(id).select('-password') || await teacherModel.findById(id).select('-password')

        if (!getUserById) {
            return NextResponse.json({
                message: 'User not Found',
                status: 401,
                success: false,
            })
        }
        return NextResponse.json({
            message: 'User found',
            success: true,
            status: 201,
            user:getUserById
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
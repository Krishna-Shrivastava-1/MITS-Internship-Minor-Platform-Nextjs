import database from "@/Database/db"
import { teacherModel } from "@/models/teacher"
import { NextResponse } from "next/server"

export async function GET(req,res) {
    try {
        await database()
        const allTeacher = await teacherModel.find({role:"teacher"}).select('-password')
        if(!allTeacher){
            return NextResponse.json({
                message:'No Teacher Found',
                status:401
            })
        }
        return NextResponse.json({
            message:'Teachers Found',
            teacher:allTeacher,
            success:true,
            status:201
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message:`Server error - ${error.message}`,
            status:500,
              success:false
        })
    }
}
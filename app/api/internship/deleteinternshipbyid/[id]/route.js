import database from "@/Database/db"
import { internshipModel } from "@/models/internship"
import { studentModel } from "@/models/student"
import { AuthWeakPasswordError } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function DELETE(req,{params}) {
    try {
        await database()
        const {studentId} = await req.json()
        console.log(studentId)
        const {id} = params
        const deleteInternship = await internshipModel.findByIdAndDelete(id)
        const removeIdFromStudent  =await studentModel.findByIdAndUpdate(studentId,{$pull:{internshipDetails:id}},{new:true})
return NextResponse.json({
    message:'deleted Successfully',
    success:true
})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message:'Server error',
            success:false
        })
    }
}
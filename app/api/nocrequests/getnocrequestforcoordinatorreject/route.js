import database from "@/Database/db"
import { nocModel } from "@/models/nocRequest"
import { NextResponse } from "next/server"

export async function GET(req,res) {
    try {
        await database()
       const {searchParams} = new URL(req.url)
       const assignedDepartment = searchParams.get("assignedDepartment")
       const page = parseInt(searchParams.get("page") || 1)
       const limit = parseInt(searchParams.get('limit') || 10)
        // console.log(assignedDepartment)
        if(!assignedDepartment){
            return NextResponse.json({
                messgae:'Not Assigned in Any Department',
                success:false
            })
        }
        const countOfNocRequests = await nocModel.countDocuments({department:assignedDepartment,$or:[{teacherAction:'Reject'},{tAndPAction:"Reject"}]})
        const getNocRequestArePending = await nocModel.find({department:assignedDepartment,$or:[{teacherAction:'Reject'},{tAndPAction:"Reject"}]}).sort({createdAt:-1}).populate({path:'student',select:'-password -email -enrollmentNumber   -internshipDetails -nocRequests -role'}).skip((page - 1) * limit).limit(limit)
        if(!getNocRequestArePending){
            return NextResponse.json({
                message:'No NOC Request are here',
                success:false
            })
        }
        return  NextResponse.json({
                message:'NOC Request are found',
                success:true,
                getNocRequestArePending,
                countOfNocRequests
            })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message:`Server error:- ${error.message}`,
            status:500,
            success:false
        })
    }
}
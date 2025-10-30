import database from "@/Database/db"
import { nocModel } from "@/models/nocRequest"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
    try {
        await database()
        const { id } = await params
        const { decisionOfNoc, comment } = await req.json()
        let findNocRequestandUpdate
        if (decisionOfNoc === 'Reject') {
            findNocRequestandUpdate = await nocModel.findByIdAndUpdate(id, {
                comment,
                teacherAction: decisionOfNoc,
                tAndPAction: 'Reject'
            }, { new: true })
        } else {

            findNocRequestandUpdate = await nocModel.findByIdAndUpdate(id, {
                comment,
                teacherAction: decisionOfNoc,
            }, { new: true })
        }
        if (!findNocRequestandUpdate) {
            return NextResponse.json({
                message: 'No NOC Request Exist to Update',
                success: false,

            })
        }
        revalidatePath('/home/applied-noc');
        return NextResponse.json({
            message: 'NOC Request Updated',
            success: true,
            findNocRequestandUpdate
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message: `Server error:- ${error.message}`,
            status: 500,
            success: false
        })
    }
}
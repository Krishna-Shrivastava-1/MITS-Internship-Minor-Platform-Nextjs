import database from "@/Database/db"
import { nocModel } from "@/models/nocRequest"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
    try {
        await database()
        const { id } = await params
        const { decisionOfNoc } = await req.json()
        const findNocRequestandUpdate = await nocModel.findByIdAndUpdate(id, {
           
            tAndPAction: decisionOfNoc
        }, { new: true })
        if (!findNocRequestandUpdate) {
            return NextResponse.json({
                message: 'No NOC Request Exist to Update',
                success: false,

            })
        }
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
import { NextResponse } from "next/server";

import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";


export async function PUT(req, { params }) {
    try {
        const { id } = await params
        const {department, assignednocdepartment,name} = await req.json()
        await database()
    let checkDeptOfNocIsEmpty = null;

if (assignednocdepartment) {
  checkDeptOfNocIsEmpty = await teacherModel.findOne({
    assignedDepartmentForNocRequest: assignednocdepartment,
  });
}

if (checkDeptOfNocIsEmpty && checkDeptOfNocIsEmpty._id.toString() !== id) {
  return NextResponse.json({
    message: "Already Professor Assigned for this NOC Department.",
    success: false,
  });
}

        const getTeacherAndUpdate=  await teacherModel.findByIdAndUpdate(id,{
            department:department,
            assignedDepartmentForNocRequest:assignednocdepartment,
            name:name
        },{new:true})

        if (!getTeacherAndUpdate) {
            return NextResponse.json({
                message: 'Teacher not Found',
                status: 401,
                success: false,
            })
        }
        return NextResponse.json({
            message: 'Updated Successfully',
            success: true,
            status: 201,
            updatedTeacher:getTeacherAndUpdate
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
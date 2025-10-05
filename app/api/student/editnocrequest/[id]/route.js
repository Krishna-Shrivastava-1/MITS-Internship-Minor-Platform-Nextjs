import { NextResponse } from "next/server";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { nocModel } from "@/models/nocRequest";
// import nodemailer from 'nodemailer'
// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     auth: {
//         user: '834513002@smtp-brevo.com',
//         pass: 'GaJd5XcMxCkpn3WR',
//     }
// })
export async function PUT(req, { params }) {
    try {
        const { id } =  params
        const { companyName, yearOfStudy, semester, sessionHalf, sessionYear, duration, location, startDate, endDate, stipend, offerLetter, completionCertificate, workType, role, jobDescription, department, recieverDesignation, recieverName, enrollmentNumber,teacherAction } = await req.json()
        await database()
        // const checkStudentExist = await studentModel.findById(id)

        // if (!checkStudentExist) {
        //     return NextResponse.json({
        //         message: 'Student not Found',
        //         status: 401,
        //         success: false,
        //     })
        // }
        // console.log(id)
        // console.log(teacherAction)
      if (!teacherAction || teacherAction.trim().toLowerCase() !== "allow edit") {
      return NextResponse.json({
        message: "Invalid Request — You Have No Permission to Update",
        success: false,
      });
    }
        const updateNocRequest = await nocModel.findByIdAndUpdate(id,{ companyName, yearOfStudy, semester, sessionHalf, sessionYear, duration, location, startDate, endDate, stipend, offerLetter, completionCertificate, workType, role, department, jobDescription, recieverDesignation, recieverName, enrollmentNumber,teacherAction:'Pending' },{new:true})
      
        if(!updateNocRequest){
            return NextResponse.json({
                message:'Unable to Update',
                success:false
            })
        }
        


        return NextResponse.json({
            message: 'NOC Request Updated Successfully',
            success: true,
            status: 201,
            nocRequest: updateNocRequest
        })



    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
import { NextResponse } from "next/server";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { nocModel } from "@/models/nocRequest";
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: '834513002@smtp-brevo.com',
        pass: 'GaJd5XcMxCkpn3WR',
    }
})
export async function POST(req, { params }) {
    try {
        const { id } = await params
        const { companyName, yearOfStudy, semester, sessionHalf, sessionYear, duration, location, startDate, endDate, stipend, offerLetter, completionCertificate, workType, role, jobDescription, department, recieverDesignation, recieverName, enrollmentNumber } = await req.json()
        // console.log(offerLetter)
        await database()
        const checkStudentExist = await studentModel.findById(id)

        if (!checkStudentExist) {
            return NextResponse.json({
                message: 'Student not Found',
                status: 401,
                success: false,
            })
        }
        const createNocRequest = await nocModel.create({ companyName, yearOfStudy, semester, sessionHalf, sessionYear, duration, location, startDate, endDate, stipend, offerLetter, completionCertificate, workType, role, department, jobDescription, student: id, recieverDesignation, recieverName, enrollmentNumber })
        if (createNocRequest) {
            await studentModel.findByIdAndUpdate(id, {
                $addToSet: { nocRequests: createNocRequest?._id }
            }, { new: true })

        }
        const findAssignedNocDepartmentTeacher = await teacherModel.findOne({ assignedDepartmentForNocRequest: department })
        if (!findAssignedNocDepartmentTeacher) {
            return NextResponse.json({
                message: 'NOC Request Added Successfully',
                success: true,
                status: 201,
                nocRequest: createNocRequest
            })
        }
        const mailOptions = {
            from: process.env.SendingEmail,
            to: findAssignedNocDepartmentTeacher?.email,
            subject: "Notification Regarding You have a New NOC Request in Portal",
             html: `
      <p>Dear Prof. ${findAssignedNocDepartmentTeacher?.name},</p>

<p>You have received a new <strong>NOC Request</strong> on the Internship Portal.</p>

<p>Please click the button below to log in and review the request:</p>

<p style="text-align: center; margin: 20px 0;">
  <a href="${process.env.PORTAL_URL}" 
     style="background-color: #2563eb; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold; 
            display: inline-block;">
    Go to Portal
  </a>
</p>

<p>Best regards,<br/>Internship Management System</p>

      `,
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error in Sending email ', error)
                return res.status(500).json({
                    message: 'Account created, but failed to send welcome email.',
                    success: true,
                });
            }
            console.log('Email sent:', info.response);
            return res.status(201).json({
                message: 'Account created successfully and welcome email sent.',
                success: true,
            });
        })


        return NextResponse.json({
            message: 'NOC Request Added Successfully',
            success: true,
            status: 201,
            nocRequest: createNocRequest
        })



    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
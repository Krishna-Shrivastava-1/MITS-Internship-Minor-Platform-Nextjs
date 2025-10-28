import { NextResponse } from "next/server";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";
import { internshipModel } from "@/models/internship";
import { revalidatePath } from "next/cache";


export async function POST(req, { params }) {
    try {
        const { id } = await params
        const { companyName,yearOfStudy,semester,sessionHalf,sessionYear,duration,location,startDate,endDate,stipend,offerLetter,completionCertificate,workType,role,jobDescription ,department} = await req.json()
        await database()
        const createInternshipDataByStudent = await studentModel.findById(id)

        if (!createInternshipDataByStudent) {
            return NextResponse.json({
                message: 'Student not Found',
                status: 401,
                success: false,
            })
        }
        const createInternshipDetail = await internshipModel.create({ companyName,yearOfStudy,semester,sessionHalf,sessionYear,duration,location,startDate,endDate,stipend,offerLetter,completionCertificate,workType,role,department,jobDescription,student:id })
        if(createInternshipDetail){
             await studentModel.findByIdAndUpdate(id,{
                $addToSet:{internshipDetails:createInternshipDetail?._id}
            },{new :true})
             revalidatePath('/home');
        }

        return NextResponse.json({
            message: 'Internship Added Successfully',
            success: true,
            status: 201,
            user: createInternshipDetail
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        });
    }
}
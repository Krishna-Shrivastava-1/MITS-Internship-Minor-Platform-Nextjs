import database from "@/Database/db"
import { internshipModel } from "@/models/internship"
import { NextResponse } from "next/server"

export async function GET(req,res) {
    try {
        await database()
          const { searchParams } = new URL(req.url)
        const dept = searchParams.get('dept')

        const workTypes = ["Remote", "Onsite", "Hybrid"]
      const currentYear = new Date().getFullYear();
const startYear = 2023;

// Calculate dynamic start to ensure max length = 10
const effectiveStartYear = Math.max(startYear, currentYear - 9);

const years = Array.from(
  { length: currentYear - effectiveStartYear + 1 },
  (_, i) => effectiveStartYear + i
);

const studentCountAsPerYears = await Promise.all(years?.map(async(e)=>{
  const count = await internshipModel.countDocuments({department:dept,sessionYear:e})
  return {[e]:count}
}))

const internshipWorkTypeCountByYear = await Promise.all(
  years.map(async (year) => {
    const workTypeCounts = await Promise.all(
      workTypes.map(async (wt) => {
        const count = await internshipModel.countDocuments({department:dept, sessionYear: year, workType: wt })
        return { workType: wt, count }
      })
    )
    return { year, workTypeCounts }
  })
)
// console.log(studentCountAsPerYears)
return NextResponse.json({
    message:'Aalysis',
    success:true,
   countOfStudentByYear : studentCountAsPerYears,
   worktypeCountByyear:internshipWorkTypeCountByYear
})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message:'Server error',
            success:false
        })
    }
}
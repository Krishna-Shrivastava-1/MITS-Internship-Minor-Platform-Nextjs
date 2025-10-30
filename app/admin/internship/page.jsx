export const dynamic = "force-dynamic";
import { getCurrentUser } from '@/app/lib/getCurrentUser'
import InternshipAnalysisChartforTeacherbyDepartment from '@/components/InternshipAnalysisChartforTeacherbyDepartment'
import InternshipDataTableforTeacherpage from '@/components/InternshipDataTableforTeacherpage'
import React from 'react'

const page = async() => {
    const user=await getCurrentUser()
         const userResp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/getuserbyid/${user.id}`,
      { cache: "no-store" }
    )
    const userData = await userResp.json()
        // console.log(userData)
        const  resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/internship/chartanalysisofinternshipdata?dept=${userData?.user?.department}`,
       
      )
  
    
      const data = await resp.json()
      // console.log(data)
  return (
    <div>
         <InternshipAnalysisChartforTeacherbyDepartment countofInternshipAsPerYear={data?.countOfStudentByYear} countOfWorkTypeByYear={data?.worktypeCountByyear}/>
     <InternshipDataTableforTeacherpage userDat={userData}/>
    </div>
  )
}

export default page

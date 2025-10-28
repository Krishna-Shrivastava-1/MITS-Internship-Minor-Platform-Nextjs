// 'use client'
export const dynamic = "force-dynamic";

// import { DataProviderContextAPI } from '@/components/ContextApi'

import StudentPageInternshipDetails from '@/components/StudentPageInternshipDetails'
// import { Button } from '@/components/ui/button'

// import { useParams } from 'next/navigation'
import React from 'react'
import { getCurrentUser } from '../lib/getCurrentUser'

const page = async() => {
    // const {fetchUserByIdState,userIdFromToken} = DataProviderContextAPI()
    const userData=await getCurrentUser()
    // console.log(userData)
     const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/student/getinternshipdetailsofstudentbyid/${userData?.id}`,
    {
      cache: "force-cache", // or "no-store" if dynamic
      next: { revalidate: 60 }, // optional incremental static regeneration
    }
  )

  const data = await response.json()

  const internships = data?.success ? data.internships : []
// console.log(internships)
  return (
    <div>
      
      <StudentPageInternshipDetails internships={internships} />

    </div>
  )
}

export default page

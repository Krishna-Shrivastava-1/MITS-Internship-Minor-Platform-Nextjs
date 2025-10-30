export const dynamic = "force-dynamic";

import NocDetailCountCards from '@/components/NocDetailCountCards'
import React from 'react'
import { getCurrentUser } from '../lib/getCurrentUser'

const page = async() => {
     const user=await getCurrentUser()
       const userResp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/getuserbyid/${user.id}`,
    { cache: "no-store" }
  )
  const userData = await userResp.json()
      // console.log(userData)
      const  resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/teacher/getcountofnocdetailsforcoordinator?dept=${userData?.user?.assignedDepartmentForNocRequest}`,
     
    )

  
    const data = await resp.json()
  // console.log(data)
  // console.log(userData)
    // const internships = data?.success ? data.internships : []
  return (
    <div className='  pb-8'>

      <NocDetailCountCards nocResponseCount={data} userDat={userData?.user}/>
   
    </div>
  )
}

export default page

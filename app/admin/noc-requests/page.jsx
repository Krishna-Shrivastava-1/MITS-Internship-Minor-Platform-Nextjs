// 'use client'
export const dynamic = "force-dynamic";
import { getCurrentUser } from '@/app/lib/getCurrentUser'
// import { DataProviderContextAPI } from '@/components/ContextApi'
import NocRequestTablePendingForCoordinator from '@/components/NocRequestTablePendingForCoordinator'
import PaginationControls from '@/components/PaginationControls';
import axios from 'axios'
import React from 'react'

export default async function page({searchParams}){
  // const {fetchUserByIdState} = DataProviderContextAPI()
  // console.log(fetchUserByIdState)
       const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
 const user = await getCurrentUser()
 

  // Fetch full user details (if token only stores id)
  const userResp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/getuserbyid/${user.id}`,
    { cache: "no-store" }
  )
  const userData = await userResp.json()

  const coordinatorDepartment = userData?.user?.assignedDepartmentForNocRequest
  // console.log(coordinatorDepartment)
    const deptNOCRequests = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nocrequests/getnocrequestforcoordinatorpending?assignedDepartment=${coordinatorDepartment}&page=${page}&limit=${limit}`,
    { next:60 }
  )
  const nocData = await deptNOCRequests.json()
  // console.log(nocData)
  const nocDataForAssignedDepart = nocData?.getNocRequestArePending ||[]
  return (
    <div>
     
<div className=' w-full'>
     <h1 className='m-3 font-semibold text-lg'> All NOC Requests</h1>
  <NocRequestTablePendingForCoordinator coordinatorDepartment={nocDataForAssignedDepart} />
   <PaginationControls
          currentPage={page}
          totalPages={Math.ceil(nocData?.countOfNocRequests/limit) || 1}
          currentLimit={limit}
        />
</div>
    </div>
  )
}

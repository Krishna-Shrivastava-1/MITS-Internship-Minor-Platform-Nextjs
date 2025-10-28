// 'use client'
export const dynamic = "force-dynamic";
// import { DataProviderContextAPI } from '@/components/ContextApi'
import { getCurrentUser } from '@/app/lib/getCurrentUser'
import PaginationControls from '@/components/PaginationControls'
import StudentNocRequestTable from '@/components/StudentNocRequestTable'
import React from 'react'

export default async function page({ searchParams }) {
 let sp = searchParams;
  if (sp && typeof sp.then === "function") {
    try {
      sp = await sp;
    } catch (err) {
      console.error("Error awaiting searchParams:", err);
      sp = {};
    }
  }

  // console.log(searchParams)
    const userData=await getCurrentUser()
    // const {userIdFromToken} = DataProviderContextAPI()
     const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
//  console.log('searchParams:', searchParams);
  const statusparam = searchParams?.status || '';

  // console.log('Server statusparam:', statusparam);
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/student/getnocrequestbystudentid/${userData?.id}?limit=${limit}&page=${page}&status=${sp?.status}`,
   {
    next: { revalidate: 60 }, // per-user cache key (safe)
  }
  
  );
 
  const data = await resp.json();
  // console.log(data)
  return (
    <div>
      
 <h1 className="text-2xl font-bold mb-6 mx-5">Applied NOC</h1>
          <StudentNocRequestTable studentNocData={data?.nocRequests} />
  <PaginationControls
        currentPage={page}
        totalPages={Math.ceil(data?.totalRequests/limit) || 1}
        currentLimit={limit}
      />
    </div>
  )
}



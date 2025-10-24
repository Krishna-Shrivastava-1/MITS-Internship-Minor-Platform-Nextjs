'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import NocRequestTablePendingForCoordinator from '@/components/NocRequestTablePendingForCoordinator'
import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {
  const {fetchUserByIdState} = DataProviderContextAPI()
  // console.log(fetchUserByIdState)

  
  return (
    <div>
     
<div className=' w-full'>
     <h1 className='m-3 font-semibold text-lg'> All NOC Requests</h1>
  <NocRequestTablePendingForCoordinator coordinatorDepartment={fetchUserByIdState?.assignedDepartmentForNocRequest} />
</div>
    </div>
  )
}

export default page

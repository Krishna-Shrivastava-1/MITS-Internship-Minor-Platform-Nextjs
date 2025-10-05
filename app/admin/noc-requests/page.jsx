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
      All NOC Requests
<div className=' w-full'>
  <NocRequestTablePendingForCoordinator coordinatorDepartment={fetchUserByIdState?.assignedDepartmentForNocRequest} />
</div>
    </div>
  )
}

export default page

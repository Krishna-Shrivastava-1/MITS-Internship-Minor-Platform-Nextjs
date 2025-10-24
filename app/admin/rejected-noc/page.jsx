'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import ShowStatusOfNocRequestToCoordinatorOfAllType from '@/components/ShowStatusOfNocRequestToCoordinatorOfAllType'
import React from 'react'

const page = () => {
  const {fetchUserByIdState} = DataProviderContextAPI()
  return (
    <div>
        <h1 className='m-3 font-semibold text-lg'> Rejected NOC Reuqests</h1>
     
      <ShowStatusOfNocRequestToCoordinatorOfAllType nameOfApi={'reject'} coordinatorDepartment={fetchUserByIdState?.assignedDepartmentForNocRequest} />
    </div>
  )
}

export default page

'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import ShowStatusOfNocRequestToCoordinatorOfAllType from '@/components/ShowStatusOfNocRequestToCoordinatorOfAllType'
import React from 'react'

const page = () => {
  const {fetchUserByIdState} = DataProviderContextAPI()
  return (
    <div>
      Rejected NOC Reuqests
      <ShowStatusOfNocRequestToCoordinatorOfAllType nameOfApi={'reject'} coordinatorDepartment={fetchUserByIdState?.assignedDepartmentForNocRequest} />
    </div>
  )
}

export default page

'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import ShowStatusOfNocRequestToCoordinatorOfAllType from '@/components/ShowStatusOfNocRequestToCoordinatorOfAllType'
import React from 'react'

const page = () => {
    const {fetchUserByIdState} = DataProviderContextAPI()
  return (
    <div>
      NOC Request You Allowed For Edit
       <ShowStatusOfNocRequestToCoordinatorOfAllType nameOfApi={'allowedit'} coordinatorDepartment={fetchUserByIdState?.assignedDepartmentForNocRequest} />
    </div>
  )
}

export default page

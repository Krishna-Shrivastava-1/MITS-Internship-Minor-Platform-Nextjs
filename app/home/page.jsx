'use client'

import { DataProviderContextAPI } from '@/components/ContextApi'
import StudentPageInternshipDetails from '@/components/StudentPageInternshipDetails'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {fetchUserByIdState,userIdFromToken} = DataProviderContextAPI()
    console.log(fetchUserByIdState)
  return (
    <div>
      Home
      <StudentPageInternshipDetails studentId={userIdFromToken?.id} />

    </div>
  )
}

export default page

'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import StudentNocRequestTable from '@/components/StudentNocRequestTable'
import React from 'react'

const page = () => {
    const {userIdFromToken} = DataProviderContextAPI()
  return (
    <div>
      Applied NOC

          <StudentNocRequestTable studentId={userIdFromToken?.id} />

    </div>
  )
}

export default page

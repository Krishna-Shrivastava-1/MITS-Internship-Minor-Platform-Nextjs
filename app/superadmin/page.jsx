'use client'
import AllTeacherDataForSuperAdmin from '@/components/AllTeacherDataForSuperAdmin'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [allTeacherData, setallTeacherData] = useState([])
  useEffect(() => {
    
  const fetchAllTeacher = async () => {
    try {
      const resp  = await axios.get('/api/superadmin/getallteacher')
setallTeacherData(resp?.data?.teacher)
    } catch (error) {
      console.log(error.message)
    }
  }
  fetchAllTeacher()
  }, [])
  // console.log(allTeacherData)

  return (
    <div>
      <h1>Assign Teacher for NOC Coordinator Department</h1>
<AllTeacherDataForSuperAdmin allTeacherDataProp={allTeacherData || []} />
    </div>
  )
}

export default page

'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataProviderContextAPI } from './ContextApi'
import { BarChartShowWorkTyepByYear } from './BarChartShowWorkTyepByYear'
import { CountOfInternshipAsPerYear } from './CountOfInternshipAsPerYear'


const InternshipAnalysisChartforTeacherbyDepartment = () => {
    const {fetchUserByIdState} = DataProviderContextAPI()
    const [countofInternshipAsPerYear, setcountofInternshipAsPerYear] = useState([])
    const [countOfWorkTypeByYear, setcountOfWorkTypeByYear] = useState([])
    // console.log(fetchUserByIdState?.department)
    const fetchAnalysisData = async () => {
        try {
const resp= await axios.get(`/api/internship/chartanalysisofinternshipdata?dept=${fetchUserByIdState?.department}`)      
if(resp?.data?.success){
    // console.log(resp?.data)
    setcountofInternshipAsPerYear(resp?.data?.countOfStudentByYear)
    setcountOfWorkTypeByYear(resp?.data?.worktypeCountByyear)
}

        } catch (error) {
            console.log(error?.message)
        }
    }
useEffect(() => {
    if(fetchUserByIdState?.department){
        fetchAnalysisData()
    }
}, [fetchUserByIdState?.department])

    // console.log(countofInternshipAsPerYear)
  return (
    <div className='w-full flex items-center justify-center'>
   <div className='w-full flex items-center p-2 xl:flex-nowrap justify-center flex-wrap'>
     {/* <CountOfInternshipAsPerYear countOfIntersnhipData={countofInternshipAsPerYear} /> */}
     <CountOfInternshipAsPerYear countOfIntersnhipData={countofInternshipAsPerYear} />
     <BarChartShowWorkTyepByYear countOfIntersnhipDataWorkType={countOfWorkTypeByYear} />
   </div>
    </div>
  )
}

export default InternshipAnalysisChartforTeacherbyDepartment

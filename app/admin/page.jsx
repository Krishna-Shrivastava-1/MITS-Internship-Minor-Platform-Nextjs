
import InternshipAnalysisChartforTeacherbyDepartment from '@/components/InternshipAnalysisChartforTeacherbyDepartment'
import InternshipDataTableforTeacherpage from '@/components/InternshipDataTableforTeacherpage'
import NocDetailCountCards from '@/components/NocDetailCountCards'
import React from 'react'

const page = () => {
  
  return (
    <div className='bg-[#f0f4f9]'>
      <NocDetailCountCards />
      <InternshipAnalysisChartforTeacherbyDepartment />
     <InternshipDataTableforTeacherpage  />
    </div>
  )
}

export default page

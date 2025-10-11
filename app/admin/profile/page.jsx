'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import React from 'react'

const page = () => {
  const {fetchUserByIdState} = DataProviderContextAPI()
  return (
    <div className='w-full flex items-center justify-center'>
    <div className='w-2xl border p-3 rounded-sm'>
        <h3 className='font-semibold text-lg text-left'>Profile Information</h3>
     <div className=''>
      
     <div className='flex items-center justify-around space-x-12'><h2 className='font-bold text-left'>Name</h2> <h1 className='text-3xl font-semibold text-left'>{fetchUserByIdState?.name}</h1></div>
     <div className='flex items-center justify-around space-x-12'><h2 className='font-bold text-left'>Email</h2> <h1 className='text-md font-semibold text-left'>{fetchUserByIdState?.email}</h1></div>
     <div className='flex items-center justify-around space-x-12'><h2 className='font-bold text-left'>Department</h2> <h1 className='text-md font-semibold text-left'>{fetchUserByIdState?.department}</h1></div>
     <div className='flex items-center justify-around space-x-12'><h2 className='font-bold text-left'>Assigned Coordinator</h2> <h1 className='text-md font-semibold text-left'>{fetchUserByIdState?.assignedDepartmentForNocRequest ? fetchUserByIdState?.assignedDepartmentForNocRequest : 'Not Assigned'}</h1></div>
     <div className='flex items-center justify-around space-x-12'><h2 className='font-bold text-left'>Joined at</h2> <p className='text-md font-semibold text-left'>{new Date(fetchUserByIdState?.createdAt).getDate()}/{new Date(fetchUserByIdState?.createdAt).getMonth()+1}/{new Date(fetchUserByIdState?.createdAt).getFullYear()}</p></div>
    
     </div>
    </div>
    </div>
  )
}

export default page

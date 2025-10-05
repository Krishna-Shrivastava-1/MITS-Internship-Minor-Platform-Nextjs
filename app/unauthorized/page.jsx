import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='backbanForUnauthorized flex items-center  justify-center'>
   <div className='text-center text-white  w-full'>
       <h1 className='text-6xl font-bold'>Lost your way?</h1>
      <p className='text-2xl'>Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
     <Link href={'/login'}>
      <Button className='cursor-pointer select-none bg-white text-black hover:bg-neutral-300 font-semibold'>Login Page</Button>
     </Link>
   </div>
    </div>
  )
}

export default page

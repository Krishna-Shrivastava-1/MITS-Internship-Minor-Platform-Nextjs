'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='sticky top-0 z-40 bg-black/30 backdrop-blur-sm w-full justify-center flex items-center  px-2 p-1'>
        <Link href={'/login'}>
      <Button variant={'secondary'} className='rounded-full cursor-pointer select-none' >Get Started</Button>
        </Link>
    </div>
  )
}

export default Navbar

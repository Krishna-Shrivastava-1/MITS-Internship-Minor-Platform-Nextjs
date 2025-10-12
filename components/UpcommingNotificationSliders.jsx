'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
const UpcommingNotificationSliders = () => {
  return (
    <div>
      <Carousel  plugins={[
              Autoplay({
                delay: 5000,
                loop:true
              }),
            ]}>
  <CarouselContent>
    <CarouselItem><div className='w-full backdrop-blur-sm '>

<div className="w-full py-2.5 font-medium text-sm text-white bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500  rounded-lg">
    <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
        <p>🚚 Free Shipping on Orders Above $50</p>
        <span className="hidden sm:inline">|</span>
        <p>🎁 20% OFF on First Purchase</p>
        <span className="hidden sm:inline">|</span>
        <p>🔐 Use Code: <strong>WELCOME10</strong></p>
    </div>
</div></div></CarouselItem>
    <CarouselItem><div className='w-full backdrop-blur-sm '><div className="flex flex-wrap items-center justify-center w-full py-2 font-medium text-sm text-white text-center bg-gradient-to-b from-orange-500 to-orange-600 rounded-lg">
    <p>Templates are live on prebuiltui!</p>
    <a href="/" className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg text-orange-600 bg-white hover:bg-slate-200 transition active:scale-95 ml-3">
        Check it out
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.91797 7H11.0846" stroke="#F54900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 2.9165L11.0833 6.99984L7 11.0832" stroke="#F54900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </a>
</div></div></CarouselItem>
    <CarouselItem><div className='w-full backdrop-blur-sm '><div className="flex flex-wrap items-center justify-center w-full py-2 font-medium text-sm text-white text-center bg-[#f2027a] rounded-lg">
    <p>Templates are live on prebuiltui!</p>
    <a href="/" className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg text-pink-600 bg-white hover:bg-slate-200 transition active:scale-95 ml-3">
        Check it out
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.91797 7H11.0846" stroke="#F54900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 2.9165L11.0833 6.99984L7 11.0832" stroke="#F54900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </a>
</div></div></CarouselItem>
  </CarouselContent>

</Carousel>
    </div>
  )
}

export default UpcommingNotificationSliders

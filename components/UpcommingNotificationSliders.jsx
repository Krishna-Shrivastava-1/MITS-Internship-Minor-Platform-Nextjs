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
                delay: 2000,
                loop:true
              }),
            ]}>
  <CarouselContent>
    <CarouselItem><div className='w-full backdrop-blur-sm '><p>Link 1</p></div></CarouselItem>
    <CarouselItem><div className='w-full backdrop-blur-sm '>Link2</div></CarouselItem>
    <CarouselItem><div className='w-full backdrop-blur-sm '>Link 3</div></CarouselItem>
  </CarouselContent>

</Carousel>
    </div>
  )
}

export default UpcommingNotificationSliders

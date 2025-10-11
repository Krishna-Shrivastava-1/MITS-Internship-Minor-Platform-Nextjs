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
import Image from 'next/image'
const CarouselSliderLandingPage = () => {
  return (
    <div>
      <Carousel   plugins={[
        Autoplay({
          delay: 2000,
          loop:true
        }),
      ]}>
  <CarouselContent>
    <CarouselItem className='w-full '><Image className='rounded-md' src={'https://web.mitsgwalior.in/images/slider2/againnaacR.webp'} width={400} height={300} alt='banner' /></CarouselItem>
    {/* <CarouselItem><Image src={'https://web.mitsgwalior.in/images/slider2/againnaacR.webp'} width={100} height={100} /></CarouselItem>
    <CarouselItem><Image src={'https://web.mitsgwalior.in/images/slider2/againnaacR.webp'} width={100} height={100} /></CarouselItem> */}

  </CarouselContent>
  {/* <CarouselPrevious />
  <CarouselNext /> */}
</Carousel>
    </div>
  )
}

export default CarouselSliderLandingPage

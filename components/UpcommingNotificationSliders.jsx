'use client'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import axios from 'axios'
import { Button } from './ui/button'
const UpcommingNotificationSliders = () => {
  const [announcementData, setannouncementData] = useState([])
  const fetchAnnouncement = async () => {
    try {
      const resp = await axios.get('/api/announcement/getannouncementforlandingpageandfiltered')
      if (resp?.data?.success) {
        setannouncementData(resp?.data?.getAnnouncement)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchAnnouncement()
  }, [])
let usedHues = new Set();

const randomBgColor = () => {
  let hue;
  do {
    hue = Math.floor(Math.random() * 360);
  } while (usedHues.has(hue) && usedHues.size < 360);

  usedHues.add(hue);
  if (usedHues.size >= 360) usedHues.clear(); // reset when full

  return {
    bg: `hsla(${hue}, 100%, 50%, 0.2)`,
    text: `hsl(${hue}, 100%, 40%)`,
  };
};


  return (
    <div>
      <Carousel plugins={[
        Autoplay({
          delay: 5000,
          loop: true
        }),
      ]}>
        <CarouselContent>
          {
            announcementData?.map((e) => {
                 const { bg, text } = randomBgColor();
              
                return (
                  <CarouselItem key={e?._id}>
                   <div className='w-full backdrop-blur-sm '>
                  <div className="flex flex-wrap items-center justify-center w-full py-2 font-medium text-sm text-center  rounded-lg"
                   style={{ backgroundColor: bg, color: text }}
                  >
                    <h2 className='font-bold text-md mr-2'>{e?.content}</h2>

                    {e?.embeddedLink && <a target='_blank' rel="noopener noreferrer" href={
                      e.embeddedLink.startsWith("http://") || e.embeddedLink.startsWith("https://")
                        ? e.embeddedLink
                        : `https://${e.embeddedLink}`
                    }><Button className='cursor-pointer select-none'>View Here     <svg width="14" height="14" viewBox="0 0 14 14" fill={bg} xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.91797 7H11.0846" stroke={text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 2.9165L11.0833 6.99984L7 11.0832" stroke={text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                      </Button>
                    </a>}
                  </div>
                </div>
              </CarouselItem>
                )
               
})
          }

        </CarouselContent>

      </Carousel>
    </div>
  )
}

export default UpcommingNotificationSliders

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
import StripeCanvas from './GlslsCanvas'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShineBorder } from './ui/shine-border'
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

// console.log(announcementData)
const generalAnno = announcementData.filter((e)=>e?.opportunityType === 'general')
const placementAnno = announcementData.filter((e)=>e?.opportunityType === 'placement')
const internshipAnno = announcementData.filter((e)=>e?.opportunityType === 'internship')
// console.log(generalAnno);

  return (
    <div>
{/* <div className="relative w-full h-[50px] overflow-hidden bg-black">
  WebGL stripes
  <StripeCanvas />

  Bright text blended with stripes
  <h1
    className="
      absolute inset-0 flex items-center justify-center
       font-extrabold uppercase tracking-tight
      text-white select-none z-10
      mix-blend-overlay
    "
  >
    BURN TEXT
  </h1>
</div> */}

{/* <div className="w-full  bg-gradient-to-tr from-[#003366] via-[#007FFF] to-[#6495ED]">
<h1 className='text-white font-bold'>Announcemnt</h1>
</div> */}
<div className='w-full flex items-center justify-center'> 
  <Sheet>
   <SheetTrigger className='w-full cursor-pointer select-none'>
    <div className="w-full  bg-gradient-to-r rounded-full from-[#003366] via-[#007FFF] to-[#6495ED]">
<h1 className='text-white font-bold p-1 text-lg'>🎉 Announcments</h1>
</div>
</SheetTrigger>
 <SheetContent side='top' > 
  <SheetHeader> <SheetTitle>Announcement</SheetTitle>
  <div className="flex items-stretch justify-between  gap-4 scrollo">
    {
      !generalAnno.length > 0 && !placementAnno.length >0 && !internshipAnno.length > 0 && <p>No Announcement to Show.</p>
    }
  {/* General */}
  {generalAnno?.length > 0 && (() => {
    const { bg, text } = randomBgColor();
    return (
      <div
        key="general"
        style={{ backgroundColor: bg, color: text }}
        className="flex-1 p-2 min-w-[300px] rounded-md shadow-md relative"
      >
           <ShineBorder borderWidth={3} shineColor={text}  />
        <h1 className="text-xl font-bold mb-2 text-center">General</h1>
        {generalAnno.map((e, idx) => (
          <div key={e?._id} className="flex items-start m-1 p-2 rounded-md">
            <h2 className="font-bold mr-2">{idx + 1}.</h2>
            <h2 className="font-medium text-md">{e?.content}</h2>
          </div>
        ))}
      </div>
    );
  })()}

  {/* Placement */}
  {placementAnno?.length > 0 && (() => {
    const { bg, text } = randomBgColor();
    return (
      <div
        key="placement"
          style={{ backgroundColor: bg, color: text }}
        className="flex-1 p-2 min-w-[300px] rounded-md shadow-md relative"
      >
          <ShineBorder borderWidth={3} shineColor={text}  />
        <h1 className="text-xl font-bold mb-2 text-center">Placement</h1>
        {placementAnno.map((e, idx) => (
          <div key={e?._id} className="flex items-start m-1 p-2 rounded-md">
            <h2 className="font-bold mr-2">{idx + 1}.</h2>
            <h2 className="font-medium text-md">{e?.content}</h2>
          </div>
        ))}
      </div>
    );
  })()}

  {/* Internship */}
  {internshipAnno?.length > 0 && (() => {
    const { bg, text } = randomBgColor();
    return (
      <div
        key="internship"
          style={{ backgroundColor: bg, color: text }}
        className="flex-1 p-2 min-w-[300px] rounded-md shadow-md relative"
      >
           <ShineBorder borderWidth={3} shineColor={text}  />
        <h1 className="text-xl font-bold mb-2 text-center">Internship</h1>
        {internshipAnno.map((e, idx) => (
          <div key={e?._id} className="flex items-start m-1 p-2 rounded-md">
            <h2 className="font-bold mr-2">{idx + 1}.</h2>
            <h2 className="font-medium text-md">{e?.content}</h2>
          </div>
        ))}
      </div>
    );
  })()}


  </div>
  </SheetHeader>
   </SheetContent> 
   </Sheet> 
   </div>

      {/* <Carousel plugins={[
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

      </Carousel> */}
    </div>
  )
}

export default UpcommingNotificationSliders

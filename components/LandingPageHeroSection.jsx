'use client'
import { ArrowRight, Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import CompaniesSliderLandingPage from './CompaniesSliderLandingPage'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import axios from 'axios'
// import { Button } from './ui/button'

const LandingPageHeroSection = () => {
//   const [announcementData, setannouncementData] = useState([])
//    const [open, setOpen] = useState(false)

//      useEffect(() => {
//     // 🧠 Check if user has already seen it in this session
//     const hasSeenDialog = sessionStorage.getItem('hasSeenAnnouncementDialog')

//     if (!hasSeenDialog) {
//       setOpen(true) // open automatically
//       sessionStorage.setItem('hasSeenAnnouncementDialog', 'true') // prevent reopening
//     }
//   }, [])
//   const fetchAnnouncement = async () => {
//     try {
//       const resp = await axios.get('/api/announcement/getannouncementforlandingpageandfiltered')
//       if (resp?.data?.success) {
//         setannouncementData(resp?.data?.getAnnouncement)
//       }
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   useEffect(() => {
//     fetchAnnouncement()
//   }, [])
// let usedHues = new Set();

// const randomBgColor = () => {
//   let hue;
//   do {
//     hue = Math.floor(Math.random() * 360);
//   } while (usedHues.has(hue) && usedHues.size < 360);

//   usedHues.add(hue);
//   if (usedHues.size >= 360) usedHues.clear(); // reset when full

//   return {
//     bg: `hsla(${hue}, 100%, 50%, 0.2)`,
//     text: `hsl(${hue}, 100%, 20%)`,
//   };
// };
  return (
    <div>

      <section className="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] w-full bg-no-repeat bg-cover bg-center text-sm pb-20 bg-gradient-to-l from-[#f0f4f9] to-transparent mt-20">



        {/* <div className="flex items-center gap-2 border  rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32"> */}
        {/* <Link href="/">
  
    <Dot className='w-20 h-20 text-sky-500' />
    <span>Read more</span>
    </Link> */}
        {/* <span>New announcement on your inbox</span>
        <button className="flex items-center gap-1 font-medium">
            <span>Read more</span>
         
        </button> */}
        {/* </div> */}
        <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] p-2 text-center mx-auto mt-8">
          Welcome to the MITS-DU Internship & Placement Portal
        </h5>

        <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">Stay connected and organized with all your internship and placement activities in one place. Submit your internship records, track NOC requests, and explore placement opportunities effortlessly. This portal ensures a smooth experience for both students and faculty, keeping all academic and career-related data streamlined and accessible.</p>

        <div className="mx-auto w-full flex items-center justify-center  gap-3 mt-4">
          <div className="group text-white">
            <Link
              href="/login"
              className="flex items-center gap-1 font-semibold text-md p-2 w-[150px] transition-all duration-300 bg-black rounded-md hover:rounded-none text-nowrap"
            >
              <ArrowRight
                // 👇 FIX: Use opacity and translate for smooth transition instead of 'hidden'/'block'
                className="transition-all duration-300 group-hover:translate-x-1 mr-1 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:block"
                size={20}
              />
              <span className="transition-all duration-300 group-hover:translate-x-2  ">

                Get Started
              </span>
            </Link>
          </div>

          {/* <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger>
               <div className="group text-white">
              <span

                className="flex items-center gap-1 font-semibold text-md p-2 w-[180px] transition-all duration-300 bg-blue-700 rounded-md hover:rounded-none text-nowrap cursor-pointer select-none "
              >
              
                <ArrowRight
                  // 👇 FIX: Use opacity and translate for smooth transition instead of 'hidden'/'block'
                  className="transition-all duration-300 group-hover:translate-x-1 mr-1 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:block"
                  size={20}
                />
                <span className="transition-all duration-300 group-hover:translate-x-2  ">

                  Announcements
                </span>
              </span>
            </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Announcements</DialogTitle>
                <div>
                  {announcementData?.map((e,index) => {
                      const { bg, text } = randomBgColor();
                    return(
                        <div key={e?._id}>
                   <div className='flex items-center justify-between flex-wrap m-2 p-2 rounded-xl'   style={{ backgroundColor: bg, color: text }}>
                    <div >
                      <div className='flex items-center '>

                         <h2>{index+1}.</h2>
                      <h2>{e?.content}</h2>
                      </div>

                      {e?.description && <p className='ml-3 whitespace-pre-wrap'>{e?.description}</p>}
                    </div>
                      <div>
                        {e?.embeddedLink && <a className='cursor-pointer select-none' target='_blank' rel="noopener noreferrer" href={
                          e.embeddedLink.startsWith("http://") || e.embeddedLink.startsWith("https://")
                            ? e.embeddedLink
                            : `https://${e.embeddedLink}`
                        }><Button className='cursor-pointer select-none' >View Here</Button></a>}
                      </div>
                   </div>
                    </div>
                    )
                  
})}
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}

          {/* <div>
       <p className="py-6 text-slate-600 mt-14">Trused by -: MITS</p>
  </div> */}
        </div>
        <CompaniesSliderLandingPage />
      </section>
    </div>
  )
}

export default LandingPageHeroSection

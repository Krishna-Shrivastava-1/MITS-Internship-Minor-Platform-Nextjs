'use client'
import { ArrowRight, Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from './ui/button'
import { BlurFade } from './ui/blur-fade'
import { Highlighter } from './ui/highlighter'
import { AuroraText } from './ui/aurora-text'
import { useTheme } from 'next-themes'

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
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid rendering mismatched HTML before theme is ready
    return null
  }


// console.log(theme)
  return (
    <div>
<div className=" w-full bg-background relative overflow-hidden">
  {/* Grid Background (theme-aware, non-interfering) */}
  <div
    className="absolute inset-0 z-0 transition-colors duration-500 pointer-events-none"
    style={{
      opacity: 0.95, // reduce visibility
      backgroundImage: `
        linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px),
         radial-gradient(circle at 50% 50%, rgba(37, 99, 235, ${theme==='dark' ? 0.35 : 0.25}) 0%, rgba(37, 99, 235, ${theme==='dark' ? 0.15 : 0.1}) 40%, transparent 80%)
      `,
      backgroundSize: "32px 32px, 32px 32px, 100% 100%",
      maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))", // 👈 bottom fade
      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
    }}
  />

  {/* Actual content */}
  <section className="w-full text-sm pb-2 mt-24 relative z-10">
    <BlurFade delay={0.25} duration={0.7} inView>
      <h5 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-[850px] p-2 text-center mx-auto">
        Welcome to the{" "}
        <AuroraText speed='2'
          colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
        >
          MITS-DU
        </AuroraText>{" "}
        Internship &{" "}
        <Highlighter
          animationDuration={4000}
          action="highlight"
          iterations={62}
          isView
      color={theme === "dark" ? "#2563EB" : "#87CEFA"}
        >
          NOC Portal
        </Highlighter>{" "}
      </h5>

      <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">
        Stay connected and organized with all your internship and placement
        activities in one place. Submit your internship records, track NOC
        requests, and explore placement opportunities effortlessly. This portal
        ensures a smooth experience for both students and faculty, keeping all
        academic and career-related data streamlined and accessible.
      </p>
    </BlurFade>

    {/* Get Started Button */}
    <div className="mx-auto flex flex-col items-center justify-center gap-3 mt-6">
      <div className="group text-white ">
        <Link
          href="/login"
          className="flex items-center gap-1 font-semibold text-md p-2 w-[250px]  transition-all duration-300 bg-[#1a73e8] rounded-md hover:rounded-none text-nowrap   shadow-[0_0_15px_rgba(37,99,235,0.5)]
             hover:shadow-[0_0_25px_rgba(37,99,235,0.8)]
             dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]
             dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
        >
          <ArrowRight
            className="transition-all duration-300 group-hover:translate-x-1 mr-1 opacity-0 group-hover:opacity-100 -translate-x-full"
            size={20}
          />
          <span className="transition-all duration-300 group-hover:translate-x-2">
        Send Your NOC Request Now
          </span>
        </Link>
      </div>

      <div className="py-6 m-3 text-slate-600 mt-4 flex items-center justify-center">
        Trusted by - :
        <span className="flex items-center justify-center ml-2">
          <Image
            src={"https://web.mitsgwalior.in/images/mits-logo.png"}
            alt="logo"
            width={40}
            height={40}
          />
          <p>Madhav Institute of Technology & Science</p>
        </span>
      </div>
    </div>
  </section>
</div>



   
  
    </div>
  )
}

export default LandingPageHeroSection

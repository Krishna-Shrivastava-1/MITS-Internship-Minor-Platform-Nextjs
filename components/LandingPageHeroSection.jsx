import { ArrowRight, Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import CompaniesSliderLandingPage from './CompaniesSliderLandingPage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const LandingPageHeroSection = () => {
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
    <span   className="transition-all duration-300 group-hover:translate-x-2  ">

    Get Started
    </span>
  </Link>
</div>
         
<Dialog>
  <DialogTrigger> <div className="group text-white">
  <span
    
    className="flex items-center gap-1 font-semibold text-md p-2 w-[180px] transition-all duration-300 bg-blue-700 rounded-md hover:rounded-none text-nowrap cursor-pointer select-none"
  >
    <ArrowRight
      // 👇 FIX: Use opacity and translate for smooth transition instead of 'hidden'/'block'
      className="transition-all duration-300 group-hover:translate-x-1 mr-1 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:block"
      size={20}
    />
    <span   className="transition-all duration-300 group-hover:translate-x-2  ">

    Announcements
    </span>
  </span>
</div></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Announcements</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

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

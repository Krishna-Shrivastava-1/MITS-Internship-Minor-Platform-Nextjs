import AccordionLandingPage from "@/components/AccordionLandingPage";

import CarouselSliderLandingPage from "@/components/CarouselSliderLandingPage";

import Footer from "@/components/Footer";
import StripeCanvas from "@/components/GlslsCanvas";
import LandingPageHeroSection from "@/components/LandingPageHeroSection";
import LandingPageNavbar from "@/components/LandingPageNavbar";
import LogoLoop from "@/components/LogoLoop";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import UpcommingNotificationSliders from "@/components/UpcommingNotificationSliders";
import { UspToShow } from "@/components/UspToShow";
import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SiWipro, SiInfosys, SiTcs, SiAccenture,SiCognizant,SiCisco ,SiAmazon} from 'react-icons/si';
import { FcGoogle } from "react-icons/fc";
import AnimatedBeamDemo from "@/components/WhytoChoose";
import axios from "axios";

export default async function Home() {

const techLogos = [
  { node: <SiWipro />, title: "Wipro", href: "https://react.dev" },
  { node: <SiInfosys />, title: "Infosys", href: "https://nextjs.org" },
  { node: <SiTcs />, title: "TCS", href: "https://www.typescriptlang.org" },
  { node: <SiAccenture />, title: "Accenture", href: "https://tailwindcss.com" },
  { node: <FcGoogle />, title: "Google", href: "https://tailwindcss.com" },
  { node: <SiCognizant />, title: "Cognizant", href: "https://tailwindcss.com" },
  { node: <SiCisco />, title: "Cisco", href: "https://tailwindcss.com" },
  { node: <SiAmazon />, title: "Amazon", href: "https://tailwindcss.com" },
];
 const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/announcement/getannouncementforlandingpageandfiltered`, {
    cache: "no-store",
  })
  const data = await resp.json()

  const announcementData = data?.getAnnouncement || []
  console.log(announcementData)
  return (
    <div className="">
      {/* <Navbar /> */}
      {/* <StripeCanvas /> */}
      {/* <div className="relative flex items-center justify-around w-full p-3 ">
        <div className="flex items-center text-white hover:text-neutral-100 cursor-pointer select-none gap-x-2.5">
          <Image src={'https://web.mitsgwalior.in/images/mits-logo.png'} alt="logo" width={55} height={0} />
         <div>
           <h1 className=" text-md font-bold ">MITS-DU INTERNSHIP/</h1>
          <h1 className=" text-md font-bold ">PLACEMENT PORTAL</h1>
         </div>
        </div>
        <div className="text-white group">
          <Link
            href="/login"
            className="flex items-center gap-1 font-semibold text-md hover:text-neutral-100 text-nowrap"
          >
            Get Started
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={20}
            />
          </Link>
        </div>
      </div> */}
     <div className=" mb-1">
       <UpcommingNotificationSliders announcementData={announcementData} />
     </div>
      {/* <div className="relative flex w-full flex-col items-center px-5 ">
        <header >
       
          <div className="space-y-8 sm:px-4 flex items-center justify-around w-full flex-wrap">

            <div className=" w-full lg:w-1/2">
              <span
                className="isolate block mix-blend-color-burn text-black text-5xl lg:text-7xl font-bold  "

              >
                Welcome to the MITS-DU Internship & Placement Portal
              </span>

              <p className="text-base md:text-lg">
                Stay connected and organized with all your internship and placement activities in one place. Submit your internship records, track NOC requests, and explore placement opportunities effortlessly. This portal ensures a smooth experience for both students and faculty, keeping all academic and career-related data streamlined and accessible.
              </p>
            </div>
            <div>
<CarouselSliderLandingPage />
            </div>

          </div>

        </header>


      </div> */}
<LandingPageNavbar />

  <LandingPageHeroSection />
   <div className="flex items-center justify-center w-full">
     <div className='flex items-center sm:flex-nowrap w-[90%] flex-wrap' style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <h1 className="font-bold text-2xl">Our Placement Partners</h1>
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="var(--fade-out-color)"
        ariaLabel="Technology partners"
      />
    </div>
   </div>

  <UspToShow />
  <div className="text-center flex items-center justify-center flex-col w-full p-2">

  <AnimatedBeamDemo />
  </div>

  <AccordionLandingPage />
  {/* <TestimonialsSection /> */}
  {/* <Footer /> */}
      {/* <div className="h-screen"></div> */}
      {/* Home page */}

    </div>
  );
}

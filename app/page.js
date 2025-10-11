import CarouselSliderLandingPage from "@/components/CarouselSliderLandingPage";
import StripeCanvas from "@/components/GlslsCanvas";
import Navbar from "@/components/Navbar";
import UpcommingNotificationSliders from "@/components/UpcommingNotificationSliders";
import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      {/* <Navbar /> */}
      <StripeCanvas />
      <div className="relative flex items-center justify-around w-full p-3 ">
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
      </div>
     <div className="my-3">
       <UpcommingNotificationSliders />
     </div>
      <div className="relative flex w-full flex-col items-center px-5 ">
        <header >
          {/* Text section */}
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


      </div>
      {/* <div className="h-screen"></div> */}
      {/* Home page */}

    </div>
  );
}

'use client'
import { ArrowRight, ArrowUpRight, ChevronRight, Equal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const LandingPageNavbar = () => {
    const [scrollY, setscrollY] = useState(0)
    useEffect(() => {
    const scroller = ()=>{
        setscrollY(window.scrollY)
    }
    window.addEventListener('scroll',scroller)
    return ()=> removeEventListener('scroll',scroller)
    }, [])
    // console.log(scrollY)
    return (
        <div className='sticky top-0 z-40 overflow-x-hidden'>
            <nav className="border-b  bg-white flex items-center px-2 justify-between md:px-16 lg:px-24 xl:px-32  w-full">

                <Link href="/">
                    <div className="flex items-center  hover:text-neutral-800 cursor-pointer select-none gap-x-2.5">
                        <Image src={'https://web.mitsgwalior.in/images/mits-logo.png'} alt="logo" width={55} height={0} />
                        <div>
                            <h1 className=" text-md font-bold text-nowrap">MITS-DU INTERNSHIP/</h1>
                            <h1 className=" text-md font-bold text-nowrap ">PLACEMENT PORTAL</h1>
                        </div>
                    </div>
                </Link>
        <div
  className={`transition-all duration-300  ease-out group text-white transform ${
    scrollY > 480 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
  }`}
>
  <Link
              href="/login"
              className="flex items-center gap-1 font-semibold text-md p-2 md:w-[150px] w-[90px] transition-all duration-300 bg-[#1a73e8] rounded-md hover:rounded-none text-nowrap "
            >
              <ArrowRight
                // 👇 FIX: Use opacity and translate for smooth transition instead of 'hidden'/'block'
                className="transition-all duration-300 group-hover:translate-x-1 mr-1 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:block"
                size={20}
              />
              <span className="transition-all duration-300 group-hover:translate-x-2  text-xs md:text-[16px]">

                Get Started
              </span>
            </Link>
</div>


            </nav>
        </div>

    )
}

export default LandingPageNavbar

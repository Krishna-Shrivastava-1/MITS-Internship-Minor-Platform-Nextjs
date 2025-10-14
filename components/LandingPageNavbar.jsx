import { ArrowRight, ArrowUpRight, Equal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
const LandingPageNavbar = () => {
    return (
        <nav className="border-b  backdrop-blur-sm flex items-center justify-between p-2 md:px-16 lg:px-24 xl:px-32  w-full sticky top-0 z-40">
            <Link href="/">
                <div className="flex items-center  hover:text-neutral-800 cursor-pointer select-none gap-x-2.5">
                    <Image src={'https://web.mitsgwalior.in/images/mits-logo.png'} alt="logo" width={55} height={0} />
                    <div>
                        <h1 className=" text-md font-bold ">MITS-DU INTERNSHIP/</h1>
                        <h1 className=" text-md font-bold ">PLACEMENT PORTAL</h1>
                    </div>
                </div>
            </Link>
            <div id="menu" className="max-md:absolute max-md:top-0 max-md:left-0 max-md:w-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-white/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 font-medium">
                <Link href={'/home'} className=" hover:text-blue-700 hover:font-bold ">
                    Home
                </Link>
                <Link href={'/home/apply-noc'} className="hover:text-blue-700 hover:font-bold ">
                    NOC Request
                </Link>
                <Link href={'/home/add-internship'} className="hover:text-blue-700 hover:font-bold ">
                    Add  Internship Data
                </Link>

            </div>
            <div className="group hidden md:block text-white">
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
            <div className=' md:hidden block'>
                <Sheet>
                    <SheetTrigger><Equal /></SheetTrigger>
                    <SheetContent className='w-full' side='left'>
                        <SheetHeader>
                            <SheetTitle> <Link href="/">
                                <div className="flex items-center  hover:text-neutral-800 cursor-pointer select-none gap-x-2.5">
                                    <Image src={'https://web.mitsgwalior.in/images/mits-logo.png'} alt="logo" width={55} height={0} />
                                    <div>
                                        <h1 className=" text-md font-bold ">MITS-DU INTERNSHIP/</h1>
                                        <h1 className=" text-md font-bold ">PLACEMENT PORTAL</h1>
                                    </div>
                                </div>
                            </Link>
                            </SheetTitle>
                            <div className='w-full h-full flex items-center justify-center'>
                                <div className='w-full h-[60vh] flex items-center justify-center flex-col'>
                                    <Link href={'/home'}>
                                        <div className='my-2 flex items-center justify-center '>
                                            <h1 className='text-xl text-center font-extrabold '>Home</h1>
                                            <ArrowUpRight />
                                        </div>
                                    </Link>
                                    <div className='w-full h-[0.5px] bg-neutral-800 my-2'></div>
                                    <Link href={'/home/apply-noc'}>
                                        <div className='my-2 flex items-center justify-center'>
                                            <h1 className='text-xl text-center font-extrabold '>NOC Request</h1>
                                            <ArrowUpRight />
                                        </div>
                                    </Link>
                                    <div className='w-full h-[0.5px] bg-neutral-800 my-2'></div>
                                    <Link href={'/home/add-internship'}>
                                        <div className='my-2 flex items-center justify-center'>
                                            <h1 className='text-xl text-center font-extrabold '>Add Internship Data</h1>
                                            <ArrowUpRight />
                                        </div>
                                    </Link>
                                    <div className='w-full h-[0.5px] bg-neutral-800 my-2'></div>
                                    <div className="group  text-white">
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
                                </div>
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>


        </nav>
    )
}

export default LandingPageNavbar

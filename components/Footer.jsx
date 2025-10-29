import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
  <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-background border-t border-border">
    <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b  ">
        
        <div className="max-w-96">
            <Link href="/">
            <div className="flex items-center  hover:text-foreground cursor-pointer select-none gap-x-2.5">
          <Image src={'https://web.mitsgwalior.in/images/mits-logo.png'} alt="logo" width={55} height={0} />
         <div>
           <h1 className=" text-md font-bold ">MITS-DU INTERNSHIP/</h1>
          <h1 className=" text-md font-bold ">PLACEMENT PORTAL</h1>
         </div>
        </div>
        </Link>
            <p className="mt-6 text-sm text-foreground">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
            </p>
            <div className="flex items-center gap-2 mt-3  ">
                <a target="_blank" rel="noopener noreferrer"  href="https://x.com/Krishna__Stark">
                   <Image width={24} height={24} alt="svgImg" className='bg-white' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPjxwYXRoIGQ9Ik0gMTEgNCBDIDcuMTM0IDQgNCA3LjEzNCA0IDExIEwgNCAzOSBDIDQgNDIuODY2IDcuMTM0IDQ2IDExIDQ2IEwgMzkgNDYgQyA0Mi44NjYgNDYgNDYgNDIuODY2IDQ2IDM5IEwgNDYgMTEgQyA0NiA3LjEzNCA0Mi44NjYgNCAzOSA0IEwgMTEgNCB6IE0gMTMuMDg1OTM4IDEzIEwgMjEuMDIzNDM4IDEzIEwgMjYuNjYwMTU2IDIxLjAwOTc2NiBMIDMzLjUgMTMgTCAzNiAxMyBMIDI3Ljc4OTA2MiAyMi42MTMyODEgTCAzNy45MTQwNjIgMzcgTCAyOS45Nzg1MTYgMzcgTCAyMy40Mzc1IDI3LjcwNzAzMSBMIDE1LjUgMzcgTCAxMyAzNyBMIDIyLjMwODU5NCAyNi4xMDM1MTYgTCAxMy4wODU5MzggMTMgeiBNIDE2LjkxNDA2MiAxNSBMIDMxLjAyMTQ4NCAzNSBMIDM0LjA4NTkzOCAzNSBMIDE5Ljk3ODUxNiAxNSBMIDE2LjkxNDA2MiAxNSB6Ii8+PC9zdmc+"/>
                 
                </a>
              
              <a target="_blank" rel="noopener noreferrer" href="mailto:per550017@gmail.com">
                  
 <Image width={24} height={24} alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik00NSwxNi4ybC01LDIuNzVsLTUsNC43NUwzNSw0MGg3YzEuNjU3LDAsMy0xLjM0MywzLTNWMTYuMnoiLz48cGF0aCBmaWxsPSIjMWU4OGU1IiBkPSJNMywxNi4ybDMuNjE0LDEuNzFMMTMsMjMuN1Y0MEg2Yy0xLjY1NywwLTMtMS4zNDMtMy0zVjE2LjJ6Ii8+PHBvbHlnb24gZmlsbD0iI2U1MzkzNSIgcG9pbnRzPSIzNSwxMS4yIDI0LDE5LjQ1IDEzLDExLjIgMTIsMTcgMTMsMjMuNyAyNCwzMS45NSAzNSwyMy43IDM2LDE3Ii8+PHBhdGggZmlsbD0iI2M2MjgyOCIgZD0iTTMsMTIuMjk4VjE2LjJsMTAsNy41VjExLjJMOS44NzYsOC44NTlDOS4xMzIsOC4zMDEsOC4yMjgsOCw3LjI5OCw4aDBDNC45MjQsOCwzLDkuOTI0LDMsMTIuMjk4eiIvPjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00NSwxMi4yOThWMTYuMmwtMTAsNy41VjExLjJsMy4xMjQtMi4zNDFDMzguODY4LDguMzAxLDM5Ljc3Miw4LDQwLjcwMiw4aDAgQzQzLjA3Niw4LDQ1LDkuOTI0LDQ1LDEyLjI5OHoiLz48L3N2Zz4="/>
                </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/krishna-shrivastava-62b72129a/">
            <Image width={24} height={24} alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiMwMjg4RDEiIGQ9Ik00MiwzN2MwLDIuNzYyLTIuMjM4LDUtNSw1SDExYy0yLjc2MSwwLTUtMi4yMzgtNS01VjExYzAtMi43NjIsMi4yMzktNSw1LTVoMjZjMi43NjIsMCw1LDIuMjM4LDUsNVYzN3oiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTIgMTlIMTdWMzZIMTJ6TTE0LjQ4NSAxN2gtLjAyOEMxMi45NjUgMTcgMTIgMTUuODg4IDEyIDE0LjQ5OSAxMiAxMy4wOCAxMi45OTUgMTIgMTQuNTE0IDEyYzEuNTIxIDAgMi40NTggMS4wOCAyLjQ4NiAyLjQ5OUMxNyAxNS44ODcgMTYuMDM1IDE3IDE0LjQ4NSAxN3pNMzYgMzZoLTV2LTkuMDk5YzAtMi4xOTgtMS4yMjUtMy42OTgtMy4xOTItMy42OTgtMS41MDEgMC0yLjMxMyAxLjAxMi0yLjcwNyAxLjk5QzI0Ljk1NyAyNS41NDMgMjUgMjYuNTExIDI1IDI3djloLTVWMTloNXYyLjYxNkMyNS43MjEgMjAuNSAyNi44NSAxOSAyOS43MzggMTljMy41NzggMCA2LjI2MSAyLjI1IDYuMjYxIDcuMjc0TDM2IDM2IDM2IDM2eiIvPjwvc3ZnPg=="/>
           
                </a>
            </div>
        </div>

        <div className="w-1/2 flex md:flex-nowrap gap-x-3 justify-between">
            <div className='m-2'>
                <h2 className="font-semibold text-foreground mb-5">RESOURCES</h2>
                <ul className="text-sm text-muted-foreground space-y-2 list-none">
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Tutorials</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Community</a></li>
                </ul>
            </div>
            <div className='m-2'>
                <h2 className="font-semibold text-foreground mb-5">COMPANY</h2>
                <div className="text-sm text-muted-foreground space-y-2 list-none">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                </div>
            </div>
        </div>

    </div>
    <p className="py-4 text-center text-xs md:text-sm text-muted-foreground">
        Copyright 2025 © <a href="/">MITS-DU Internship & Placement Portal</a>. All Right Reserved.
    </p>
</footer>
  )
}

export default Footer

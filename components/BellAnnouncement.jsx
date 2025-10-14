'use client'
import axios from 'axios'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
const BellAnnouncement = () => {
      const [announcementData, setannouncementData] = useState([])
       const [open, setOpen] = useState(false)
    
         useEffect(() => {
        // 🧠 Check if user has already seen it in this session
        const hasSeenDialog = sessionStorage.getItem('hasSeenAnnouncementDialog')
    
        if (!hasSeenDialog) {
          setOpen(true) // open automatically
          sessionStorage.setItem('hasSeenAnnouncementDialog', 'true') // prevent reopening
        }
      }, [])
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
        text: `hsl(${hue}, 100%, 20%)`,
      };
    };
  return (
    <div className='fixed bottom-6 right-8 z-40'>
          <Dialog  open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                       {/* <div className="group text-white">
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
                    </div> */}
                         <Bell className='text-yellow-400  animate-[shake_0.6s_ease-in-out_infinite] bg-blue-700 p-2 size-10 hover:fill-amber-400 rounded-full cursor-pointer select-none'/>
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
                  </Dialog>
 
    </div>
  )
}

export default BellAnnouncement

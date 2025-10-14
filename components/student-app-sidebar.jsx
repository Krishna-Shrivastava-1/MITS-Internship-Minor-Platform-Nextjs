"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardCheck,
  Command,
  Frame,
  GalleryVerticalEnd,
  House,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserRoundPlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { DataProviderContextAPI } from "./ContextApi"
import { usePathname } from "next/navigation"

// This is sample data.


export function StudentAppSidebar({
  ...props
}) {
const {fetchUserByIdState} = DataProviderContextAPI()
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar(); 

  // Close sidebar on mobile when route changes
  React.useEffect(() => {
    const handleClose = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        setOpenMobile(false);
      }
    };

    handleClose();

    // Optional: close on window resize
    const resizeListener = () => handleClose();
    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, [pathname, setOpenMobile]);
  // console.log(fetchUserByIdState?.profilePic)
  const data = {
  user: {
    name: fetchUserByIdState?.name,
    email: fetchUserByIdState?.email,
    avatar: fetchUserByIdState?.profilePic ,
  },
  teams: [
       {
         name: "MITS-DU INTERNSHIP/",
         logo: GalleryVerticalEnd,
         plan: "Placement Portal",
       }
     ],
  navMain: [
     {
      title: "Home",
      url: "/home",
      icon: House,
    
    
    },
       {
      title: "Add Internship",
      url: "/home/add-internship",
      icon: BookOpen,
    
    },
     {
      title: "NOC Details",
      url: "#",
      icon: ClipboardCheck,
      isActive: true,
      items: [
        {
          title: "Apply for NOC",
          url: "/home/apply-noc",
        },
        {
          title: "Applied NOC",
          url: "/home/applied-noc",
        }
      ],
    },
   
    // {
    //   title: "Apply for NOC",
    //   url: "/home/apply-noc",
    //   icon: ClipboardCheck,
    
    // },
 
    // {
    //   title: "Applied NOC",
    //   url: "/home/applied-noc",
    //   icon: Settings2,
     
    // },
  ]

}
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#f0f4f9]">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-[#f0f4f9]">
        <NavMain items={data.navMain} />
      
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

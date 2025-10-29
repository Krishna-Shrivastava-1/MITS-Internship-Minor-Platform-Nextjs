"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardCheck,
  Command,
  FilePlus2,
  Files,
  FileText,
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
   const { setOpenMobile, setOpen, open } = useSidebar() 

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
      icon: FilePlus2,
    
    },
     {
      title: "NOC Details",
      url: "#",
      icon: Files,
      isActive: true,
      items: [
        {
          title: "Apply for NOC",
          url: "/home/apply-noc",
          icon: FilePlus2,
        },
        {
          title: "Applied NOC",
          url: "/home/applied-noc",
          icon: FileText,
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
      <div
      onMouseEnter={() => setOpen(true)} // 👈 expands when hovered
      onMouseLeave={() => setOpen(false)} // 👈 collapses when cursor leaves
      className="transition-all duration-300 delay-200" // smooth animation
    >
        <Sidebar
       collapsible="icon"
       className="border-r border-border bg-sidebar text-sidebar-foreground  "
       {...props}
     >
       {/* Sidebar Header */}
       <SidebarHeader className="bg-sidebar text-sidebar-foreground border-b border-border">
         <TeamSwitcher teams={data.teams} />
       </SidebarHeader>
     
       {/* Sidebar Main Content */}
       <SidebarContent className="bg-sidebar text-sidebar-foreground flex-1 overflow-y-auto">
         <NavMain items={data.navMain} />
       </SidebarContent>
     
       {/* Optional Footer (e.g. user info, logout button, etc.) */}
       {/* <SidebarFooter className="bg-sidebar text-sidebar-foreground border-t border-border">
         <NavUser user={data.user} />
       </SidebarFooter> */}
     
       {/* Sidebar Collapsed Rail */}
       <SidebarRail className="bg-sidebar text-sidebar-foreground border-r border-border" />
     </Sidebar>
    </div>
 
  );
}

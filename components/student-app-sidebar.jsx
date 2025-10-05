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
      name: "MITS Int",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: House,
    
    
    },
    {
      title: "Apply for NOC",
      url: "/home/apply-noc",
      icon: ClipboardCheck,
    
    },
    {
      title: "Add Internship",
      url: "/home/add-internship",
      icon: BookOpen,
    
    },
    {
      title: "Applied NOC",
      url: "/home/applied-noc",
      icon: Settings2,
     
    },
  ]

}
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader >
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent >
        <NavMain items={data.navMain} />
      
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

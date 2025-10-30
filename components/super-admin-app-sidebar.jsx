"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
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


export function SuperAdminAppSidebar({
  ...props
}) {
const {fetchUserByIdState} = DataProviderContextAPI()
  const pathname = usePathname();
  const { setOpenMobile,setOpen } = useSidebar(); 

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
  const data = {
  user: {
    name: fetchUserByIdState?.name,
    email: fetchUserByIdState?.email,
    avatar: "/avatars/shadcn.jpg",
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
      url: "/superadmin",
      icon: House,
    
    
    },
    {
      title: "Create User",
      url: "/superadmin/create-user",
      icon: UserRoundPlus,
    
    },
    {
      title: "NOC Requests",
      url: "/superadmin/noc-requests",
      icon: UserRoundPlus,
    
    },
    {
      title: "Announcements",
      url: "/superadmin/announcement",
      icon: UserRoundPlus,
    
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    
    // },
    // {
    //   title: "Settings",
    //   url: "#",
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

    <Sidebar collapsible="icon"
  className="border-r border-border bg-sidebar text-sidebar-foreground  "
  {...props}>
      <SidebarHeader className="bg-sidebar text-sidebar-foreground border-b border-border">
         <TeamSwitcher teams={data.teams} />
       </SidebarHeader>
     <SidebarContent className="bg-sidebar text-sidebar-foreground flex-1 overflow-y-auto">
       <NavMain items={data.navMain} />
     </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
  <SidebarRail className="bg-sidebar text-sidebar-foreground border-r border-border" />
    </Sidebar>
    </div>
  );
}

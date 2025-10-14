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


export function TeacherAppSidebar({
  ...props
}) {
  const { fetchUserByIdState } = DataProviderContextAPI()
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
  // console.log(fetchUserByIdState)
  const data = {
    user: {
      name: fetchUserByIdState?.name,
      email: fetchUserByIdState?.email,
      avatar: fetchUserByIdState?.profilePic,
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
        url: "/admin",
        icon: House,


      },
      {
        title: "NOC Details",
        url: "#",
        icon: ClipboardCheck,
        isActive: true,
        items: [
          {
            title: "NOC Requests",
            url: "/admin/noc-requests",
            icon: ClipboardCheck,

          },
          {
            title: "Approved NOC",
            url: "/admin/approved-noc",
            icon: BookOpen,

          },
          {
            title: "Rejected NOC",
            url: "/admin/rejected-noc",
            icon: Settings2,

          },
          {
            title: "Allowed Edit NOC",
            url: "/admin/allow-edit-noc",
            icon: Settings2,

          },
        ],
      },

    ]

  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#f0f4f9]">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className='bg-[#f0f4f9] '>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

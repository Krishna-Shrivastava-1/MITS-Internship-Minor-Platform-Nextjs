"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardCheck,
  Command,
  GalleryVerticalEnd,
  House,
  CircleX,
  PieChart,
  FilePenLine,
  Inbox,
  CircleCheckBig
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
  const { setOpenMobile,toggleSidebar,setOpen, open } = useSidebar();

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
  const navMain = [
  {
    title: "Home",
    url: "/admin",
    icon: House,
  },
  {
    title: "Internship Details",
    url: "/admin/internship",
    icon: Command,
  },
  // Conditionally include NOC Details
  ...(fetchUserByIdState?.assignedDepartmentForNocRequest
    ? [
        {
          title: "NOC Details",
          url: "#",
          icon: Inbox,
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
              icon: CircleCheckBig,
            },
            {
              title: "Rejected NOC",
              url: "/admin/rejected-noc",
              icon: CircleX,
            },
            {
              title: "Allowed Edit NOC",
              url: "/admin/allow-edit-noc",
              icon: FilePenLine,
            },
          ],
        },
      ]
    : []),
];
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
    },
  ],
  navMain,
};

  // const data = {
  //   user: {
  //     name: fetchUserByIdState?.name,
  //     email: fetchUserByIdState?.email,
  //     avatar: fetchUserByIdState?.profilePic,
  //   },
  //   teams: [
  //     {
  //       name: "MITS-DU INTERNSHIP/",
  //       logo: GalleryVerticalEnd,
  //       plan: "Placement Portal",
  //     }
  //   ],
  //   navMain: [
  //     {
  //       title: "Home",
  //       url: "/admin",
  //       icon: House,


  //     },
  //     {
  //       title: "Internship Details",
  //       url: "/admin/internship",
  //       icon: House,


  //     },
  //     {
  //       title: "NOC Details",
  //       url: "#",
  //       icon: ClipboardCheck,
  //       isActive: true,
  //       items: [
  //         {
  //           title: "NOC Requests",
  //           url: "/admin/noc-requests",
  //           icon: ClipboardCheck,

  //         },
  //         {
  //           title: "Approved NOC",
  //           url: "/admin/approved-noc",
  //           icon: BookOpen,

  //         },
  //         {
  //           title: "Rejected NOC",
  //           url: "/admin/rejected-noc",
  //           icon: Settings2,

  //         },
  //         {
  //           title: "Allowed Edit NOC",
  //           url: "/admin/allow-edit-noc",
  //           icon: Settings2,

  //         },
  //       ],
  //     },

  //   ]

  // }
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
  <SidebarHeader className="bg-sidebar text-sidebar-foreground  ">
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

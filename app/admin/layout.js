
import Footer from "@/components/Footer"
import { NavUser } from "@/components/nav-user"
import { TeacherAppSidebar } from "@/components/teacher-app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell } from "lucide-react"

export default function SuperAdminPage({children}) {
  return (
    <>
       <SidebarProvider>
      <TeacherAppSidebar />
     <SidebarInset>
        <header className="
      flex items-center justify-between
      h-14 px-4 shrink-0
      sticky top-0 z-40
      bg-sidebar text-sidebar-foreground
      backdrop-blur supports-[backdrop-filter]:bg-sidebar/80
      border-b border-border
      transition-[width,height] ease-linear
      group-data-[collapsible=icon]/sidebar-wrapper:h-12
    ">
      {/* Left Section - Sidebar Trigger */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4"
        />
      </div>

      {/* Right Section - User Avatar */}
      <div>

      <NavUser />
      </div>
    </header>
        <div className="">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    {/* <div >
        <Footer />
    </div> */}
    </>
 
  )
}

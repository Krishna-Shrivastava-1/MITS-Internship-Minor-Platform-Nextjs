
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
        <header className="flex h-12 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 backdrop-blur-xs z-40 bg-[#f0f4f9]">
          <div className="flex items-center gap-2 px-4  w-full justify-between">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
              <div className="">
                     <NavUser />
                    </div>
          </div>
        
        </header>
        <div className="w-full ">
          
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

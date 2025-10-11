"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items
}) {
   const pathname = usePathname()
  return (
  <SidebarGroup>
  <SidebarGroupLabel>Platform</SidebarGroupLabel>
  <SidebarMenu>
    {items.map((item) => {
      // Check if current pathname matches this item or any of its sub-items
      const isActive =
        pathname === item.url ||
        item.items?.some((sub) => pathname === sub.url);

      if (item.items && item.items.length > 0) {
        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isActive} // Open if active
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={`hover:cursor-pointer select-none 
                    ${isActive
                      ? 'bg-[#c2e7ff] hover:bg-[#b5d7ed] text-[#474747]'
                      : 'bg-transparent text-[#474747] hover:bg-[#dfe3e7]'
                    }`}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => {
                    const isSubActive = pathname === subItem.url;
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                              isSubActive
                                ? 'bg-[#c2e7ff] text-[#474747] '
                                : 'hover:bg-[#dfe3e7] text-[#474747]'
                            }`}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }

      // Direct link items (no sub-items)
      const isDirectActive = pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            className={`hover:cursor-pointer select-none ${
              isDirectActive
                ? 'bg-[#c2e7ff] hover:bg-[#b5d7ed] text-[#474747] '
                : 'bg-transparent text-[#474747] hover:bg-[#dfe3e7]'
            }`}
          >
            <Link href={item.url} className="flex items-center gap-2">
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    })}
  </SidebarMenu>
</SidebarGroup>


    // <SidebarGroup>
    //   <SidebarGroupLabel>Actions</SidebarGroupLabel>
    //   <SidebarMenu>
    //     {items.map((item) => (
    //       <Collapsible
    //         key={item.title}
    //         asChild
    //         defaultOpen={item.isActive}
    //         className="group/collapsible">
    //         <SidebarMenuItem >
    //         <Link href={item?.url} className=''>
    //           <SidebarMenuButton tooltip={item.title}   className={`hover:cursor-pointer select-none 
    //   ${pathname === item?.url 
    //     ? 'bg-[#c2e7ff] hover:bg-[#b5d7ed] text-[#474747] border-l-4 border-sky-600'  // Active state
    //     : 'bg-transparent text-[#474747] hover:bg-[#dfe3e7]' // Inactive state
    //   }`}>
    //               {item.icon && <item.icon />}
    //               <span>{item.title}</span>
                 
    //             </SidebarMenuButton>
    //         </Link>
              
             
              
    //         </SidebarMenuItem>
    //       </Collapsible>
    //     ))}
    //   </SidebarMenu>
    // </SidebarGroup>
  );
}

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
      <SidebarGroupLabel>Actions</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem >
            <Link href={item?.url} className=''>
              <SidebarMenuButton tooltip={item.title}   className={`hover:cursor-pointer select-none 
      ${pathname === item?.url 
        ? 'bg-[#c2e7ff] hover:bg-[#b5d7ed] text-[#474747]'  // Active state
        : 'bg-transparent text-[#474747] hover:bg-[#dfe3e7]' // Inactive state
      }`}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                 
                </SidebarMenuButton>
            </Link>
              
             
              
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

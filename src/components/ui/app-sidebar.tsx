"use client"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Home,
  Book,
  Banknote,
  User as UserIcon,
} from "lucide-react"

export const data = {
  user: {
    name: "Budi Setiawan",
    email: "budi@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "dashboard/student",
      icon: Home,
    },
    {
      title: "Course",
      url: "#",
      icon: Book,
      items: [
        { title: "My ExploreCourse", url: "my-course" },
        { title: "Explore", url: "explore" },
      ],
    },
    {
      title: "Transaction",
      url: "#",
      icon: Banknote,
      items: [
        { title: "History", url: "history" },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: UserIcon,
      items: [
        { title: "Profile", url: "#" },
        { title: "Account", url: "#" },
        { title: "Apply as instructor", url: "#" },
      ],
    },
  ],
  projects: [

  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-[#e2e8f0] text-[#334155]" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

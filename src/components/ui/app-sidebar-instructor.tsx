import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUserInstructor } from "@/components/nav-user-instructor";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Home,
  Book,
} from "lucide-react";

export const instructorNavData = [
  {
    title: "Dashboard",
    url: "/dashboard/instructor",
    icon: Home,
  },
  {
    title: "Course",
    url: "/dashboard/instructor/course",
    icon: Book,
  },
];

export function AppSidebarInstructor({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-white text-[#334155]" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={instructorNavData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUserInstructor />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

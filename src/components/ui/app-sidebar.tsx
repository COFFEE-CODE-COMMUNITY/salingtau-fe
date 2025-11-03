import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Home,
  Book,
  Banknote,
  User as UserIcon,
} from "lucide-react";
import {UserRole, useUser} from "@/utils/user-context.tsx";

export const navData = {
  student: [
    {
      title: "Home",
      url: "/dashboard/student",
      icon: Home,
    },
    {
      title: "Course",
      url: "#",
      icon: Book,
      items: [
        { title: "My Course", url: "/dashboard/student/my-course" },
        { title: "Explore", url: "/dashboard/student/explore" },
      ],
    },
    {
      title: "Transaction",
      url: "#",
      icon: Banknote,
      items: [
        { title: "History", url: "/dashboard/student/history" },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: UserIcon,
      items: [
        { title: "Profile", url: "/dashboard/student/profile" },
        { title: "Account", url: "/dashboard/student/account" },
        { title: "Apply as instructor", url: "/dashboard/student/apply-as-instructor" },
      ],
    },
  ],
  instructor: [
    {
      title: "Home",
      url: "/dashboard/instructor",
      icon: Home,
    },
    {
      title: "Course",
      url: "#",
      icon: Book,
      items: [
        { title: "My Course", url: "/dashboard/instructor/my-course" },
        { title: "Explore", url: "/dashboard/instructor/explore" },
      ],
    },
    {
      title: "Transaction",
      url: "#",
      icon: Banknote,
      items: [
        { title: "History", url: "/dashboard/instructor/history" },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: UserIcon,
      items: [
        { title: "Profile", url: "/dashboard/instructor/profile" },
        { title: "Account", url: "/dashboard/instructor/account" },
      ],
    },
  ],
  admin: [
    {
      title: "Admin Dashboard",
      url: "/dashboard/admin",
      icon: Home,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  let navItems = navData.student

  if (user?.roles?.includes("ADMIN" as UserRole)) {
    navItems = navData.admin
  } else if (user?.roles?.includes("INSTRUCTOR" as UserRole)) {
    navItems = navData.instructor
  } else if (user?.roles?.includes("STUDENT" as UserRole)) {
    navItems = navData.student
  }

  return (
    <Sidebar collapsible="icon" className="bg-white text-[#334155]" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUserStudent } from "@/components/nav-user-student";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Home,
  Book,
  Banknote,
  User as UserIcon,
} from "lucide-react";
import { useUser } from "@/utils/user-context.tsx";

export function AppSidebarStudent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Menu User items dinamis berdasarkan roles
  const userMenuItems = React.useMemo(() => {
    const baseItems = [
      { title: "Profile", url: "/dashboard/student/profile" },
      { title: "Account", url: "/dashboard/student/account" },
    ];

    // Tambahkan "Apply as instructor" hanya jika user roles panjangnya tidak lebih dari 1
    if (!user?.roles || user.roles.length <= 1) {
      baseItems.push({ title: "Apply as instructor", url: "/dashboard/student/apply-as-instructor" });
    }

    return baseItems;
  }, [user?.roles]);

  const studentNavData = [
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
      items: userMenuItems,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="bg-white text-[#334155]" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={studentNavData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUserStudent />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

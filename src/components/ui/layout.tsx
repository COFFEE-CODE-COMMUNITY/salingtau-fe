import {Outlet} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {useUserStore} from "@/utils/useActiveRoles.ts";
import {AppSidebarStudent} from "@/components/ui/app-sidebar-student.tsx";
import {AppSidebarInstructor} from "@/components/ui/app-sidebar-instructor.tsx";

export function Layout() {
  const activeRole = useUserStore((state) => state.activeRole);

  return (
    <div>
      <SidebarProvider>
        {activeRole === "student" && (
          <>
            <AppSidebarStudent />
            <main className={"flex-1 min-h-screen"}>
              <SidebarTrigger />
              <Outlet />
            </main>
          </>
        )}
        {activeRole === "instructor" && (
          <>
            <AppSidebarInstructor />
            <main className={"flex-1 min-h-screen"}>
              <SidebarTrigger />
              <Outlet />
            </main>
          </>
        )}
      </SidebarProvider>
    </div>
  )
}
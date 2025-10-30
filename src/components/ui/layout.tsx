import {Outlet} from "react-router-dom";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/ui/app-sidebar.tsx";

export function Layout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className={"flex-1 min-h-screen"}>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
import {
  ChevronsUpDown,
  LogOut,
  GraduationCap,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@/utils/user-context.tsx"
import { useNavigate } from "react-router-dom"
import {useUserStore} from "@/utils/useActiveRoles.ts";
import {useLogout} from "@/services/useLogout.ts";

const userFallback = {
  name: "Guest",
  email: "guest@salingtau.com",
  avatar: ""
}

export function NavUserInstructor() {
  const { isMobile } = useSidebar()
  const logout = useLogout()
  const { user, clearUser } = useUser()
  const navigate = useNavigate()
  const setActiveRole = useUserStore((state) => state.setActiveRole)

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getProfilePicture = () => {
    if (user?.profilePictures && user.profilePictures.length > 0) {
      return user.profilePictures[0].url
    }
    return undefined
  }

  const handleLogout = async () => {
    await logout()
    clearUser()
    navigate("/login")
  }

  const displayUser = user
    ? {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: getProfilePicture(),
      initials: getInitials(user.firstName, user.lastName),
      isGuest: false,
      roles: user.roles || [],
    }
    : {
      name: userFallback.name,
      email: userFallback.email,
      avatar: "/fallback-avatar.jpg",
      initials: "GU",
      isGuest: true,
      roles: [],
    }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                <AvatarFallback className="rounded-lg">
                  {displayUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayUser.name}</span>
                <span className="truncate text-xs">{displayUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback className="rounded-lg">
                    {displayUser.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayUser.name}</span>
                  <span className="truncate text-xs">{displayUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <>
              <DropdownMenuGroup>
                {/* Menu untuk beralih ke Student Dashboard */}
                <DropdownMenuItem onClick={() => {
                    setActiveRole("student")
                    navigate("/dashboard/student")
                  }}
                >
                  <GraduationCap />
                  Student Dashboard
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

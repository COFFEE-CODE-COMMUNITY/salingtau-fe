import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {Link} from "react-router-dom";

export function NavMain(
  {
    items,
  }: {
    items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="hover:bg-blue-600/20 text-black hover:text-blue-600 data-[state=open]:bg-blue-600/20 data-[state=open]:text-blue-600 [&>svg]:hover:text-blue-600 [&>svg]:data-[state=open]:text-blue-600 [&>svg]:size-5"
                  >
                    {item.icon && <item.icon />}
                    <span className="text-base font-medium">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 size-5" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className="hover:bg-blue-600/20 text-black hover:text-blue-600 data-[active=true]:bg-blue-600/20 data-[active=true]:text-blue-600"
                        >
                          <a href={subItem.url}>
                            <span className="text-sm font-medium">{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="hover:bg-blue-600/20 text-black hover:text-blue-600 data-[active=true]:bg-blue-600/20 data-[active=true]:text-blue-600 [&>svg]:hover:text-blue-600 [&>svg]:data-[active=true]:text-blue-600 [&>svg]:size-5"
              >
                <Link to={item.url} className="flex items-center w-full">
                  {item.icon && <item.icon />}
                  <span className="text-base font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
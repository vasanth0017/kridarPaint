"use client"

import * as React from "react"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sidebarData } from "@/lib/sidebarData"


export function AppSidebar({session,  ...props }:{session:any} & React.ComponentProps<typeof Sidebar>) {
  const data:any = sidebarData(session);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user || data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

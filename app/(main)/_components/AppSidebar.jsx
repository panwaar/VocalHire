'use client'

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

export function AppSidebar() {
  const path = usePathname()
  const router = useRouter()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Link href='/'>
          <Image 
            src="/logo.png"
            alt="logo"
            width={400}
            height={100}
            className="w-[200px]"
          />
        </Link>
        <Button 
          className="w-full mt-5" 
          onClick={() => router.push('/dashboard/create-interview')}
        >
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SidebarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className="p-1">
                <SidebarMenuButton
                  asChild
                  className={`p-5 ${path === option.path ? 'bg-green-50' : ''}`}
                >
                  <Link href={option.path} className="flex items-center gap-2">
                    <option.icon
                      className={path === option.path ? 'text-primary' : ''}
                    />
                    <span
                      className={`text-[16px] font-medium ${
                        path === option.path ? 'text-primary' : ''
                      }`}
                    >
                      {option.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

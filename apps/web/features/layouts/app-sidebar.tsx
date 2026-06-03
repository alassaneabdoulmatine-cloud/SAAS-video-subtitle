import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Home, Folder, User2, LogOut, Settings } from "lucide-react"
import { useProjects } from "../projects/queries/projects-queries"
import { useParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
    const { projects } = useProjects()
    const { workspaceId } = useParams()
    const router = useRouter()
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path
    const homeActive = isActive(`/${workspaceId}/project/home`)

    return (
        <Sidebar>
            {/* HEADER : Sélecteur de Workspace (comme ton exemple) */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full justify-between font-medium h-12">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-white font-bold text-xs">
                                            O
                                        </div>
                                        <span>Mon Workspace</span>
                                    </div>
                                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Acme Inc</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Personal Project</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* CONTENT : Navigation Principale */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            {/* 1. LIEN HOME (Simple et direct) */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Home" className={`${homeActive ? "bg-muted" : ""} cursor-pointer`}>
                                    <Link href={`/${workspaceId}/project/home`} className="flex items-center gap-3">
                                        <Home className="h-4 w-4" />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* 2. MENU PROJETS (Dépliable / Collapsible) */}
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="flex items-center justify-between font-medium">
                                            <div className="flex items-center gap-3">
                                                <Folder className="h-4 w-4" />
                                                <span>Projets</span>
                                            </div>
                                            {/* Flèche qui pivote quand c'est ouvert/fermé */}
                                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub className="mt-1 border-l pl-4 ml-5">
                                            {projects.map((project) => (
                                                <SidebarMenuSubItem key={project.id}>
                                                    <SidebarMenuSubButton className={`${isActive(`/${workspaceId}/project/${project.id}/videos`) ? "bg-muted" : ""} w-full text-sm cursor-pointer`} asChild>
                                                        <Link href={`/${workspaceId}/project/${project.id}/videos`}>
                                                            <span>{project.name}</span>
                                                        </Link>

                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER : Profil Utilisateur propre */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full flex items-center gap-3 py-6">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted border">
                                        <User2 className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="flex flex-col items-start text-left text-sm">
                                        <span className="font-medium leading-none">John Doe</span>
                                        <span className="text-xs text-muted-foreground mt-0.5">john@example.com</span>
                                    </div>
                                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] mb-2">
                                <DropdownMenuItem className="cursor-pointer gap-2">
                                    <Settings className="h-4 w-4" />
                                    <span>Paramètres</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                                    <LogOut className="h-4 w-4" />
                                    <span>Déconnexion</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
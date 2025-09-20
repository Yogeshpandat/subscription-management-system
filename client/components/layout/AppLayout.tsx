import { Link, Outlet, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
  SidebarFooter,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CreditCard, Home, ListChecks, Bell, Plus, UserCircle2 } from "lucide-react";

function NavItems() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive("/")}>
          <Link to="/">
            <Home />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive("/subscriptions")}>
          <Link to="/subscriptions">
            <ListChecks />
            <span>Subscriptions</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500" />
            <div className="text-sm font-semibold leading-tight">
              <span className="block">Subscribely</span>
              <span className="text-xs font-normal text-sidebar-foreground/70">Manage revenue</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavItems />
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="px-2 py-1.5 text-xs text-sidebar-foreground/60">
            <span className="flex items-center gap-1">Plan <Badge className="px-1.5 py-0.5" variant="secondary">Pro</Badge></span>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center gap-3">
            <SidebarTrigger />
            <div className="relative ml-2 hidden flex-1 items-center md:flex">
              <CreditCard className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <SidebarInput placeholder="Search customers, plans, invoices..." className="pl-9" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="hidden sm:inline-flex">
                <Plus className="h-4 w-4" />
                New Plan
              </Button>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>
        <main className={cn("container pb-10 pt-6")}> 
          <Outlet />
        </main>
        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          <div className="container">© {new Date().getFullYear()} Subscribely. All rights reserved.</div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}

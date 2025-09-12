
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface NavItem {
  href: string;
  label: string;
  icon: keyof typeof Icons;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  title: string;
}

export function DashboardLayout({
  children,
  navItems,
  title,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("ANITS User");
  const [userEmail, setUserEmail] = useState("user@anits.edu.in");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [homeHref, setHomeHref] = useState("/");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    let name = "ANITS User";
    let email = "user@anits.edu.in";
    if (role === 'student') {
        name = localStorage.getItem("studentRollNo") || "Student";
        email = localStorage.getItem("studentEmail") || "student@anits.edu.in";
        setHomeHref("/student/dashboard");
    } else if (role === 'faculty') {
        name = localStorage.getItem("facultyUsername") || "Faculty";
        email = localStorage.getItem("facultyEmail") || "faculty@anits.edu.in";
        setHomeHref("/faculty/dashboard");
    } else if (role === 'admin') {
        name = localStorage.getItem("adminUsername") || "Admin";
        email = localStorage.getItem("adminEmail") || "admin@anits.edu.in";
        setHomeHref("/admin/dashboard");
    } else {
        setHomeHref("/login");
    }
    setUserName(name);
    setUserEmail(email);

    if (typeof window !== 'undefined') {
        document.cookie = `userRole=${role || ''}; path=/;`;
    }

  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("studentRollNo");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("facultyUsername");
    localStorage.removeItem("facultyEmail");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("userRole");
    document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/login');
  }

  const UserNav = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary/50">
            <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <Link href={userRole ? `/${userRole}/profile` : '/login'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
           <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href={homeHref} className="text-2xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">ANITS Results Hub</Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
               const Icon = Icons[item.icon] as LucideIcon;
               return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                  >
                    <Link href={item.href}>
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="hidden md:flex">
            {/* UserNav used to be here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

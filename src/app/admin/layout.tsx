import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LayoutDashboard, Users } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Manage Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      {children}
    </DashboardLayout>
  );
}


import { DashboardLayout } from "@/components/layout/dashboard-layout";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/upload-results", label: "Upload Results", icon: "Upload" },
  { href: "/admin/users", label: "Manage Users", icon: "Users" },
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

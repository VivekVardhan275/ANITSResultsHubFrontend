
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const navItems = [
  { href: "/admin/dashboard", label: "Home", icon: "Home" },
  { href: "/admin/upload-results", label: "Upload Results", icon: "Upload" },
  { href: "/admin/upload-student-details", label: "Upload Student Details", icon: "UserPlus" },
  { href: "/admin/faculty-view", label: "Faculty View", icon: "Users" },
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

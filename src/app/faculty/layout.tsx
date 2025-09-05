
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const navItems = [
  { href: "/faculty/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/faculty/announcements", label: "Announcements", icon: "Megaphone" },
  { href: "/faculty/results", label: "Results", icon: "GraduationCap" },
];

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={navItems} title="Faculty Portal">
      {children}
    </DashboardLayout>
  );
}

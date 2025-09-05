
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const navItems = [
  { href: "/faculty/dashboard", label: "Home", icon: "Home" },
  { href: "/faculty/announcements", label: "Announcements", icon: "Megaphone" },
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

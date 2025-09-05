import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Megaphone, GraduationCap } from "lucide-react";

const navItems = [
  { href: "/faculty/dashboard", label: "Announcements", icon: Megaphone },
  { href: "/faculty/results", label: "Results", icon: GraduationCap },
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

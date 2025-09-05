import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BarChart3, UserCircle } from "lucide-react";

const navItems = [
  { href: "/student/dashboard", label: "My Results", icon: BarChart3 },
  { href: "/student/profile", label: "Profile", icon: UserCircle },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={navItems} title="Student Portal">
      {children}
    </DashboardLayout>
  );
}

import { DashboardLayout } from "@/components/layout/dashboard-layout";

const navItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: "LayoutGrid" },
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

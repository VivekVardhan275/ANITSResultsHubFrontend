
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | ANITS Results Hub",
  description: "Manage your application settings.",
};

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application-wide preferences.
          </p>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

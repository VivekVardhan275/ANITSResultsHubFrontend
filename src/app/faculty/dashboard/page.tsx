import { AnnouncementTool } from "@/components/faculty/announcement-tool";

export default function FacultyDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Announcement Publisher
        </h1>
        <p className="text-muted-foreground">
          Create and format announcements for your students using our AI-powered tool.
        </p>
      </div>
      <AnnouncementTool />
    </div>
  );
}

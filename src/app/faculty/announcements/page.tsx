import { AnnouncementTool } from "@/components/faculty/announcement-tool";

export default function FacultyAnnouncementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Make an Announcement</h1>
        <p className="text-muted-foreground">
          Use the tool below to generate a formatted markdown announcement for your students.
        </p>
      </div>
      <AnnouncementTool />
    </div>
  );
}

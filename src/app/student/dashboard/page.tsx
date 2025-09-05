import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const semesterData = [
  { semester: "1-1", sgpa: "8.5" },
  { semester: "1-2", sgpa: "8.8" },
  { semester: "2-1", sgpa: "9.1" },
  { semester: "2-2", sgpa: "9.0" },
  { semester: "3-1", sgpa: "8.7" },
  { semester: "3-2", sgpa: "8.9" },
  { semester: "4-1", sgpa: "0.00" },
  { semester: "4-2", sgpa: "0.00" },
];

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Student!</h1>
        <p className="text-muted-foreground">
          Here are your results for all semesters. Click on a card to view details.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {semesterData.map((sem) => (
          <Link href={`/student/results/${sem.semester}`} key={sem.semester}>
            <Card className="hover:shadow-lg hover:border-primary/50 transition-all duration-200 h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{sem.semester} Semester</CardTitle>
                    <CardDescription>View your results</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">SGPA</p>
                    <p className="text-3xl font-bold text-primary">{sem.sgpa}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-between">
                <p className="text-sm text-muted-foreground">
                  {sem.sgpa === "0.00"
                    ? "Results pending"
                    : "View detailed report"}
                </p>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

const allResultsData: Record<string, { sgpa: string; cgpa: string; status: string; results: any[] }> = {
  "1-1": {
    sgpa: "8.5",
    cgpa: "8.5",
    status: "pass",
    results: [
      { subjectCode: "MA111", subjectName: "Calculus", grade: "A" },
      { subjectCode: "PH111", subjectName: "Physics", grade: "B+" },
      { subjectCode: "CS111", subjectName: "Intro to Programming", grade: "A" },
      { subjectCode: "EE111", subjectName: "Basic Electrical Engg.", grade: "B" },
    ]
  },
  "1-2": {
    sgpa: "8.8",
    cgpa: "8.65",
    status: "pass",
    results: [
        { subjectCode: "MA121", subjectName: "Differential Equations", grade: "A" },
        { subjectCode: "CY121", subjectName: "Chemistry", grade: "A" },
        { subjectCode: "CS121", subjectName: "Data Structures", grade: "B+" },
        { subjectCode: "HU121", subjectName: "English Communication", grade: "A" },
    ]
  },
  "2-1": {
    sgpa: "7.2",
    cgpa: "8.1",
    status: "fail",
    results: [
        { subjectCode: "CS211", subjectName: "Data Structures", grade: "A+" },
        { subjectCode: "EC211", subjectName: "Digital Logic", grade: "A" },
        { subjectCode: "MA211", subjectName: "Linear Algebra", grade: "F" },
        { subjectCode: "CS212", subjectName: "Object Oriented Programming", grade: "B+" },
    ]
  },
};

export default function AdminStudentSemesterPage({ params }: { params: { rollNo: string, semester: string } }) {
  const { rollNo, semester } = params;
  const semesterData = allResultsData[semester];

  if (!semesterData) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
          <Link href={`/admin/student/${rollNo}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Student Profile</span>
          </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{semester} Semester Results</h1>
            <p className="text-muted-foreground">
              Detailed academic performance for Roll No: {rollNo}.
            </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex gap-8">
             <div>
                <CardTitle>SGPA</CardTitle>
                <CardDescription className={cn(
                   "font-bold text-xl",
                   semesterData.status === "pass" && "text-green-600 dark:text-green-400",
                   semesterData.status === "fail" && "text-red-600 dark:text-red-400",
                   semesterData.status === "pending" && "text-primary"
                )}>{semesterData.sgpa}</CardDescription>
             </div>
             <div>
                <CardTitle>CGPA</CardTitle>
                <CardDescription className="font-bold text-xl text-primary">{semesterData.cgpa}</CardDescription>
             </div>
             <div>
                <CardTitle>Status</CardTitle>
                <CardDescription className={cn(
                   "font-bold text-xl",
                   semesterData.status === "pass" && "text-green-600 dark:text-green-400",
                   semesterData.status === "fail" && "text-red-600 dark:text-red-400",
                   semesterData.status === "pending" && "text-primary"
                )}>{semesterData.status.charAt(0).toUpperCase() + semesterData.status.slice(1)}</CardDescription>
             </div>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </CardHeader>
        <CardContent>
           {semesterData.results.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Code</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesterData.results.map((result) => (
                    <TableRow key={result.subjectCode}>
                      <TableCell>{result.subjectCode}</TableCell>
                      <TableCell className="font-medium">{result.subjectName}</TableCell>
                      <TableCell className="p-2">
                        <div className="flex justify-end">
                            <Badge variant={result.grade === "F" ? "destructive" : "default"} className="w-10 h-8 flex items-center justify-center text-base">{result.grade}</Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           ) : (
             <div className="text-center text-muted-foreground py-10">
                Results for this semester are not yet available.
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

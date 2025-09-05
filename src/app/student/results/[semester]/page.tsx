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
      { subjectCode: "MA111", subjectName: "Calculus", grade: "A", credits: 4 },
      { subjectCode: "PH111", subjectName: "Physics", grade: "B+", credits: 3 },
      { subjectCode: "CS111", subjectName: "Intro to Programming", grade: "A", credits: 4 },
      { subjectCode: "EE111", subjectName: "Basic Electrical Engg.", grade: "B", credits: 3 },
    ]
  },
  "1-2": {
    sgpa: "8.8",
    cgpa: "8.65",
    status: "pass",
    results: [
        { subjectCode: "MA121", subjectName: "Differential Equations", grade: "A", credits: 4 },
        { subjectCode: "CY121", subjectName: "Chemistry", grade: "A", credits: 3 },
        { subjectCode: "CS121", subjectName: "Data Structures", grade: "B+", credits: 4 },
        { subjectCode: "HU121", subjectName: "English Communication", grade: "A", credits: 2 },
    ]
  },
  "2-1": {
    sgpa: "7.2",
    cgpa: "8.1",
    status: "fail",
    results: [
        { subjectCode: "CS211", subjectName: "Data Structures", grade: "A+", credits: 4 },
        { subjectCode: "EC211", subjectName: "Digital Logic", grade: "A", credits: 3 },
        { subjectCode: "MA211", subjectName: "Linear Algebra", grade: "F", credits: 4 },
        { subjectCode: "CS212", subjectName: "Object Oriented Programming", grade: "B+", credits: 3 },
    ]
  },
  "2-2": {
    sgpa: "9.0",
    cgpa: "8.35",
    status: "pass",
     results: [
        { subjectCode: "CS221", subjectName: "Algorithms", grade: "A+", credits: 4 },
        { subjectCode: "EE221", subjectName: "Network Theory", grade: "B+", credits: 3 },
        { subjectCode: "CS222", subjectName: "Computer Organization", grade: "A", credits: 4 },
        { subjectCode: "HU221", subjectName: "Economics", grade: "A-", credits: 2 },
    ]
  },
  "3-1": {
    sgpa: "8.7",
    cgpa: "8.43",
    status: "pass",
    results: [
        { subjectCode: "CS311", subjectName: "Database Systems", grade: "A", credits: 4 },
        { subjectCode: "CS312", subjectName: "Operating Systems", grade: "B+", credits: 4 },
        { subjectCode: "CS313", subjectName: "Formal Languages", grade: "B", credits: 3 },
        { subjectCode: "CS314", subjectName: "Software Engineering", grade: "A-", credits: 3 },
    ]
  },
  "3-2": {
    sgpa: "8.9",
    cgpa: "8.51",
    status: "pass",
    results: [
      { subjectCode: "CS321", subjectName: "Compiler Design", grade: "A", credits: 3 },
      { subjectCode: "CS322", subjectName: "Computer Networks", grade: "A+", credits: 4 },
      { subjectCode: "CS323", subjectName: "Artificial Intelligence", grade: "B+", credits: 3 },
      { subjectCode: "CS324", subjectName: "Web Technologies", grade: "A", credits: 3 },
    ]
  },
  "4-1": {
    sgpa: "0.00",
    cgpa: "8.51",
    status: "pending",
    results: []
  },
  "4-2": {
    sgpa: "0.00",
    cgpa: "8.51",
    status: "pending",
    results: []
  }
};


export default function SemesterResultPage({ params }: { params: { semester: string } }) {
  const semesterId = params.semester;
  const semesterData = allResultsData[semesterId];

  if (!semesterData) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
          <Link href="/student/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{semesterId} Semester Results</h1>
            <p className="text-muted-foreground">
              Your detailed academic performance for the semester.
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
                      <TableCell className="text-right">
                        <Badge variant={result.grade === "F" ? "destructive" : "default"} className="w-10 h-8 flex items-center justify-center text-base">{result.grade}</Badge>
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

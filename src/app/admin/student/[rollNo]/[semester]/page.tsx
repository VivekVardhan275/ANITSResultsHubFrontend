
"use client";

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
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Mock data structure for semester results
const allResultsData: Record<string, Record<string, { sgpa: string; cgpa: string; status: string; results: any[] }>> = {
  "321126510001": {
      "1-1": { sgpa: "8.5", cgpa: "8.5", status: "pass", results: [ { subjectCode: "MA111", subjectName: "Calculus", grade: "A" }, ] },
      "1-2": { sgpa: "8.8", cgpa: "8.65", status: "pass", results: [ { subjectCode: "MA121", subjectName: "Differential Equations", grade: "A" }, ] },
      "2-1": { sgpa: "8.9", cgpa: "8.73", status: "pass", results: [ { subjectCode: "CS211", subjectName: "Data Structures", grade: "A+" }, ] },
  },
  "321126510003": {
      "2-1": { sgpa: "6.8", cgpa: "7.4", status: "fail", results: [ { subjectCode: "MA211", subjectName: "Linear Algebra", grade: "F" }, ] },
  }
};

export default function AdminStudentSemesterPage({ params: { rollNo, semester } }: { params: { rollNo: string, semester: string } }) {
  const [semesterData, setSemesterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data for the specific roll number and semester
    const fetchSemesterData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      const studentSemesters = allResultsData[rollNo];
      if (studentSemesters && studentSemesters[semester]) {
          setSemesterData(studentSemesters[semester]);
      } else {
          setSemesterData(null);
      }
      setIsLoading(false);
    }
    fetchSemesterData();
  }, [rollNo, semester]);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
  }

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
                  {semesterData.results.map((result: any) => (
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


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
import { notFound, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formatSubjectName } from "@/services/api";


const nonSubjectKeys = ["rollno", "sgpa", "cgpa", "section"];

const checkHasFGrade = (result: any | null): boolean => {
    if (!result) return false;
    for (const key in result) {
        if (!nonSubjectKeys.includes(key.toLowerCase())) {
            if (result[key] === 'F') {
                return true;
            }
        }
    }
    return false;
}

export default function SemesterResultPage() {
  const params = useParams();
  const semesterId = params.semester as string;

  const [semesterData, setSemesterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      const allResults = JSON.parse(storedData).results;
      const dataForSemester = allResults[semesterId];
      if (dataForSemester) {
         const hasFGrade = checkHasFGrade(dataForSemester);
         setSemesterData({
            ...dataForSemester,
            status: hasFGrade ? 'fail' : 'pass'
         });
      } else if (dataForSemester === null) {
        setSemesterData({ status: 'pending', results: [] });
      }
    }
    setIsLoading(false);
  }, [semesterId]);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-full min-h-[60vh]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    )
  }

  if (!semesterData) {
    notFound();
  }

  const results = Object.entries(semesterData)
    .filter(([key]) => !nonSubjectKeys.includes(key.toLowerCase()));

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
                )}>{semesterData.sgpa || '0.00'}</CardDescription>
             </div>
             <div>
                <CardTitle>CGPA</CardTitle>
                <CardDescription className="font-bold text-xl text-primary">{semesterData.cgpa || '0.00'}</CardDescription>
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
           {results.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map(([subject, grade]) => (
                    <TableRow key={subject}>
                      <TableCell className="font-medium">{formatSubjectName(subject)}</TableCell>
                      <TableCell className="p-2">
                        <div className="flex justify-end">
                            <Badge variant={grade === "F" ? "destructive" : "default"} className="w-10 h-8 flex items-center justify-center text-base">{String(grade)}</Badge>
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

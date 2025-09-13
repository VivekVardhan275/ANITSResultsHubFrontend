
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
import { getSemesterResults } from "@/services/api";

export default function AdminStudentSemesterPage({ params }: { params: { rollNo: string, semester: string } }) {
  const { rollNo, semester } = params;
  const [semesterData, setSemesterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSemesterData = async () => {
      setIsLoading(true);
      try {
        const data = await getSemesterResults(rollNo, semester);
        setSemesterData(data);
      } catch (error) {
        console.error("Failed to fetch semester results:", error);
        setSemesterData(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (rollNo && semester) {
        fetchSemesterData();
    }
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
                   semesterData.status.toLowerCase() === "passed" && "text-green-600 dark:text-green-400",
                   semesterData.status.toLowerCase() === "failed" && "text-red-600 dark:text-red-400",
                   semesterData.status.toLowerCase() === "pending" && "text-primary"
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
                   semesterData.status.toLowerCase() === "passed" && "text-green-600 dark:text-green-400",
                   semesterData.status.toLowerCase() === "failed" && "text-red-600 dark:text-red-400",
                   semesterData.status.toLowerCase() === "pending" && "text-primary"
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


"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import Link from 'next/link';
import { getStudentDetails } from "@/services/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

function StudentDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rollNo = params.rollNo as string;
  const department = searchParams.get("department");

  const [studentData, setStudentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (rollNo && department) {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getStudentDetails(rollNo, department);
          setStudentData(data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch student details.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      } else {
          setError("Roll number or department is missing.");
          setIsLoading(false);
      }
    };

    fetchData();
  }, [rollNo, department]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-bold text-destructive">Error</h2>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Button asChild className="mt-6">
            <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p className="text-muted-foreground">The student with roll number {rollNo} could not be found.</p>
        <Button asChild className="mt-6">
            <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
            <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
            </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-muted-foreground">Detailed view of student's academic record.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>{studentData.name}</CardTitle>
                    <CardDescription>{studentData.roll_no}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Department</h3>
                        <p className="text-muted-foreground">{studentData.department}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold">Section</h3>
                        <p className="text-muted-foreground">{studentData.section}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
           <Card>
                <CardHeader>
                    <CardTitle>Semester Results</CardTitle>
                    <CardDescription>
                        Summary of performance across all available semesters.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   {studentData.semesters && Object.keys(studentData.semesters).length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {Object.entries(studentData.semesters).map(([semester, details]: [string, any]) => (
                            <AccordionItem value={semester} key={semester}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full pr-4">
                                        <span className="font-medium">Semester {semester}</span>
                                        <div className="flex gap-4 items-center">
                                            <span className="text-sm">SGPA: {details.sgpa}</span>
                                            <Badge variant={details.status.toLowerCase() === "fail" ? "destructive" : "secondary"}>
                                                {details.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Subject Code</TableHead>
                                                <TableHead>Subject Name</TableHead>
                                                <TableHead className="text-right">Grade</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {details.subjects.map((subject: any) => (
                                                <TableRow key={subject.subject_code}>
                                                    <TableCell>{subject.subject_code}</TableCell>
                                                    <TableCell>{subject.subject_name}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Badge variant={subject.grade === "F" ? "destructive" : "default"}>{subject.grade}</Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                      </Accordion>
                   ) : (
                     <div className="text-center text-muted-foreground py-10">
                        No semester results are available for this student.
                    </div>
                   )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}


export default function AdminStudentDetailsPage() {
  return (
    <Suspense fallback={
        <div className="flex justify-center items-center h-full min-h-[50vh]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    }>
        <StudentDetailsContent />
    </Suspense>
  )
}


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { ArrowLeft, Loader2, ArrowRight } from "lucide-react";
import Link from 'next/link';

// Dummy data for a single student, to be replaced with API call
const dummyStudentDetails = {
    name: "ADARI MAHESWARI",
    rollNo: "A23126552001",
    department: "Computer Science & Engineering (AI & ML)",
    section: "CSM A",
    semesters: [
      { semester: "1-1", sgpa: "8.5", status: "pass", cgpa: "8.5" },
      { semester: "1-2", sgpa: "8.8", status: "pass", cgpa: "8.65" },
      { semester: "2-1", sgpa: "7.2", status: "fail", cgpa: "8.1" },
      { semester: "2-2", sgpa: "9.0", status: "pass", cgpa: "8.35" },
    ]
};

export default function AdminStudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const rollNo = params.rollNo as string;

  const [studentData, setStudentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data for the student
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // In a real app, you would fetch data based on the rollNo
      // For now, we'll check if the rollNo matches our dummy data
      if (rollNo === dummyStudentDetails.rollNo) {
          setStudentData(dummyStudentDetails);
      } else {
        // If not, create a new dummy object with the passed rollNo
        setStudentData({
            ...dummyStudentDetails,
            rollNo: rollNo,
            name: `Student ${rollNo}`
        });
      }
      setIsLoading(false);
    };

    if (rollNo) {
      fetchData();
    }
  }, [rollNo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p className="text-muted-foreground">The student with roll number {rollNo} could not be found.</p>
        <Button asChild className="mt-4">
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
                    <CardTitle>Student Information</CardTitle>
                    <CardDescription>Personal and academic details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Student Name</h3>
                        <p className="text-muted-foreground">{studentData.name}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold">Roll No</h3>
                        <p className="text-muted-foreground">{studentData.rollNo}</p>
                    </div>
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
                        Summary of performance across all semesters.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   {studentData.semesters.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Semester</TableHead>
                            <TableHead>SGPA</TableHead>
                            <TableHead>CGPA</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentData.semesters.map((sem: any) => (
                            <TableRow key={sem.semester}>
                                <TableCell className="font-medium">{sem.semester}</TableCell>
                                <TableCell>{sem.sgpa}</TableCell>
                                <TableCell>{sem.cgpa}</TableCell>
                                <TableCell>
                                    <Badge variant={sem.status.toLowerCase() === "fail" ? "destructive" : "secondary"}>
                                        {sem.status.charAt(0).toUpperCase() + sem.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/student/${rollNo}/${sem.semester}`}>
                                            View <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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

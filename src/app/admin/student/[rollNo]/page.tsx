
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
import { ArrowLeft } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";


// Mock data - replace with API call
const allStudentsData: Record<string, { name: string; department: string; section: string; semesters: any[] }> = {
    "321126510001": {
        name: "GANDI MANIKANTA",
        department: "Computer Science & Engineering",
        section: "A",
        semesters: [
            { semester: "1-1", sgpa: "8.5", status: "pass" },
            { semester: "1-2", sgpa: "8.8", status: "pass" },
            { semester: "2-1", sgpa: "8.9", status: "pass" },
        ]
    },
    "321126510002": {
        name: "IMMANUVEL",
        department: "Computer Science & Engineering",
        section: "A",
        semesters: [
            { semester: "1-1", sgpa: "8.2", status: "pass" },
            { semester: "1-2", sgpa: "8.1", status: "pass" },
            { semester: "2-1", sgpa: "7.5", status: "pass" },
        ]
    },
    "321126510003": {
        name: "ADARI MAHESWARI",
        department: "Computer Science & Engineering",
        section: "A",
        semesters: [
            { semester: "1-1", sgpa: "7.9", status: "pass" },
            { semester: "1-2", sgpa: "7.5", status: "pass" },
            { semester: "2-1", sgpa: "6.8", status: "fail" },
        ]
    },
};

export default function AdminStudentDetailsPage({ params: { rollNo } }: { params: { rollNo: string } }) {
  const router = useRouter();
  const [studentData, setStudentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll simulate a fetch from our mock data
    const fetchStudentData = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const data = allStudentsData[rollNo];
        if (data) {
            setStudentData(data);
        } else {
            // If you want to handle not found, you can set studentData to null
            setStudentData(null);
        }
        setIsLoading(false);
    }
    fetchStudentData();
  }, [rollNo]);

  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
      )
  }

  if (!studentData) {
    notFound();
  }

  const handleRowClick = (semester: string) => {
    router.push(`/admin/student/${rollNo}/${semester}`);
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
            <p className="text-muted-foreground">
              Detailed academic performance for {studentData.name} ({rollNo}).
            </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Personal and academic details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <h3 className="font-semibold">Student Name</h3>
                    <p className="text-muted-foreground">{studentData.name}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Roll No</h3>
                    <p className="text-muted-foreground">{rollNo}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Department</h3>
                    <p className="text-muted-foreground">{studentData.department}</p>
                </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold">Section</h3>
                    <p className="text-muted-foreground">{studentData.section}</p>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Semester Results</CardTitle>
          <CardDescription>
            A summary of performance across all semesters. Click a row to view details.
          </CardDescription>
        </CardHeader>
        <CardContent>
           {studentData.semesters.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>SGPA</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.semesters.map((sem: any) => (
                    <TableRow 
                        key={sem.semester} 
                        className="cursor-pointer" 
                        onClick={() => handleRowClick(sem.semester)}
                    >
                        <TableCell className="font-medium">{sem.semester}</TableCell>
                        <TableCell>{sem.sgpa}</TableCell>
                        <TableCell>
                            <Badge variant={sem.status === "fail" ? "destructive" : "secondary"}>
                                {sem.status.charAt(0).toUpperCase() + sem.status.slice(1)}
                            </Badge>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           ) : (
             <div className="text-center text-muted-foreground py-10">
                No results are available for this student.
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

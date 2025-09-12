
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const semesterData = [
  { semester: "1-1", sgpa: "8.5", status: "pass" },
  { semester: "1-2", sgpa: "8.8", status: "pass" },
  { semester: "2-1", sgpa: "7.2", status: "fail" },
  { semester: "2-2", sgpa: "9.0", status: "pass" },
  { semester: "3-1", sgpa: "8.7", status: "pass" },
  { semester: "3-2", sgpa: "8.9", status: "pass" },
  { semester: "4-1", sgpa: "0.00", status: "pending" },
  { semester: "4-2", sgpa: "0.00", status: "pending" },
];

export default function StudentDashboardPage() {
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    const storedRollNo = localStorage.getItem("studentRollNo");
    if (storedRollNo) {
      setRollNo(storedRollNo);
    }
  }, []);

  return (
    <div className="space-y-8 animate-slide-in-from-bottom">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {rollNo || "Student"}!</h1>
        <p className="text-muted-foreground">
          Here are your results for all semesters. Click on a card to view details.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {semesterData.map((sem, index) => (
          <Link href={`/student/results/${sem.semester}`} key={sem.semester}>
            <Card
              style={{ animationDelay: `${index * 100}ms` }}
              className={cn(
                "hover:shadow-lg transition-all duration-200 h-full flex flex-col group animate-slide-in-from-bottom",
                sem.status === "pass" &&
                  "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/50 dark:to-emerald-950/50 hover:border-green-500",
                sem.status === "fail" &&
                  "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/50 dark:to-rose-950/50 hover:border-red-500",
                sem.status === "pending" && "hover:border-primary/50"
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{sem.semester} Semester</CardTitle>
                    <CardDescription
                      className={cn(
                        sem.status === "pass" && "text-green-800 dark:text-green-300",
                        sem.status === "fail" && "text-red-800 dark:text-red-300"
                      )}
                    >
                      View your results
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">SGPA</p>
                    <p
                      className={cn(
                        "text-3xl font-bold",
                        sem.status === "pass" && "text-green-600 dark:text-green-400",
                        sem.status === "fail" && "text-red-600 dark:text-red-400",
                        sem.status === "pending" && "text-primary"
                      )}
                    >
                      {sem.sgpa}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {sem.status === "pass" && (
                    <>
                      <CircleCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-700 dark:text-green-300">Passed</span>
                    </>
                  )}
                  {sem.status === "fail" && (
                    <>
                      <CircleAlert className="h-5 w-5 text-red-600 dark:text-red-400" />
                       <span className="font-medium text-red-700 dark:text-red-300">Failed</span>
                    </>
                  )}
                   {sem.status === "pending" && (
                    <span>Results pending</span>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 text-primary/50 group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

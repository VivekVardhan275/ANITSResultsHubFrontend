
"use client";

import { useEffect, useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const facultySubjectsData = [
  {
    year: "2023-24",
    semester: "2-1",
    subjectName: "Data Structures",
    subjectCode: "CS211",
    classes: [
      {
        className: "2-1 CSE",
        totalStudents: 60,
        studentsPassed: 52,
      },
      {
        className: "2-1 IT",
        totalStudents: 55,
        studentsPassed: 48,
      },
    ],
  },
  {
    year: "2023-24",
    semester: "3-2",
    subjectName: "Compiler Design",
    subjectCode: "CS321",
    classes: [
      {
        className: "3-2 CSE",
        totalStudents: 62,
        studentsPassed: 58,
      },
    ],
  },
  {
    year: "2023-24",
    semester: "3-2",
    subjectName: "Web Technologies",
    subjectCode: "CS324",
    classes: [
      {
        className: "3-2 CSE",
        totalStudents: 62,
        studentsPassed: 60,
      },
      {
        className: "3-2 IT",
        totalStudents: 58,
        studentsPassed: 50,
      },
    ],
  },
  {
    year: "2022-23",
    semester: "1-1",
    subjectName: "Programming in C",
    subjectCode: "CS111",
    classes: [
      {
        className: "1-1 ECE",
        totalStudents: 70,
        studentsPassed: 65,
      },
    ],
  },
];

const availableYears = ["A21", "A22", "A23", "A24", "A25"];
const availableSemesters = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

export default function FacultyDashboardPage() {
  const [selectedYear, setSelectedYear] = useState("--");
  const [selectedSemester, setSelectedSemester] = useState("--");
  const [facultyName, setFacultyName] = useState("Faculty");

  useEffect(() => {
    const storedUsername = localStorage.getItem("facultyUsername");
    if (storedUsername) {
      setFacultyName(storedUsername);
    }
  }, []);

  const filteredData = facultySubjectsData.filter(
    (data) => (selectedYear === '--' || true) && (selectedSemester === '--' || data.semester === selectedSemester)
  );

  return (
    <div className="space-y-8 animate-slide-in-from-bottom">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {facultyName}!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your subject performance.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="grid gap-2">
                <Label htmlFor="year-select">Batch</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year-select" className="w-[180px]">
                        <SelectValue placeholder="Select Batch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="--">--</SelectItem>
                        {availableYears.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="semester-select">Semester</Label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger id="semester-select" className="w-[180px]">
                        <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="--">--</SelectItem>
                         {availableSemesters.map(sem => (
                            <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </div>

      {(selectedYear !== '--' || selectedSemester !== '--') && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredData.map((subject) => {
            const totalStudents = subject.classes.reduce(
              (acc, curr) => acc + curr.totalStudents,
              0
            );
            const totalPassed = subject.classes.reduce(
              (acc, curr) => acc + curr.studentsPassed,
              0
            );
            const overallPassPercentage =
              totalStudents > 0 ? (totalPassed / totalStudents) * 100 : 0;

            return (
              <Card key={subject.subjectCode}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{subject.subjectName}</CardTitle>
                      <CardDescription>{subject.subjectCode}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">
                        Overall Pass Rate
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {overallPassPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Passed / Total</TableHead>
                        <TableHead className="w-[120px]">Pass %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subject.classes.map((cls) => {
                        const passPercentage =
                          (cls.studentsPassed / cls.totalStudents) * 100;
                        return (
                          <TableRow key={cls.className}>
                            <TableCell className="font-medium">
                              {cls.className}
                            </TableCell>
                            <TableCell>
                              {cls.studentsPassed} / {cls.totalStudents}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={passPercentage}
                                  className="h-2 flex-1"
                                />
                                <span className="text-xs text-muted-foreground w-10 text-right">
                                  {passPercentage.toFixed(0)}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
                <p>Please select a batch or semester to see performance data.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

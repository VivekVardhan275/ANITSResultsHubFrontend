
"use client";

import { useState, useMemo } from "react";
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
    facultyName: "Dr. Anand Kumar",
    department: "CSE",
    section: "A",
    className: "2-1 CSE-A",
    totalStudents: 60,
    studentsPassed: 52,
  },
  {
    year: "2023-24",
    semester: "2-1",
    subjectName: "Data Structures",
    subjectCode: "CS211",
    facultyName: "Dr. Anand Kumar",
    department: "IT",
    section: "A",
    className: "2-1 IT-A",
    totalStudents: 55,
    studentsPassed: 48,
  },
  {
    year: "2023-24",
    semester: "3-2",
    subjectName: "Compiler Design",
    subjectCode: "CS321",
    facultyName: "Dr. Sunita Sharma",
    department: "CSE",
    section: "A",
    className: "3-2 CSE-A",
    totalStudents: 62,
    studentsPassed: 58,
  },
  {
    year: "2023-24",
    semester: "3-2",
    subjectName: "Web Technologies",
    subjectCode: "CS324",
    facultyName: "Prof. Rajesh Singh",
    department: "CSE",
    section: "A",
    className: "3-2 CSE-A",
    totalStudents: 62,
    studentsPassed: 60,
  },
  {
    year: "2023-24",
    semester: "3-2",
    subjectName: "Web Technologies",
    subjectCode: "CS324",
    facultyName: "Prof. Rajesh Singh",
    department: "IT",
    section: "B",
    className: "3-2 IT-B",
    totalStudents: 58,
    studentsPassed: 50,
  },
  {
    year: "2022-23",
    semester: "1-1",
    subjectName: "Programming in C",
    subjectCode: "CS111",
    facultyName: "Dr. Priya Mehta",
    department: "ECE",
    section: "C",
    className: "1-1 ECE-C",
    totalStudents: 70,
    studentsPassed: 65,
  },
  {
    year: "2023-24",
    semester: "2-1",
    subjectName: "Operating Systems",
    subjectCode: "CS214",
    facultyName: "Dr. Sunita Sharma",
    department: "IT",
    section: "A",
    className: "2-1 IT-A",
    totalStudents: 58,
    studentsPassed: 55,
  },
];


const academicYears = ["--", "A21", "A22", "A23", "A24", "A25"];
const semesters = ["--", "1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
const departments = ["--", "CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "General", "CSM"];
const sections = ["--", "A", "B", "C", "D"];


export default function AdminFacultyViewPage() {
  const [selectedYear, setSelectedYear] = useState("--");
  const [selectedSemester, setSelectedSemester] = useState("--");
  const [selectedDepartment, setSelectedDepartment] = useState("--");
  const [selectedSection, setSelectedSection] = useState("--");

  const filteredData = useMemo(() => {
    if (selectedYear === '--' && selectedSemester === '--' && selectedDepartment === '--' && selectedSection === '--') {
      return [];
    }
    return facultySubjectsData.filter(
      (data) =>
        (selectedYear === "--" || true) && // The data uses a different year format, so we ignore this for now.
        (selectedSemester === "--" || data.semester === selectedSemester) &&
        (selectedDepartment === "--" || data.department === selectedDepartment) &&
        (selectedSection === "--" || data.section === selectedSection)
    );
  }, [selectedYear, selectedSemester, selectedDepartment, selectedSection]);

  const performanceByFaculty = useMemo(() => {
    const facultyMap = new Map<string, { subjects: any[], totalStudents: number, totalPassed: number }>();
    
    filteredData.forEach(item => {
        if (!facultyMap.has(item.facultyName)) {
            facultyMap.set(item.facultyName, { subjects: [], totalStudents: 0, totalPassed: 0 });
        }
        const facultyData = facultyMap.get(item.facultyName)!;
        facultyData.subjects.push(item);
        facultyData.totalStudents += item.totalStudents;
        facultyData.totalPassed += item.studentsPassed;
    });

    return Array.from(facultyMap.entries()).map(([name, data]) => ({
        facultyName: name,
        ...data
    }));

  }, [filteredData]);


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Faculty Performance</h1>
        <p className="text-muted-foreground">
          View subject performance by applying filters.
        </p>
      </div>
      <div className="flex justify-center items-center gap-6 flex-wrap">
          <div className="grid gap-2">
              <Label htmlFor="year-select">Academic Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="year-select" className="w-[180px]">
                      <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                      {academicYears.map(year => (
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
                        {semesters.map(sem => (
                          <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
          <div className="grid gap-2">
              <Label htmlFor="department-select">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger id="department-select" className="w-[180px]">
                      <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                        {departments.map(dep => (
                          <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
            <div className="grid gap-2">
              <Label htmlFor="section-select">Section</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger id="section-select" className="w-[180px]">
                      <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                        {sections.map(sec => (
                          <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
      </div>

      {performanceByFaculty.length > 0 ? (
        <div className="space-y-8">
          {performanceByFaculty.map((faculty) => {
            const overallPassPercentage =
              faculty.totalStudents > 0
                ? (faculty.totalPassed / faculty.totalStudents) * 100
                : 0;

            return (
              <Card key={faculty.facultyName}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{faculty.facultyName}</CardTitle>
                      <CardDescription>Performance Summary</CardDescription>
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
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Passed / Total</TableHead>
                        <TableHead className="w-[120px]">Pass %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faculty.subjects.map((subject) => {
                        const passPercentage =
                          (subject.studentsPassed / subject.totalStudents) * 100;
                        return (
                          <TableRow key={`${subject.subjectCode}-${subject.className}`}>
                            <TableCell className="font-medium">
                              {subject.subjectName} ({subject.subjectCode})
                            </TableCell>
                            <TableCell>{subject.className}</TableCell>
                            <TableCell>
                              {subject.studentsPassed} / {subject.totalStudents}
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
                <p>Please select filters to view faculty performance data.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

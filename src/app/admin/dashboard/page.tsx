
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const resultsData = {
  "A21": {
    "2-1": {
      "CSE-A": [
        { rollNo: "321126510001", name: "Student A", sgpa: "8.9", status: "pass" },
        { rollNo: "321126510002", name: "Student B", sgpa: "7.5", status: "pass" },
        { rollNo: "321126510003", name: "Student C", sgpa: "6.8", status: "fail" },
      ],
      "CSE-B": [
        { rollNo: "321126510061", name: "Student X", sgpa: "9.2", status: "pass" },
        { rollNo: "321126510062", name: "Student Y", sgpa: "8.1", status: "pass" },
      ],
      "IT-A": [
        { rollNo: "321126520001", name: "Student P", sgpa: "8.5", status: "pass" },
      ]
    },
    "3-2": {
      "CSE-A": [
        { rollNo: "320126510001", name: "Student D", sgpa: "9.1", status: "pass" },
      ]
    }
  },
  "A22": {
    "1-1": {
      "IT-A": [
        { rollNo: "422126510001", name: "Student E", sgpa: "8.0", status: "pass" },
      ]
    }
  }
};

const years = Object.keys(resultsData);
const semesters = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
const departments = ["CSE", "IT", "ECE"];

export default function AdminDashboardPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[2]);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedSection, setSelectedSection] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const sectionsForDepartment = useMemo(() => {
    const semesterResults = resultsData[selectedYear]?.[selectedSemester] || {};
    const allSections = Object.keys(semesterResults);
    const filteredSections = allSections.filter(sec => sec.startsWith(selectedDepartment));
    return ["All", ...filteredSections.map(sec => sec.split('-')[1])];
  }, [selectedYear, selectedSemester, selectedDepartment]);

  const displayedResults = useMemo(() => {
    const semesterResults = resultsData[selectedYear]?.[selectedSemester] || {};
    
    let resultsToDisplay;

    if (selectedSection === "All") {
        resultsToDisplay = Object.keys(semesterResults)
            .filter(key => key.startsWith(selectedDepartment))
            .flatMap(key => semesterResults[key]);
    } else {
        const sectionKey = `${selectedDepartment}-${selectedSection}`;
        resultsToDisplay = semesterResults[sectionKey] || [];
    }

    if (searchTerm) {
        return resultsToDisplay.filter(student =>
            student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    return resultsToDisplay;
  }, [selectedYear, selectedSemester, selectedDepartment, selectedSection, searchTerm]);
  
  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setSelectedSection("All");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Results</h1>
          <p className="text-muted-foreground">
            View student academic performance by filtering options.
          </p>
        </div>
        <div className="flex items-end gap-4 flex-wrap">
            <div className="grid gap-2">
                <Label htmlFor="year-select">Admission Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year-select" className="w-[180px]">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(year => (
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
                <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
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
                         {sectionsForDepartment.map(sec => (
                            <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Results for {selectedYear} - {selectedSemester} - {selectedDepartment} - {selectedSection}</CardTitle>
              <CardDescription className="mt-1">
                A list of all students and their SGPA for the selected term.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by Roll No..."
                className="pl-9 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>SGPA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedResults.length > 0 ? (
                displayedResults.map((student) => (
                  <TableRow key={student.rollNo}>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.sgpa}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "fail" ? "destructive" : "secondary"}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                        No results found for the selected criteria.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

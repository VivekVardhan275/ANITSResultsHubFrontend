
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { getFacultyPerformance } from "@/services/api";
import { AlertTriangle, Loader2 } from "lucide-react";

const academicYears = ["--", "A21", "A22", "A23", "A24", "A25"];
const semesters = ["--", "1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
const departments = ["--", "CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "CSM"];

const formatSubjectName = (subjectKey: string) => {
  return subjectKey
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const processSectionData = (sectionData: any) => {
    const processed: { [key: string]: string | number } = {};
    const subjects: { [key: string]: { pass?: number, fail?: number } } = {};

    for (const [key, value] of Object.entries(sectionData)) {
        if (key.endsWith('_pass') || key.endsWith('_fail')) {
            const isPass = key.endsWith('_pass');
            const subjectName = isPass ? key.slice(0, -5) : key.slice(0, -5);
            
            if (!subjects[subjectName]) {
                subjects[subjectName] = {};
            }

            if (isPass) {
                subjects[subjectName].pass = Number(value);
            } else {
                subjects[subjectName].fail = Number(value);
            }
        } else if (key !== 'section') {
            processed[formatSubjectName(key)] = String(value);
        }
    }

    for (const [subjectName, counts] of Object.entries(subjects)) {
        const passCount = counts.pass ?? 0;
        const failCount = counts.fail ?? 0;
        processed[formatSubjectName(subjectName)] = `${passCount} / ${failCount}`;
    }

    return processed;
};


export default function AdminFacultyViewPage() {
  const [selectedBatch, setSelectedBatch] = useState("--");
  const [selectedSemester, setSelectedSemester] = useState("--");
  const [selectedDepartment, setSelectedDepartment] = useState("--");
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (selectedBatch !== '--' && selectedSemester !== '--' && selectedDepartment !== '--') {
        setIsLoading(true);
        setError(null);
        setPerformanceData([]);
        try {
          const data = await getFacultyPerformance(selectedBatch, selectedSemester, selectedDepartment);
          setPerformanceData(data || []);
        } catch (err: any) {
          setError(err.message || "Failed to fetch performance data.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setPerformanceData([]);
      }
    };
    fetchPerformanceData();
  }, [selectedBatch, selectedSemester, selectedDepartment]);

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
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
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
      </div>

       {isLoading ? (
        <div className="flex justify-center items-center h-40">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card>
            <CardContent className="p-10 text-center text-destructive flex flex-col items-center gap-4">
                <AlertTriangle className="h-8 w-8" />
                <p className="font-semibold">Error loading data</p>
                <p className="text-sm text-muted-foreground">{error}</p>
            </CardContent>
        </Card>
      ) : performanceData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {performanceData.map((sectionData, index) => {
                const processedData = processSectionData(sectionData);
                return (
                    <Card key={sectionData.section || index}>
                        <CardHeader>
                            <CardTitle>Section: {sectionData.section}</CardTitle>
                            <CardDescription>Detailed performance metrics for this section.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Metric</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(processedData).map(([key, value]) => (
                                         <TableRow key={key}>
                                            <TableCell className="font-medium">{key}</TableCell>
                                            <TableCell>{String(value)}</TableCell>
                                        </TableRow>
                                    ))}
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
                <p>Please select all filters to view faculty performance data.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

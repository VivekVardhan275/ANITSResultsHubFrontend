
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
import { cn } from "@/lib/utils";

const academicYears = ["--", "A21", "A22", "A23", "A24", "A25"];
const semesters = ["--", "1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
const departments = ["--", "CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "CSM"];

const processDataForVerticalTable = (data: any[]) => {
  if (!data || data.length === 0) {
    return { headers: [], rows: [] };
  }

  const uniqueSections = [...new Set(data.map(d => d.section))];
  const metrics: { [key: string]: { [section: string]: string } } = {};
  const metricOrder: string[] = [];

  // Get all possible keys from the first entry to define the row order
  if (data[0]) {
    for (const key in data[0]) {
      if (key !== 'section') {
        metricOrder.push(key);
      }
    }
  }

  // Populate metrics
  metricOrder.forEach(key => {
    metrics[key] = {};
    data.forEach(sectionData => {
      metrics[key][sectionData.section] = sectionData[key];
    });
  });
  
  return {
    headers: ["Metric", ...uniqueSections],
    rows: metricOrder.map(metric => ({
      metric,
      ...metrics[metric]
    }))
  };
};

export default function FacultyDashboardPage() {
  const [selectedBatch, setSelectedBatch] = useState("--");
  const [selectedSemester, setSelectedSemester] = useState("--");
  const [selectedDepartment, setSelectedDepartment] = useState("--");
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facultyName, setFacultyName] = useState("Faculty");

  useEffect(() => {
    const storedUsername = localStorage.getItem("facultyUsername");
    if (storedUsername) {
      setFacultyName(storedUsername);
    }
  }, []);

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

  const { headers, rows } = useMemo(() => processDataForVerticalTable(performanceData), [performanceData]);

  return (
    <div className="space-y-8 animate-slide-in-from-bottom">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {facultyName}!</h1>
        <p className="text-muted-foreground">
          View subject performance by applying filters.
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 flex-wrap">
          <div className="grid gap-2">
              <Label htmlFor="year-select">Batch</Label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger id="year-select" className="w-[180px]">
                      <SelectValue placeholder="Select Batch" />
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
        <Card>
          <CardHeader>
            <CardTitle>Detailed Section Data</CardTitle>
            <CardDescription>A breakdown of performance metrics for each section.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    {headers.map(header => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                    <TableRow
                        key={row.metric}
                        className={cn(
                        (index >= rows.length - 2) &&
                            "font-bold bg-yellow-200 dark:bg-yellow-800/30 hover:bg-yellow-300 dark:hover:bg-yellow-800/40"
                        )}
                    >
                        <TableCell className="font-medium">{row.metric}</TableCell>
                        {headers.slice(1).map(sectionName => (
                            <TableCell key={sectionName}>{row[sectionName] ?? '--'}</TableCell>
                        ))}
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
                <p>Please select batch, semester, and department to view faculty performance data.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

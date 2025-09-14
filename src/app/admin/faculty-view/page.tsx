
"use client";

import { useState, useMemo, useEffect } from "react";
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"

const academicYears = ["--", "A21", "A22", "A23", "A24", "A25"];
const semesters = ["--", "1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
const departments = ["--", "CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "CSM"];
const COLORS = ["hsl(var(--chart-1))", "hsl(var(--destructive))"];

const SUBJECT_MAP: { [key: string]: string } = {
    "la_m": "Linear Algebra & Calculus",
    "ce": "Communicative English",
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

  const chartData = useMemo(() => {
    if (!performanceData || performanceData.length === 0) return [];
    
    const subjectStats: { [key: string]: { name: string, passed: number, failed: number } } = {};

    performanceData.forEach(section => {
        Object.keys(SUBJECT_MAP).forEach(subjectKey => {
            const passKey = `${subjectKey}_pass`;
            const failKey = `${subjectKey}_fail`;

            if (section[passKey] && section[failKey]) {
                if (!subjectStats[subjectKey]) {
                    subjectStats[subjectKey] = { name: SUBJECT_MAP[subjectKey], passed: 0, failed: 0 };
                }
                subjectStats[subjectKey].passed += parseInt(section[passKey]);
                subjectStats[subjectKey].failed += parseInt(section[failKey]);
            }
        });
    });

    return Object.values(subjectStats).map(stat => ({
        name: stat.name,
        passPercentage: stat.passed + stat.failed > 0 ? (stat.passed / (stat.passed + stat.failed)) * 100 : 0
    }));

  }, [performanceData]);

  const pieChartDataBySection = useMemo(() => {
    if (!performanceData || performanceData.length === 0) return {};
    
    const sectionPies: { [key: string]: any[] } = {};

    performanceData.forEach(section => {
        let totalPassed = 0;
        let totalFailed = 0;
        Object.keys(SUBJECT_MAP).forEach(subjectKey => {
            totalPassed += parseInt(section[`${subjectKey}_pass`] || '0');
            totalFailed += parseInt(section[`${subjectKey}_fail`] || '0');
        });
        
        sectionPies[section.section] = [
            { name: "Passed", value: totalPassed, color: "hsl(var(--chart-1))" },
            { name: "Failed", value: totalFailed, color: "hsl(var(--destructive))" },
        ];
    });

    return sectionPies;

  }, [performanceData]);

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
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Overall pass percentage by subject for the selected criteria.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="min-h-[200px] w-full">
                        <BarChart data={chartData} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis unit="%" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="passPercentage" fill="hsl(var(--chart-1))" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(pieChartDataBySection).map(([section, data]) => (
                   <Card key={section}>
                       <CardHeader>
                           <CardTitle>Section {section}: Pass/Fail Ratio</CardTitle>
                           <CardDescription>Overall student pass vs. fail distribution.</CardDescription>
                       </CardHeader>
                       <CardContent>
                           <ChartContainer config={{}} className="h-[250px]">
                               <PieChart>
                                   <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                   <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                     {data.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                     ))}
                                   </Pie>
                                   <ChartLegend content={<ChartLegendContent />} />
                               </PieChart>
                           </ChartContainer>
                       </CardContent>
                   </Card>
                ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Section Data</CardTitle>
                <CardDescription>A breakdown of performance metrics for each section.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Section</TableHead>
                             {Object.values(SUBJECT_MAP).map(subj => (
                                <TableHead key={subj}>{subj} (Pass/Fail)</TableHead>
                            ))}
                            <TableHead>Total Students</TableHead>
                            <TableHead>SGPA</TableHead>
                            <TableHead>CGPA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {performanceData.map(section => (
                            <TableRow key={section.section}>
                                <TableCell className="font-medium">{section.section}</TableCell>
                                 {Object.keys(SUBJECT_MAP).map(subjKey => (
                                    <TableCell key={subjKey}>{section[`${subjKey}_pass`]} / {section[`${subjKey}_fail`]}</TableCell>
                                ))}
                                <TableCell>{section.total_students}</TableCell>
                                <TableCell>{section.in_1_1_sgpa}</TableCell>
                                <TableCell>{section.till_1_1_cgpa}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>

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

    
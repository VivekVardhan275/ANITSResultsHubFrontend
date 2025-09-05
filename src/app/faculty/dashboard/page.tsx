

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

const facultySubjectsData = [
  {
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
    ]
  }
];

export default function FacultyDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Faculty!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your subject performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {facultySubjectsData.map((subject) => {
          const totalStudents = subject.classes.reduce((acc, curr) => acc + curr.totalStudents, 0);
          const totalPassed = subject.classes.reduce((acc, curr) => acc + curr.studentsPassed, 0);
          const overallPassPercentage = totalStudents > 0 ? (totalPassed / totalStudents) * 100 : 0;

          return (
            <Card key={subject.subjectCode}>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{subject.subjectName}</CardTitle>
                        <CardDescription>{subject.subjectCode}</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Overall Pass Rate</p>
                        <p className="text-2xl font-bold text-primary">{overallPassPercentage.toFixed(1)}%</p>
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
                      const passPercentage = (cls.studentsPassed / cls.totalStudents) * 100;
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
                               <Progress value={passPercentage} className="h-2 flex-1" />
                               <span className="text-xs text-muted-foreground w-10 text-right">{passPercentage.toFixed(0)}%</span>
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
    </div>
  );
}

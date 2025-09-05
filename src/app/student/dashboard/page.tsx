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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const semesterData = [
  {
    semester: "1-1",
    sgpa: "8.5",
    results: [
      { subjectCode: "MA111", subjectName: "Calculus", grade: "A", credits: 4 },
      { subjectCode: "PH111", subjectName: "Physics", grade: "B+", credits: 3 },
    ]
  },
  {
    semester: "1-2",
    sgpa: "8.8",
    results: [
        { subjectCode: "MA121", subjectName: "Differential Equations", grade: "A", credits: 4 },
        { subjectCode: "CY121", subjectName: "Chemistry", grade: "A", credits: 3 },
    ]
  },
    {
    semester: "2-1",
    sgpa: "9.1",
    results: [
        { subjectCode: "CS211", subjectName: "Data Structures", grade: "A+", credits: 4 },
        { subjectCode: "EC211", subjectName: "Digital Logic", grade: "A", credits: 3 },
    ]
  },
  {
    semester: "2-2",
    sgpa: "9.0",
     results: [
        { subjectCode: "CS221", subjectName: "Algorithms", grade: "A+", credits: 4 },
        { subjectCode: "EE221", subjectName: "Basic Electrical Engg.", grade: "B+", credits: 3 },
    ]
  },
    {
    semester: "3-1",
    sgpa: "8.7",
    results: [
        { subjectCode: "CS311", subjectName: "Database Systems", grade: "A", credits: 4 },
        { subjectCode: "CS312", subjectName: "Operating Systems", grade: "B+", credits: 4 },
    ]
  },
  {
    semester: "3-2",
    sgpa: "8.9",
    results: [
      { subjectCode: "CS321", subjectName: "Compiler Design", grade: "A", credits: 3 },
      { subjectCode: "CS322", subjectName: "Operating Systems", grade: "B", credits: 4 },
      { subjectCode: "CS323", subjectName: "Computer Networks", grade: "A+", credits: 4 },
    ]
  },
    {
    semester: "4-1",
    sgpa: "0.00",
    results: []
  },
    {
    semester: "4-2",
    sgpa: "0.00",
    results: []
  }
];


export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Student!</h1>
        <p className="text-muted-foreground">
          Here are your results for all semesters.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {semesterData.map((sem) => (
            <Card key={sem.semester}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{sem.semester} Semester</CardTitle>
                            <CardDescription>Your academic performance.</CardDescription>
                        </div>
                         <div className="text-right">
                            <p className="text-muted-foreground">SGPA</p>
                            <p className="text-3xl font-bold text-primary">{sem.sgpa}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {sem.results.length > 0 ? (
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>View Results</AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject</TableHead>
                                        <TableHead className="text-right">Grade</TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {sem.results.map((result) => (
                                        <TableRow key={result.subjectCode}>
                                        <TableCell>
                                            <div className="font-medium">{result.subjectName}</div>
                                            <div className="text-sm text-muted-foreground">{result.subjectCode}</div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="default" className="w-8 h-8 flex items-center justify-center text-base">{result.grade}</Badge>
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    ) : (
                        <div className="text-center text-muted-foreground py-4">
                            Results for this semester are not yet available.
                        </div>
                    )}
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

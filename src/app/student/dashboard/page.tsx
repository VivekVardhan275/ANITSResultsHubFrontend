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

const results = [
  { subjectCode: "CS321", subjectName: "Compiler Design", grade: "A", credits: 3 },
  { subjectCode: "CS322", subjectName: "Operating Systems", grade: "B", credits: 4 },
  { subjectCode: "CS323", subjectName: "Computer Networks", grade: "A+", credits: 4 },
  { subjectCode: "MA321", subjectName: "Probability & Statistics", grade: "C", credits: 3 },
  { subjectCode: "HS321", subjectName: "Management Science", grade: "B+", credits: 3 },
];

const gradePoints: { [key: string]: number } = { "A+": 10, "A": 9, "B+": 8, "B": 7, "C": 6, "D": 5, "F": 0 };


export default function StudentDashboardPage() {
    const totalCredits = results.reduce((sum, r) => sum + r.credits, 0);
    const totalPoints = results.reduce((sum, r) => sum + (gradePoints[r.grade] || 0) * r.credits, 0);
    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Student!</h1>
        <p className="text-muted-foreground">
          Here are your results for the current semester.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Semester Results</CardTitle>
                <CardDescription>
                    Your academic performance for the 6th Semester.
                </CardDescription>
            </div>
            <div className="text-right">
                <p className="text-muted-foreground">SGPA</p>
                <p className="text-3xl font-bold text-primary">{sgpa}</p>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Code</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead className="text-center">Credits</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.subjectCode}>
                  <TableCell className="font-medium">{result.subjectCode}</TableCell>
                  <TableCell>{result.subjectName}</TableCell>
                  <TableCell className="text-center">{result.credits}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="w-8 h-8 flex items-center justify-center text-base">{result.grade}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

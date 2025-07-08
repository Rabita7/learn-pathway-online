
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EthiopianStudent } from '@/types/ethiopian-education';
import { Users, BookOpen, Loader } from 'lucide-react';

interface StudentGrade {
  studentId: string;
  test: number;
  assignment: number;
  midexam: number;
  finalexam: number;
  result: number;
}

interface StudentGradeTableProps {
  students: EthiopianStudent[];
  grades: StudentGrade[];
  subject: string;
  gradeLevel: string;
  section: string;
  term: string;
  isLoading?: boolean;
  onGradeChange: (studentId: string, field: keyof Omit<StudentGrade, 'studentId' | 'result'>, value: number) => void;
  getStudentGrade: (studentId: string) => StudentGrade;
  getLetterGrade: (percentage: number) => string;
  getGradeColor: (percentage: number) => string;
}

const StudentGradeTable: React.FC<StudentGradeTableProps> = ({
  students,
  grades,
  subject,
  gradeLevel,
  section,
  term,
  isLoading = false,
  onGradeChange,
  getStudentGrade,
  getLetterGrade,
  getGradeColor,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader className="h-5 w-5 animate-spin text-teacher" />
            Loading Grades...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teacher" />
            {subject} Grades - {term}
          </span>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {students.length} Students
            </Badge>
            {gradeLevel !== 'all' && (
              <Badge variant="secondary">
                Grade {gradeLevel} {section !== 'all' ? `- Section ${section}` : ''}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px] font-semibold">Student Name</TableHead>
                  <TableHead className="w-[80px] text-center font-semibold">Section</TableHead>
                  <TableHead className="w-[100px] text-center font-semibold">
                    Test
                    <div className="text-xs text-muted-foreground font-normal">(20%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center font-semibold">
                    Assignment
                    <div className="text-xs text-muted-foreground font-normal">(20%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center font-semibold">
                    Mid Exam
                    <div className="text-xs text-muted-foreground font-normal">(30%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center font-semibold">
                    Final Exam
                    <div className="text-xs text-muted-foreground font-normal">(30%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center font-semibold">
                    Result
                    <div className="text-xs text-muted-foreground font-normal">(100%)</div>
                  </TableHead>
                  <TableHead className="w-[80px] text-center font-semibold">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => {
                  const studentGrade = getStudentGrade(student.id);
                  const letterGrade = getLetterGrade(studentGrade.result);
                  
                  return (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{student.section}</Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={studentGrade.test || ''}
                          onChange={(e) => onGradeChange(student.id, 'test', Number(e.target.value))}
                          className="w-full text-center border-gray-300 focus:border-teacher focus:ring-teacher/20"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={studentGrade.assignment || ''}
                          onChange={(e) => onGradeChange(student.id, 'assignment', Number(e.target.value))}
                          className="w-full text-center border-gray-300 focus:border-teacher focus:ring-teacher/20"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={studentGrade.midexam || ''}
                          onChange={(e) => onGradeChange(student.id, 'midexam', Number(e.target.value))}
                          className="w-full text-center border-gray-300 focus:border-teacher focus:ring-teacher/20"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={studentGrade.finalexam || ''}
                          onChange={(e) => onGradeChange(student.id, 'finalexam', Number(e.target.value))}
                          className="w-full text-center border-gray-300 focus:border-teacher focus:ring-teacher/20"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getGradeColor(studentGrade.result)} font-medium`}>
                          {studentGrade.result}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={letterGrade === 'F' ? "destructive" : "default"}
                          className="font-bold"
                        >
                          {letterGrade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
            <p className="text-gray-500">
              {!subject || subject === 'all' 
                ? 'Please select a subject to view students and enter grades.'
                : 'No students found for the selected criteria. Try adjusting your filters.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentGradeTable;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EthiopianStudent } from '@/types/ethiopian-education';
import { Users, BookOpen } from 'lucide-react';

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
  onGradeChange: (studentId: string, field: keyof Omit<StudentGrade, 'studentId' | 'result'>, value: number) => void;
}

const StudentGradeTable: React.FC<StudentGradeTableProps> = ({
  students,
  grades,
  subject,
  gradeLevel,
  section,
  term,
  onGradeChange,
}) => {
  const getStudentGrade = (studentId: string): StudentGrade => {
    return grades.find(g => g.studentId === studentId) || {
      studentId,
      test: 0,
      assignment: 0,
      midexam: 0,
      finalexam: 0,
      result: 0
    };
  };

  const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

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
                  <TableHead className="min-w-[150px]">Student Name</TableHead>
                  <TableHead className="w-[80px]">Section</TableHead>
                  <TableHead className="w-[100px] text-center">
                    Test
                    <div className="text-xs text-muted-foreground">(20%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Assignment
                    <div className="text-xs text-muted-foreground">(20%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Mid Exam
                    <div className="text-xs text-muted-foreground">(30%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Final Exam
                    <div className="text-xs text-muted-foreground">(30%)</div>
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Result
                    <div className="text-xs text-muted-foreground">(100%)</div>
                  </TableHead>
                  <TableHead className="w-[80px] text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => {
                  const studentGrade = getStudentGrade(student.id);
                  const letterGrade = getLetterGrade(studentGrade.result);
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={studentGrade.test || ''}
                          onChange={(e) => onGradeChange(student.id, 'test', Number(e.target.value))}
                          className="w-full text-center"
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
                          className="w-full text-center"
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
                          className="w-full text-center"
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
                          className="w-full text-center"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeColor(studentGrade.result)}>
                          {studentGrade.result}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={letterGrade === 'F' ? "destructive" : "default"}>
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
          <div className="text-center py-8">
            <p className="text-gray-500">
              {!subject || subject === 'all' 
                ? 'Please select a subject to view students and enter grades.'
                : 'No students found for the selected criteria.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentGradeTable;

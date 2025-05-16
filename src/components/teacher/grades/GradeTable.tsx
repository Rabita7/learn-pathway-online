
import React from 'react';
import { Student } from '@/types/grades';
import { gradeOptions } from '@/data/mockStudentGrades';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GradeTableProps {
  students: Student[];
  selectedSubject: string;
  onGradeChange: (studentId: number, newGrade: string) => void;
}

const GradeTable: React.FC<GradeTableProps> = ({ 
  students, 
  selectedSubject, 
  onGradeChange 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Current Grade</TableHead>
          <TableHead>Update Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length > 0 ? (
          students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell className="font-medium">{student.grades[selectedSubject]}</TableCell>
              <TableCell>
                <Select 
                  value={student.grades[selectedSubject]} 
                  onValueChange={(value) => onGradeChange(student.id, value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
              No students found for this subject or search criteria
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GradeTable;


import React from 'react';
import { BookOpen, Users } from 'lucide-react';
import { ETHIOPIAN_GRADING_SCALE, EthiopianGrade } from '@/types/ethiopia';
import { EthiopianStudent, EthiopianGradeEntry } from '@/types/ethiopian-education';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface GradeEntryTableProps {
  selectedSubject: string;
  selectedTerm: string;
  filteredStudents: EthiopianStudent[];
  grades: EthiopianGradeEntry[];
  onGradeChange: (studentId: string, grade: EthiopianGrade, percentage: number) => void;
}

const GradeEntryTable: React.FC<GradeEntryTableProps> = ({
  selectedSubject,
  selectedTerm,
  filteredStudents,
  grades,
  onGradeChange
}) => {
  const getStudentGrade = (studentId: string) => {
    return grades.find(g => 
      g.studentId === studentId && 
      g.subject === selectedSubject && 
      g.term === selectedTerm
    );
  };

  const getGradeColor = (grade: EthiopianGrade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50';
      case 'B': return 'text-blue-600 bg-blue-50';
      case 'C': return 'text-yellow-600 bg-yellow-50';
      case 'D': return 'text-orange-600 bg-orange-50';
      case 'F': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!selectedSubject) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-teacher" />
          {selectedSubject} - {selectedTerm} Grades
        </CardTitle>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {filteredStudents.length} students
          </span>
          <span>Academic Year: 2024/25</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Grade Level</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Current Grade</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => {
              const currentGrade = getStudentGrade(student.id);
              
              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.gradeLevel}</TableCell>
                  <TableCell>{student.region}</TableCell>
                  <TableCell>
                    {currentGrade && (
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(currentGrade.grade)}`}>
                        {currentGrade.grade} ({currentGrade.percentage}%)
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter %"
                      className="w-20"
                      defaultValue={currentGrade?.percentage || ''}
                      onBlur={(e) => {
                        const percentage = parseInt(e.target.value);
                        if (percentage >= 0 && percentage <= 100) {
                          let grade: EthiopianGrade;
                          if (percentage >= 90) grade = 'A';
                          else if (percentage >= 80) grade = 'B';
                          else if (percentage >= 60) grade = 'C';
                          else if (percentage >= 50) grade = 'D';
                          else grade = 'F';
                          
                          onGradeChange(student.id, grade, percentage);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={currentGrade?.grade || ''} 
                      onValueChange={(grade: EthiopianGrade) => {
                        const percentage = currentGrade?.percentage || 0;
                        onGradeChange(student.id, grade, percentage);
                      }}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(ETHIOPIAN_GRADING_SCALE).map(grade => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No students found matching the selected criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GradeEntryTable;

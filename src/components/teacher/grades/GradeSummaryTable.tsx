
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Student {
  id: string;
  name: string;
  section: string;
}

interface Assessment {
  id: string;
  studentId: string;
  type: 'test' | 'assignment' | 'midexam' | 'finalexam';
  score: number;
  maxScore: number;
}

interface GradeSummaryTableProps {
  students: Student[];
  assessments: Assessment[];
  subject: string;
  grade: string;
  section: string;
}

const ASSESSMENT_WEIGHTS = {
  test: 0.2,
  assignment: 0.2,
  midexam: 0.3,
  finalexam: 0.3
};

const GradeSummaryTable: React.FC<GradeSummaryTableProps> = ({
  students,
  assessments,
  subject,
  grade,
  section,
}) => {
  const calculateFinalGrade = (studentId: string): number => {
    const studentAssessments = assessments.filter(a => a.studentId === studentId);
    let totalWeightedScore = 0;
    let totalWeight = 0;

    Object.entries(ASSESSMENT_WEIGHTS).forEach(([type, weight]) => {
      const assessment = studentAssessments.find(a => a.type === type);
      if (assessment) {
        const percentage = (assessment.score / assessment.maxScore) * 100;
        totalWeightedScore += percentage * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };

  const getGradeLetter = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Test (20%)</TableHead>
          <TableHead>Assignment (20%)</TableHead>
          <TableHead>Mid Exam (30%)</TableHead>
          <TableHead>Final Exam (30%)</TableHead>
          <TableHead>Total Result</TableHead>
          <TableHead>Letter Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map(student => {
          const finalGrade = calculateFinalGrade(student.id);
          const letterGrade = getGradeLetter(finalGrade);
          
          return (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              {['test', 'assignment', 'midexam', 'finalexam'].map(type => {
                const assessment = assessments.find(a => 
                  a.studentId === student.id && a.type === type
                );
                return (
                  <TableCell key={type}>
                    {assessment ? (
                      <div className="flex flex-col">
                        <Badge variant="secondary" className="mb-1">
                          {assessment.score}/{assessment.maxScore}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {((assessment.score / assessment.maxScore) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not graded</span>
                    )}
                  </TableCell>
                );
              })}
              <TableCell>
                <Badge className={getGradeColor(finalGrade)}>
                  {finalGrade.toFixed(1)}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={letterGrade === 'F' ? "destructive" : "default"}>
                  {letterGrade}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GradeSummaryTable;

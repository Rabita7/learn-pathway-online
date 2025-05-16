
import React from 'react';
import { Student } from '@/types/grades';
import { gradeOptions } from '@/data/mockStudentGrades';
import { BookOpen } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GradeDistributionProps {
  students: Student[];
  selectedSubject: string;
}

const GradeDistribution: React.FC<GradeDistributionProps> = ({ students, selectedSubject }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-teacher" />
          Grade Distribution
        </CardTitle>
        <CardDescription>
          Overview of grades in {selectedSubject}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {gradeOptions.map(grade => {
            const count = students.filter(student => student.grades[selectedSubject] === grade).length;
            const percentage = (count / (students.length || 1)) * 100;
            
            return (
              <div key={grade} className="flex flex-col items-center">
                <div className="text-lg font-bold mb-1">{grade}</div>
                <div className="w-12 bg-gray-200 rounded-full">
                  <div 
                    className="bg-teacher rounded-full py-0.5" 
                    style={{ width: `${percentage}%`, minWidth: count > 0 ? '8px' : '0' }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{count}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeDistribution;

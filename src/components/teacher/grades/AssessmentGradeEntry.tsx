
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface AssessmentGradeEntryProps {
  students: Student[];
  subject: string;
  onSave: (assessments: Assessment[]) => void;
}

const ASSESSMENT_WEIGHTS = {
  test: 0.2,        // 20%
  assignment: 0.2,  // 20% 
  midexam: 0.3,     // 30%
  finalexam: 0.3    // 30%
};

const AssessmentGradeEntry: React.FC<AssessmentGradeEntryProps> = ({ 
  students, 
  subject, 
  onSave 
}) => {
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<string>('');
  const [maxScore, setMaxScore] = useState<number>(100);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const handleScoreChange = (studentId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [studentId]: score
    }));
  };

  const handleSaveAssessment = () => {
    if (!selectedAssessmentType) return;

    const newAssessments = students.map(student => ({
      id: `${student.id}-${selectedAssessmentType}-${Date.now()}`,
      studentId: student.id,
      type: selectedAssessmentType as 'test' | 'assignment' | 'midexam' | 'finalexam',
      score: scores[student.id] || 0,
      maxScore
    }));

    setAssessments(prev => [
      ...prev.filter(a => !(a.type === selectedAssessmentType && newAssessments.some(na => na.studentId === a.studentId))),
      ...newAssessments
    ]);

    setScores({});
  };

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

  return (
    <div className="space-y-6">
      {/* Assessment Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Assessment Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Assessment Type</Label>
              <Select value={selectedAssessmentType} onValueChange={setSelectedAssessmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Test (20%)</SelectItem>
                  <SelectItem value="assignment">Assignment (20%)</SelectItem>
                  <SelectItem value="midexam">Mid Exam (30%)</SelectItem>
                  <SelectItem value="finalexam">Final Exam (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Max Score</Label>
              <Input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSaveAssessment}
                disabled={!selectedAssessmentType}
                className="w-full"
              >
                Save Assessment
              </Button>
            </div>
          </div>

          {selectedAssessmentType && (
            <div className="space-y-4">
              <h3 className="font-semibold">
                Enter scores for {selectedAssessmentType} (Max: {maxScore})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map(student => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Label className="w-32 text-sm">{student.name}</Label>
                    <Input
                      type="number"
                      min="0"
                      max={maxScore}
                      value={scores[student.id] || ''}
                      onChange={(e) => handleScoreChange(student.id, Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grade Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Summary - {subject}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Test (20%)</TableHead>
                <TableHead>Assignment (20%)</TableHead>
                <TableHead>Mid Exam (30%)</TableHead>
                <TableHead>Final Exam (30%)</TableHead>
                <TableHead>Final Grade</TableHead>
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
                            <Badge variant="secondary">
                              {assessment.score}/{assessment.maxScore}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Badge variant={finalGrade >= 60 ? "default" : "destructive"}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentGradeEntry;

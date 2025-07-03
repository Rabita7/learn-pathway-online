
import React, { useState, useEffect } from 'react';
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
  grade: string;
  section: string;
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
  grade,
  section,
  onSave 
}) => {
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<string>('');
  const [maxScore, setMaxScore] = useState<number>(100);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const handleScoreChange = (studentId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [studentId]: Math.min(Math.max(0, score), maxScore) // Ensure score is between 0 and maxScore
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

    // Remove old assessments of the same type and add new ones
    setAssessments(prev => [
      ...prev.filter(a => !(a.type === selectedAssessmentType && newAssessments.some(na => na.studentId === a.studentId))),
      ...newAssessments
    ]);

    setScores({});
    setSelectedAssessmentType('');
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

  const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Section Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Grade {grade} - Section {section} - {subject}</span>
            <Badge variant="outline">{students.length} Students</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

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
                onChange={(e) => setMaxScore(Math.max(1, Number(e.target.value)))}
                min="1"
                max="200"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSaveAssessment}
                disabled={!selectedAssessmentType || students.length === 0}
                className="w-full bg-teacher hover:bg-teacher/90"
              >
                Save {selectedAssessmentType} Scores
              </Button>
            </div>
          </div>

          {selectedAssessmentType && students.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">
                Enter scores for {selectedAssessmentType} (Max: {maxScore})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map(student => (
                  <div key={student.id} className="flex items-center space-x-2 p-2 border rounded">
                    <Label className="w-32 text-sm font-medium">{student.name}</Label>
                    <Input
                      type="number"
                      min="0"
                      max={maxScore}
                      value={scores[student.id] || ''}
                      onChange={(e) => handleScoreChange(student.id, Number(e.target.value))}
                      className="w-20"
                      placeholder="0"
                    />
                    <span className="text-xs text-gray-500">/{maxScore}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grade Summary */}
      {students.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Grade Summary - {subject} (Grade {grade} - Section {section})</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {students.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No students found for the selected criteria. Please select a subject and grade level.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssessmentGradeEntry;

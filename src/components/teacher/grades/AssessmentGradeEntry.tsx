
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AssessmentTypeSelector from './AssessmentTypeSelector';
import ScoreInputGrid from './ScoreInputGrid';
import GradeSummaryTable from './GradeSummaryTable';

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
      [studentId]: Math.min(Math.max(0, score), maxScore)
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
    setSelectedAssessmentType('');
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
          <AssessmentTypeSelector
            selectedAssessmentType={selectedAssessmentType}
            maxScore={maxScore}
            hasStudents={students.length > 0}
            onAssessmentTypeChange={setSelectedAssessmentType}
            onMaxScoreChange={setMaxScore}
            onSaveAssessment={handleSaveAssessment}
          />

          {selectedAssessmentType && students.length > 0 && (
            <ScoreInputGrid
              students={students}
              assessmentType={selectedAssessmentType}
              maxScore={maxScore}
              scores={scores}
              onScoreChange={handleScoreChange}
            />
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
            <GradeSummaryTable
              students={students}
              assessments={assessments}
              subject={subject}
              grade={grade}
              section={section}
            />
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


import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Student {
  id: string;
  name: string;
  section: string;
}

interface ScoreInputGridProps {
  students: Student[];
  assessmentType: string;
  maxScore: number;
  scores: { [key: string]: number };
  onScoreChange: (studentId: string, score: number) => void;
}

const ScoreInputGrid: React.FC<ScoreInputGridProps> = ({
  students,
  assessmentType,
  maxScore,
  scores,
  onScoreChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">
        Enter scores for {assessmentType} (Max: {maxScore})
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
              onChange={(e) => onScoreChange(student.id, Number(e.target.value))}
              className="w-20"
              placeholder="0"
            />
            <span className="text-xs text-gray-500">/{maxScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreInputGrid;

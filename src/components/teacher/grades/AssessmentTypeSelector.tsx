
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AssessmentTypeSelectorProps {
  selectedAssessmentType: string;
  maxScore: number;
  hasStudents: boolean;
  onAssessmentTypeChange: (type: string) => void;
  onMaxScoreChange: (score: number) => void;
  onSaveAssessment: () => void;
}

const AssessmentTypeSelector: React.FC<AssessmentTypeSelectorProps> = ({
  selectedAssessmentType,
  maxScore,
  hasStudents,
  onAssessmentTypeChange,
  onMaxScoreChange,
  onSaveAssessment,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label>Assessment Type</Label>
        <Select value={selectedAssessmentType} onValueChange={onAssessmentTypeChange}>
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
          onChange={(e) => onMaxScoreChange(Math.max(1, Number(e.target.value)))}
          min="1"
          max="200"
        />
      </div>
      <div className="flex items-end">
        <Button 
          onClick={onSaveAssessment}
          disabled={!selectedAssessmentType || !hasStudents}
          className="w-full bg-teacher hover:bg-teacher/90"
        >
          Save {selectedAssessmentType} Scores
        </Button>
      </div>
    </div>
  );
};

export default AssessmentTypeSelector;

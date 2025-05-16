
import React from 'react';
import { Book } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StudentAssignment } from '@/types/grades';
import AssignmentList from './AssignmentList';

interface AssignmentsHeaderProps {
  assignments: StudentAssignment[];
  onViewAssignment: (assignment: StudentAssignment) => void;
  onSubmitAssignment: (assignment: StudentAssignment) => void;
}

const AssignmentsHeader: React.FC<AssignmentsHeaderProps> = ({
  assignments,
  onViewAssignment,
  onSubmitAssignment
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-student" />
          Assignments
        </CardTitle>
        <CardDescription>
          All your current and upcoming assignments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AssignmentList 
          assignments={assignments}
          onViewAssignment={onViewAssignment}
          onSubmitAssignment={onSubmitAssignment}
        />
      </CardContent>
    </Card>
  );
};

export default AssignmentsHeader;

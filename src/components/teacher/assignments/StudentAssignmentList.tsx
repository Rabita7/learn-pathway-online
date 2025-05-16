
import React from 'react';
import { StudentAssignment } from '@/types/grades';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentAssignmentListProps {
  assignments: StudentAssignment[];
  onViewAssignment: (assignment: StudentAssignment) => void;
}

const StudentAssignmentList: React.FC<StudentAssignmentListProps> = ({ 
  assignments,
  onViewAssignment
}) => {
  // Function to get the appropriate badge color based on assignment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-green-500">Submitted</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'late':
        return <Badge className="bg-red-500">Late</Badge>;
      case 'graded':
        return <Badge className="bg-blue-500">Graded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell className="font-medium">{assignment.studentName}</TableCell>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.subject}</TableCell>
                <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                <TableCell>{assignment.submittedDate ? formatDate(assignment.submittedDate) : '-'}</TableCell>
                <TableCell>{assignment.grade || '-'}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onViewAssignment(assignment)}
                    className="text-teacher"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No assignments found for the selected subject
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentAssignmentList;

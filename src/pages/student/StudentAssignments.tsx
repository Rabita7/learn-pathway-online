
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StudentAssignment } from '@/types/grades';
import { mockStudentAssignments } from '@/data/mockStudentGrades';
import { useToast } from '@/hooks/use-toast';
import AssignmentsHeader from '@/components/student/assignments/AssignmentsHeader';
import AssignmentDetailsDialog from '@/components/student/assignments/AssignmentDetailsDialog';
import AssignmentSubmissionDialog from '@/components/student/assignments/AssignmentSubmissionDialog';

const StudentAssignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load student's assignments
  useEffect(() => {
    if (user && user.id) {
      // In a real app, filter by the logged-in student's ID
      // For mock, we'll just show all assignments
      setAssignments(mockStudentAssignments);
    }
  }, [user]);

  if (!user || user.role !== 'student') {
    return <div>Access denied. Student privileges required.</div>;
  }

  const handleViewAssignment = (assignment: StudentAssignment) => {
    setSelectedAssignment(assignment);
    setDetailsDialogOpen(true);
  };

  const handleSubmitAssignment = (assignment: StudentAssignment) => {
    setSelectedAssignment(assignment);
    setSubmissionDialogOpen(true);
  };

  const handleAssignmentSubmission = (file: File, comments: string) => {
    setIsSubmitting(true);

    // In a real app, this would upload the file to a server
    setTimeout(() => {
      // Update the assignment status with the correct type
      if (selectedAssignment) {
        const updatedAssignments = assignments.map(a => 
          a.id === selectedAssignment.id 
            ? {
                ...a,
                status: 'submitted' as const, // Use const assertion to ensure correct type
                submittedDate: new Date().toISOString().split('T')[0],
                file: file.name
              }
            : a
        );

        setAssignments(updatedAssignments);
        setIsSubmitting(false);
        setSubmissionDialogOpen(false);
        
        toast({
          title: "Assignment submitted",
          description: "Your assignment has been submitted successfully",
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Assignments</h1>
          <p className="text-muted-foreground">View and submit your assignments</p>
        </div>
      </div>

      <AssignmentsHeader 
        assignments={assignments}
        onViewAssignment={handleViewAssignment}
        onSubmitAssignment={handleSubmitAssignment}
      />

      {/* Assignment Details Dialog */}
      <AssignmentDetailsDialog
        assignment={selectedAssignment}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onSubmitAssignment={handleSubmitAssignment}
      />

      {/* Assignment Submission Dialog */}
      <AssignmentSubmissionDialog
        assignment={selectedAssignment}
        open={submissionDialogOpen}
        onOpenChange={setSubmissionDialogOpen}
        onSubmit={handleAssignmentSubmission}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default StudentAssignments;

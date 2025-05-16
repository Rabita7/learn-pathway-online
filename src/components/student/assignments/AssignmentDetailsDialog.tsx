
import React from 'react';
import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentAssignment } from '@/types/grades';

interface AssignmentDetailsDialogProps {
  assignment: StudentAssignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitAssignment: (assignment: StudentAssignment) => void;
}

const AssignmentDetailsDialog: React.FC<AssignmentDetailsDialogProps> = ({
  assignment,
  open,
  onOpenChange,
  onSubmitAssignment
}) => {
  if (!assignment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{assignment.title}</DialogTitle>
          <DialogDescription>
            {assignment.subject} • Due: {assignment.dueDate}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Assignment Details</TabsTrigger>
            <TabsTrigger value="submission">My Submission</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Description</h3>
                <p>{assignment.description || "Complete the assignment as instructed in class."}</p>
              </div>
              <div>
                <h3 className="font-semibold">Points</h3>
                <p>{assignment.points || 100}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{assignment.status}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="submission" className="p-4">
            <div className="space-y-4">
              {assignment.status === 'submitted' || assignment.status === 'graded' ? (
                <>
                  <div>
                    <h3 className="font-semibold">Submitted Date</h3>
                    <p>{assignment.submittedDate}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Submitted File</h3>
                    <p>{assignment.file || "No file submitted"}</p>
                  </div>
                  {assignment.grade && (
                    <div>
                      <h3 className="font-semibold">Grade</h3>
                      <p>{assignment.grade}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md border-gray-300">
                  <p className="text-center text-muted-foreground mb-2">
                    You haven't submitted this assignment yet
                  </p>
                  <Button 
                    onClick={() => onSubmitAssignment(assignment)}
                    className="bg-student hover:bg-student/90"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDetailsDialog;

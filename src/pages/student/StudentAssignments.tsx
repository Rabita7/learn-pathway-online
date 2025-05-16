
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Book, Upload, Check } from 'lucide-react';
import { StudentAssignment } from '@/types/grades';
import { mockStudentAssignments } from '@/data/mockStudentGrades';
import AssignmentList from '@/components/student/assignments/AssignmentList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const StudentAssignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');
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
    setDialogOpen(true);
  };

  const handleSubmitAssignment = (assignment: StudentAssignment) => {
    setSelectedAssignment(assignment);
    setPdfFile(null);
    setComments('');
    setSubmissionDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive"
        });
      }
    }
  };

  const submitAssignment = () => {
    if (!pdfFile) {
      toast({
        title: "Missing file",
        description: "Please upload a PDF file before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // In a real app, this would upload the file to a server
    setTimeout(() => {
      // Update the assignment status
      if (selectedAssignment) {
        const updatedAssignments = assignments.map(a => 
          a.id === selectedAssignment.id 
            ? {
                ...a,
                status: 'submitted',
                submittedDate: new Date().toISOString().split('T')[0],
                file: pdfFile.name
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
            onViewAssignment={handleViewAssignment}
            onSubmitAssignment={handleSubmitAssignment}
          />
        </CardContent>
      </Card>

      {/* View Assignment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title}</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.subject} • Due: {selectedAssignment?.dueDate}
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
                  <p>{selectedAssignment?.description || "Complete the assignment as instructed in class."}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Points</h3>
                  <p>{selectedAssignment?.points || 100}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p>{selectedAssignment?.status}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="submission" className="p-4">
              <div className="space-y-4">
                {selectedAssignment?.status === 'submitted' || selectedAssignment?.status === 'graded' ? (
                  <>
                    <div>
                      <h3 className="font-semibold">Submitted Date</h3>
                      <p>{selectedAssignment.submittedDate}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Submitted File</h3>
                      <p>{selectedAssignment.file || "No file submitted"}</p>
                    </div>
                    {selectedAssignment.grade && (
                      <div>
                        <h3 className="font-semibold">Grade</h3>
                        <p>{selectedAssignment.grade}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md border-gray-300">
                    <p className="text-center text-muted-foreground mb-2">
                      You haven't submitted this assignment yet
                    </p>
                    <Button 
                      onClick={() => handleSubmitAssignment(selectedAssignment!)}
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

      {/* Submit Assignment Dialog */}
      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.title} - {selectedAssignment?.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload PDF File</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="file-upload" 
                  type="file" 
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>
              {pdfFile && (
                <p className="text-sm text-green-600 flex items-center">
                  <Check className="h-4 w-4 mr-1" /> {pdfFile.name} selected
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea 
                id="comments" 
                placeholder="Add any comments for your teacher"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSubmissionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={submitAssignment}
              className="bg-student hover:bg-student/90"
              disabled={!pdfFile || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Assignment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentAssignments;

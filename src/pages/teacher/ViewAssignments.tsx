
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Book, Filter } from 'lucide-react';
import { StudentAssignment } from '@/types/grades';
import { mockStudentAssignments, mockTeacherSubjects } from '@/data/mockStudentGrades';
import StudentAssignmentList from '@/components/teacher/assignments/StudentAssignmentList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ViewAssignments = () => {
  const { user } = useAuth();
  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [teacherSubjects, setTeacherSubjects] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load teacher's subjects
  useEffect(() => {
    if (user && user.id) {
      const subjects = mockTeacherSubjects[user.id] || [];
      const subjectNames = subjects.map(subject => subject.name);
      setTeacherSubjects(subjectNames);
      
      if (subjectNames.length > 0 && (!selectedSubject || !subjectNames.includes(selectedSubject))) {
        setSelectedSubject(subjectNames[0]);
      }
    }
  }, [user, selectedSubject]);

  // Filter assignments based on selected subject
  useEffect(() => {
    if (selectedSubject) {
      const filteredAssignments = mockStudentAssignments.filter(
        assignment => assignment.subject === selectedSubject
      );
      setAssignments(filteredAssignments);
    } else {
      setAssignments([]);
    }
  }, [selectedSubject]);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  const handleViewAssignment = (assignment: StudentAssignment) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Assignments</h1>
          <p className="text-muted-foreground">View and grade student assignments</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {teacherSubjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-teacher" />
            Assignments
          </CardTitle>
          <CardDescription>
            Student submissions for {selectedSubject}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentAssignmentList 
            assignments={assignments}
            onViewAssignment={handleViewAssignment}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedAssignment?.studentName} for {selectedAssignment?.subject}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="submission">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="submission">Submission</TabsTrigger>
              <TabsTrigger value="grading">Grading</TabsTrigger>
            </TabsList>
            <TabsContent value="submission" className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p>{selectedAssignment?.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Due Date</h3>
                  <p>{selectedAssignment?.dueDate}</p>
                </div>
                {selectedAssignment?.submittedDate && (
                  <div>
                    <h3 className="font-semibold">Submitted Date</h3>
                    <p>{selectedAssignment.submittedDate}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">Submission Content</h3>
                  <p className="text-muted-foreground">
                    {selectedAssignment?.status === 'submitted' || selectedAssignment?.status === 'late' || selectedAssignment?.status === 'graded'
                      ? "Student submission would appear here in a real application."
                      : "No submission yet."
                    }
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="grading" className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Current Grade</h3>
                  <p>{selectedAssignment?.grade || "Not graded yet"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Feedback</h3>
                  <p className="text-muted-foreground">
                    Feedback functionality would be implemented here in a real application.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewAssignments;

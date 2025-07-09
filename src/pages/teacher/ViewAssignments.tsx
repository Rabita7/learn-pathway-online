
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
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
  const { t } = useLocalization();
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
    return <div>{t('access_denied')}. {t('teacher')} {t('privileges_required')}.</div>;
  }

  const handleViewAssignment = (assignment: StudentAssignment) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('student_assignments')}</h1>
          <p className="text-muted-foreground">{t('view_and_grade_student_assignments')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t('select_subject')} />
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
            {t('assignments')}
          </CardTitle>
          <CardDescription>
            {t('student_submissions_for')} {selectedSubject}
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
              {t('submitted_by')} {selectedAssignment?.studentName} {t('for')} {selectedAssignment?.subject}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="submission">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="submission">{t('submission')}</TabsTrigger>
              <TabsTrigger value="grading">{t('grading')}</TabsTrigger>
            </TabsList>
            <TabsContent value="submission" className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{t('status')}</h3>
                  <p>{selectedAssignment?.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t('due_date')}</h3>
                  <p>{selectedAssignment?.dueDate}</p>
                </div>
                {selectedAssignment?.submittedDate && (
                  <div>
                    <h3 className="font-semibold">{t('submitted_date')}</h3>
                    <p>{selectedAssignment.submittedDate}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{t('submission_content')}</h3>
                  <p className="text-muted-foreground">
                    {selectedAssignment?.status === 'submitted' || selectedAssignment?.status === 'late' || selectedAssignment?.status === 'graded'
                      ? t('student_submission_would_appear_here')
                      : t('no_submission_yet')
                    }
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="grading" className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{t('current_grade')}</h3>
                  <p>{selectedAssignment?.grade || t('not_graded_yet')}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{t('feedback')}</h3>
                  <p className="text-muted-foreground">
                    {t('feedback_functionality_would_be_implemented_here')}
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

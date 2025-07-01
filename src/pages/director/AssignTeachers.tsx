
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, Users, Crown, GraduationCap } from 'lucide-react';
import { TeacherSubjectAssignment } from '@/types';

const mockTeachers = [
  { id: '1', name: 'Dr. Robert Adams', subjects: ['Mathematics', 'Physics'] },
  { id: '2', name: 'Prof. Linda Martinez', subjects: ['English', 'Literature'] },
  { id: '3', name: 'Mrs. Elizabeth Taylor', subjects: ['Biology', 'Chemistry'] },
  { id: '4', name: 'Mr. Thomas Moore', subjects: ['History', 'Geography'] },
  { id: '5', name: 'Ms. Sarah Johnson', subjects: ['Art', 'Music'] },
];

const mockSubjects = [
  'Mathematics', 'English', 'Science', 'History', 'Art', 'Physics', 
  'Chemistry', 'Biology', 'Literature', 'Geography', 'Music'
];

const mockClasses = [
  { id: '1', name: 'Grade 9A', grade: '9', section: 'A' },
  { id: '2', name: 'Grade 9B', grade: '9', section: 'B' },
  { id: '3', name: 'Grade 10A', grade: '10', section: 'A' },
  { id: '4', name: 'Grade 10B', grade: '10', section: 'B' },
  { id: '5', name: 'Grade 11A', grade: '11', section: 'A' },
  { id: '6', name: 'Grade 11B', grade: '11', section: 'B' },
];

const AssignTeachers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<TeacherSubjectAssignment[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  if (!user || user.role !== 'director') {
    return <div>Access denied. Director privileges required.</div>;
  }

  const handleAssignTeacher = () => {
    if (!selectedTeacher || !selectedSubject || !selectedClass) {
      toast({
        title: 'Error',
        description: 'Please select teacher, subject, and class',
        variant: 'destructive',
      });
      return;
    }

    const teacher = mockTeachers.find(t => t.id === selectedTeacher);
    const classInfo = mockClasses.find(c => c.id === selectedClass);

    if (!teacher || !classInfo) return;

    // Check if teacher can teach this subject
    if (!teacher.subjects.includes(selectedSubject)) {
      toast({
        title: 'Subject Mismatch',
        description: `${teacher.name} is not qualified to teach ${selectedSubject}`,
        variant: 'destructive',
      });
      return;
    }

    // Check if assignment already exists
    const existingAssignment = assignments.find(a => 
      a.teacherId === selectedTeacher && 
      a.subject === selectedSubject && 
      a.classId === selectedClass
    );

    if (existingAssignment) {
      toast({
        title: 'Assignment Exists',
        description: 'This teacher is already assigned to this subject and class',
        variant: 'destructive',
      });
      return;
    }

    const newAssignment: TeacherSubjectAssignment = {
      id: Date.now().toString(),
      teacherId: selectedTeacher,
      teacherName: teacher.name,
      subject: selectedSubject,
      classId: selectedClass,
      className: classInfo.name,
      gradeLevel: classInfo.grade,
      section: classInfo.section,
      isRepresentative: false,
    };

    setAssignments([...assignments, newAssignment]);
    setSelectedTeacher('');
    setSelectedSubject('');
    setSelectedClass('');

    toast({
      title: 'Success',
      description: `${teacher.name} assigned to teach ${selectedSubject} for ${classInfo.name}`,
    });
  };

  const handleSetRepresentative = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    // Remove representative status from other teachers in the same class
    const updatedAssignments = assignments.map(a => {
      if (a.classId === assignment.classId && a.id !== assignmentId) {
        return { ...a, isRepresentative: false };
      }
      if (a.id === assignmentId) {
        return { ...a, isRepresentative: !a.isRepresentative };
      }
      return a;
    });

    setAssignments(updatedAssignments);

    toast({
      title: 'Success',
      description: `${assignment.teacherName} is now ${assignment.isRepresentative ? 'no longer' : 'the'} class representative for ${assignment.className}`,
    });
  };

  const handleRemoveAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
    toast({
      title: 'Success',
      description: 'Assignment removed successfully',
    });
  };

  const getTeacherQualifiedSubjects = (teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    return teacher ? teacher.subjects : [];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assign Teachers to Classes</h1>
        <p className="text-muted-foreground">Manage teacher assignments for subjects and classes, and assign class representatives</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            New Teacher Assignment
          </CardTitle>
          <CardDescription>Assign a teacher to teach a specific subject in a class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Teacher</label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      <div>
                        <div>{teacher.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {teacher.subjects.join(', ')}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <Select 
                value={selectedSubject} 
                onValueChange={setSelectedSubject}
                disabled={!selectedTeacher}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {getTeacherQualifiedSubjects(selectedTeacher).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleAssignTeacher} className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Assign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
          <CardDescription>View and manage teacher assignments and class representatives</CardDescription>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No assignments yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Representative</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.teacherName}</TableCell>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>{assignment.className}</TableCell>
                    <TableCell>{assignment.gradeLevel}</TableCell>
                    <TableCell>{assignment.section}</TableCell>
                    <TableCell>
                      {assignment.isRepresentative ? (
                        <Badge variant="default" className="flex items-center gap-1 w-fit">
                          <Crown className="w-3 h-3" />
                          Representative
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetRepresentative(assignment.id)}
                        >
                          {assignment.isRepresentative ? 'Remove Rep' : 'Set as Rep'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAssignment(assignment.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignTeachers;

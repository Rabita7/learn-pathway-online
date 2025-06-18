
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
import { useToast } from '@/hooks/use-toast';
import { UserCheck, Users } from 'lucide-react';

interface TeacherAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  classId: string;
  className: string;
  isRepresentative: boolean;
}

const mockTeachers = [
  { id: '1', name: 'Dr. Robert Adams' },
  { id: '2', name: 'Prof. Linda Martinez' },
  { id: '3', name: 'Mrs. Elizabeth Taylor' },
  { id: '4', name: 'Mr. Thomas Moore' },
  { id: '5', name: 'Ms. Sarah Johnson' },
];

const mockSubjects = [
  'Mathematics', 'Science', 'English', 'History', 'Art', 'Physics', 'Chemistry', 'Biology'
];

const mockClasses = [
  { id: '1', name: 'Grade 9A' },
  { id: '2', name: 'Grade 9B' },
  { id: '3', name: 'Grade 10A' },
  { id: '4', name: 'Grade 10B' },
  { id: '5', name: 'Grade 11A' },
  { id: '6', name: 'Grade 11B' },
];

const AssignTeachers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  if (!user || user.role !== 'manager') {
    return <div>Access denied. Manager privileges required.</div>;
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

    const newAssignment: TeacherAssignment = {
      id: Date.now().toString(),
      teacherId: selectedTeacher,
      teacherName: teacher.name,
      subject: selectedSubject,
      classId: selectedClass,
      className: classInfo.name,
      isRepresentative: false,
    };

    setAssignments([...assignments, newAssignment]);
    setSelectedTeacher('');
    setSelectedSubject('');
    setSelectedClass('');

    toast({
      title: 'Success',
      description: `${teacher.name} assigned to ${selectedSubject} for ${classInfo.name}`,
    });
  };

  const handleSetRepresentative = (assignmentId: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, isRepresentative: !assignment.isRepresentative }
        : assignment
    ));

    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      toast({
        title: 'Success',
        description: `${assignment.teacherName} is now ${assignment.isRepresentative ? 'no longer' : 'the'} representative for ${assignment.className}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assign Teachers</h1>
        <p className="text-muted-foreground">Manage teacher assignments for subjects and classes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Assignment</CardTitle>
          <CardDescription>Assign a teacher to a subject and class</CardDescription>
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
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {mockSubjects.map((subject) => (
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
          <CardDescription>View and manage teacher assignments</CardDescription>
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
                    <TableCell>
                      {assignment.isRepresentative ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetRepresentative(assignment.id)}
                      >
                        {assignment.isRepresentative ? 'Remove Rep' : 'Set as Rep'}
                      </Button>
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

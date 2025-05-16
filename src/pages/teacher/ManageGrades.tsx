
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Save, ClipboardList, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for student grades
const mockStudents = [
  { id: 1, name: 'Alex Johnson', grades: { 'Biology': 'A-', 'Chemistry': 'B+', 'Physics': 'A' } },
  { id: 2, name: 'Emma Smith', grades: { 'Biology': 'A', 'Chemistry': 'A', 'Physics': 'A-' } },
  { id: 3, name: 'Michael Brown', grades: { 'Biology': 'B+', 'Chemistry': 'B', 'Physics': 'B+' } },
  { id: 4, name: 'Sophia Davis', grades: { 'Biology': 'A-', 'Chemistry': 'B+', 'Physics': 'A-' } },
  { id: 5, name: 'William Wilson', grades: { 'Biology': 'B', 'Chemistry': 'B-', 'Physics': 'C+' } },
  { id: 6, name: 'Olivia Miller', grades: { 'Advanced Biology': 'A', 'Chemistry': 'A-', 'Physics': 'A' } },
  { id: 7, name: 'James Taylor', grades: { 'Advanced Biology': 'B+', 'Chemistry': 'B', 'Physics': 'A-' } },
];

const subjects = ['Biology', 'Chemistry', 'Physics', 'Advanced Biology'];
const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

const ManageGrades = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState('Biology');
  const [searchTerm, setSearchTerm] = useState('');
  const [studentGrades, setStudentGrades] = useState(mockStudents);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  // Filter students based on search term and selected subject
  const filteredStudents = studentGrades.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasSubject = student.grades[selectedSubject] !== undefined;
    return matchesSearch && hasSubject;
  });

  const handleGradeChange = (studentId: number, newGrade: string) => {
    setStudentGrades(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, grades: { ...student.grades, [selectedSubject]: newGrade } } 
          : student
      )
    );
  };

  const handleSaveGrades = () => {
    // In a real app, this would save to a database
    toast({
      title: "Grades saved successfully",
      description: `Updated grades for ${selectedSubject}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Grades</h1>
          <p className="text-muted-foreground">Update and review student grades</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleSaveGrades} className="bg-teacher text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Grades
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teacher" />
            Grade Management
          </CardTitle>
          <CardDescription>
            {filteredStudents.length} students enrolled in {selectedSubject}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Current Grade</TableHead>
                <TableHead>Update Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="font-medium">{student.grades[selectedSubject]}</TableCell>
                  <TableCell>
                    <Select 
                      value={student.grades[selectedSubject]} 
                      onValueChange={(value) => handleGradeChange(student.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeOptions.map(grade => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No students found for this subject or search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teacher" />
            Grade Distribution
          </CardTitle>
          <CardDescription>
            Overview of grades in {selectedSubject}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {gradeOptions.map(grade => {
              const count = filteredStudents.filter(student => student.grades[selectedSubject] === grade).length;
              const percentage = (count / (filteredStudents.length || 1)) * 100;
              
              return (
                <div key={grade} className="flex flex-col items-center">
                  <div className="text-lg font-bold mb-1">{grade}</div>
                  <div className="w-12 bg-gray-200 rounded-full">
                    <div 
                      className="bg-teacher rounded-full py-0.5" 
                      style={{ width: `${percentage}%`, minWidth: count > 0 ? '8px' : '0' }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{count}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageGrades;

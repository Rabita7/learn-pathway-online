
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Edit, Trash } from 'lucide-react';
import { Student } from '@/types';
import { useToast } from '@/hooks/use-toast';
import AddStudentDialog from '@/components/admin/AddStudentDialog';
import EditStudentDialog from '@/components/admin/EditStudentDialog';

// Mock data for students
const mockStudents: Student[] = [
  { id: '1', name: 'John Doe', grade: '10th', email: 'john.doe@school.edu', parentId: 'p1' },
  { id: '2', name: 'Jane Smith', grade: '9th', email: 'jane.smith@school.edu', parentId: 'p2' },
  { id: '3', name: 'Mike Johnson', grade: '11th', email: 'mike.johnson@school.edu', parentId: 'p3' },
  { id: '4', name: 'Sarah Brown', grade: '12th', email: 'sarah.brown@school.edu', parentId: 'p4' },
  { id: '5', name: 'David Wilson', grade: '10th', email: 'david.wilson@school.edu', parentId: 'p5' },
];

const ManageStudents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      ...studentData,
    };
    setStudents([...students, newStudent]);
    toast({
      title: "Student Added",
      description: `${studentData.name} has been added successfully.`,
    });
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    toast({
      title: "Student Updated",
      description: `${updatedStudent.name} has been updated successfully.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const studentToDelete = students.find(student => student.id === id);
    setStudents(students.filter(student => student.id !== id));
    
    toast({
      title: "Student Deleted",
      description: `${studentToDelete?.name} has been removed.`,
    });
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        <AddStudentDialog onAddStudent={handleAddStudent} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>View and manage all students enrolled in the school.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableCaption>A list of all students in the school.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => openEditDialog(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditStudentDialog
        student={editingStudent}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEditStudent={handleEditStudent}
      />
    </div>
  );
};

export default ManageStudents;

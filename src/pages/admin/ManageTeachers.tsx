
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
import { Search, Plus, Edit, Trash, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for teachers
interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
}

const mockTeachers: Teacher[] = [
  { id: '1', name: 'Dr. Robert Adams', subject: 'Mathematics', email: 'robert.adams@school.edu', phone: '555-0101' },
  { id: '2', name: 'Prof. Linda Martinez', subject: 'Science', email: 'linda.martinez@school.edu', phone: '555-0102' },
  { id: '3', name: 'Mrs. Elizabeth Taylor', subject: 'English', email: 'elizabeth.taylor@school.edu', phone: '555-0103' },
  { id: '4', name: 'Mr. Thomas Moore', subject: 'History', email: 'thomas.moore@school.edu', phone: '555-0104' },
  { id: '5', name: 'Ms. Sarah Johnson', subject: 'Art', email: 'sarah.johnson@school.edu', phone: '555-0105' },
];

const ManageTeachers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = () => {
    toast({
      title: "Not Implemented",
      description: "Add teacher functionality will be implemented in a future update.",
    });
  };

  const handleEditTeacher = (id: string) => {
    toast({
      title: "Not Implemented",
      description: `Edit functionality for teacher ID: ${id} will be implemented in a future update.`,
    });
  };

  const handleDeleteTeacher = (id: string) => {
    // In a real app, you'd make an API call here
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    
    toast({
      title: "Teacher Deleted",
      description: `Teacher ID: ${id} has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Teachers</h1>
        <Button onClick={handleAddTeacher} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teachers List</CardTitle>
          <CardDescription>View and manage all teachers in the school.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableCaption>A list of all teachers in the school.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.id}</TableCell>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEditTeacher(teacher.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteTeacher(teacher.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No teachers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTeachers;

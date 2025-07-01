
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Edit, Trash2, Users } from 'lucide-react';
import AddTeacherDialog from '@/components/admin/AddTeacherDialog';
import EditTeacherDialog from '@/components/admin/EditTeacherDialog';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  assignedClasses: number;
}

const ManageStaff = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Dr. Robert Adams',
      subject: 'Mathematics, Physics',
      email: 'robert.adams@school.edu',
      phone: '+1 (555) 123-4567',
      status: 'active',
      assignedClasses: 3,
    },
    {
      id: '2',
      name: 'Prof. Linda Martinez',
      subject: 'English, Literature',
      email: 'linda.martinez@school.edu',
      phone: '+1 (555) 234-5678',
      status: 'active',
      assignedClasses: 2,
    },
    {
      id: '3',
      name: 'Mrs. Elizabeth Taylor',
      subject: 'Biology, Chemistry',
      email: 'elizabeth.taylor@school.edu',
      phone: '+1 (555) 345-6789',
      status: 'inactive',
      assignedClasses: 0,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!user || user.role !== 'director') {
    return <div>Access denied. Director privileges required.</div>;
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = (teacherData: Omit<Teacher, 'id' | 'status' | 'assignedClasses'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: Date.now().toString(),
      status: 'active',
      assignedClasses: 0,
    };
    setTeachers([...teachers, newTeacher]);
    toast({
      title: 'Success',
      description: 'Teacher added successfully',
    });
  };

  const handleEditTeacher = (updatedTeacher: Teacher) => {
    setTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
    toast({
      title: 'Success',
      description: 'Teacher updated successfully',
    });
  };

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers(teachers.filter(t => t.id !== teacherId));
    toast({
      title: 'Success',
      description: 'Teacher removed successfully',
    });
  };

  const handleToggleStatus = (teacherId: string) => {
    setTeachers(teachers.map(t => 
      t.id === teacherId 
        ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' }
        : t
    ));
    toast({
      title: 'Success',
      description: 'Teacher status updated',
    });
  };

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Staff</h1>
          <p className="text-muted-foreground">Manage teacher information and assignments</p>
        </div>
        <AddTeacherDialog onAddTeacher={handleAddTeacher} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Teaching Staff
          </CardTitle>
          <CardDescription>View and manage all teaching staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {teacher.assignedClasses} classes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={teacher.status === 'active' ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => handleToggleStatus(teacher.id)}
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(teacher)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditTeacherDialog
        teacher={editingTeacher}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEditTeacher={handleEditTeacher}
      />
    </div>
  );
};

export default ManageStaff;

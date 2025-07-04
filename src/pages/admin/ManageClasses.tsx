
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
import { useToast } from '@/hooks/use-toast';
import { Class } from '@/types';
import AddClassDialog from '@/components/admin/AddClassDialog';
import EditClassDialog from '@/components/admin/EditClassDialog';

// Updated mock data for classes with all required fields
const mockClasses: Class[] = [
  { 
    id: '1', 
    name: 'Advanced Mathematics', 
    grade: '12', 
    section: 'A', 
    teacherId: '1', 
    schedule: 'Mon, Wed, Fri 9:00 AM', 
    room: 'Room 101',
    studentIds: ['1', '4'] 
  },
  { 
    id: '2', 
    name: 'Physics', 
    grade: '11', 
    section: 'A', 
    teacherId: '2', 
    schedule: 'Tue, Thu 10:30 AM', 
    room: 'Room 102',
    studentIds: ['3'] 
  },
  { 
    id: '3', 
    name: 'English Literature', 
    grade: '10', 
    section: 'A', 
    teacherId: '3', 
    schedule: 'Mon, Wed 1:00 PM', 
    room: 'Room 203',
    studentIds: ['1', '5'] 
  },
  { 
    id: '4', 
    name: 'World History', 
    grade: '9', 
    section: 'A', 
    teacherId: '4', 
    schedule: 'Tue, Thu 2:30 PM', 
    room: 'Room 205',
    studentIds: ['2'] 
  },
  { 
    id: '5', 
    name: 'Art & Design', 
    grade: '10', 
    section: 'B', 
    teacherId: '5', 
    schedule: 'Fri 11:00 AM', 
    room: 'Room 302',
    studentIds: [] 
  },
];

// Mock data for teachers
interface TeacherData {
  id: string;
  name: string;
}

const mockTeacherData: TeacherData[] = [
  { id: '1', name: 'Dr. Robert Adams' },
  { id: '2', name: 'Prof. Linda Martinez' },
  { id: '3', name: 'Mrs. Elizabeth Taylor' },
  { id: '4', name: 'Mr. Thomas Moore' },
  { id: '5', name: 'Ms. Sarah Johnson' },
];

const ManageClasses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Get teacher name by ID
  const getTeacherName = (teacherId: string) => {
    const teacher = mockTeacherData.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getTeacherName(cls.teacherId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = (classData: Omit<Class, 'id'>) => {
    const newClass: Class = {
      id: (classes.length + 1).toString(),
      ...classData,
    };
    setClasses([...classes, newClass]);
    toast({
      title: "Class Added",
      description: `${classData.name} has been added successfully.`,
    });
  };

  const handleEditClass = (updatedClass: Class) => {
    setClasses(classes.map(cls => 
      cls.id === updatedClass.id ? updatedClass : cls
    ));
    toast({
      title: "Class Updated",
      description: `${updatedClass.name} has been updated successfully.`,
    });
  };

  const handleDeleteClass = (id: string) => {
    const classToDelete = classes.find(cls => cls.id === id);
    setClasses(classes.filter(cls => cls.id !== id));
    
    toast({
      title: "Class Deleted",
      description: `${classToDelete?.name} has been removed.`,
    });
  };

  const openEditDialog = (cls: Class) => {
    setEditingClass(cls);
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Classes</h1>
        <AddClassDialog onAddClass={handleAddClass} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classes List</CardTitle>
          <CardDescription>View and manage all classes offered in the school.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableCaption>A list of all classes in the school.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.id}</TableCell>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>Grade {cls.grade}</TableCell>
                      <TableCell>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          Section {cls.section}
                        </span>
                      </TableCell>
                      <TableCell>{getTeacherName(cls.teacherId)}</TableCell>
                      <TableCell>{cls.schedule}</TableCell>
                      <TableCell>{cls.room}</TableCell>
                      <TableCell>{cls.studentIds.length}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => openEditDialog(cls)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      No classes found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditClassDialog
        class={editingClass}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEditClass={handleEditClass}
      />
    </div>
  );
};

export default ManageClasses;

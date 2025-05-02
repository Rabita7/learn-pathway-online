
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

// Mock data for staff members
const initialStaffData = [
  { id: '1', name: 'John Smith', position: 'Senior Teacher', department: 'Science', email: 'john@school.edu', status: 'active' },
  { id: '2', name: 'Sarah Johnson', position: 'Teacher', department: 'Mathematics', email: 'sarah@school.edu', status: 'active' },
  { id: '3', name: 'Robert Davis', position: 'Lab Technician', department: 'Science', email: 'robert@school.edu', status: 'active' },
  { id: '4', name: 'Emily Brown', position: 'Teacher', department: 'English', email: 'emily@school.edu', status: 'inactive' },
  { id: '5', name: 'Michael Wilson', position: 'Teacher', department: 'Art', email: 'michael@school.edu', status: 'active' },
  { id: '6', name: 'Jennifer Lee', position: 'Administrative', department: 'Office', email: 'jennifer@school.edu', status: 'active' },
];

const ManageStaff = () => {
  const [staffData, setStaffData] = useState(initialStaffData);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Filter staff based on search term
  const filteredStaff = staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete staff member (mock implementation)
  const handleDelete = (id: string) => {
    setStaffData(staffData.filter(staff => staff.id !== id));
    toast({
      title: "Staff member removed",
      description: "The staff member has been removed from the system.",
    });
  };

  // Handle edit staff member (mock functionality)
  const handleEdit = (id: string) => {
    toast({
      title: "Edit staff member",
      description: "This would open a form to edit the staff member.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Staff</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Staff Management</CardTitle>
          <CardDescription>View, add, edit, or remove staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search staff..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Staff
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of all staff members in the school system.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {staff.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(staff.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(staff.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No staff members found matching your search.
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

export default ManageStaff;

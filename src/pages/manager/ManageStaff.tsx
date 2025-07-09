
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
import { useLocalization } from '@/context/LocalizationContext';
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
  const { t } = useLocalization();

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
      title: t('staff_member_removed'),
      description: t('staff_member_has_been_removed'),
    });
  };

  // Handle edit staff member (mock functionality)
  const handleEdit = (id: string) => {
    toast({
      title: t('edit_staff_member'),
      description: t('this_would_open_form_to_edit'),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('manage_staff')}</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('staff_management')}</CardTitle>
          <CardDescription>{t('view_add_edit_or_remove_staff_members')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder={t('search_staff')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              {t('add_new_staff')}
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>{t('list_of_all_staff_members')}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('position')}</TableHead>
                  <TableHead>{t('department')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
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
                          {t(staff.status)}
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
                      {t('no_staff_members_found')}
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

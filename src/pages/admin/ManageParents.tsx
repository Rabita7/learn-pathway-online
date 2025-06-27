
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
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddParentDialog from '@/components/admin/AddParentDialog';
import EditParentDialog from '@/components/admin/EditParentDialog';

// Updated interface for parents with children
interface Child {
  name: string;
  grade: string;
}

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: Child[];
}

// Updated mock data with children information
const mockParents: Parent[] = [
  { 
    id: 'p1', 
    name: 'Richard Doe', 
    email: 'richard.doe@example.com', 
    phone: '555-1001', 
    children: [
      { name: 'John Doe', grade: '11' },
      { name: 'Jane Doe', grade: '9' }
    ]
  },
  { 
    id: 'p2', 
    name: 'Mary Smith', 
    email: 'mary.smith@example.com', 
    phone: '555-1002', 
    children: [
      { name: 'Michael Smith', grade: '12' }
    ]
  },
  { 
    id: 'p3', 
    name: 'James Johnson', 
    email: 'james.johnson@example.com', 
    phone: '555-1003', 
    children: [
      { name: 'Sarah Johnson', grade: '10' },
      { name: 'David Johnson', grade: '11' },
      { name: 'Lisa Johnson', grade: '9' }
    ]
  },
  { 
    id: 'p4', 
    name: 'Patricia Brown', 
    email: 'patricia.brown@example.com', 
    phone: '555-1004', 
    children: [
      { name: 'Robert Brown', grade: '12' },
      { name: 'Emily Brown', grade: '10' }
    ]
  },
  { 
    id: 'p5', 
    name: 'Robert Wilson', 
    email: 'robert.wilson@example.com', 
    phone: '555-1005', 
    children: [
      { name: 'Amanda Wilson', grade: '9' }
    ]
  },
];

const ManageParents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [parents, setParents] = useState<Parent[]>(mockParents);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Filter parents based on search term
  const filteredParents = parents.filter(parent => 
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.children.some(child => 
      child.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddParent = (parentData: Omit<Parent, 'id'>) => {
    const newParent: Parent = {
      id: `p${parents.length + 1}`,
      ...parentData,
    };
    setParents([...parents, newParent]);
    toast({
      title: "Parent Added",
      description: `${parentData.name} has been added with ${parentData.children.length} child(ren).`,
    });
  };

  const handleEditParent = (updatedParent: Parent) => {
    setParents(parents.map(parent => 
      parent.id === updatedParent.id ? updatedParent : parent
    ));
    toast({
      title: "Parent Updated",
      description: `${updatedParent.name} has been updated successfully.`,
    });
  };

  const handleDeleteParent = (id: string) => {
    const parentToDelete = parents.find(parent => parent.id === id);
    setParents(parents.filter(parent => parent.id !== id));
    
    toast({
      title: "Parent Deleted",
      description: `${parentToDelete?.name} has been removed.`,
    });
  };

  const openEditDialog = (parent: Parent) => {
    setEditingParent(parent);
    setEditDialogOpen(true);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case '9': return 'bg-green-100 text-green-800';
      case '10': return 'bg-blue-100 text-blue-800';
      case '11': return 'bg-yellow-100 text-yellow-800';
      case '12': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Parents</h1>
        <AddParentDialog onAddParent={handleAddParent} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parents List</CardTitle>
          <CardDescription>View and manage all parents with children in the high school.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parents or children..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableCaption>A list of all parents and their high school children.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Children (Grade)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParents.length > 0 ? (
                  filteredParents.map((parent) => (
                    <TableRow key={parent.id}>
                      <TableCell>{parent.id}</TableCell>
                      <TableCell className="font-medium">{parent.name}</TableCell>
                      <TableCell>{parent.email}</TableCell>
                      <TableCell>{parent.phone}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {parent.children.map((child, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sm">{child.name}</span>
                              <Badge className={`text-xs ${getGradeColor(child.grade)}`}>
                                Grade {child.grade}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => openEditDialog(parent)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteParent(parent.id)}
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
                      No parents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditParentDialog
        parent={editingParent}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEditParent={handleEditParent}
      />
    </div>
  );
};

export default ManageParents;

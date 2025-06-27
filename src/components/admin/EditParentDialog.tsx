
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

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

interface EditParentDialogProps {
  parent: Parent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditParent: (parent: Parent) => void;
}

const EditParentDialog: React.FC<EditParentDialogProps> = ({ 
  parent, 
  open, 
  onOpenChange, 
  onEditParent 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    children: [{ name: '', grade: '9' }] as Child[],
  });

  const highSchoolGrades = ['9', '10', '11', '12'];

  useEffect(() => {
    if (parent) {
      setFormData({
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        children: parent.children.length > 0 ? parent.children : [{ name: '', grade: '9' }],
      });
    }
  }, [parent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty children
    const validChildren = formData.children.filter(child => child.name.trim() !== '');
    
    if (validChildren.length === 0) {
      alert('Please add at least one child');
      return;
    }
    
    if (parent) {
      onEditParent({ 
        ...parent, 
        ...formData,
        children: validChildren,
      });
      onOpenChange(false);
    }
  };

  const addChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { name: '', grade: '9' }]
    });
  };

  const removeChild = (index: number) => {
    if (formData.children.length > 1) {
      setFormData({
        ...formData,
        children: formData.children.filter((_, i) => i !== index)
      });
    }
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updatedChildren = formData.children.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    );
    setFormData({ ...formData, children: updatedChildren });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Parent</DialogTitle>
          <DialogDescription>
            Update the parent's information and their children's details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Parent Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Children (High School Students)</Label>
              <Button type="button" onClick={addChild} size="sm" variant="outline">
                <Plus className="h-3 w-3 mr-1" /> Add Child
              </Button>
            </div>
            
            {formData.children.map((child, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor={`child-name-${index}`} className="text-xs">Child Name</Label>
                  <Input
                    id={`child-name-${index}`}
                    value={child.name}
                    onChange={(e) => updateChild(index, 'name', e.target.value)}
                    placeholder="Enter child's name"
                    required
                  />
                </div>
                <div className="w-20">
                  <Label htmlFor={`child-grade-${index}`} className="text-xs">Grade</Label>
                  <select
                    id={`child-grade-${index}`}
                    value={child.grade}
                    onChange={(e) => updateChild(index, 'grade', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {highSchoolGrades.map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
                {formData.children.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeChild(index)}
                    size="icon"
                    variant="outline"
                    className="h-10 w-10"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Parent</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditParentDialog;

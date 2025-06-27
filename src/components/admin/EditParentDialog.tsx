
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

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  childrenCount: number;
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
    childrenCount: 1,
  });

  useEffect(() => {
    if (parent) {
      setFormData({
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        childrenCount: parent.childrenCount,
      });
    }
  }, [parent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parent) {
      onEditParent({ ...parent, ...formData });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Parent</DialogTitle>
          <DialogDescription>
            Update the parent's information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
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
          <div>
            <Label htmlFor="childrenCount">Number of Children</Label>
            <Input
              id="childrenCount"
              type="number"
              value={formData.childrenCount}
              onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value) || 1 })}
              min="1"
              required
            />
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

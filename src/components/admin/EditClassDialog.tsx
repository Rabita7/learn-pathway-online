
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Class } from '@/types';

interface EditClassDialogProps {
  class: Class | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditClass: (cls: Class) => void;
}

const EditClassDialog: React.FC<EditClassDialogProps> = ({ 
  class: cls, 
  open, 
  onOpenChange, 
  onEditClass 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    teacherId: '',
    schedule: '',
    room: '',
  });

  useEffect(() => {
    if (cls) {
      setFormData({
        name: cls.name,
        grade: cls.grade,
        section: cls.section,
        teacherId: cls.teacherId,
        schedule: cls.schedule,
        room: cls.room,
      });
    }
  }, [cls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cls) {
      onEditClass({ 
        ...cls, 
        ...formData 
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Update the class information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Class Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="teacherId">Teacher ID</Label>
            <Input
              id="teacherId"
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Class</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassDialog;

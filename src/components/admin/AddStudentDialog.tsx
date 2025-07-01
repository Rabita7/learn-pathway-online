
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Student } from '@/types';

interface AddStudentDialogProps {
  onAddStudent: (student: Omit<Student, 'id'>) => void;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ onAddStudent }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    parentName: '',
    parentAge: '',
    parentEmail: '',
    parentPhone: '',
    parentOccupation: '',
    emergencyContact: '',
    emergencyContactPhone: '',
    medicalConditions: '',
    previousSchool: '',
  });

  const highSchoolGrades = ['9', '10', '11', '12'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create student with parent information
    const studentData = {
      name: formData.name,
      grade: formData.grade,
      email: formData.email,
      parentId: '', // Will be generated
      phone: formData.phone,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      parentInfo: {
        name: formData.parentName,
        age: formData.parentAge,
        email: formData.parentEmail,
        phone: formData.parentPhone,
        occupation: formData.parentOccupation,
      },
      emergencyContact: formData.emergencyContact,
      emergencyContactPhone: formData.emergencyContactPhone,
      medicalConditions: formData.medicalConditions,
      previousSchool: formData.previousSchool,
    };
    
    onAddStudent(studentData);
    setFormData({
      name: '',
      grade: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      parentName: '',
      parentAge: '',
      parentEmail: '',
      parentPhone: '',
      parentOccupation: '',
      emergencyContact: '',
      emergencyContactPhone: '',
      medicalConditions: '',
      previousSchool: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Complete all student and parent information below. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Student Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade *</Label>
                <select
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select Grade</option>
                  {highSchoolGrades.map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Student Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Student Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentAge">Parent/Guardian Age *</Label>
                <Input
                  id="parentAge"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.parentAge}
                  onChange={(e) => setFormData({ ...formData, parentAge: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentEmail">Parent Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentPhone">Parent Phone *</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="parentOccupation">Parent Occupation *</Label>
              <Input
                id="parentOccupation"
                value={formData.parentOccupation}
                onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Emergency Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Emergency Contact</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Medical Information</h3>
            
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions/Allergies</Label>
              <Input
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                placeholder="List any medical conditions, allergies, or medications (optional)"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;

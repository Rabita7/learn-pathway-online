
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
import { Student } from '@/types';

interface EditStudentDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditStudent: (student: Student) => void;
}

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({ 
  student, 
  open, 
  onOpenChange, 
  onEditStudent 
}) => {
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

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        grade: student.grade,
        email: student.email,
        phone: student.phone || '',
        address: student.address || '',
        dateOfBirth: student.dateOfBirth || '',
        parentName: student.parentInfo?.name || '',
        parentAge: student.parentInfo?.age || '',
        parentEmail: student.parentInfo?.email || '',
        parentPhone: student.parentInfo?.phone || '',
        parentOccupation: student.parentInfo?.occupation || '',
        emergencyContact: student.emergencyContact || '',
        emergencyContactPhone: student.emergencyContactPhone || '',
        medicalConditions: student.medicalConditions || '',
        previousSchool: student.previousSchool || '',
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      const updatedStudent: Student = {
        ...student,
        name: formData.name,
        grade: formData.grade,
        email: formData.email,
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
      
      onEditStudent(updatedStudent);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the student and parent information below.
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
                <Label htmlFor="phone">Student Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="parentAge">Parent/Guardian Age</Label>
                <Input
                  id="parentAge"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.parentAge}
                  onChange={(e) => setFormData({ ...formData, parentAge: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentEmail">Parent Email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="parentPhone">Parent Phone</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="parentOccupation">Parent Occupation</Label>
              <Input
                id="parentOccupation"
                value={formData.parentOccupation}
                onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })}
              />
            </div>
          </div>

          {/* Emergency Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Emergency Contact</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
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
                placeholder="List any medical conditions, allergies, or medications"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Student</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;

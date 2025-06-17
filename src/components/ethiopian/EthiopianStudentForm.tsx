
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EthiopianStudent } from '@/types/ethiopian-education';
import { EthiopianRegion, ETHIOPIAN_REGIONS_ZONES } from '@/types/ethiopia';
import { GRADE_LEVELS_BY_EDUCATION } from '@/data/ethiopianMockData';

interface EthiopianStudentFormProps {
  student?: EthiopianStudent;
  onSubmit: (student: Omit<EthiopianStudent, 'id'>) => void;
  onCancel: () => void;
}

const EthiopianStudentForm: React.FC<EthiopianStudentFormProps> = ({
  student,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    gradeLevel: student?.gradeLevel || '',
    educationLevel: student?.educationLevel || '',
    region: student?.region || '',
    zone: student?.zone || '',
    woreda: student?.woreda || '',
    stream: student?.stream || '',
    motherTongue: student?.motherTongue || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<EthiopianStudent, 'id'>);
  };

  const handleEducationLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      educationLevel: level,
      gradeLevel: '', // Reset grade level when education level changes
      stream: level === 'Preparatory' ? prev.stream : '' // Keep stream only for preparatory
    }));
  };

  const handleRegionChange = (region: EthiopianRegion) => {
    setFormData(prev => ({
      ...prev,
      region,
      zone: '', // Reset zone when region changes
      woreda: ''
    }));
  };

  const availableGrades = formData.educationLevel ? 
    GRADE_LEVELS_BY_EDUCATION[formData.educationLevel] || [] : [];

  const availableZones = formData.region ? 
    ETHIOPIAN_REGIONS_ZONES[formData.region as EthiopianRegion] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="education-level">Education Level</Label>
        <Select value={formData.educationLevel} onValueChange={handleEducationLevelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Primary">Primary (Grade 1-8)</SelectItem>
            <SelectItem value="Secondary">Secondary (Grade 9-10)</SelectItem>
            <SelectItem value="Preparatory">Preparatory (Grade 11-12)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="grade-level">Grade Level</Label>
        <Select 
          value={formData.gradeLevel} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, gradeLevel: value }))}
          disabled={!formData.educationLevel}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select grade level" />
          </SelectTrigger>
          <SelectContent>
            {availableGrades.map(grade => (
              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.educationLevel === 'Preparatory' && (
        <div>
          <Label htmlFor="stream">Stream</Label>
          <Select 
            value={formData.stream} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, stream: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Natural Science">Natural Science</SelectItem>
              <SelectItem value="Social Science">Social Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="region">Region</Label>
        <Select value={formData.region} onValueChange={handleRegionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(ETHIOPIAN_REGIONS_ZONES).map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="zone">Zone</Label>
        <Select 
          value={formData.zone} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, zone: value }))}
          disabled={!formData.region}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select zone" />
          </SelectTrigger>
          <SelectContent>
            {availableZones.map(zone => (
              <SelectItem key={zone} value={zone}>{zone}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="woreda">Woreda</Label>
        <Input
          id="woreda"
          value={formData.woreda}
          onChange={(e) => setFormData(prev => ({ ...prev, woreda: e.target.value }))}
          placeholder="Enter woreda name"
        />
      </div>

      <div>
        <Label htmlFor="mother-tongue">Mother Tongue</Label>
        <Input
          id="mother-tongue"
          value={formData.motherTongue}
          onChange={(e) => setFormData(prev => ({ ...prev, motherTongue: e.target.value }))}
          placeholder="e.g., Amharic, Oromifa, Tigrinya"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {student ? 'Update Student' : 'Add Student'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EthiopianStudentForm;

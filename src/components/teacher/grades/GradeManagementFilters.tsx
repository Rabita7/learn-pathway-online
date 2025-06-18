
import React from 'react';
import { ClipboardList } from 'lucide-react';
import { ETHIOPIAN_SUBJECTS } from '@/types/ethiopia';
import { EthiopianStudent } from '@/types/ethiopian-education';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GradeManagementFiltersProps {
  selectedEducationLevel: string;
  selectedGradeLevel: string;
  selectedSubject: string;
  selectedTerm: string;
  searchTerm: string;
  students: EthiopianStudent[];
  onEducationLevelChange: (level: string) => void;
  onGradeLevelChange: (level: string) => void;
  onSubjectChange: (subject: string) => void;
  onTermChange: (term: string) => void;
  onSearchChange: (search: string) => void;
  onSaveGrades: () => void;
}

const GradeManagementFilters: React.FC<GradeManagementFiltersProps> = ({
  selectedEducationLevel,
  selectedGradeLevel,
  selectedSubject,
  selectedTerm,
  searchTerm,
  students,
  onEducationLevelChange,
  onGradeLevelChange,
  onSubjectChange,
  onTermChange,
  onSearchChange,
  onSaveGrades
}) => {
  // Get available subjects based on education level
  const availableSubjects = selectedEducationLevel ? 
    ETHIOPIAN_SUBJECTS[selectedEducationLevel as keyof typeof ETHIOPIAN_SUBJECTS] || [] : [];

  // Get unique grade levels for selected education level
  const availableGradeLevels = students
    .filter(student => student.educationLevel === selectedEducationLevel)
    .map(student => student.gradeLevel)
    .filter((level, index, array) => array.indexOf(level) === index);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-teacher" />
          Grade Management Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="education-level">Education Level</Label>
            <Select value={selectedEducationLevel} onValueChange={onEducationLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Primary">Primary (1-8)</SelectItem>
                <SelectItem value="Secondary">Secondary (9-10)</SelectItem>
                <SelectItem value="Preparatory">Preparatory (11-12)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="grade-level">Grade Level</Label>
            <Select value={selectedGradeLevel} onValueChange={onGradeLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="All grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-grades">All Grades</SelectItem>
                {availableGradeLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="term">Term</Label>
            <Select value={selectedTerm} onValueChange={onTermChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="First Term">First Term</SelectItem>
                <SelectItem value="Second Term">Second Term</SelectItem>
                <SelectItem value="Third Term">Third Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="search">Search Students</Label>
            <Input
              id="search"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button onClick={onSaveGrades} className="bg-teacher hover:bg-teacher/90">
            Save All Grades
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeManagementFilters;

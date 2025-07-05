
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Search, Save, Users, BookOpen, GraduationCap } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  section: string;
}

interface GradeManagementFiltersProps {
  selectedEducationLevel: string;
  selectedGradeLevel: string;
  selectedSubject: string;
  selectedSection: string;
  selectedTerm: string;
  searchTerm: string;
  students: Student[];
  assignedSubjects: string[];
  assignedGrades: string[];
  assignedSections: string[];
  onEducationLevelChange: (level: string) => void;
  onGradeLevelChange: (grade: string) => void;
  onSubjectChange: (subject: string) => void;
  onSectionChange: (section: string) => void;
  onTermChange: (term: string) => void;
  onSearchChange: (search: string) => void;
  onSaveGrades: () => void;
}

const GradeManagementFilters: React.FC<GradeManagementFiltersProps> = ({
  selectedEducationLevel,
  selectedGradeLevel,
  selectedSubject,
  selectedSection,
  selectedTerm,
  searchTerm,
  students,
  assignedSubjects,
  assignedGrades,
  assignedSections,
  onEducationLevelChange,
  onGradeLevelChange,
  onSubjectChange,
  onSectionChange,
  onTermChange,
  onSearchChange,
  onSaveGrades,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teacher" />
            Grade Management Filters
          </span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {students.length} Students
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <Label>Education Level</Label>
            <Select value={selectedEducationLevel} onValueChange={onEducationLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Primary">Primary</SelectItem>
                <SelectItem value="Secondary">Secondary</SelectItem>
                <SelectItem value="Preparatory">Preparatory</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Grade Level</Label>
            <Select value={selectedGradeLevel} onValueChange={onGradeLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Grades</SelectItem>
                {assignedGrades.map(grade => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Subject</Label>
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Subjects</SelectItem>
                {assignedSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Section</Label>
            <Select value={selectedSection} onValueChange={onSectionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Sections</SelectItem>
                {assignedSections.map(section => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Term</Label>
            <Select value={selectedTerm} onValueChange={onTermChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="First Term">First Term</SelectItem>
                <SelectItem value="Second Term">Second Term</SelectItem>
                <SelectItem value="Third Term">Third Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              {selectedSubject && selectedSubject !== 'all' ? `${selectedSubject} - ` : ''}
              {selectedGradeLevel && selectedGradeLevel !== 'all' ? `Grade ${selectedGradeLevel} - ` : ''}
              {selectedSection && selectedSection !== 'all' ? `Section ${selectedSection}` : 'All Sections'}
            </span>
          </div>
          <Button 
            onClick={onSaveGrades}
            className="bg-teacher hover:bg-teacher/90"
            disabled={!selectedSubject || selectedSubject === 'all'}
          >
            <Save className="h-4 w-4 mr-2" />
            Save All Grades
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeManagementFilters;

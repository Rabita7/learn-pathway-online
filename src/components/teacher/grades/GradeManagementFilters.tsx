
import React from 'react';
import { Search, Save, BookOpen, Users } from 'lucide-react';
import { EthiopianStudent } from '@/types/ethiopian-education';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GradeManagementFiltersProps {
  selectedEducationLevel: string;
  selectedGradeLevel: string;
  selectedSubject: string;
  selectedTerm: string;
  searchTerm: string;
  students: EthiopianStudent[];
  assignedSubjects: string[];
  assignedGrades: string[];
  onEducationLevelChange: (level: string) => void;
  onGradeLevelChange: (grade: string) => void;
  onSubjectChange: (subject: string) => void;
  onTermChange: (term: string) => void;
  onSearchChange: (term: string) => void;
  onSaveGrades: () => void;
}

const GradeManagementFilters: React.FC<GradeManagementFiltersProps> = ({
  selectedEducationLevel,
  selectedGradeLevel,
  selectedSubject,
  selectedTerm,
  searchTerm,
  students,
  assignedSubjects,
  assignedGrades,
  onEducationLevelChange,
  onGradeLevelChange,
  onSubjectChange,
  onTermChange,
  onSearchChange,
  onSaveGrades,
}) => {
  const terms = ['First Term', 'Second Term', 'Third Term'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-teacher" />
          Grade Management Filters
        </CardTitle>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {students.length} assigned students
          </span>
          <span>{assignedSubjects.length} assigned subjects</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Education Level
            </label>
            <Select value={selectedEducationLevel} onValueChange={onEducationLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Primary">Primary Education</SelectItem>
                <SelectItem value="Secondary">Secondary Education</SelectItem>
                <SelectItem value="Preparatory">Preparatory</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Grade Level
            </label>
            <Select value={selectedGradeLevel} onValueChange={onGradeLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-grades">All Assigned Grades</SelectItem>
                {assignedGrades.map(grade => (
                  <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Subject
            </label>
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {assignedSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Term
            </label>
            <Select value={selectedTerm} onValueChange={onTermChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                {terms.map(term => (
                  <SelectItem key={term} value={term}>{term}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Button 
            onClick={onSaveGrades} 
            className="bg-teacher text-white hover:bg-teacher/90"
            disabled={!selectedSubject}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Grades
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeManagementFilters;

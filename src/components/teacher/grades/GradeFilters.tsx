
import React from 'react';
import { Search, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subjects } from '@/data/mockStudentGrades';

interface GradeFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  onSaveGrades: () => void;
}

const GradeFilters: React.FC<GradeFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedSubject,
  setSelectedSubject,
  onSaveGrades
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
      <div className="relative w-full md:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={onSaveGrades} className="bg-teacher text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Grades
        </Button>
      </div>
    </div>
  );
};

export default GradeFilters;

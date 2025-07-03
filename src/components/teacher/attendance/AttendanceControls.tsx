
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Course = {
  id: string;
  name: string;
  code: string;
  sections: string[];
};

interface AttendanceControlsProps {
  date: Date;
  selectedCourseId: string;
  selectedSection: string;
  courses: Course[];
  onDateChange: (date: Date) => void;
  onCourseChange: (courseId: string) => void;
  onSectionChange: (section: string) => void;
}

const AttendanceControls: React.FC<AttendanceControlsProps> = ({
  date,
  selectedCourseId,
  selectedSection,
  courses,
  onDateChange,
  onCourseChange,
  onSectionChange,
}) => {
  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex flex-col md:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start text-left font-normal flex items-center"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, 'MMMM d, yyyy')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && onDateChange(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={selectedCourseId} onValueChange={onCourseChange}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map(course => (
              <SelectItem key={course.id} value={course.id}>
                {course.name} ({course.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSection} onValueChange={onSectionChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Sections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Sections</SelectItem>
            {selectedCourse?.sections.map(section => (
              <SelectItem key={section} value={section}>
                Section {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AttendanceControls;

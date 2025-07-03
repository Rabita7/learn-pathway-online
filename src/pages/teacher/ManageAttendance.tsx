
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Book, Users } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import SectionAttendance from '@/components/teacher/attendance/SectionAttendance';

type Student = {
  id: string;
  name: string;
  studentId: string;
  section: string;
};

type Course = {
  id: string;
  name: string;
  code: string;
  schedule: string;
  room: string;
  sections: string[];
  students: Student[];
};

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Biology 101',
    code: 'BIO101',
    schedule: 'MWF 9:00-10:00 AM',
    room: 'Science Lab A',
    sections: ['A', 'B', 'C'],
    students: [
      { id: '1', name: 'Alex Johnson', studentId: 'ST001', section: 'A' },
      { id: '2', name: 'Emma Smith', studentId: 'ST002', section: 'A' },
      { id: '3', name: 'Michael Brown', studentId: 'ST003', section: 'B' },
      { id: '13', name: 'Sarah Wilson', studentId: 'ST013', section: 'B' },
      { id: '14', name: 'David Lee', studentId: 'ST014', section: 'C' },
    ]
  },
  {
    id: '2',
    name: 'Chemistry Lab',
    code: 'CHEM201',
    schedule: 'TTh 2:00-4:00 PM',
    room: 'Chemistry Lab B',
    sections: ['A', 'B'],
    students: [
      { id: '4', name: 'Sophia Davis', studentId: 'ST004', section: 'A' },
      { id: '5', name: 'William Wilson', studentId: 'ST005', section: 'A' },
      { id: '6', name: 'Olivia Taylor', studentId: 'ST006', section: 'B' },
    ]
  },
];

const ManageAttendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [selectedSection, setSelectedSection] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  const selectedCourse = mockCourses.find(course => course.id === selectedCourseId);
  const formattedDate = format(date, 'yyyy-MM-dd');

  // Get students for selected section
  const sectionStudents = selectedCourse?.students.filter(student => 
    selectedSection === '' || student.section === selectedSection
  ) || [];

  const handleSaveAttendance = (attendanceRecords: any[]) => {
    const sectionText = selectedSection ? `section ${selectedSection}` : 'all sections';
    toast({
      title: "Attendance saved successfully",
      description: `Updated attendance for ${selectedCourse?.name} (${sectionText}) on ${format(date, 'MMMM d, yyyy')}`,
    });
  };

  if (!selectedCourse) {
    return <div>Course not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Course Attendance</h1>
        <p className="text-muted-foreground">Track and update student attendance records by section</p>
      </div>

      {/* Course Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockCourses.map((course) => (
          <Card key={course.id} className={`cursor-pointer transition-all ${selectedCourseId === course.id ? 'ring-2 ring-teacher border-teacher' : 'hover:shadow-md'}`} onClick={() => setSelectedCourseId(course.id)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-teacher" />
                  <div>
                    <div className="font-semibold">{course.name}</div>
                    <div className="text-sm text-muted-foreground">{course.code}</div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{course.students.length} students</div>
                  <div className="text-muted-foreground">{course.sections.length} sections</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{course.schedule} | {course.room}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
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
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {mockCourses.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name} ({course.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select Section" />
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

      {/* Section-based Attendance */}
      {selectedSection ? (
        <SectionAttendance
          students={sectionStudents}
          section={selectedSection}
          course={selectedCourse.name}
          date={formattedDate}
          onSave={handleSaveAttendance}
        />
      ) : (
        // Show all sections
        <div className="space-y-6">
          {selectedCourse.sections.map(section => {
            const studentsInSection = selectedCourse.students.filter(s => s.section === section);
            return (
              <SectionAttendance
                key={section}
                students={studentsInSection}
                section={section}
                course={selectedCourse.name}
                date={formattedDate}
                onSave={handleSaveAttendance}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageAttendance;

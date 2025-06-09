import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, Book, Users } from 'lucide-react';
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type AttendanceStatus = 'present' | 'absent' | 'tardy' | 'excused';

type Student = {
  id: number;
  name: string;
  studentId: string;
  section: string;
  attendance: Record<string, AttendanceStatus>;
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
      { 
        id: 1, 
        name: 'Alex Johnson',
        studentId: 'ST001',
        section: 'A',
        attendance: { 
          '2025-06-09': 'present',
          '2025-06-08': 'present',
          '2025-06-07': 'tardy',
        } 
      },
      { 
        id: 2, 
        name: 'Emma Smith',
        studentId: 'ST002',
        section: 'A',
        attendance: { 
          '2025-06-09': 'present',
          '2025-06-08': 'absent',
          '2025-06-07': 'present',
        } 
      },
      { 
        id: 3, 
        name: 'Michael Brown',
        studentId: 'ST003',
        section: 'B',
        attendance: { 
          '2025-06-09': 'tardy',
          '2025-06-08': 'present',
          '2025-06-07': 'excused',
        } 
      },
      { 
        id: 13, 
        name: 'Sarah Wilson',
        studentId: 'ST013',
        section: 'B',
        attendance: { 
          '2025-06-09': 'present',
          '2025-06-08': 'present',
          '2025-06-07': 'present',
        } 
      },
      { 
        id: 14, 
        name: 'David Lee',
        studentId: 'ST014',
        section: 'C',
        attendance: { 
          '2025-06-09': 'absent',
          '2025-06-08': 'tardy',
          '2025-06-07': 'present',
        } 
      },
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
      { 
        id: 4, 
        name: 'Sophia Davis',
        studentId: 'ST004',
        section: 'A',
        attendance: { 
          '2025-06-09': 'present',
          '2025-06-08': 'present',
          '2025-06-07': 'present',
        } 
      },
      { 
        id: 5, 
        name: 'William Wilson',
        studentId: 'ST005',
        section: 'A',
        attendance: { 
          '2025-06-09': 'absent',
          '2025-06-08': 'tardy',
          '2025-06-07': 'present',
        } 
      },
      { 
        id: 6, 
        name: 'Olivia Taylor',
        studentId: 'ST006',
        section: 'B',
        attendance: { 
          '2025-06-09': 'present',
          '2025-06-08': 'excused',
          '2025-06-07': 'present',
        } 
      },
    ]
  },
  {
    id: '3',
    name: 'Advanced Biology',
    code: 'BIO301',
    schedule: 'MWF 1:00-2:00 PM',
    room: 'Science Lab C',
    sections: ['A'],
    students: [
      { 
        id: 7, 
        name: 'James Anderson',
        studentId: 'ST007',
        section: 'A',
        attendance: { 
          '2025-06-09': 'present',
          '2025-06-08': 'present',
          '2025-06-07': 'present',
        } 
      },
      { 
        id: 8, 
        name: 'Isabella Martinez',
        studentId: 'ST008',
        section: 'A',
        attendance: { 
          '2025-06-09': 'tardy',
          '2025-06-08': 'present',
          '2025-06-07': 'absent',
        } 
      },
    ]
  },
];

const ManageAttendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [date, setDate] = useState<Date>(new Date());
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  const selectedCourse = courses.find(course => course.id === selectedCourseId);
  const formattedDate = format(date, 'yyyy-MM-dd');

  // Filter students by selected section
  const filteredStudents = selectedCourse?.students.filter(student => 
    selectedSection === 'All Sections' || student.section === selectedSection
  ) || [];

  const handleAttendanceChange = (studentId: number, status: AttendanceStatus) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === selectedCourseId 
          ? {
              ...course,
              students: course.students.map(student => 
                student.id === studentId 
                  ? { 
                      ...student, 
                      attendance: { 
                        ...student.attendance, 
                        [formattedDate]: status 
                      } 
                    } 
                  : student
              )
            }
          : course
      )
    );
  };

  const handleSaveAttendance = () => {
    const sectionText = selectedSection === 'All Sections' ? 'all sections' : `section ${selectedSection}`;
    toast({
      title: "Attendance saved successfully",
      description: `Updated attendance for ${selectedCourse?.name} (${sectionText}) on ${format(date, 'MMMM d, yyyy')}`,
    });
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'tardy':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'excused':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'tardy':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'excused':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
        {courses.map((course) => (
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
              {courses.map(course => (
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
              <SelectItem value="All Sections">All Sections</SelectItem>
              {selectedCourse?.sections.map(section => (
                <SelectItem key={section} value={section}>
                  Section {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSaveAttendance} className="bg-teacher hover:bg-teacher/90">
          Save Attendance
        </Button>
      </div>

      {/* Selected Course Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-teacher" />
            {selectedCourse.name} - {selectedSection} - {format(date, 'MMMM d, yyyy')}
          </CardTitle>
          <CardDescription className="flex items-center gap-4">
            <span>{selectedCourse.code} | {selectedCourse.schedule} | Room: {selectedCourse.room}</span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {filteredStudents.length} students
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Tardy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Excused</span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const status = student.attendance[formattedDate] || 'absent';
                
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-teacher/10 text-teacher rounded-full text-sm font-medium">
                        Section {student.section}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        <span className={`text-sm px-2 py-1 rounded-full border ${getStatusColor(status)} capitalize`}>
                          {status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        <Button 
                          size="sm" 
                          variant={status === 'present' ? 'default' : 'outline'} 
                          className={status === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                        >
                          Present
                        </Button>
                        <Button 
                          size="sm" 
                          variant={status === 'absent' ? 'default' : 'outline'} 
                          className={status === 'absent' ? 'bg-red-500 hover:bg-red-600' : ''}
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                        >
                          Absent
                        </Button>
                        <Button 
                          size="sm" 
                          variant={status === 'tardy' ? 'default' : 'outline'} 
                          className={status === 'tardy' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                          onClick={() => handleAttendanceChange(student.id, 'tardy')}
                        >
                          Tardy
                        </Button>
                        <Button 
                          size="sm" 
                          variant={status === 'excused' ? 'default' : 'outline'} 
                          className={status === 'excused' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                          onClick={() => handleAttendanceChange(student.id, 'excused')}
                        >
                          Excused
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No students found in the selected section
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
          <CardDescription>
            Overview for {selectedCourse.name} - {selectedSection} on {format(date, 'MMMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['present', 'absent', 'tardy', 'excused'] as AttendanceStatus[]).map((status) => {
              const count = filteredStudents.filter(student => 
                student.attendance[formattedDate] === status
              ).length;
              
              const percentage = filteredStudents.length > 0 ? ((count / filteredStudents.length) * 100).toFixed(1) : '0';
              
              return (
                <div key={status} className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm capitalize font-medium">{status}</div>
                    {getStatusIcon(status)}
                  </div>
                  <div className="mt-2 text-2xl font-bold">{count}</div>
                  <div className="text-sm">{percentage}% of section</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAttendance;

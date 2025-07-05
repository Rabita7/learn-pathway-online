
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import CourseOverviewCards from '@/components/teacher/attendance/CourseOverviewCards';
import AttendanceControls from '@/components/teacher/attendance/AttendanceControls';
import AttendanceSectionList from '@/components/teacher/attendance/AttendanceSectionList';

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
    name: 'Mathematics',
    code: 'MATH101',
    schedule: 'MWF 9:00-10:00 AM',
    room: 'Room 101',
    sections: ['A', 'B'],
    students: [
      { id: '1', name: 'Almaz Tadesse', studentId: 'ST001', section: 'A' },
      { id: '2', name: 'Bereket Haile', studentId: 'ST002', section: 'A' },
      { id: '3', name: 'Chaltu Bekele', studentId: 'ST003', section: 'A' },
      { id: '13', name: 'Dawit Mekonnen', studentId: 'ST013', section: 'B' },
      { id: '14', name: 'Eden Girma', studentId: 'ST014', section: 'B' },
      { id: '15', name: 'Fitsum Alemayehu', studentId: 'ST015', section: 'B' },
    ]
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHY201',
    schedule: 'TTh 2:00-4:00 PM',
    room: 'Physics Lab',
    sections: ['A'],
    students: [
      { id: '4', name: 'Helen Teshome', studentId: 'ST004', section: 'A' },
      { id: '5', name: 'Ibrahim Mohammed', studentId: 'ST005', section: 'A' },
      { id: '6', name: 'Johar Abebe', studentId: 'ST006', section: 'A' },
    ]
  },
];

const ManageAttendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [selectedSection, setSelectedSection] = useState('all');
  const [date, setDate] = useState<Date>(new Date());

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  const selectedCourse = mockCourses.find(course => course.id === selectedCourseId);
  const formattedDate = format(date, 'yyyy-MM-dd');

  const handleSaveAttendance = (attendanceRecords: any[]) => {
    const sectionText = selectedSection && selectedSection !== 'all' ? `section ${selectedSection}` : 'all sections';
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

      <CourseOverviewCards
        courses={mockCourses}
        selectedCourseId={selectedCourseId}
        onCourseSelect={setSelectedCourseId}
      />

      <AttendanceControls
        date={date}
        selectedCourseId={selectedCourseId}
        selectedSection={selectedSection}
        courses={mockCourses}
        onDateChange={setDate}
        onCourseChange={setSelectedCourseId}
        onSectionChange={setSelectedSection}
      />

      <AttendanceSectionList
        selectedCourse={selectedCourse}
        selectedSection={selectedSection}
        date={formattedDate}
        onSave={handleSaveAttendance}
      />
    </div>
  );
};

export default ManageAttendance;


import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
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
  const { t } = useLocalization();
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [selectedSection, setSelectedSection] = useState('all');
  const [date, setDate] = useState<Date>(new Date());

  if (!user || user.role !== 'teacher') {
    return <div>{t('access_denied')}. {t('teacher')} {t('privileges_required')}.</div>;
  }

  const selectedCourse = mockCourses.find(course => course.id === selectedCourseId);
  const formattedDate = format(date, 'yyyy-MM-dd');

  const handleSaveAttendance = (attendanceRecords: any[]) => {
    const sectionText = selectedSection && selectedSection !== 'all' ? `${t('section')} ${selectedSection}` : t('all') + ' ' + t('sections');
    toast({
      title: t('attendance') + ' ' + t('success'),
      description: `${t('update')} ${t('attendance')} ${t('for')} ${selectedCourse?.name} (${sectionText}) ${t('on')} ${format(date, 'MMMM d, yyyy')}`,
    });
  };

  if (!selectedCourse) {
    return <div>{t('course')} {t('not_found')}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('manage_attendance')}</h1>
        <p className="text-muted-foreground">{t('track_and_update_student_attendance_records_by_section')}</p>
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

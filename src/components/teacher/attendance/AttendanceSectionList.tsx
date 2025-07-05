
import React from 'react';
import SectionAttendance from './SectionAttendance';

interface Student {
  id: string;
  name: string;
  studentId: string;
  section: string;
}

interface Course {
  id: string;
  name: string;
  students: Student[];
  sections: string[];
}

interface AttendanceSectionListProps {
  selectedCourse: Course;
  selectedSection: string;
  date: string;
  onSave: (attendanceRecords: any[]) => void;
}

const AttendanceSectionList: React.FC<AttendanceSectionListProps> = ({
  selectedCourse,
  selectedSection,
  date,
  onSave,
}) => {
  if (selectedSection && selectedSection !== 'all') {
    const sectionStudents = selectedCourse.students.filter(student => 
      student.section === selectedSection
    );
    
    return (
      <SectionAttendance
        students={sectionStudents}
        section={selectedSection}
        course={selectedCourse.name}
        date={date}
        onSave={onSave}
      />
    );
  }

  return (
    <div className="space-y-6">
      {selectedCourse.sections.map(section => {
        const studentsInSection = selectedCourse.students.filter(s => s.section === section);
        return (
          <SectionAttendance
            key={section}
            students={studentsInSection}
            section={section}
            course={selectedCourse.name}
            date={date}
            onSave={onSave}
          />
        );
      })}
    </div>
  );
};

export default AttendanceSectionList;

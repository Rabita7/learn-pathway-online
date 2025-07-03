
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockEthiopianStudents } from '@/data/ethiopianMockData';
import { EthiopianStudent } from '@/types/ethiopian-education';
import GradeManagementFilters from '@/components/teacher/grades/GradeManagementFilters';
import EthiopianGradingScale from '@/components/teacher/grades/EthiopianGradingScale';
import AssessmentGradeEntry from '@/components/teacher/grades/AssessmentGradeEntry';

// Mock teacher assignments - this would come from a backend
const mockTeacherAssignments = [
  { teacherId: '1', subject: 'Mathematics', grade: '9', section: 'A' },
  { teacherId: '1', subject: 'Mathematics', grade: '10', section: 'B' },
  { teacherId: '1', subject: 'Physics', grade: '9', section: 'A' },
  { teacherId: '2', subject: 'Physics', grade: '11', section: 'A' },
  { teacherId: '3', subject: 'English', grade: '10', section: 'A' },
  { teacherId: '4', subject: 'History', grade: '9', section: 'A' },
  { teacherId: '5', subject: 'Art', grade: '10', section: 'B' },
];

const ManageGrades = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>('Secondary');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('First Term');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<EthiopianStudent[]>(mockEthiopianStudents);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  // Get teacher's assigned subjects, grades, and sections
  const teacherAssignments = mockTeacherAssignments.filter(assignment => assignment.teacherId === user.id);
  const assignedSubjects = [...new Set(teacherAssignments.map(assignment => assignment.subject))];
  const assignedGrades = [...new Set(teacherAssignments.map(assignment => assignment.grade))];
  const assignedSections = [...new Set(teacherAssignments.map(assignment => assignment.section))];

  // Get sections for selected subject and grade
  const getAvailableSections = () => {
    if (!selectedSubject || !selectedGradeLevel) return [];
    return teacherAssignments
      .filter(assignment => 
        assignment.subject === selectedSubject && 
        assignment.grade === selectedGradeLevel
      )
      .map(assignment => assignment.section);
  };

  const availableSections = getAvailableSections();

  // Filter students based on teacher's assignments and selections
  const getFilteredStudents = () => {
    let filteredStudents = students.filter(student => {
      // Check if teacher is assigned to this student's grade and section for the selected subject
      const hasAssignment = teacherAssignments.some(assignment => 
        assignment.grade === student.gradeLevel && 
        assignment.section === student.section &&
        (selectedSubject === '' || assignment.subject === selectedSubject)
      );
      
      const matchesEducationLevel = selectedEducationLevel === '' || student.educationLevel === selectedEducationLevel;
      const matchesGradeLevel = selectedGradeLevel === '' || student.gradeLevel === selectedGradeLevel;
      const matchesSection = selectedSection === '' || student.section === selectedSection;
      const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return hasAssignment && matchesEducationLevel && matchesGradeLevel && matchesSection && matchesSearch;
    });

    return filteredStudents;
  };

  const filteredStudents = getFilteredStudents();

  const handleSaveGrades = (assessments: any[]) => {
    if (!selectedSubject) {
      toast({
        title: "No Subject Selected",
        description: "Please select a subject before saving grades.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "ውጤቶች በተሳካ ሁኔታ ተቀምጠዋል",
      description: `Updated grades for ${selectedSubject} - ${selectedTerm}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">የወሰን ውጤት አያያዝ (Manage Grades)</h1>
          <p className="text-muted-foreground">Update and review grades for your assigned classes</p>
          <div className="mt-2 text-sm text-blue-600">
            <strong>Your Assignments:</strong>
            <ul className="list-disc list-inside mt-1">
              {teacherAssignments.map((assignment, index) => (
                <li key={index}>
                  {assignment.subject} - Grade {assignment.grade}{assignment.section}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <GradeManagementFilters
        selectedEducationLevel={selectedEducationLevel}
        selectedGradeLevel={selectedGradeLevel}
        selectedSubject={selectedSubject}
        selectedSection={selectedSection}
        selectedTerm={selectedTerm}
        searchTerm={searchTerm}
        students={getFilteredStudents()}
        assignedSubjects={assignedSubjects}
        assignedGrades={assignedGrades}
        assignedSections={availableSections}
        onEducationLevelChange={setSelectedEducationLevel}
        onGradeLevelChange={setSelectedGradeLevel}
        onSubjectChange={setSelectedSubject}
        onSectionChange={setSelectedSection}
        onTermChange={setSelectedTerm}
        onSearchChange={setSearchTerm}
        onSaveGrades={() => handleSaveGrades([])}
      />

      <EthiopianGradingScale />

      {selectedSubject && selectedGradeLevel && (
        <AssessmentGradeEntry
          students={filteredStudents.map(s => ({
            id: s.id,
            name: s.name,
            section: s.section
          }))}
          subject={selectedSubject}
          grade={selectedGradeLevel}
          section={selectedSection || 'All'}
          onSave={handleSaveGrades}
        />
      )}
    </div>
  );
};

export default ManageGrades;

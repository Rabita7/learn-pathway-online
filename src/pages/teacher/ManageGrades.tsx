
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
  { teacherId: '2', subject: 'Physics', grade: '11', section: 'A' },
  { teacherId: '3', subject: 'English', grade: '10', section: 'A' },
  { teacherId: '4', subject: 'History', grade: '9', section: 'A' },
  { teacherId: '5', subject: 'Art', grade: '10', section: 'B' },
];

const ManageGrades = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>('Secondary');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all-grades');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('First Term');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<EthiopianStudent[]>(mockEthiopianStudents);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  // Get teacher's assigned subjects and sections
  const teacherAssignments = mockTeacherAssignments.filter(assignment => assignment.teacherId === user.id);
  const assignedSubjects = [...new Set(teacherAssignments.map(assignment => assignment.subject))];
  const assignedGrades = [...new Set(teacherAssignments.map(assignment => assignment.grade))];

  // Filter students based on teacher's assignments
  const getAssignedStudents = () => {
    return students.filter(student => {
      // Check if teacher is assigned to this student's grade and section for any subject
      const hasAssignment = teacherAssignments.some(assignment => 
        assignment.grade === student.gradeLevel && 
        assignment.section === student.section
      );
      return hasAssignment;
    });
  };

  // Filter students by education level, grade level, search term, and teacher assignments
  const filteredStudents = getAssignedStudents().filter(student => {
    const matchesEducationLevel = selectedEducationLevel === '' || student.educationLevel === selectedEducationLevel;
    const matchesGradeLevel = selectedGradeLevel === 'all-grades' || selectedGradeLevel === '' || student.gradeLevel === selectedGradeLevel;
    const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Only show students from grades/sections where teacher teaches the selected subject
    const canTeachSubject = selectedSubject === '' || teacherAssignments.some(assignment => 
      assignment.subject === selectedSubject && 
      assignment.grade === student.gradeLevel && 
      assignment.section === student.section
    );
    
    return matchesEducationLevel && matchesGradeLevel && matchesSearch && canTeachSubject;
  });

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
        selectedTerm={selectedTerm}
        searchTerm={searchTerm}
        students={getAssignedStudents()}
        assignedSubjects={assignedSubjects}
        assignedGrades={assignedGrades}
        onEducationLevelChange={setSelectedEducationLevel}
        onGradeLevelChange={setSelectedGradeLevel}
        onSubjectChange={setSelectedSubject}
        onTermChange={setSelectedTerm}
        onSearchChange={setSearchTerm}
        onSaveGrades={() => handleSaveGrades([])}
      />

      <EthiopianGradingScale />

      {selectedSubject && (
        <AssessmentGradeEntry
          students={filteredStudents.map(s => ({
            id: s.id,
            name: s.name,
            section: s.section
          }))}
          subject={selectedSubject}
          onSave={handleSaveGrades}
        />
      )}
    </div>
  );
};

export default ManageGrades;

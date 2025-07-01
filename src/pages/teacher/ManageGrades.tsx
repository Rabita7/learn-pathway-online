
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockEthiopianStudents, mockEthiopianGrades } from '@/data/ethiopianMockData';
import { EthiopianGrade } from '@/types/ethiopia';
import { EthiopianStudent, EthiopianGradeEntry } from '@/types/ethiopian-education';
import { ETHIOPIAN_GRADING_SCALE } from '@/types/ethiopia';
import GradeManagementFilters from '@/components/teacher/grades/GradeManagementFilters';
import EthiopianGradingScale from '@/components/teacher/grades/EthiopianGradingScale';
import GradeEntryTable from '@/components/teacher/grades/GradeEntryTable';

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
  const [grades, setGrades] = useState<EthiopianGradeEntry[]>(mockEthiopianGrades);

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

  const handleGradeChange = (studentId: string, grade: EthiopianGrade, percentage: number) => {
    // Verify teacher can grade this student for this subject
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const canGrade = teacherAssignments.some(assignment => 
      assignment.subject === selectedSubject && 
      assignment.grade === student.gradeLevel && 
      assignment.section === student.section
    );

    if (!canGrade) {
      toast({
        title: "Access Denied",
        description: "You are not assigned to teach this subject to this student's class.",
        variant: "destructive",
      });
      return;
    }

    const gradeInfo = ETHIOPIAN_GRADING_SCALE[grade];
    const newGradeEntry: EthiopianGradeEntry = {
      id: Date.now().toString(),
      studentId,
      subject: selectedSubject,
      grade,
      points: gradeInfo.points,
      percentage,
      term: selectedTerm as any,
      academicYear: '2024/25',
      date: new Date().toISOString().split('T')[0]
    };

    setGrades(prev => {
      const filtered = prev.filter(g => 
        !(g.studentId === studentId && g.subject === selectedSubject && g.term === selectedTerm)
      );
      return [...filtered, newGradeEntry];
    });
  };

  const handleSaveGrades = () => {
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
        onSaveGrades={handleSaveGrades}
      />

      <EthiopianGradingScale />

      <GradeEntryTable
        selectedSubject={selectedSubject}
        selectedTerm={selectedTerm}
        filteredStudents={filteredStudents}
        grades={grades}
        onGradeChange={handleGradeChange}
      />
    </div>
  );
};

export default ManageGrades;

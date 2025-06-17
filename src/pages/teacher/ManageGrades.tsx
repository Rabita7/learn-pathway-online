
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

const ManageGrades = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>('Secondary');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('First Term');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<EthiopianStudent[]>(mockEthiopianStudents);
  const [grades, setGrades] = useState<EthiopianGradeEntry[]>(mockEthiopianGrades);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  // Filter students by education level, grade level, and search term
  const filteredStudents = students.filter(student => {
    const matchesEducationLevel = selectedEducationLevel === '' || student.educationLevel === selectedEducationLevel;
    const matchesGradeLevel = selectedGradeLevel === '' || student.gradeLevel === selectedGradeLevel;
    const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEducationLevel && matchesGradeLevel && matchesSearch;
  });

  const handleGradeChange = (studentId: string, grade: EthiopianGrade, percentage: number) => {
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
      // Remove existing grade for this student/subject/term combination
      const filtered = prev.filter(g => 
        !(g.studentId === studentId && g.subject === selectedSubject && g.term === selectedTerm)
      );
      return [...filtered, newGradeEntry];
    });
  };

  const handleSaveGrades = () => {
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
          <p className="text-muted-foreground">Update and review student grades using Ethiopian education standards</p>
        </div>
      </div>

      <GradeManagementFilters
        selectedEducationLevel={selectedEducationLevel}
        selectedGradeLevel={selectedGradeLevel}
        selectedSubject={selectedSubject}
        selectedTerm={selectedTerm}
        searchTerm={searchTerm}
        students={students}
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

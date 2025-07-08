import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockEthiopianStudents } from '@/data/ethiopianMockData';
import { EthiopianStudent } from '@/types/ethiopian-education';
import { useGradeCalculation } from '@/hooks/useGradeCalculation';
import GradeManagementFilters from '@/components/teacher/grades/GradeManagementFilters';
import EthiopianGradingScale from '@/components/teacher/grades/EthiopianGradingScale';
import StudentGradeTable from '@/components/teacher/grades/StudentGradeTable';
import { BookOpen } from 'lucide-react';

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
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('First Term');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<EthiopianStudent[]>(mockEthiopianStudents);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    grades, 
    updateGrade, 
    getStudentGrade,
    getLetterGrade,
    getGradeColor,
    classStatistics 
  } = useGradeCalculation();

  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Teacher privileges required to access this page.</p>
        </div>
      </div>
    );
  }

  // Get teacher's assigned subjects, grades, and sections
  const teacherAssignments = mockTeacherAssignments.filter(assignment => assignment.teacherId === user.id);
  const assignedSubjects = [...new Set(teacherAssignments.map(assignment => assignment.subject))];
  const assignedGrades = [...new Set(teacherAssignments.map(assignment => assignment.grade))];
  const assignedSections = [...new Set(teacherAssignments.map(assignment => assignment.section))];

  // Get sections for selected subject and grade
  const getAvailableSections = () => {
    if (!selectedSubject || selectedSubject === 'all' || !selectedGradeLevel || selectedGradeLevel === 'all') return assignedSections;
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
      const hasAssignment = teacherAssignments.some(assignment => 
        assignment.grade === student.gradeLevel && 
        assignment.section === student.section &&
        (selectedSubject === 'all' || assignment.subject === selectedSubject)
      );
      
      const matchesEducationLevel = selectedEducationLevel === 'all' || student.educationLevel === selectedEducationLevel;
      const matchesGradeLevel = selectedGradeLevel === 'all' || student.gradeLevel === selectedGradeLevel;
      const matchesSection = selectedSection === 'all' || student.section === selectedSection;
      const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return hasAssignment && matchesEducationLevel && matchesGradeLevel && matchesSection && matchesSearch;
    });

    return filteredStudents;
  };

  const filteredStudents = getFilteredStudents();

  const handleSaveGrades = async () => {
    if (!selectedSubject || selectedSubject === 'all') {
      toast({
        title: "No Subject Selected",
        description: "Please select a subject before saving grades.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "ውጤቶች በተሳካ ሁኔታ ተቀምጠዋል (Grades Saved Successfully)",
        description: `Updated grades for ${selectedSubject} - ${selectedTerm}`,
      });
    } catch (error) {
      toast({
        title: "Error Saving Grades",
        description: "Failed to save grades. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">የወሰን ውጤት አያያዝ (Manage Grades)</h1>
          <p className="text-muted-foreground mt-1">Update and review grades for your assigned classes</p>
          <div className="mt-3 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
            <strong>Your Assignments:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {teacherAssignments.map((assignment, index) => (
                <li key={index}>
                  {assignment.subject} - Grade {assignment.grade}{assignment.section}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {classStatistics && (
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Class Statistics</h3>
            <div className="space-y-1 text-sm">
              <p>Average: <span className="font-medium">{classStatistics.average}%</span></p>
              <p>Highest: <span className="font-medium text-green-600">{classStatistics.highest}%</span></p>
              <p>Lowest: <span className="font-medium text-red-600">{classStatistics.lowest}%</span></p>
              <p>Total Students: <span className="font-medium">{classStatistics.total}</span></p>
            </div>
          </div>
        )}
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
        onSaveGrades={handleSaveGrades}
      />

      <EthiopianGradingScale />

      {selectedSubject && selectedSubject !== 'all' && (
        <StudentGradeTable
          students={filteredStudents}
          grades={grades}
          subject={selectedSubject}
          gradeLevel={selectedGradeLevel}
          section={selectedSection}
          term={selectedTerm}
          onGradeChange={updateGrade}
          getStudentGrade={getStudentGrade}
          getLetterGrade={getLetterGrade}
          getGradeColor={getGradeColor}
          isLoading={isLoading}
        />
      )}

      {(!selectedSubject || selectedSubject === 'all') && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Subject</h3>
          <p className="text-gray-600">Choose a subject from the filters above to start managing grades.</p>
        </div>
      )}
    </div>
  );
};

export default ManageGrades;

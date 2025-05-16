
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList } from 'lucide-react';
import { Student } from '@/types/grades';
import { mockStudents } from '@/data/mockStudentGrades';
import GradeTable from '@/components/teacher/grades/GradeTable';
import GradeDistribution from '@/components/teacher/grades/GradeDistribution';
import GradeFilters from '@/components/teacher/grades/GradeFilters';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ManageGrades = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState('Biology');
  const [searchTerm, setSearchTerm] = useState('');
  const [studentGrades, setStudentGrades] = useState<Student[]>(mockStudents);

  if (!user || user.role !== 'teacher') {
    return <div>Access denied. Teacher privileges required.</div>;
  }

  // Filter students based on search term and selected subject
  const filteredStudents = studentGrades.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasSubject = student.grades[selectedSubject] !== undefined;
    return matchesSearch && hasSubject;
  });

  const handleGradeChange = (studentId: number, newGrade: string) => {
    setStudentGrades(prev => 
      prev.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            grades: {
              ...student.grades,
              [selectedSubject]: newGrade
            }
          };
        }
        return student;
      })
    );
  };

  const handleSaveGrades = () => {
    // In a real app, this would save to a database
    toast({
      title: "Grades saved successfully",
      description: `Updated grades for ${selectedSubject}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Grades</h1>
          <p className="text-muted-foreground">Update and review student grades</p>
        </div>
      </div>

      <GradeFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        onSaveGrades={handleSaveGrades}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teacher" />
            Grade Management
          </CardTitle>
          <CardDescription>
            {filteredStudents.length} students enrolled in {selectedSubject}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradeTable 
            students={filteredStudents}
            selectedSubject={selectedSubject}
            onGradeChange={handleGradeChange}
          />
        </CardContent>
      </Card>

      <GradeDistribution 
        students={filteredStudents}
        selectedSubject={selectedSubject}
      />
    </div>
  );
};

export default ManageGrades;

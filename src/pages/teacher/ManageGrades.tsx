
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, BookOpen, Users, Award } from 'lucide-react';
import { mockEthiopianStudents, mockEthiopianGrades } from '@/data/ethiopianMockData';
import { ETHIOPIAN_SUBJECTS, ETHIOPIAN_GRADING_SCALE, EthiopianGrade } from '@/types/ethiopia';
import { EthiopianStudent, EthiopianGradeEntry } from '@/types/ethiopian-education';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

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

  // Get available subjects based on education level
  const availableSubjects = selectedEducationLevel ? 
    ETHIOPIAN_SUBJECTS[selectedEducationLevel as keyof typeof ETHIOPIAN_SUBJECTS] || [] : [];

  // Filter students by education level, grade level, and search term
  const filteredStudents = students.filter(student => {
    const matchesEducationLevel = selectedEducationLevel === '' || student.educationLevel === selectedEducationLevel;
    const matchesGradeLevel = selectedGradeLevel === '' || student.gradeLevel === selectedGradeLevel;
    const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEducationLevel && matchesGradeLevel && matchesSearch;
  });

  // Get unique grade levels for selected education level
  const availableGradeLevels = students
    .filter(student => student.educationLevel === selectedEducationLevel)
    .map(student => student.gradeLevel)
    .filter((level, index, array) => array.indexOf(level) === index);

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

  const getStudentGrade = (studentId: string) => {
    return grades.find(g => 
      g.studentId === studentId && 
      g.subject === selectedSubject && 
      g.term === selectedTerm
    );
  };

  const handleSaveGrades = () => {
    toast({
      title: "ውጤቶች በተሳካ ሁኔታ ተቀምጠዋል",
      description: `Updated grades for ${selectedSubject} - ${selectedTerm}`,
    });
  };

  const getGradeColor = (grade: EthiopianGrade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50';
      case 'B': return 'text-blue-600 bg-blue-50';
      case 'C': return 'text-yellow-600 bg-yellow-50';
      case 'D': return 'text-orange-600 bg-orange-50';
      case 'F': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">የወሰን ውጤት አያያዝ (Manage Grades)</h1>
          <p className="text-muted-foreground">Update and review student grades using Ethiopian education standards</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teacher" />
            Grade Management Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="education-level">Education Level</Label>
              <Select value={selectedEducationLevel} onValueChange={setSelectedEducationLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary (1-8)</SelectItem>
                  <SelectItem value="Secondary">Secondary (9-10)</SelectItem>
                  <SelectItem value="Preparatory">Preparatory (11-12)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="grade-level">Grade Level</Label>
              <Select value={selectedGradeLevel} onValueChange={setSelectedGradeLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Grades</SelectItem>
                  {availableGradeLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="term">Term</Label>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search Students</Label>
              <Input
                id="search"
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveGrades} className="bg-teacher hover:bg-teacher/90">
              Save All Grades
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ethiopian Grading Scale Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-teacher" />
            Ethiopian Grading Scale Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(ETHIOPIAN_GRADING_SCALE).map(([grade, info]) => (
              <div key={grade} className={`p-3 rounded-lg border ${getGradeColor(grade as EthiopianGrade)}`}>
                <div className="font-bold text-lg">{grade}</div>
                <div className="text-sm">{info.range}%</div>
                <div className="text-xs">{info.description}</div>
                <div className="text-xs font-medium">{info.points} points</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grade Entry Table */}
      {selectedSubject && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teacher" />
              {selectedSubject} - {selectedTerm} Grades
            </CardTitle>
            <CardDescription className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {filteredStudents.length} students
              </span>
              <span>Academic Year: 2024/25</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Grade Level</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Current Grade</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const currentGrade = getStudentGrade(student.id);
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.gradeLevel}</TableCell>
                      <TableCell>{student.region}</TableCell>
                      <TableCell>
                        {currentGrade && (
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(currentGrade.grade)}`}>
                            {currentGrade.grade} ({currentGrade.percentage}%)
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Enter %"
                          className="w-20"
                          defaultValue={currentGrade?.percentage || ''}
                          onBlur={(e) => {
                            const percentage = parseInt(e.target.value);
                            if (percentage >= 0 && percentage <= 100) {
                              let grade: EthiopianGrade;
                              if (percentage >= 90) grade = 'A';
                              else if (percentage >= 80) grade = 'B';
                              else if (percentage >= 60) grade = 'C';
                              else if (percentage >= 50) grade = 'D';
                              else grade = 'F';
                              
                              handleGradeChange(student.id, grade, percentage);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={currentGrade?.grade || ''} 
                          onValueChange={(grade: EthiopianGrade) => {
                            const percentage = currentGrade?.percentage || 0;
                            handleGradeChange(student.id, grade, percentage);
                          }}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(ETHIOPIAN_GRADING_SCALE).map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No students found matching the selected criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageGrades;

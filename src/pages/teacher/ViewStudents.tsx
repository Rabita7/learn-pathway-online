
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, GraduationCap, Users } from 'lucide-react';

// Mock data for students
const mockStudents = [
  { id: 1, name: 'Alex Johnson', grade: '10', attendance: '95%', averageGrade: 'A-', email: 'alex.j@school.edu', subjects: ['Biology', 'Chemistry', 'Physics'] },
  { id: 2, name: 'Emma Smith', grade: '10', attendance: '98%', averageGrade: 'A', email: 'emma.s@school.edu', subjects: ['Biology', 'Chemistry', 'Physics'] },
  { id: 3, name: 'Michael Brown', grade: '10', attendance: '90%', averageGrade: 'B+', email: 'michael.b@school.edu', subjects: ['Biology', 'Chemistry', 'Physics'] },
  { id: 4, name: 'Sophia Davis', grade: '10', attendance: '92%', averageGrade: 'A-', email: 'sophia.d@school.edu', subjects: ['Biology', 'Chemistry', 'Physics'] },
  { id: 5, name: 'William Wilson', grade: '10', attendance: '88%', averageGrade: 'B', email: 'william.w@school.edu', subjects: ['Biology', 'Chemistry', 'Physics'] },
  { id: 6, name: 'Olivia Miller', grade: '11', attendance: '94%', averageGrade: 'A', email: 'olivia.m@school.edu', subjects: ['Advanced Biology', 'Chemistry', 'Physics'] },
  { id: 7, name: 'James Taylor', grade: '11', attendance: '91%', averageGrade: 'B+', email: 'james.t@school.edu', subjects: ['Advanced Biology', 'Chemistry', 'Physics'] },
];

const ViewStudents = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(t('all_classes'));

  if (!user || user.role !== 'teacher') {
    return <div>{t('access_denied')}. {t('teacher')} {t('privileges_required')}.</div>;
  }

  // Filter students based on search term and selected class
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === t('all_classes') || student.subjects.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  const classes = [t('all_classes'), 'Biology', 'Chemistry', 'Physics', 'Advanced Biology'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('view_students')}</h1>
          <p className="text-muted-foreground">{t('manage_and_view_information_about_your_students')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-teacher" />
          <span className="font-medium text-lg">{mockStudents.length} {t('total_students')}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('search_students')}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {classes.map((className) => (
            <Button
              key={className}
              variant={selectedClass === className ? "default" : "outline"}
              className={selectedClass === className ? "bg-teacher text-white" : "text-teacher"}
              onClick={() => setSelectedClass(className)}
            >
              {className}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teacher" />
            {t('student_list')}
          </CardTitle>
          <CardDescription>
            {filteredStudents.length} {t('students')} {t('in')} {selectedClass}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('grade')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('attendance')}</TableHead>
                <TableHead>{t('avg_grade')}</TableHead>
                <TableHead>{t('subjects')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>{student.averageGrade}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="outline" className="bg-teacher/10 text-teacher border-teacher/20">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {t('no_students_found_matching_your_criteria')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewStudents;

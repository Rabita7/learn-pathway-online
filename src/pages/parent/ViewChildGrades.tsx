
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  TrendingUp,
  TrendingDown,
  Calendar,
  Award,
  User,
} from 'lucide-react';

const ViewChildGrades = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('current');

  if (!user || user.role !== 'parent') {
    return <div>Access denied. Parent privileges required.</div>;
  }

  // Mock data for child
  const child = {
    id: '1',
    name: 'Emma Johnson',
    grade: '10th Grade',
    avatar: '/assets/avatars/student.jpg',
  };

  const subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'english', name: 'English Literature' },
    { id: 'science', name: 'Biology' },
    { id: 'history', name: 'World History' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'physics', name: 'Physics' },
  ];

  const grades = [
    {
      id: '1',
      subject: 'Mathematics',
      assignment: 'Mid-term Exam',
      grade: 'A-',
      percentage: 92,
      date: '2025-04-20',
      weight: 30,
      category: 'Exam',
    },
    {
      id: '2',
      subject: 'Mathematics',
      assignment: 'Homework Assignment #5',
      grade: 'B+',
      percentage: 88,
      date: '2025-04-18',
      weight: 10,
      category: 'Homework',
    },
    {
      id: '3',
      subject: 'English Literature',
      assignment: 'Essay on Hamlet',
      grade: 'A',
      percentage: 95,
      date: '2025-04-15',
      weight: 25,
      category: 'Essay',
    },
    {
      id: '4',
      subject: 'Biology',
      assignment: 'Lab Report - Cell Division',
      grade: 'A-',
      percentage: 91,
      date: '2025-04-12',
      weight: 20,
      category: 'Lab',
    },
    {
      id: '5',
      subject: 'World History',
      assignment: 'Research Project',
      grade: 'B',
      percentage: 85,
      date: '2025-04-10',
      weight: 35,
      category: 'Project',
    },
  ];

  const subjectAverages = [
    { subject: 'Mathematics', average: 89.5, trend: 'up', letterGrade: 'B+' },
    { subject: 'English Literature', average: 93.2, trend: 'up', letterGrade: 'A-' },
    { subject: 'Biology', average: 87.8, trend: 'stable', letterGrade: 'B+' },
    { subject: 'World History', average: 84.1, trend: 'down', letterGrade: 'B' },
    { subject: 'Chemistry', average: 90.5, trend: 'up', letterGrade: 'A-' },
    { subject: 'Physics', average: 86.3, trend: 'stable', letterGrade: 'B+' },
  ];

  const filteredGrades = selectedSubject === 'all' 
    ? grades 
    : grades.filter(grade => grade.subject.toLowerCase().includes(selectedSubject));

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const overallGPA = 3.7;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Academic Progress</h1>
        <p className="text-gray-500">Monitor your child's academic performance</p>
      </div>

      {/* Child Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-parent">
                <AvatarImage src={child.avatar} alt={child.name} />
                <AvatarFallback className="bg-parent text-white">
                  {child.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{child.name}</h2>
                <p className="text-muted-foreground">{child.grade}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-parent">{overallGPA}</div>
              <p className="text-sm text-muted-foreground">Overall GPA</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Current Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Semester</SelectItem>
            <SelectItem value="previous">Previous Semester</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Averages */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-parent" />
                Subject Averages
              </CardTitle>
              <CardDescription>Current semester performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAverages.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{subject.subject}</span>
                        {getTrendIcon(subject.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getGradeColor(subject.average)}>
                          {subject.letterGrade}
                        </Badge>
                        <span className="text-sm font-medium">{subject.average}%</span>
                      </div>
                    </div>
                    <Progress value={subject.average} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Grades */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-parent" />
                Recent Assignments
              </CardTitle>
              <CardDescription>Latest graded assignments and exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrades.map((grade) => (
                  <div key={grade.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{grade.assignment}</h4>
                          <Badge variant="outline" className="text-xs">
                            {grade.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{grade.subject}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getGradeColor(grade.percentage)}>
                            {grade.grade}
                          </Badge>
                          <span className="font-bold">{grade.percentage}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Weight: {grade.weight}%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {grade.date}
                      </div>
                      <Progress value={grade.percentage} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewChildGrades;


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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, SortAsc, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradeEntry } from '@/types';

const ViewGrades = () => {
  const { user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data - in a real app this would be fetched from an API
  const mockGrades: GradeEntry[] = [
    { id: '1', studentId: '3', subject: 'Mathematics', grade: 'A-', date: '2025-03-15' },
    { id: '2', studentId: '3', subject: 'English Literature', grade: 'B+', date: '2025-03-16' },
    { id: '3', studentId: '3', subject: 'Physics', grade: 'A', date: '2025-03-18' },
    { id: '4', studentId: '3', subject: 'History', grade: 'B', date: '2025-03-20' },
    { id: '5', studentId: '3', subject: 'Chemistry', grade: 'A-', date: '2025-02-10' },
    { id: '6', studentId: '3', subject: 'Physical Education', grade: 'A+', date: '2025-02-15' },
    { id: '7', studentId: '3', subject: 'Art', grade: 'B+', date: '2025-01-20' },
    { id: '8', studentId: '3', subject: 'Computer Science', grade: 'A', date: '2025-01-25' },
  ];

  const terms = [
    { value: 'all', label: 'All Terms' },
    { value: '01', label: 'January 2025' },
    { value: '02', label: 'February 2025' },
    { value: '03', label: 'March 2025' },
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English Literature', label: 'English Literature' },
    { value: 'Physics', label: 'Physics' },
    { value: 'History', label: 'History' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Art', label: 'Art' },
    { value: 'Computer Science', label: 'Computer Science' },
  ];

  const getMonthFromDate = (dateString: string) => {
    return dateString.split('-')[1];
  };

  const filteredGrades = mockGrades.filter((grade) => {
    const matchesTerm = selectedTerm === 'all' || getMonthFromDate(grade.date) === selectedTerm;
    const matchesSubject = selectedSubject === 'all' || grade.subject === selectedSubject;
    const matchesSearch = !searchQuery || 
      grade.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      grade.grade.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTerm && matchesSubject && matchesSearch;
  });

  // Calculate GPA (simple version)
  const calculateGPA = (grades: GradeEntry[]) => {
    const gradePoints: Record<string, number> = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    if (grades.length === 0) return 0;

    const totalPoints = grades.reduce((sum, grade) => {
      return sum + (gradePoints[grade.grade] || 0);
    }, 0);

    return (totalPoints / grades.length).toFixed(2);
  };

  if (!user || user.role !== 'student') {
    return <div>Access denied. Student privileges required.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Academic Record</h1>
        <p className="text-gray-500">View and track your academic progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GPA Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-student" />
              Current GPA
            </CardTitle>
            <CardDescription>Based on all available grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-student">{calculateGPA(filteredGrades)}</div>
              <p className="text-sm text-gray-500 mt-2">Out of 4.3 scale</p>
            </div>
          </CardContent>
        </Card>

        {/* Filters Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Filter Grades</CardTitle>
            <CardDescription>Narrow down your academic records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term.value} value={term.value}>{term.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>{subject.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search grades..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Grade Report</CardTitle>
            <CardDescription>
              Showing {filteredGrades.length} of {mockGrades.length} grades
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold 
                        ${grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                        grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                        grade.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' : 
                        grade.grade.startsWith('D') ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'}`}>
                        {grade.grade}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(grade.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">Final</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No grades found matching your filters
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

export default ViewGrades;

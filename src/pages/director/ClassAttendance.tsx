
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ClassAttendanceView, AttendanceEntry } from '@/types';

const mockClasses = [
  { id: '1', name: 'Grade 9A', grade: '9', section: 'A', totalStudents: 25 },
  { id: '2', name: 'Grade 9B', grade: '9', section: 'B', totalStudents: 28 },
  { id: '3', name: 'Grade 10A', grade: '10', section: 'A', totalStudents: 30 },
  { id: '4', name: 'Grade 10B', grade: '10', section: 'B', totalStudents: 27 },
  { id: '5', name: 'Grade 11A', grade: '11', section: 'A', totalStudents: 22 },
  { id: '6', name: 'Grade 11B', grade: '11', section: 'B', totalStudents: 24 },
];

const mockAttendanceData: AttendanceEntry[] = [
  { id: '1', studentId: '1', date: '2024-12-29', status: 'present' },
  { id: '2', studentId: '2', date: '2024-12-29', status: 'absent' },
  { id: '3', studentId: '3', date: '2024-12-29', status: 'tardy' },
  { id: '4', studentId: '4', date: '2024-12-29', status: 'present' },
  { id: '5', studentId: '5', date: '2024-12-29', status: 'excused' },
];

const ClassAttendance = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceViews, setAttendanceViews] = useState<ClassAttendanceView[]>([]);

  if (!user || user.role !== 'director') {
    return <div>Access denied. Director privileges required.</div>;
  }

  const handleViewAttendance = () => {
    if (!selectedClass) return;

    const classInfo = mockClasses.find(c => c.id === selectedClass);
    if (!classInfo) return;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    // Filter attendance records for the selected class and date
    const classAttendance = mockAttendanceData.filter(
      record => record.date === dateStr
    );

    const presentCount = classAttendance.filter(r => r.status === 'present').length;
    const absentCount = classAttendance.filter(r => r.status === 'absent').length;
    const tardyCount = classAttendance.filter(r => r.status === 'tardy').length;
    const excusedCount = classAttendance.filter(r => r.status === 'excused').length;

    const attendanceView: ClassAttendanceView = {
      classId: selectedClass,
      className: classInfo.name,
      gradeLevel: classInfo.grade,
      section: classInfo.section,
      date: dateStr,
      attendanceRecords: classAttendance,
      totalStudents: classInfo.totalStudents,
      presentCount: presentCount + excusedCount, // Excused counts as present
      absentCount,
      tardyCount,
    };

    // Remove existing view for same class and date, then add new one
    const updatedViews = attendanceViews.filter(
      v => !(v.classId === selectedClass && v.date === dateStr)
    );
    setAttendanceViews([attendanceView, ...updatedViews]);
  };

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'tardy':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'excused':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getAttendanceBadge = (status: string) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      tardy: 'secondary',
      excused: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {getAttendanceIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const getAttendanceRate = (view: ClassAttendanceView) => {
    const rate = (view.presentCount / view.totalStudents) * 100;
    return rate.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Class Attendance Management</h1>
        <p className="text-muted-foreground">View and monitor attendance for all class sections</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            View Class Attendance
          </CardTitle>
          <CardDescription>Select a class and date to view attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Class Section</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class section" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      <div>
                        <div>{cls.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {cls.totalStudents} students
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleViewAttendance} disabled={!selectedClass}>
              View Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      {attendanceViews.length > 0 && (
        <div className="space-y-4">
          {attendanceViews.map((view, index) => (
            <Card key={`${view.classId}-${view.date}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{view.className} - {format(new Date(view.date), 'MMMM d, yyyy')}</span>
                  <Badge variant="outline">
                    {getAttendanceRate(view)}% Present
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Grade {view.gradeLevel} Section {view.section}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{view.presentCount}</div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{view.absentCount}</div>
                    <div className="text-sm text-muted-foreground">Absent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{view.tardyCount}</div>
                    <div className="text-sm text-muted-foreground">Tardy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{view.totalStudents}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>

                {view.attendanceRecords.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {view.attendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.studentId}</TableCell>
                          <TableCell>
                            {getAttendanceBadge(record.status)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(record.date), 'h:mm a')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No attendance records found for this date
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassAttendance;

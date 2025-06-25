
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
import { Calendar } from '@/components/ui/calendar';
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const ViewChildAttendance = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState('all');

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

  const attendanceStats = {
    totalDays: 50,
    presentDays: 42,
    absentDays: 5,
    tardyDays: 3,
    presentPercentage: 84,
    trend: 'down', // down because of recent absences
  };

  const monthlyAttendance = [
    { date: '2025-04-01', status: 'present', subject: 'All Classes' },
    { date: '2025-04-02', status: 'present', subject: 'All Classes' },
    { date: '2025-04-03', status: 'absent', subject: 'All Classes', reason: 'Sick' },
    { date: '2025-04-04', status: 'tardy', subject: 'Mathematics', reason: 'Traffic' },
    { date: '2025-04-05', status: 'present', subject: 'All Classes' },
    { date: '2025-04-08', status: 'present', subject: 'All Classes' },
    { date: '2025-04-09', status: 'present', subject: 'All Classes' },
    { date: '2025-04-10', status: 'absent', subject: 'All Classes', reason: 'Doctor Appointment' },
    { date: '2025-04-11', status: 'present', subject: 'All Classes' },
    { date: '2025-04-12', status: 'tardy', subject: 'English', reason: 'Late Bus' },
  ];

  const subjectAttendance = [
    { subject: 'Mathematics', present: 18, absent: 1, tardy: 1, total: 20, percentage: 90 },
    { subject: 'English Literature', present: 17, absent: 2, tardy: 1, total: 20, percentage: 85 },
    { subject: 'Biology', present: 19, absent: 0, tardy: 1, total: 20, percentage: 95 },
    { subject: 'World History', present: 16, absent: 3, tardy: 1, total: 20, percentage: 80 },
    { subject: 'Chemistry', present: 18, absent: 1, tardy: 1, total: 20, percentage: 90 },
    { subject: 'Physics', present: 17, absent: 2, tardy: 1, total: 20, percentage: 85 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'tardy':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700';
      case 'absent':
        return 'bg-red-100 text-red-700';
      case 'tardy':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 90) return 'text-blue-600';
    if (percentage >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Record</h1>
        <p className="text-gray-500">Monitor your child's school attendance</p>
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
              <div className="flex items-center gap-2 mb-1">
                <div className="text-3xl font-bold text-parent">{attendanceStats.presentPercentage}%</div>
                {attendanceStats.trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Days</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.totalDays}</div>
            <p className="text-xs text-muted-foreground">School days this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendanceStats.presentDays}</div>
            <p className="text-xs text-muted-foreground">{attendanceStats.presentPercentage}% attendance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{attendanceStats.absentDays}</div>
            <p className="text-xs text-muted-foreground">{((attendanceStats.absentDays / attendanceStats.totalDays) * 100).toFixed(1)}% of total days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tardy</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{attendanceStats.tardyDays}</div>
            <p className="text-xs text-muted-foreground">{((attendanceStats.tardyDays / attendanceStats.totalDays) * 100).toFixed(1)}% of total days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-wise Attendance */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-parent" />
                Subject-wise Attendance
              </CardTitle>
              <CardDescription>Attendance breakdown by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAttendance.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getAttendanceColor(subject.percentage)}`}>
                          {subject.percentage}%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({subject.present}/{subject.total})
                        </span>
                      </div>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Present: {subject.present}</span>
                      <span>Absent: {subject.absent}</span>
                      <span>Tardy: {subject.tardy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-parent" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Last 10 school days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyAttendance.slice(-10).map((record, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <div>
                      <div className="font-medium text-sm">{record.date}</div>
                      {record.reason && (
                        <div className="text-xs text-muted-foreground">{record.reason}</div>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewChildAttendance;

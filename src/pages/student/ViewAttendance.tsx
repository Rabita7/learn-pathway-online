
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import { format, subDays } from 'date-fns';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

type AttendanceStatus = 'present' | 'absent' | 'tardy' | 'excused';

type AttendanceRecord = {
  date: string;
  subject: string;
  status: AttendanceStatus;
  teacher: string;
  period: string;
};

const mockAttendanceData: AttendanceRecord[] = [
  { date: format(new Date(), 'yyyy-MM-dd'), subject: 'Mathematics', status: 'present', teacher: 'Prof. Johnson', period: '1st Period' },
  { date: format(new Date(), 'yyyy-MM-dd'), subject: 'English Literature', status: 'present', teacher: 'Prof. Smith', period: '2nd Period' },
  { date: format(new Date(), 'yyyy-MM-dd'), subject: 'Physics', status: 'tardy', teacher: 'Prof. Brown', period: '3rd Period' },
  { date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), subject: 'Mathematics', status: 'present', teacher: 'Prof. Johnson', period: '1st Period' },
  { date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), subject: 'English Literature', status: 'absent', teacher: 'Prof. Smith', period: '2nd Period' },
  { date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), subject: 'Physics', status: 'present', teacher: 'Prof. Brown', period: '3rd Period' },
  { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), subject: 'Mathematics', status: 'present', teacher: 'Prof. Johnson', period: '1st Period' },
  { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), subject: 'English Literature', status: 'excused', teacher: 'Prof. Smith', period: '2nd Period' },
  { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), subject: 'Physics', status: 'present', teacher: 'Prof. Brown', period: '3rd Period' },
];

const ViewAttendance = () => {
  const { user } = useAuth();
  const { t } = useLocalization();

  if (!user || user.role !== 'student') {
    return <div>{t('access_denied')}. {t('student')} {t('privileges_required')}.</div>;
  }

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'tardy':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'excused':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    const variants = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      tardy: 'bg-amber-100 text-amber-800',
      excused: 'bg-blue-100 text-blue-800',
    };

    return (
      <Badge className={`${variants[status]} capitalize`}>
        {t(status)}
      </Badge>
    );
  };

  const attendanceStats = mockAttendanceData.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {} as Record<AttendanceStatus, number>);

  const totalDays = mockAttendanceData.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('attendance_record')}</h1>
        <p className="text-muted-foreground">{t('track_your_attendance_across_all_classes')}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(['present', 'absent', 'tardy', 'excused'] as AttendanceStatus[]).map((status) => {
          const count = attendanceStats[status] || 0;
          const percentage = totalDays > 0 ? ((count / totalDays) * 100).toFixed(1) : '0';
          
          return (
            <Card key={status}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm capitalize font-medium">{t(status)}</div>
                  {getStatusIcon(status)}
                </div>
                <div className="mt-2 text-2xl font-bold">{count}</div>
                <div className="text-xs text-muted-foreground">{percentage}% {t('of_total')}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-student" />
            {t('recent_attendance')}
          </CardTitle>
          <CardDescription>{t('your_attendance_record_for_the_past_few_days')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('subject')}</TableHead>
                <TableHead>{t('period')}</TableHead>
                <TableHead>{t('teacher')}</TableHead>
                <TableHead>{t('status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendanceData
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {format(new Date(record.date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>{record.period}</TableCell>
                    <TableCell>{record.teacher}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        {getStatusBadge(record.status)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewAttendance;

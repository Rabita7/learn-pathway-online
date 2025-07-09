
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  BookOpen,
  Bell,
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { t } = useLocalization();

  if (!user || user.role !== 'teacher') {
    return <div>{t('access_denied')}. {t('teacher')} {t('privileges_required')}.</div>;
  }

  const upcomingClasses = [
    { name: 'Biology 101', time: '10:00 AM - 11:30 AM', room: 'Room 205', students: 28 },
    { name: 'Chemistry Lab', time: '1:00 PM - 2:30 PM', room: 'Lab 3', students: 22 },
    { name: 'Advanced Biology', time: '3:00 PM - 4:30 PM', room: 'Room 205', students: 18 },
  ];

  const assignments = [
    { title: 'Cell Structure Essay', dueDate: '2025-05-10', class: 'Biology 101', submissions: '15/28' },
    { title: 'Chemical Reactions Lab Report', dueDate: '2025-05-15', class: 'Chemistry Lab', submissions: '8/22' },
    { title: 'Genetics Research Paper', dueDate: '2025-05-20', class: 'Advanced Biology', submissions: '5/18' },
  ];

  const attendanceStats = {
    present: 85,
    absent: 10,
    tardy: 5,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('welcome')}, {user.name}</h1>
        <p className="text-gray-500">{t('today_is')} {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('todays_classes')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              {t('next_class_in_30_minutes')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('pending_assignments')}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              {t('submissions_to_grade')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('average_attendance')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              {t('across_all_your_classes')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('todays_schedule')}</CardTitle>
            <CardDescription>{t('your_upcoming_classes')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="bg-teacher text-white p-2 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-xs text-muted-foreground">{classItem.room} • {classItem.students} {t('students')}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{classItem.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('active_assignments')}</CardTitle>
            <CardDescription>{t('assignments_due_soon')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">{t('due')} {assignment.dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{assignment.class}</span>
                    <span className="text-muted-foreground">{t('submissions')}: {assignment.submissions}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('attendance_overview')}</CardTitle>
          <CardDescription>{t('last_30_days_across_all_classes')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('present')}</p>
                <p className="text-2xl font-bold">{attendanceStats.present}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <XCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('absent')}</p>
                <p className="text-2xl font-bold">{attendanceStats.absent}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('tardy')}</p>
                <p className="text-2xl font-bold">{attendanceStats.tardy}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;

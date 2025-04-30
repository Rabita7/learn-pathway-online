
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Book,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Bell,
  CheckCircle,
  BookOpen,
  BarChart2,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const StudentDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'student') {
    return <div>Access denied. Student privileges required.</div>;
  }

  const upcomingClasses = [
    { name: 'Mathematics', time: '09:00 AM', room: 'Room 101', teacher: 'Prof. Johnson' },
    { name: 'English Literature', time: '11:00 AM', room: 'Room 203', teacher: 'Prof. Smith' },
    { name: 'Physics', time: '02:00 PM', room: 'Room 305', teacher: 'Prof. Brown' },
  ];

  const assignments = [
    { title: 'Algebra Problem Set', subject: 'Mathematics', dueDate: '2025-05-05', status: 'Pending' },
    { title: 'Essay on Shakespeare', subject: 'English Literature', dueDate: '2025-05-10', status: 'In Progress' },
    { title: 'Physics Lab Report', subject: 'Physics', dueDate: '2025-05-15', status: 'Not Started' },
  ];

  const announcements = [
    { title: 'Final Exam Schedule', date: '2025-04-28', content: 'The final exam schedule has been posted.' },
    { title: 'School Spirit Week', date: '2025-04-26', content: 'Next week is school spirit week! Show your pride!' },
  ];

  const grades = [
    { subject: 'Mathematics', grade: 'A-', progress: 90 },
    { subject: 'English Literature', grade: 'B+', progress: 85 },
    { subject: 'Physics', grade: 'A', progress: 95 },
    { subject: 'History', grade: 'B', progress: 80 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-500">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-student" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="bg-student text-white p-2 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-xs text-muted-foreground">{classItem.room} • {classItem.teacher}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{classItem.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-student" />
              Performance
            </CardTitle>
            <CardDescription>Your academic standing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="border-4 border-student rounded-full p-6 w-32 h-32 flex items-center justify-center">
                <div>
                  <p className="text-3xl font-bold">3.7</p>
                  <p className="text-xs text-muted-foreground">GPA</p>
                </div>
              </div>
              <p className="text-sm font-medium">Grade: 11th</p>
              <p className="text-sm text-muted-foreground">Class Rank: 15 of 120</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              View Full Report
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Assignments */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-student" />
              Upcoming Assignments
            </CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Due {assignment.dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{assignment.subject}</span>
                    <span 
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        assignment.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                        assignment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-student" />
              Announcements
            </CardTitle>
            <CardDescription>Latest school news</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-xs text-muted-foreground mb-1">{announcement.date}</p>
                  <p className="text-sm">{announcement.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-student" />
            Grade Overview
          </CardTitle>
          <CardDescription>Your current grades by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grades.map((subject, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{subject.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{subject.grade}</span>
                    <span className="text-xs text-muted-foreground">{subject.progress}%</span>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

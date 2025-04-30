
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
  CalendarCheck,
  BookOpen,
  TrendingUp,
  Bell,
  User,
  Clock,
  Calendar,
  Mail,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const ParentDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'parent') {
    return <div>Access denied. Parent privileges required.</div>;
  }

  // Mock data for children
  const children = [
    {
      id: '1',
      name: 'Emma Johnson',
      grade: '10th Grade',
      avatar: '/assets/avatars/student.jpg',
    }
  ];

  const selectedChild = children[0];

  const attendanceData = [
    { status: 'Present', count: 42, percentage: 84, color: 'bg-green-100 text-green-700' },
    { status: 'Absent', count: 5, percentage: 10, color: 'bg-red-100 text-red-700' },
    { status: 'Tardy', count: 3, percentage: 6, color: 'bg-yellow-100 text-yellow-700' },
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Conference', date: '2025-05-15', time: '4:00 PM' },
    { title: 'School Science Fair', date: '2025-05-20', time: '10:00 AM' },
    { title: 'End of Quarter', date: '2025-06-10', time: 'All Day' },
  ];

  const recentGrades = [
    { subject: 'Mathematics', assignment: 'Mid-term Exam', grade: 'A-', score: '92/100', date: '2025-04-20' },
    { subject: 'English', assignment: 'Essay on Hamlet', grade: 'B+', score: '88/100', date: '2025-04-15' },
    { subject: 'Science', assignment: 'Lab Report', grade: 'A', score: '95/100', date: '2025-04-10' },
  ];

  const announcements = [
    { title: 'Final Exam Schedule', date: '2025-04-28', content: 'The final exam schedule has been posted. Please review with your child.' },
    { title: 'Summer Programs', date: '2025-04-25', content: 'Registration for summer enrichment programs is now open.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-500">Stay updated with your child's progress</p>
      </div>

      {/* Child Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-parent">
              <AvatarImage src={selectedChild.avatar} alt={selectedChild.name} />
              <AvatarFallback className="bg-parent text-white">
                {selectedChild.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{selectedChild.name}</h2>
              <p className="text-muted-foreground">{selectedChild.grade}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7</div>
            <p className="text-xs text-muted-foreground">Current academic standing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">Present days this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Pending assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Event</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">Parent-Teacher Conference</div>
            <p className="text-xs text-muted-foreground">May 15, 2025</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-parent" />
              Recent Grades
            </CardTitle>
            <CardDescription>Your child's latest academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-medium">{grade.subject}</h4>
                      <p className="text-xs text-muted-foreground">{grade.assignment}</p>
                    </div>
                    <div className="bg-gray-100 px-2 py-1 rounded">
                      <span className="text-lg font-bold">{grade.grade}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Score: {grade.score}</span>
                    <span className="text-muted-foreground">{grade.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Grades</Button>
          </CardFooter>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-parent" />
              Attendance Overview
            </CardTitle>
            <CardDescription>Current semester attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {item.status === 'Present' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : item.status === 'Absent' ? (
                        <XCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{item.count} days</span>
                      <span className="text-muted-foreground ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View Detailed Attendance</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-parent" />
              Upcoming Events
            </CardTitle>
            <CardDescription>School events you should know about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-parent bg-opacity-10 text-parent p-3 rounded-full mr-4">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View School Calendar</Button>
          </CardFooter>
        </Card>

        {/* Contact Teachers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-parent" />
              Contact Teachers
            </CardTitle>
            <CardDescription>Reach out to your child's teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Mrs. Smith', subject: 'Mathematics', email: 'smith@school.edu' },
                { name: 'Mr. Johnson', subject: 'English', email: 'johnson@school.edu' },
                { name: 'Dr. Williams', subject: 'Science', email: 'williams@school.edu' },
              ].map((teacher, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarFallback className="bg-teacher text-white">
                        {teacher.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-parent" />
            School Announcements
          </CardTitle>
          <CardDescription>Important updates from the school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <span className="text-xs text-muted-foreground">{announcement.date}</span>
                </div>
                <p className="text-sm">{announcement.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">View All Announcements</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ParentDashboard;

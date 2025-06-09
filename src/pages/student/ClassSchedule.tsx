
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ClassPeriod = {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  period: string;
  day: string;
};

const weeklySchedule: ClassPeriod[] = [
  // Monday
  { id: '1', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 101', time: '09:00 - 10:30', period: '1st Period', day: 'Monday' },
  { id: '2', subject: 'English Literature', teacher: 'Prof. Smith', room: 'Room 203', time: '11:00 - 12:30', period: '2nd Period', day: 'Monday' },
  { id: '3', subject: 'Physics', teacher: 'Prof. Brown', room: 'Lab 305', time: '14:00 - 15:30', period: '3rd Period', day: 'Monday' },
  { id: '4', subject: 'History', teacher: 'Prof. Davis', room: 'Room 150', time: '16:00 - 17:30', period: '4th Period', day: 'Monday' },
  
  // Tuesday
  { id: '5', subject: 'Chemistry', teacher: 'Prof. Wilson', room: 'Lab 201', time: '09:00 - 10:30', period: '1st Period', day: 'Tuesday' },
  { id: '6', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 101', time: '11:00 - 12:30', period: '2nd Period', day: 'Tuesday' },
  { id: '7', subject: 'Physical Education', teacher: 'Coach Miller', room: 'Gymnasium', time: '14:00 - 15:30', period: '3rd Period', day: 'Tuesday' },
  { id: '8', subject: 'Art', teacher: 'Prof. Garcia', room: 'Art Studio', time: '16:00 - 17:30', period: '4th Period', day: 'Tuesday' },
  
  // Wednesday
  { id: '9', subject: 'English Literature', teacher: 'Prof. Smith', room: 'Room 203', time: '09:00 - 10:30', period: '1st Period', day: 'Wednesday' },
  { id: '10', subject: 'Physics', teacher: 'Prof. Brown', room: 'Lab 305', time: '11:00 - 12:30', period: '2nd Period', day: 'Wednesday' },
  { id: '11', subject: 'Biology', teacher: 'Prof. Taylor', room: 'Lab 102', time: '14:00 - 15:30', period: '3rd Period', day: 'Wednesday' },
  { id: '12', subject: 'Computer Science', teacher: 'Prof. Anderson', room: 'Computer Lab', time: '16:00 - 17:30', period: '4th Period', day: 'Wednesday' },
  
  // Thursday
  { id: '13', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 101', time: '09:00 - 10:30', period: '1st Period', day: 'Thursday' },
  { id: '14', subject: 'Chemistry', teacher: 'Prof. Wilson', room: 'Lab 201', time: '11:00 - 12:30', period: '2nd Period', day: 'Thursday' },
  { id: '15', subject: 'History', teacher: 'Prof. Davis', room: 'Room 150', time: '14:00 - 15:30', period: '3rd Period', day: 'Thursday' },
  { id: '16', subject: 'Music', teacher: 'Prof. Martinez', room: 'Music Room', time: '16:00 - 17:30', period: '4th Period', day: 'Thursday' },
  
  // Friday
  { id: '17', subject: 'Physics', teacher: 'Prof. Brown', room: 'Lab 305', time: '09:00 - 10:30', period: '1st Period', day: 'Friday' },
  { id: '18', subject: 'English Literature', teacher: 'Prof. Smith', room: 'Room 203', time: '11:00 - 12:30', period: '2nd Period', day: 'Friday' },
  { id: '19', subject: 'Biology', teacher: 'Prof. Taylor', room: 'Lab 102', time: '14:00 - 15:30', period: '3rd Period', day: 'Friday' },
  { id: '20', subject: 'Free Period', teacher: 'Study Hall', room: 'Library', time: '16:00 - 17:30', period: '4th Period', day: 'Friday' },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ClassSchedule = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'student') {
    return <div>Access denied. Student privileges required.</div>;
  }

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'English Literature': 'bg-green-100 text-green-800',
      'Physics': 'bg-purple-100 text-purple-800',
      'Chemistry': 'bg-red-100 text-red-800',
      'Biology': 'bg-teal-100 text-teal-800',
      'History': 'bg-amber-100 text-amber-800',
      'Computer Science': 'bg-indigo-100 text-indigo-800',
      'Physical Education': 'bg-orange-100 text-orange-800',
      'Art': 'bg-pink-100 text-pink-800',
      'Music': 'bg-violet-100 text-violet-800',
      'Free Period': 'bg-gray-100 text-gray-800',
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCurrentDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return daysOfWeek.includes(today) ? today : 'Monday';
  };

  const todaySchedule = weeklySchedule.filter(period => period.day === getCurrentDay());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Class Schedule</h1>
        <p className="text-muted-foreground">Your weekly class timetable</p>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-student" />
            Today's Classes - {getCurrentDay()}
          </CardTitle>
          <CardDescription>Your schedule for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySchedule.map((period) => (
              <div key={period.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-student text-white p-2 rounded-full">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{period.subject}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {period.teacher}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {period.room}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getSubjectColor(period.subject)}>
                    {period.period}
                  </Badge>
                  <p className="text-sm font-medium mt-1">{period.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Your complete class timetable for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {daysOfWeek.map((day) => {
              const daySchedule = weeklySchedule.filter(period => period.day === day);
              const isToday = day === getCurrentDay();
              
              return (
                <div key={day} className={`space-y-2 ${isToday ? 'ring-2 ring-student ring-opacity-50 rounded-lg p-2' : ''}`}>
                  <h3 className={`font-semibold text-center py-2 ${isToday ? 'text-student' : 'text-gray-700'}`}>
                    {day}
                    {isToday && <span className="text-xs block">Today</span>}
                  </h3>
                  <div className="space-y-2">
                    {daySchedule.map((period) => (
                      <div key={period.id} className="p-2 bg-muted/30 rounded border text-xs">
                        <div className="font-medium truncate">{period.subject}</div>
                        <div className="text-muted-foreground">{period.time}</div>
                        <div className="text-muted-foreground truncate">{period.room}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassSchedule;

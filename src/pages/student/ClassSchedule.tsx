
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
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
  { id: '20', subject: 'Art', teacher: 'Prof. Garcia', room: 'Art Studio', time: '16:00 - 17:30', period: '4th Period', day: 'Friday' },
];

const ClassSchedule = () => {
  const { user } = useAuth();
  const { t } = useLocalization();

  if (!user || user.role !== 'student') {
    return <div>{t('access_denied')}. {t('student')} {t('privileges_required')}.</div>;
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getClassesForDay = (day: string) => {
    return weeklySchedule.filter(classItem => classItem.day === day);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('class_schedule')}</h1>
        <p className="text-muted-foreground">{t('your_weekly_class_schedule')}</p>
      </div>

      <div className="grid gap-6">
        {days.map((day) => {
          const dayClasses = getClassesForDay(day);
          
          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-student" />
                  {t(day.toLowerCase())}
                </CardTitle>
                <CardDescription>
                  {dayClasses.length} {t('classes_scheduled')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dayClasses.map((classItem) => (
                    <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{classItem.subject}</h3>
                        <Badge variant="outline" className="bg-student/10 text-student border-student/20">
                          {classItem.period}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{classItem.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {dayClasses.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      {t('no_classes_scheduled_for_this_day')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClassSchedule;

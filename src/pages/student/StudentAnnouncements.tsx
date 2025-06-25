
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { format, isToday, isYesterday } from 'date-fns';
import { Bell, Calendar, User, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';

type Announcement = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: AnnouncementPriority;
  category: string;
  isRead: boolean;
  targetAudience: string[];
};

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Final Exam Schedule Released',
    content: 'The final examination schedule for this semester has been posted. Please check your student portal for specific dates and times. Make sure to prepare accordingly and contact your teachers if you have any conflicts.',
    author: 'Academic Office',
    date: '2025-01-24',
    priority: 'high',
    category: 'Academic',
    isRead: false,
    targetAudience: ['students']
  },
  {
    id: '2',
    title: 'School Spirit Week Next Week',
    content: 'Join us for School Spirit Week from January 27-31! Each day has a different theme. Monday: Pajama Day, Tuesday: Decades Day, Wednesday: Color Wars, Thursday: Career Day, Friday: School Colors Day. Show your school pride!',
    author: 'Student Council',
    date: '2025-01-23',
    priority: 'medium',
    category: 'Events',
    isRead: true,
    targetAudience: ['students']
  },
  {
    id: '3',
    title: 'Library Hours Extended During Exam Period',
    content: 'Starting January 28th, the library will be open until 10 PM Monday through Thursday to provide additional study space during the final exam period. Extended hours will continue until February 15th.',
    author: 'Library Staff',
    date: '2025-01-22',
    priority: 'medium',
    category: 'Facilities',
    isRead: true,
    targetAudience: ['students']
  },
  {
    id: '4',
    title: 'Weather Alert: School Closure Policy',
    content: 'Due to forecasted severe weather conditions, please be aware of our school closure policy. Announcements will be made by 6 AM on the school website and local news stations. Stay safe!',
    author: 'Administration',
    date: '2025-01-21',
    priority: 'urgent',
    category: 'Safety',
    isRead: false,
    targetAudience: ['students', 'parents']
  },
  {
    id: '5',
    title: 'New Cafeteria Menu Items',
    content: 'We are excited to introduce new healthy menu options in our cafeteria starting February 1st. The new menu includes vegetarian, vegan, and gluten-free options. Nutritional information will be available at each station.',
    author: 'Food Services',
    date: '2025-01-20',
    priority: 'low',
    category: 'General',
    isRead: true,
    targetAudience: ['students']
  },
  {
    id: '6',
    title: 'Mathematics Competition Registration Open',
    content: 'Registration is now open for the Regional Mathematics Competition on March 15th. This is a great opportunity to showcase your mathematical skills. See Mr. Johnson in Room 101 for registration forms. Deadline: February 10th.',
    author: 'Mathematics Department',
    date: '2025-01-19',
    priority: 'medium',
    category: 'Academic',
    isRead: false,
    targetAudience: ['students']
  }
];

const StudentAnnouncements = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [filter, setFilter] = useState<string>('all');

  if (!user || user.role !== 'student') {
    return <div>Access denied. Student privileges required.</div>;
  }

  const getPriorityIcon = (priority: AnnouncementPriority) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: AnnouncementPriority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d, yyyy');
  };

  const markAsRead = (id: string) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === id 
          ? { ...announcement, isRead: true }
          : announcement
      )
    );
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !announcement.isRead;
    return announcement.category.toLowerCase() === filter.toLowerCase();
  });

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with the latest school news and information</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-student" />
          <span className="text-sm font-medium">{unreadCount} unread</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'academic', label: 'Academic' },
          { key: 'events', label: 'Events' },
          { key: 'general', label: 'General' },
          { key: 'safety', label: 'Safety' }
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`transition-all ${!announcement.isRead ? 'border-l-4 border-l-student bg-blue-50/30' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getPriorityIcon(announcement.priority)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        {!announcement.isRead && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {announcement.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getDateLabel(announcement.date)}
                        </div>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority}
                        </Badge>
                        <Badge variant="outline">
                          {announcement.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {!announcement.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(announcement.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No announcements found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more announcements.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentAnnouncements;

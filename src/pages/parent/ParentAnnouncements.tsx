
import React, { useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bell,
  Search,
  Calendar,
  User,
  School,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
} from 'lucide-react';

const ParentAnnouncements = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  if (!user || user.role !== 'parent') {
    return <div>{t('access_denied')}. {t('privileges_required')}.</div>;
  }

  const announcements = [
    {
      id: '1',
      title: 'Parent-Teacher Conference Schedule',
      content: 'Dear parents, the Parent-Teacher Conference is scheduled for May 15, 2025. Please book your appointment slots through the school portal.',
      author: 'Principal Johnson',
      date: '2025-04-28',
      type: 'school',
      priority: 'high',
      isRead: false,
      targetGrade: '10th Grade',
    },
    {
      id: '2',
      title: 'Mathematics Test Next Week',
      content: 'There will be a mathematics test on May 5, 2025, covering chapters 8-10. Students should review the practice problems provided.',
      author: 'Mrs. Smith - Mathematics Teacher',
      date: '2025-04-27',
      type: 'academic',
      priority: 'medium',
      isRead: true,
      targetGrade: '10th Grade',
    },
    {
      id: '3',
      title: 'Summer Program Registration Open',
      content: 'Registration for summer enrichment programs is now open. Programs include STEM workshops, art classes, and sports camps. Deadline: May 20, 2025.',
      author: 'Activities Coordinator',
      date: '2025-04-25',
      type: 'extracurricular',
      priority: 'low',
      isRead: true,
      targetGrade: 'All Grades',
    },
    {
      id: '4',
      title: 'School Closure Due to Weather',
      content: 'Due to severe weather conditions, the school will be closed tomorrow (April 24, 2025). All classes and activities are cancelled.',
      author: 'Principal Johnson',
      date: '2025-04-23',
      type: 'urgent',
      priority: 'high',
      isRead: false,
      targetGrade: 'All Grades',
    },
    {
      id: '5',
      title: 'Science Fair Results',
      content: 'Congratulations to all participants in the Science Fair! Emma Johnson from 10th grade won 2nd place in the Biology category.',
      author: 'Science Department',
      date: '2025-04-22',
      type: 'achievement',
      priority: 'medium',
      isRead: true,
      targetGrade: '10th Grade',
    },
    {
      id: '6',
      title: 'Library Book Return Reminder',
      content: 'Please remind your child to return any overdue library books by April 30, 2025, to avoid late fees.',
      author: 'School Librarian',
      date: '2025-04-20',
      type: 'reminder',
      priority: 'low',
      isRead: false,
      targetGrade: 'All Grades',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school':
        return <School className="h-4 w-4" />;
      case 'academic':
        return <Bell className="h-4 w-4" />;
      case 'urgent':
        return <AlertCircle className="h-4 w-4" />;
      case 'achievement':
        return <CheckCircle className="h-4 w-4" />;
      case 'reminder':
        return <Clock className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'school':
        return 'bg-blue-100 text-blue-700';
      case 'academic':
        return 'bg-green-100 text-green-700';
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'achievement':
        return 'bg-purple-100 text-purple-700';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-700';
      case 'extracurricular':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || announcement.type === filterType;
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('school_announcements')}</h1>
          <p className="text-gray-500">{t('stay_updated_school_news_child_activities')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-parent" />
          <span className="font-medium">{unreadCount} {t('unread')}</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search_announcements')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('all_types')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_types')}</SelectItem>
                <SelectItem value="school">{t('school')}</SelectItem>
                <SelectItem value="academic">{t('academic')}</SelectItem>
                <SelectItem value="urgent">{t('urgent')}</SelectItem>
                <SelectItem value="achievement">{t('achievement')}</SelectItem>
                <SelectItem value="reminder">{t('reminder')}</SelectItem>
                <SelectItem value="extracurricular">{t('extracurricular')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={t('all_priorities')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_priorities')}</SelectItem>
                <SelectItem value="high">{t('high')}</SelectItem>
                <SelectItem value="medium">{t('medium')}</SelectItem>
                <SelectItem value="low">{t('low')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={`transition-all hover:shadow-md ${!announcement.isRead ? 'border-l-4 border-l-parent bg-blue-50/30' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className={`text-lg ${!announcement.isRead ? 'font-bold' : ''}`}>
                      {announcement.title}
                    </CardTitle>
                    {!announcement.isRead && (
                      <div className="w-2 h-2 bg-parent rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{announcement.author}</span>
                    <Calendar className="h-3 w-3 ml-2" />
                    <span>{announcement.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                    {t(announcement.priority)}
                  </Badge>
                  <Badge variant="outline" className={getTypeColor(announcement.type)}>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(announcement.type)}
                      {t(announcement.type)}
                    </div>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 mb-3">{announcement.content}</p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  {t('target')}: {announcement.targetGrade}
                </Badge>
                {!announcement.isRead && (
                  <Button variant="outline" size="sm">
                    {t('mark_as_read')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('no_announcements_found')}</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' || filterPriority !== 'all'
                ? t('try_adjusting_search_criteria')
                : t('no_announcements_available')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParentAnnouncements;

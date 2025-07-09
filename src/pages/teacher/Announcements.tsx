
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
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Bell, Plus, Calendar, User, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  important: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Final Exam Schedule',
    content: 'The final exam for Biology will be held on June 15th from 9:00 AM to 12:00 PM. Please bring your notebooks and calculators. All electronic devices except calculators are prohibited.',
    date: '2025-05-14',
    author: 'Teacher Smith',
    important: true
  },
  {
    id: '2',
    title: 'Field Trip Permission Slips',
    content: 'The science department field trip to the Natural History Museum is coming up on May 25th. Please return your signed permission slips by this Friday, May 18th.',
    date: '2025-05-13',
    author: 'Teacher Smith',
    important: false
  },
  {
    id: '3',
    title: 'Lab Safety Reminder',
    content: 'This is a reminder to all students that safety goggles and lab coats must be worn at all times during chemistry experiments. Students without proper safety equipment will not be allowed to participate.',
    date: '2025-05-10',
    author: 'Teacher Smith',
    important: true
  },
  {
    id: '4',
    title: 'Study Group Sessions',
    content: 'I will be hosting additional study group sessions for anyone who needs help preparing for the upcoming biology exam. Sessions will be held in Room 205 after school on Tuesdays and Thursdays from 3:30 to 5:00 PM.',
    date: '2025-05-08',
    author: 'Teacher Smith',
    important: false
  }
];

const Announcements = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    important: false
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'teacher') {
    return <div>{t('access_denied')}. {t('privileges_required')}.</div>;
  }

  const handleCreateToggle = () => {
    setIsCreating(!isCreating);
    setNewAnnouncement({
      title: '',
      content: '',
      important: false
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: t('missing_information'),
        description: t('please_fill_in_all_required_fields'),
        variant: "destructive"
      });
      return;
    }
    
    const announcement: Announcement = {
      id: Math.random().toString(36).substring(2, 9),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: format(new Date(), 'yyyy-MM-dd'),
      author: user.name,
      important: newAnnouncement.important
    };
    
    setAnnouncements([announcement, ...announcements]);
    setIsCreating(false);
    
    toast({
      title: t('announcement_created'),
      description: t('your_announcement_has_been_published'),
    });
  };

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('announcements')}</h1>
          <p className="text-muted-foreground">{t('manage_and_post_announcements')}</p>
        </div>
        <Button onClick={handleCreateToggle} className="bg-teacher hover:bg-teacher/90">
          {isCreating ? (
            t('cancel')
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {t('post_new_announcement')}
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{t('create_new_announcement')}</CardTitle>
            <CardDescription>
              {t('post_announcement')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  {t('announcement_title')}
                </label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder={t('enter_announcement_title')}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  {t('announcement_content')}
                </label>
                <Textarea
                  id="content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  placeholder={t('enter_announcement_content')}
                  className="min-h-32"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="important"
                  checked={newAnnouncement.important}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, important: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-teacher focus:ring-teacher"
                />
                <label htmlFor="important" className="text-sm font-medium">
                  {t('mark_as_important')}
                </label>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-teacher hover:bg-teacher/90">
                  {t('publish_announcement')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('search_announcements')}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAnnouncements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">{t('no_announcements_found')}</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? t('try_different_search_term') : t('create_first_announcement')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={announcement.important ? "border-teacher" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {announcement.title}
                      {announcement.important && (
                        <span className="bg-teacher text-white text-xs px-2 py-0.5 rounded-full">
                          {t('important')}
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(announcement.date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {announcement.author}
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <p className="whitespace-pre-wrap">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;

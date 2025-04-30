
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Announcement {
  title: string;
  date: string;
  content: string;
  audience: string;
}

const AnnouncementList = () => {
  // Mock data - in a real app this would be fetched from an API
  const announcements: Announcement[] = [
    { 
      title: 'Parent-Teacher Conference', 
      date: '2025-05-15', 
      content: 'Annual parent-teacher conference scheduled for next month.',
      audience: 'All'
    },
    { 
      title: 'System Maintenance', 
      date: '2025-05-02', 
      content: 'System will be down for maintenance this weekend.',
      audience: 'Teachers'
    },
    { 
      title: 'New Curriculum Update', 
      date: '2025-04-25', 
      content: 'New curriculum updates have been released.',
      audience: 'Teachers'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Announcements</CardTitle>
        <CardDescription>Your previously posted announcements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{announcement.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {announcement.audience}
                  </span>
                  <span className="text-xs text-muted-foreground">{announcement.date}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{announcement.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementList;

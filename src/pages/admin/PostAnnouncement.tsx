
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AnnouncementForm from '@/components/admin/AnnouncementForm';
import AnnouncementList from '@/components/admin/AnnouncementList';

const PostAnnouncement = () => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="space-y-6">
      <AnnouncementForm />
      <AnnouncementList />
    </div>
  );
};

export default PostAnnouncement;

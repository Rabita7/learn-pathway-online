
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import AnnouncementForm from '@/components/admin/AnnouncementForm';
import AnnouncementList from '@/components/admin/AnnouncementList';

const PostAnnouncement = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  
  if (!user || user.role !== 'admin') {
    return <div>{t('access_denied')}. {t('admin')} {t('privileges_required')}.</div>;
  }

  return (
    <div className="space-y-6">
      <AnnouncementForm />
      <AnnouncementList />
    </div>
  );
};

export default PostAnnouncement;

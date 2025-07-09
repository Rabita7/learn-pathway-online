
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/context/LocalizationContext';

const CallToAction = () => {
  const { t } = useLocalization();
  
  return (
    <section className="py-16 bg-gradient-to-r from-[#e6f7f8] to-[#f0f9fa]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#0074a1]">{t('ready_to_get_started')}</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('join_bright_future_school_today')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild className="bg-[#00a7b0] hover:bg-[#008a92]">
            <Link to="/auth/register">{t('create_your_account')}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-[#00a7b0] text-[#00a7b0] hover:bg-[#e6f7f8]">
            <Link to="/services">{t('learn_about_our_services')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;


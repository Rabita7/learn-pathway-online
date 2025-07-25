
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLocalization();
  
  return (
    <div className="bg-gradient-to-b from-[#f3fafc] to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
              <span className="text-[#0074a1]">{t('bright_future')}</span> <span className="text-[#00a7b0]">{t('school')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-center md:text-left">
              {t('a_comprehensive_platform_connecting')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Button size="lg" asChild className="bg-[#00a7b0] hover:bg-[#008a92]">
                  <Link to={`/${user?.role}`}>
                    {t('go_to_dashboard')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild className="bg-[#00a7b0] hover:bg-[#008a92]">
                    <Link to="/auth/login">
                      {t('sign_in')}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-[#00a7b0] text-[#00a7b0] hover:bg-[#e6f7f8]">
                    <Link to="/auth/register">{t('create_account')}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="/lovable-uploads/33647297-d0f6-4d63-a45d-d86289d50d70.png" 
              alt="Bright Future School" 
              className="w-80 h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


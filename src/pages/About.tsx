
import React from 'react';
import { useLocalization } from '@/context/LocalizationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, Heart } from 'lucide-react';

const About = () => {
  const { t } = useLocalization();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('about')} Bright Future School</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('comprehensive_educational_institution_dedicated_to_nurturing_young_minds')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <CardTitle>{t('our_mission')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {t('our_mission_description')}
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <CardTitle>{t('our_vision')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {t('our_vision_description')}
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              <CardTitle>{t('our_values')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {t('our_values_description')}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">{t('why_choose_us')}</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <span>{t('experienced_qualified_teachers')}</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <span>{t('comprehensive_curriculum')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <span>{t('modern_facilities_and_technology')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <span>{t('supportive_learning_environment')}</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <img 
            src="/lovable-uploads/33647297-d0f6-4d63-a45d-d86289d50d70.png" 
            alt="School Building" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;


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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, FileText } from 'lucide-react';

const WriteLetters = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  const { toast } = useToast();
  const [letterType, setLetterType] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  if (!user || user.role !== 'director') {
    return <div>{t('access_denied')}. {t('director')} {t('privileges_required')}.</div>;
  }

  const letterTypes = [
    t('official_notice'),
    t('parent_communication'),
    t('teacher_assignment'),
    t('administrative_letter'),
    t('recommendation_letter'),
    t('disciplinary_notice'),
  ];

  const recipients = [
    t('all_teachers'),
    t('all_parents'),
    t('specific_teacher'),
    t('specific_parent'),
    t('educational_ministry'),
    t('school_board'),
  ];

  const handleSendLetter = () => {
    if (!letterType || !recipient || !subject || !content) {
      toast({
        title: t('error'),
        description: t('please_fill_in_all_fields'),
        variant: 'destructive',
      });
      return;
    }

    // In a real application, this would send the letter via email or official channels
    toast({
      title: t('letter_sent'),
      description: `${t('your')} ${letterType.toLowerCase()} ${t('has_been_sent_to')} ${recipient.toLowerCase()}`,
    });

    // Reset form
    setLetterType('');
    setRecipient('');
    setSubject('');
    setContent('');
  };

  const getLetterTemplate = (type: string) => {
    const templates = {
      [t('official_notice')]: `${t('dear')} [${t('recipient')}],\n\n${t('this_is_to_officially_notify_you_that')}...\n\n${t('sincerely')},\n${t('school_director')}`,
      [t('parent_communication')]: `${t('dear_parents')},\n\n${t('we_would_like_to_inform_you_about')}...\n\n${t('best_regards')},\n${t('school_administration')}`,
      [t('teacher_assignment')]: `${t('dear')} [${t('teacher_name')}],\n\n${t('you_have_been_assigned_to')}...\n\n${t('thank_you_for_your_dedication')},\n${t('school_director')}`,
      [t('administrative_letter')]: `${t('to_whom_it_may_concern')},\n\n${t('this_letter_serves_to')}...\n\n${t('respectfully')},\n${t('school_director')}`,
      [t('recommendation_letter')]: `${t('to_whom_it_may_concern')},\n\n${t('i_am_pleased_to_recommend')}...\n\n${t('sincerely')},\n${t('school_director')}`,
      [t('disciplinary_notice')]: `${t('dear')} [${t('name')}],\n\n${t('this_letter_is_to_address')}...\n\n${t('respectfully')},\n${t('school_director')}`,
    };
    return templates[type] || '';
  };

  const handleLetterTypeChange = (type: string) => {
    setLetterType(type);
    setContent(getLetterTemplate(type));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('write_official_letters')}</h1>
        <p className="text-muted-foreground">{t('compose_and_send_official_school_communications')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('compose_letter')}
          </CardTitle>
          <CardDescription>{t('create_official_school_correspondence')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="letterType">{t('letter_type')}</Label>
              <Select value={letterType} onValueChange={handleLetterTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_letter_type')} />
                </SelectTrigger>
                <SelectContent>
                  {letterTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="recipient">{t('recipient')}</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_recipient')} />
                </SelectTrigger>
                <SelectContent>
                  {recipients.map((recip) => (
                    <SelectItem key={recip} value={recip}>
                      {recip}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="subject">{t('subject')}</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('enter_letter_subject')}
            />
          </div>

          <div>
            <Label htmlFor="content">{t('letter_content')}</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('write_your_letter_content_here')}
              className="min-h-64 resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => {
              setLetterType('');
              setRecipient('');
              setSubject('');
              setContent('');
            }}>
              {t('clear')}
            </Button>
            <Button onClick={handleSendLetter}>
              <Send className="h-4 w-4 mr-2" />
              {t('send_letter')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WriteLetters;

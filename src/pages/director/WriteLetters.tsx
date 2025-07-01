
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
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
  const { toast } = useToast();
  const [letterType, setLetterType] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  if (!user || user.role !== 'director') {
    return <div>Access denied. Director privileges required.</div>;
  }

  const letterTypes = [
    'Official Notice',
    'Parent Communication',
    'Teacher Assignment',
    'Administrative Letter',
    'Recommendation Letter',
    'Disciplinary Notice',
  ];

  const recipients = [
    'All Teachers',
    'All Parents',
    'Specific Teacher',
    'Specific Parent',
    'Educational Ministry',
    'School Board',
  ];

  const handleSendLetter = () => {
    if (!letterType || !recipient || !subject || !content) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // In a real application, this would send the letter via email or official channels
    toast({
      title: 'Letter Sent',
      description: `Your ${letterType.toLowerCase()} has been sent to ${recipient.toLowerCase()}`,
    });

    // Reset form
    setLetterType('');
    setRecipient('');
    setSubject('');
    setContent('');
  };

  const getLetterTemplate = (type: string) => {
    const templates = {
      'Official Notice': 'Dear [Recipient],\n\nThis is to officially notify you that...\n\nSincerely,\nSchool Director',
      'Parent Communication': 'Dear Parents,\n\nWe would like to inform you about...\n\nBest regards,\nSchool Administration',
      'Teacher Assignment': 'Dear [Teacher Name],\n\nYou have been assigned to...\n\nThank you for your dedication,\nSchool Director',
      'Administrative Letter': 'To Whom It May Concern,\n\nThis letter serves to...\n\nRespectfully,\nSchool Director',
      'Recommendation Letter': 'To Whom It May Concern,\n\nI am pleased to recommend...\n\nSincerely,\nSchool Director',
      'Disciplinary Notice': 'Dear [Name],\n\nThis letter is to address...\n\nRespectfully,\nSchool Director',
    };
    return templates[type as keyof typeof templates] || '';
  };

  const handleLetterTypeChange = (type: string) => {
    setLetterType(type);
    setContent(getLetterTemplate(type));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Write Official Letters</h1>
        <p className="text-muted-foreground">Compose and send official school communications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compose Letter
          </CardTitle>
          <CardDescription>Create official school correspondence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="letterType">Letter Type</Label>
              <Select value={letterType} onValueChange={handleLetterTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select letter type" />
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
              <Label htmlFor="recipient">Recipient</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
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
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter letter subject"
            />
          </div>

          <div>
            <Label htmlFor="content">Letter Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your letter content here..."
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
              Clear
            </Button>
            <Button onClick={handleSendLetter}>
              <Send className="h-4 w-4 mr-2" />
              Send Letter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WriteLetters;

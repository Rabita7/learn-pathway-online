
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
import { Mail, Send, User } from 'lucide-react';

interface Parent {
  id: string;
  name: string;
  email: string;
  childName: string;
  childClass: string;
}

interface Letter {
  id: string;
  parentId: string;
  parentName: string;
  childName: string;
  subject: string;
  content: string;
  date: string;
  status: 'draft' | 'sent';
}

const mockParents: Parent[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com', childName: 'Emma Smith', childClass: 'Grade 9A' },
  { id: '2', name: 'Mary Johnson', email: 'mary.johnson@email.com', childName: 'David Johnson', childClass: 'Grade 10B' },
  { id: '3', name: 'Robert Brown', email: 'robert.brown@email.com', childName: 'Sarah Brown', childClass: 'Grade 11A' },
  { id: '4', name: 'Lisa Davis', email: 'lisa.davis@email.com', childName: 'Michael Davis', childClass: 'Grade 9B' },
];

const WriteLetters = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedParent, setSelectedParent] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [letters, setLetters] = useState<Letter[]>([]);

  if (!user || user.role !== 'manager') {
    return <div>Access denied. Manager privileges required.</div>;
  }

  const handleSendLetter = () => {
    if (!selectedParent || !subject || !content) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const parent = mockParents.find(p => p.id === selectedParent);
    if (!parent) return;

    const newLetter: Letter = {
      id: Date.now().toString(),
      parentId: selectedParent,
      parentName: parent.name,
      childName: parent.childName,
      subject,
      content,
      date: new Date().toLocaleDateString(),
      status: 'sent',
    };

    setLetters([newLetter, ...letters]);
    setSelectedParent('');
    setSubject('');
    setContent('');

    toast({
      title: 'Letter Sent',
      description: `Letter sent to ${parent.name} about ${parent.childName}`,
    });
  };

  const selectedParentInfo = mockParents.find(p => p.id === selectedParent);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Write Letters to Parents</h1>
        <p className="text-muted-foreground">Send letters to parents about their children</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compose Letter</CardTitle>
            <CardDescription>Write a letter to a parent about their child</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="parent">Select Parent</Label>
              <Select value={selectedParent} onValueChange={setSelectedParent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose parent" />
                </SelectTrigger>
                <SelectContent>
                  {mockParents.map((parent) => (
                    <SelectItem key={parent.id} value={parent.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{parent.name}</span>
                        <span className="text-sm text-muted-foreground">
                          Parent of {parent.childName} ({parent.childClass})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedParentInfo && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Parent Information</span>
                </div>
                <p className="text-sm"><strong>Parent:</strong> {selectedParentInfo.name}</p>
                <p className="text-sm"><strong>Child:</strong> {selectedParentInfo.childName}</p>
                <p className="text-sm"><strong>Class:</strong> {selectedParentInfo.childClass}</p>
                <p className="text-sm"><strong>Email:</strong> {selectedParentInfo.email}</p>
              </div>
            )}

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
                rows={8}
              />
            </div>

            <Button onClick={handleSendLetter} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Letter
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Letters</CardTitle>
            <CardDescription>Letters you've sent to parents</CardDescription>
          </CardHeader>
          <CardContent>
            {letters.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No letters sent yet</p>
            ) : (
              <div className="space-y-4">
                {letters.map((letter) => (
                  <div key={letter.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">{letter.subject}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{letter.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      To: {letter.parentName} (about {letter.childName})
                    </p>
                    <p className="text-sm line-clamp-3">{letter.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WriteLetters;

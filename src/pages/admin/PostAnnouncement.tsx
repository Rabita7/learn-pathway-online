
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define allowed audience types explicitly to exclude 'guest'
type AnnouncementAudience = 'all' | 'admin' | 'teacher' | 'student' | 'parent';

// Form schema for announcement creation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(10, {
    message: "Announcement content must be at least 10 characters.",
  }),
  audience: z.enum(["all", "admin", "teacher", "student", "parent"], {
    required_error: "Please select an audience for this announcement.",
  }),
});

const PostAnnouncement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      audience: "all",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send data to your backend
    console.log("Announcement data:", values);
    
    toast({
      title: "Announcement Posted Successfully",
      description: `Your announcement has been posted to ${values.audience === 'all' ? 'everyone' : values.audience + 's'}.`,
    });
    
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Bell className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Post Announcement</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Announcement</CardTitle>
          <CardDescription>Create and publish announcements to the school community.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Announcement Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter announcement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Announcement Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the content of your announcement..." 
                        className="min-h-[200px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="audience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {["all", "admin", "teacher", "student", "parent"].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={field.value === value ? "default" : "outline"}
                          className="capitalize"
                          onClick={() => form.setValue("audience", value as AnnouncementAudience)}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit">
                  Post Announcement
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Your previously posted announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
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
            ].map((announcement, index) => (
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
    </div>
  );
};

export default PostAnnouncement;

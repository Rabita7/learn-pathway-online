
import React from 'react';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
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

const AnnouncementForm = () => {
  const { toast } = useToast();

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
    <>
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
    </>
  );
};

export default AnnouncementForm;

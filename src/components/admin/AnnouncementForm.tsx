
import React from 'react';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Form
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Import our new components
import { TitleField } from "./form-fields/TitleField";
import { ContentField } from "./form-fields/ContentField";
import { AudienceField } from "./form-fields/AudienceField";
import { formSchema, AnnouncementFormValues } from "./form-fields/announcementSchema";

const AnnouncementForm = () => {
  const { toast } = useToast();

  // Initialize the form
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      audience: "all",
    },
  });

  const onSubmit = (values: AnnouncementFormValues) => {
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
              <TitleField form={form} />
              <ContentField form={form} />
              <AudienceField form={form} />
              
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

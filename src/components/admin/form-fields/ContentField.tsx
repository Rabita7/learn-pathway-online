
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AnnouncementFormValues } from './announcementSchema';

interface ContentFieldProps {
  form: UseFormReturn<AnnouncementFormValues>;
}

export const ContentField: React.FC<ContentFieldProps> = ({ form }) => {
  return (
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
  );
};

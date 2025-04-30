
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
import * as z from "zod";

interface ContentFieldProps {
  form: UseFormReturn<{
    title: string;
    content: string;
    audience: "all" | "admin" | "teacher" | "student" | "parent";
  }>;
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

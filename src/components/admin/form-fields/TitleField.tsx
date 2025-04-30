
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface TitleFieldProps {
  form: UseFormReturn<{
    title: string;
    content: string;
    audience: "all" | "admin" | "teacher" | "student" | "parent";
  }>;
}

export const TitleField: React.FC<TitleFieldProps> = ({ form }) => {
  return (
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
  );
};

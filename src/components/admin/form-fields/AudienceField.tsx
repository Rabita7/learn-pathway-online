
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

type AnnouncementAudience = 'all' | 'admin' | 'teacher' | 'student' | 'parent';

interface AudienceFieldProps {
  form: UseFormReturn<{
    title: string;
    content: string;
    audience: AnnouncementAudience;
  }>;
}

export const AudienceField: React.FC<AudienceFieldProps> = ({ form }) => {
  const audiences: AnnouncementAudience[] = ["all", "admin", "teacher", "student", "parent"];

  return (
    <FormField
      control={form.control}
      name="audience"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Target Audience</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {audiences.map((value) => (
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
  );
};

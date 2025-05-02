
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
import { AnnouncementAudience, AnnouncementFormValues } from './announcementSchema';

interface AudienceFieldProps {
  form: UseFormReturn<AnnouncementFormValues>;
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
                onClick={() => form.setValue("audience", value)}
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


import * as z from "zod";

// Define allowed audience types explicitly to exclude 'guest'
export type AnnouncementAudience = 'all' | 'admin' | 'teacher' | 'student' | 'parent';

// Form schema for announcement creation
export const formSchema = z.object({
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

export type AnnouncementFormValues = z.infer<typeof formSchema>;

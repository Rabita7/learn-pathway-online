
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from 'lucide-react';

type Course = {
  id: string;
  name: string;
  code: string;
  schedule: string;
  room: string;
  sections: string[];
  students: { id: string; name: string; studentId: string; section: string; }[];
};

interface CourseOverviewCardsProps {
  courses: Course[];
  selectedCourseId: string;
  onCourseSelect: (courseId: string) => void;
}

const CourseOverviewCards: React.FC<CourseOverviewCardsProps> = ({
  courses,
  selectedCourseId,
  onCourseSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course) => (
        <Card 
          key={course.id} 
          className={`cursor-pointer transition-all ${
            selectedCourseId === course.id 
              ? 'ring-2 ring-teacher border-teacher' 
              : 'hover:shadow-md'
          }`} 
          onClick={() => onCourseSelect(course.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-teacher" />
                <div>
                  <div className="font-semibold">{course.name}</div>
                  <div className="text-sm text-muted-foreground">{course.code}</div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="font-medium">{course.students.length} students</div>
                <div className="text-muted-foreground">{course.sections.length} sections</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {course.schedule} | {course.room}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseOverviewCards;


import { Student } from '@/types/grades';

// Mock data for student grades
export const mockStudents: Student[] = [
  { id: 1, name: 'Alex Johnson', grades: { 'Biology': 'A-', 'Chemistry': 'B+', 'Physics': 'A' } },
  { id: 2, name: 'Emma Smith', grades: { 'Biology': 'A', 'Chemistry': 'A', 'Physics': 'A-' } },
  { id: 3, name: 'Michael Brown', grades: { 'Biology': 'B+', 'Chemistry': 'B', 'Physics': 'B+' } },
  { id: 4, name: 'Sophia Davis', grades: { 'Biology': 'A-', 'Chemistry': 'B+', 'Physics': 'A-' } },
  { id: 5, name: 'William Wilson', grades: { 'Biology': 'B', 'Chemistry': 'B-', 'Physics': 'C+' } },
  { id: 6, name: 'Olivia Miller', grades: { 'Advanced Biology': 'A', 'Chemistry': 'A-', 'Physics': 'A' } },
  { id: 7, name: 'James Taylor', grades: { 'Advanced Biology': 'B+', 'Chemistry': 'B', 'Physics': 'A-' } },
];

export const subjects = ['Biology', 'Chemistry', 'Physics', 'Advanced Biology'];
export const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

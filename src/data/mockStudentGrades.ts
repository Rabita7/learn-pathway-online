
import { Student, StudentAssignment, TeacherSubject } from '@/types/grades';

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

// Mock teacher subjects
export const mockTeacherSubjects: {[teacherId: string]: TeacherSubject[]} = {
  '2': [
    { id: '1', name: 'Biology' },
    { id: '2', name: 'Advanced Biology' }
  ]
};

// Mock student assignments
export const mockStudentAssignments: StudentAssignment[] = [
  {
    id: '1',
    studentId: 1,
    studentName: 'Alex Johnson',
    title: 'Cell Structure Report',
    subject: 'Biology',
    dueDate: '2025-06-01',
    status: 'submitted',
    submittedDate: '2025-05-30',
    grade: 'A'
  },
  {
    id: '2',
    studentId: 2,
    studentName: 'Emma Smith',
    title: 'Cell Structure Report',
    subject: 'Biology',
    dueDate: '2025-06-01',
    status: 'submitted',
    submittedDate: '2025-05-28',
    grade: 'A-'
  },
  {
    id: '3',
    studentId: 3,
    studentName: 'Michael Brown',
    title: 'Cell Structure Report',
    subject: 'Biology',
    dueDate: '2025-06-01',
    status: 'pending'
  },
  {
    id: '4',
    studentId: 6,
    studentName: 'Olivia Miller',
    title: 'DNA Replication Analysis',
    subject: 'Advanced Biology',
    dueDate: '2025-06-05',
    status: 'submitted',
    submittedDate: '2025-06-03',
    grade: 'A'
  },
  {
    id: '5',
    studentId: 7,
    studentName: 'James Taylor',
    title: 'DNA Replication Analysis',
    subject: 'Advanced Biology',
    dueDate: '2025-06-05',
    status: 'late',
    submittedDate: '2025-06-07'
  }
];

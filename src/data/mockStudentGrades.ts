
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
    grade: 'A',
    description: 'Write a detailed report on cell structures and their functions. Include diagrams and examples.',
    points: 100
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
    grade: 'A-',
    description: 'Write a detailed report on cell structures and their functions. Include diagrams and examples.',
    points: 100
  },
  {
    id: '3',
    studentId: 3,
    studentName: 'Michael Brown',
    title: 'Cell Structure Report',
    subject: 'Biology',
    dueDate: '2025-06-01',
    status: 'pending',
    description: 'Write a detailed report on cell structures and their functions. Include diagrams and examples.',
    points: 100
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
    grade: 'A',
    description: 'Analyze the process of DNA replication and explain how errors in this process can lead to mutations.',
    points: 150
  },
  {
    id: '5',
    studentId: 7,
    studentName: 'James Taylor',
    title: 'DNA Replication Analysis',
    subject: 'Advanced Biology',
    dueDate: '2025-06-05',
    status: 'late',
    submittedDate: '2025-06-07',
    description: 'Analyze the process of DNA replication and explain how errors in this process can lead to mutations.',
    points: 150
  },
  {
    id: '6',
    studentId: 1,
    studentName: 'Alex Johnson',
    title: 'Photosynthesis Lab Report',
    subject: 'Biology',
    dueDate: '2025-06-15',
    status: 'pending',
    description: 'Complete the photosynthesis lab experiment and write a report on your findings.',
    points: 120
  },
  {
    id: '7',
    studentId: 2,
    studentName: 'Emma Smith',
    title: 'Ecosystem Analysis',
    subject: 'Biology',
    dueDate: '2025-06-20',
    status: 'pending',
    description: 'Choose a local ecosystem and analyze the interactions between organisms.',
    points: 100
  }
];

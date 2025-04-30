
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  role: UserRole | 'all';
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  parentId?: string;
}

export interface GradeEntry {
  id: string;
  studentId: string;
  subject: string;
  grade: string;
  date: string;
}

export interface AttendanceEntry {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'tardy' | 'excused';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  teacherId: string;
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  schedule: string;
  room: string;
}

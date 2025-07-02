export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'director';

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
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  section?: string;
  parentInfo?: {
    name: string;
    age: string;
    email: string;
    phone: string;
    occupation: string;
  };
  emergencyContact?: string;
  emergencyContactPhone?: string;
  medicalConditions?: string;
  previousSchool?: string;
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
  grade: string;
  section: string;
  teacherId: string;
  schedule: string;
  room: string;
  studentIds: string[];
  representativeTeacherId?: string;
}

export interface TeacherSubjectAssignment {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  classId: string;
  className: string;
  gradeLevel: string;
  section: string;
  isRepresentative: boolean;
}

export interface ClassAttendanceView {
  classId: string;
  className: string;
  gradeLevel: string;
  section: string;
  date: string;
  attendanceRecords: AttendanceEntry[];
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  tardyCount: number;
}

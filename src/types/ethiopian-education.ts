
import { EthiopianGradeLevel, EthiopianRegion, EthiopianGrade } from './ethiopia';

export interface EthiopianStudent extends Omit<Student, 'grade'> {
  gradeLevel: EthiopianGradeLevel;
  educationLevel: 'Primary' | 'Secondary' | 'Preparatory';
  region: EthiopianRegion;
  zone?: string;
  woreda?: string;
  stream?: 'Natural Science' | 'Social Science'; // For preparatory students
  motherTongue?: string;
}

export interface EthiopianGradeEntry {
  id: string;
  studentId: string;
  subject: string;
  grade: EthiopianGrade;
  points: number;
  percentage: number;
  term: 'First Term' | 'Second Term' | 'Third Term';
  academicYear: string;
  date: string;
}

export interface EthiopianClass {
  id: string;
  name: string;
  gradeLevel: EthiopianGradeLevel;
  educationLevel: 'Primary' | 'Secondary' | 'Preparatory';
  section: string;
  teacherId: string;
  subjects: string[];
  schedule: string;
  room: string;
  academicYear: string;
  stream?: 'Natural Science' | 'Social Science';
}

export interface EthiopianSchool {
  id: string;
  name: string;
  region: EthiopianRegion;
  zone: string;
  woreda: string;
  schoolType: 'Primary' | 'Secondary' | 'Preparatory' | 'Primary & Secondary' | 'Complete';
  principalId?: string;
  establishedYear: number;
}

// Re-export Student type for backward compatibility
export interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  parentId?: string;
}

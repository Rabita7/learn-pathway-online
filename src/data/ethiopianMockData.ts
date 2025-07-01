import { EthiopianStudent, EthiopianClass, EthiopianGradeEntry } from '@/types/ethiopian-education';
import { EthiopianGradeLevel } from '@/types/ethiopia';

export const mockEthiopianStudents: EthiopianStudent[] = [
  {
    id: '1',
    name: 'Abebe Kebede',
    email: 'abebe.kebede@student.edu.et',
    gradeLevel: 'Grade 9',
    educationLevel: 'Secondary',
    region: 'Addis Ababa',
    zone: 'Bole',
    woreda: 'Bole Sub-city',
    motherTongue: 'Amharic',
    section: 'A'
  },
  {
    id: '2',
    name: 'Hanan Ahmed',
    email: 'hanan.ahmed@student.edu.et',
    gradeLevel: 'Grade 10',
    educationLevel: 'Secondary',
    region: 'Oromia',
    zone: 'East Shewa',
    woreda: 'Adama',
    motherTongue: 'Oromifa',
    section: 'B'
  },
  {
    id: '3',
    name: 'Meron Tadesse',
    email: 'meron.tadesse@student.edu.et',
    gradeLevel: 'Grade 11',
    educationLevel: 'Preparatory',
    region: 'Amhara',
    zone: 'North Shewa',
    woreda: 'Debre Berhan',
    stream: 'Natural Science',
    motherTongue: 'Amharic',
    section: 'A'
  },
  {
    id: '4',
    name: 'Daniel Wolde',
    email: 'daniel.wolde@student.edu.et',
    gradeLevel: 'Grade 12',
    educationLevel: 'Preparatory',
    region: 'Addis Ababa',
    zone: 'Kirkos',
    woreda: 'Kirkos Sub-city',
    stream: 'Social Science',
    motherTongue: 'Amharic',
    section: 'A'
  },
  {
    id: '5',
    name: 'Tigist Haile',
    email: 'tigist.haile@student.edu.et',
    gradeLevel: 'Grade 8',
    educationLevel: 'Primary',
    region: 'SNNP',
    zone: 'Wolaita',
    woreda: 'Sodo',
    motherTongue: 'Wolaytta',
    section: 'A'
  }
];

export const mockEthiopianClasses: EthiopianClass[] = [
  {
    id: '1',
    name: 'Grade 9 Section A',
    gradeLevel: 'Grade 9',
    educationLevel: 'Secondary',
    section: 'A',
    teacherId: '2',
    subjects: ['English', 'Amharic', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    schedule: 'Monday to Friday, 8:00 AM - 3:00 PM',
    room: 'Room 201',
    academicYear: '2024/25'
  },
  {
    id: '2',
    name: 'Grade 11 Natural Science',
    gradeLevel: 'Grade 11',
    educationLevel: 'Preparatory',
    section: 'A',
    teacherId: '2',
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    schedule: 'Monday to Friday, 8:00 AM - 4:00 PM',
    room: 'Science Lab',
    academicYear: '2024/25',
    stream: 'Natural Science'
  }
];

export const mockEthiopianGrades: EthiopianGradeEntry[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Mathematics',
    grade: 'A',
    points: 4,
    percentage: 92,
    term: 'First Term',
    academicYear: '2024/25',
    date: '2024-12-15'
  },
  {
    id: '2',
    studentId: '1',
    subject: 'Biology',
    grade: 'B',
    points: 3,
    percentage: 85,
    term: 'First Term',
    academicYear: '2024/25',
    date: '2024-12-15'
  }
];

// Grade levels organized by education level
export const GRADE_LEVELS_BY_EDUCATION: Record<string, EthiopianGradeLevel[]> = {
  'Primary': ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'],
  'Secondary': ['Grade 9', 'Grade 10'],
  'Preparatory': ['Grade 11', 'Grade 12']
};

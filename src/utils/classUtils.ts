
import { Student, Class } from '@/types';

export const generateClassSections = (students: Student[]): Class[] => {
  // Group students by grade
  const studentsByGrade: { [grade: string]: Student[] } = {};
  
  students.forEach(student => {
    if (!studentsByGrade[student.grade]) {
      studentsByGrade[student.grade] = [];
    }
    studentsByGrade[student.grade].push(student);
  });

  const classes: Class[] = [];
  let classId = 1;

  // Create sections for each grade (max 30 students per section)
  Object.entries(studentsByGrade).forEach(([grade, gradeStudents]) => {
    const sectionsNeeded = Math.ceil(gradeStudents.length / 30);
    
    for (let sectionIndex = 0; sectionIndex < sectionsNeeded; sectionIndex++) {
      const sectionLetter = String.fromCharCode(65 + sectionIndex); // A, B, C, etc.
      const startIndex = sectionIndex * 30;
      const endIndex = Math.min(startIndex + 30, gradeStudents.length);
      const sectionStudents = gradeStudents.slice(startIndex, endIndex);
      
      // Update students with their section assignment
      sectionStudents.forEach(student => {
        student.section = sectionLetter;
      });

      // Create the class
      const newClass: Class = {
        id: classId.toString(),
        name: `Grade ${grade} - Section ${sectionLetter}`,
        grade: grade,
        section: sectionLetter,
        teacherId: '', // To be assigned later
        schedule: 'Mon-Fri 8:00 AM - 3:00 PM',
        room: `Room ${100 + classId}`,
        studentIds: sectionStudents.map(s => s.id)
      };
      
      classes.push(newClass);
      classId++;
    }
  });

  return classes;
};

export const assignStudentToSection = (student: Student, students: Student[]): string => {
  const gradeStudents = students.filter(s => s.grade === student.grade && s.section);
  const sectionCounts: { [section: string]: number } = {};
  
  // Count students in each section
  gradeStudents.forEach(s => {
    if (s.section) {
      sectionCounts[s.section] = (sectionCounts[s.section] || 0) + 1;
    }
  });
  
  // Find the section with the least students or create a new one
  const existingSections = Object.keys(sectionCounts);
  
  if (existingSections.length === 0) {
    return 'A'; // First section
  }
  
  // Find section with least students
  let targetSection = existingSections[0];
  let minCount = sectionCounts[targetSection];
  
  for (const section of existingSections) {
    if (sectionCounts[section] < minCount) {
      minCount = sectionCounts[section];
      targetSection = section;
    }
  }
  
  // If all sections are full (30 students), create new section
  if (minCount >= 30) {
    const nextSectionIndex = existingSections.length;
    targetSection = String.fromCharCode(65 + nextSectionIndex);
  }
  
  return targetSection;
};

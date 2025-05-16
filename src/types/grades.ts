
export interface StudentGrades {
  [subject: string]: string;
}

export interface Student {
  id: number;
  name: string;
  grades: StudentGrades;
}

export interface TeacherSubject {
  id: string;
  name: string;
}

export interface StudentAssignment {
  id: string;
  studentId: number;
  studentName: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'submitted' | 'pending' | 'late' | 'graded';
  submittedDate?: string;
  grade?: string;
  file?: string;
  description?: string;
  points?: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: number;
  submittedDate: string;
  file: string;
  comments?: string;
}

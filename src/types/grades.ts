
export interface StudentGrades {
  [subject: string]: string;
}

export interface Student {
  id: number;
  name: string;
  grades: StudentGrades;
}

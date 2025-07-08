
import { useState, useCallback, useMemo } from 'react';

export interface StudentGrade {
  studentId: string;
  test: number;
  assignment: number;
  midexam: number;
  finalexam: number;
  result: number;
}

export interface GradeWeights {
  test: number;
  assignment: number;
  midexam: number;
  finalexam: number;
}

const DEFAULT_WEIGHTS: GradeWeights = {
  test: 0.2,      // 20%
  assignment: 0.2, // 20%
  midexam: 0.3,   // 30%
  finalexam: 0.3  // 30%
};

export const useGradeCalculation = (initialGrades: StudentGrade[] = []) => {
  const [grades, setGrades] = useState<StudentGrade[]>(initialGrades);
  const [weights, setWeights] = useState<GradeWeights>(DEFAULT_WEIGHTS);

  const calculateResult = useCallback((grade: Omit<StudentGrade, 'result'>): number => {
    return Math.round(
      (grade.test * weights.test) + 
      (grade.assignment * weights.assignment) + 
      (grade.midexam * weights.midexam) + 
      (grade.finalexam * weights.finalexam)
    );
  }, [weights]);

  const getLetterGrade = useCallback((percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }, []);

  const getGradeColor = useCallback((percentage: number): string => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  }, []);

  const updateGrade = useCallback((
    studentId: string, 
    field: keyof Omit<StudentGrade, 'studentId' | 'result'>, 
    value: number
  ) => {
    setGrades(prev => {
      const existing = prev.find(g => g.studentId === studentId);
      const updated = existing ? { ...existing } : {
        studentId,
        test: 0,
        assignment: 0,
        midexam: 0,
        finalexam: 0,
        result: 0
      };
      
      updated[field] = Math.max(0, Math.min(100, value));
      updated.result = calculateResult(updated);

      return prev.filter(g => g.studentId !== studentId).concat(updated);
    });
  }, [calculateResult]);

  const getStudentGrade = useCallback((studentId: string): StudentGrade => {
    return grades.find(g => g.studentId === studentId) || {
      studentId,
      test: 0,
      assignment: 0,
      midexam: 0,
      finalexam: 0,
      result: 0
    };
  }, [grades]);

  const classStatistics = useMemo(() => {
    if (grades.length === 0) return null;

    const results = grades.map(g => g.result).filter(r => r > 0);
    if (results.length === 0) return null;

    const average = Math.round(results.reduce((sum, result) => sum + result, 0) / results.length);
    const highest = Math.max(...results);
    const lowest = Math.min(...results);
    
    const letterGrades = results.map(r => getLetterGrade(r));
    const gradeDistribution = {
      A: letterGrades.filter(g => g === 'A').length,
      B: letterGrades.filter(g => g === 'B').length,
      C: letterGrades.filter(g => g === 'C').length,
      D: letterGrades.filter(g => g === 'D').length,
      F: letterGrades.filter(g => g === 'F').length,
    };

    return {
      average,
      highest,
      lowest,
      total: results.length,
      gradeDistribution
    };
  }, [grades, getLetterGrade]);

  return {
    grades,
    weights,
    updateGrade,
    getStudentGrade,
    getLetterGrade,
    getGradeColor,
    calculateResult,
    classStatistics,
    setWeights,
    setGrades
  };
};

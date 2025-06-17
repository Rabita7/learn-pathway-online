
import React from 'react';
import { Award } from 'lucide-react';
import { ETHIOPIAN_GRADING_SCALE, EthiopianGrade } from '@/types/ethiopia';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const EthiopianGradingScale: React.FC = () => {
  const getGradeColor = (grade: EthiopianGrade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50';
      case 'B': return 'text-blue-600 bg-blue-50';
      case 'C': return 'text-yellow-600 bg-yellow-50';
      case 'D': return 'text-orange-600 bg-orange-50';
      case 'F': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-teacher" />
          Ethiopian Grading Scale Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(ETHIOPIAN_GRADING_SCALE).map(([grade, info]) => (
            <div key={grade} className={`p-3 rounded-lg border ${getGradeColor(grade as EthiopianGrade)}`}>
              <div className="font-bold text-lg">{grade}</div>
              <div className="text-sm">{info.range}%</div>
              <div className="text-xs">{info.description}</div>
              <div className="text-xs font-medium">{info.points} points</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EthiopianGradingScale;

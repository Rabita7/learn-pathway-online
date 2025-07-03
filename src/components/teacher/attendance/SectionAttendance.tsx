
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentId: string;
  section: string;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'tardy' | 'excused';
}

interface SectionAttendanceProps {
  students: Student[];
  section: string;
  course: string;
  date: string;
  onSave: (attendance: AttendanceRecord[]) => void;
}

const SectionAttendance: React.FC<SectionAttendanceProps> = ({
  students,
  section,
  course,
  date,
  onSave
}) => {
  const [attendance, setAttendance] = useState<{ [key: string]: 'present' | 'absent' | 'tardy' | 'excused' }>({});

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'tardy' | 'excused') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    const attendanceRecords: AttendanceRecord[] = students.map(student => ({
      studentId: student.id,
      status: attendance[student.id] || 'absent'
    }));
    onSave(attendanceRecords);
  };

  const getStatusIcon = (status: 'present' | 'absent' | 'tardy' | 'excused') => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'tardy':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'excused':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: 'present' | 'absent' | 'tardy' | 'excused') => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'tardy':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'excused':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSummary = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(s => s === 'present').length;
    const absent = Object.values(attendance).filter(s => s === 'absent').length;
    const tardy = Object.values(attendance).filter(s => s === 'tardy').length;
    const excused = Object.values(attendance).filter(s => s === 'excused').length;
    
    return { total, present, absent, tardy, excused };
  };

  const summary = getSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Section {section} - {course}
          </div>
          <Badge variant="outline">{students.length} Students</Badge>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Date: {date}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newAttendance: { [key: string]: 'present' | 'absent' | 'tardy' | 'excused' } = {};
              students.forEach(student => {
                newAttendance[student.id] = 'present';
              });
              setAttendance(newAttendance);
            }}
          >
            Mark All Present
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newAttendance: { [key: string]: 'present' | 'absent' | 'tardy' | 'excused' } = {};
              students.forEach(student => {
                newAttendance[student.id] = 'absent';
              });
              setAttendance(newAttendance);
            }}
          >
            Mark All Absent
          </Button>
        </div>

        {/* Students Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => {
              const status = attendance[student.id] || 'absent';
              
              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.studentId}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <Button
                        size="sm"
                        variant={status === 'present' ? 'default' : 'outline'}
                        className={status === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'present')}
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={status === 'absent' ? 'default' : 'outline'}
                        className={status === 'absent' ? 'bg-red-500 hover:bg-red-600' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'absent')}
                      >
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={status === 'tardy' ? 'default' : 'outline'}
                        className={status === 'tardy' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'tardy')}
                      >
                        Tardy
                      </Button>
                      <Button
                        size="sm"
                        variant={status === 'excused' ? 'default' : 'outline'}
                        className={status === 'excused' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'excused')}
                      >
                        Excused
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="text-sm font-medium text-green-800">Present</div>
            <div className="text-lg font-bold text-green-900">{summary.present}</div>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="text-sm font-medium text-red-800">Absent</div>
            <div className="text-lg font-bold text-red-900">{summary.absent}</div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="text-sm font-medium text-amber-800">Tardy</div>
            <div className="text-lg font-bold text-amber-900">{summary.tardy}</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-sm font-medium text-blue-800">Excused</div>
            <div className="text-lg font-bold text-blue-900">{summary.excused}</div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveAttendance} className="bg-teacher hover:bg-teacher/90">
            Save Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionAttendance;

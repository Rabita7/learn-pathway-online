
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart2,
  BookOpen,
  Calendar,
  Download,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock data for attendance chart
const attendanceData = [
  { name: 'Jan', present: 95, absent: 5 },
  { name: 'Feb', present: 92, absent: 8 },
  { name: 'Mar', present: 88, absent: 12 },
  { name: 'Apr', present: 93, absent: 7 },
  { name: 'May', present: 90, absent: 10 },
];

// Mock data for grade distribution
const gradeDistributionData = [
  { name: 'A', count: 120 },
  { name: 'B', count: 210 },
  { name: 'C', count: 180 },
  { name: 'D', count: 70 },
  { name: 'F', count: 20 },
];

// Mock data for subject performance
const subjectPerformanceData = [
  { name: 'Math', average: 85 },
  { name: 'Science', average: 78 },
  { name: 'English', average: 82 },
  { name: 'History', average: 88 },
  { name: 'Art', average: 92 },
  { name: 'Physical Ed', average: 95 },
];

const ViewReports = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportType} report download initiated.`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Academic Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <CardDescription>Across all grades</CardDescription>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">+6% from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
              <CardDescription>School-wide average</CardDescription>
            </div>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4</div>
            <p className="text-xs text-muted-foreground mt-1">+0.2 from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CardDescription>Average across all classes</CardDescription>
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">-2% from last semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attendance Trends</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Attendance')}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
            <CardDescription>Monthly student attendance rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present (%)" fill="#4ade80" />
                  <Bar dataKey="absent" name="Absent (%)" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Grade Distribution</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Grade')}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
            <CardDescription>Distribution of grades across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Number of Students" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subject Performance</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleDownloadReport('Performance')}>
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
          <CardDescription>Average scores by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" name="Average Score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Reports</CardTitle>
          <CardDescription>Select the type of report you want to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start" onClick={() => handleDownloadReport('Student')}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Student Reports</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Detailed student performance data</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start" onClick={() => handleDownloadReport('Class')}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>Class Reports</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Performance metrics by class</span>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start" onClick={() => handleDownloadReport('Attendance')}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Attendance Reports</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Detailed attendance statistics</span>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewReports;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layout Components
import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

// Main Pages
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Services from "@/pages/Services";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ManagerRegister from "@/pages/auth/ManagerRegister";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageStudents from "@/pages/admin/ManageStudents";
import ManageTeachers from "@/pages/admin/ManageTeachers";
import ManageParents from "@/pages/admin/ManageParents";
import ManageClasses from "@/pages/admin/ManageClasses";
import ViewReports from "@/pages/admin/ViewReports";
import PostAnnouncement from "@/pages/admin/PostAnnouncement";

// Manager Pages
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ManageStaff from "@/pages/manager/ManageStaff";

// Teacher Pages
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import ViewStudents from "@/pages/teacher/ViewStudents";
import ManageGrades from "@/pages/teacher/ManageGrades";
import ManageAttendance from "@/pages/teacher/ManageAttendance";
import PostAssignment from "@/pages/teacher/PostAssignment";
import ViewAssignments from "@/pages/teacher/ViewAssignments";
import Announcements from "@/pages/teacher/Announcements";

// Role-specific Dashboards
import StudentDashboard from "@/pages/student/StudentDashboard";
import ViewGrades from "@/pages/student/ViewGrades";
import StudentAssignments from "@/pages/student/StudentAssignments";
import ParentDashboard from "@/pages/parent/ParentDashboard";

import ViewAttendance from "@/pages/student/ViewAttendance";
import ClassSchedule from "@/pages/student/ClassSchedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main layout routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              
              {/* Authentication routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/manager-register" element={<ManagerRegister />} />
            </Route>
            
            {/* Dashboard routes */}
            <Route element={<DashboardLayout />}>
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/manage-students" element={<ManageStudents />} />
              <Route path="/admin/manage-teachers" element={<ManageTeachers />} />
              <Route path="/admin/manage-parents" element={<ManageParents />} />
              <Route path="/admin/manage-classes" element={<ManageClasses />} />
              <Route path="/admin/view-reports" element={<ViewReports />} />
              <Route path="/admin/post-announcement" element={<PostAnnouncement />} />
              
              {/* Manager routes */}
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/manager/manage-staff" element={<ManageStaff />} />
              <Route path="/manager/view-reports" element={<div>Manager Reports Page</div>} />
              <Route path="/manager/budget" element={<div>Budget Management Page</div>} />
              <Route path="/manager/announcements" element={<div>Manager Announcements Page</div>} />
              
              {/* Teacher routes */}
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/view-students" element={<ViewStudents />} />
              <Route path="/teacher/manage-grades" element={<ManageGrades />} />
              <Route path="/teacher/manage-attendance" element={<ManageAttendance />} />
              <Route path="/teacher/post-assignment" element={<PostAssignment />} />
              <Route path="/teacher/view-assignments" element={<ViewAssignments />} />
              <Route path="/teacher/announcements" element={<Announcements />} />
              
              {/* Student routes */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/view-grades" element={<ViewGrades />} />
              <Route path="/student/view-attendance" element={<ViewAttendance />} />
              <Route path="/student/class-schedule" element={<ClassSchedule />} />
              <Route path="/student/assignments" element={<StudentAssignments />} />
              <Route path="/student/announcements" element={<div>Student Announcements Page</div>} />
              
              {/* Parent routes */}
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/parent/view-child-grades" element={<div>View Child's Grades Page</div>} />
              <Route path="/parent/view-child-attendance" element={<div>View Child's Attendance Page</div>} />
              <Route path="/parent/announcements" element={<div>Parent Announcements Page</div>} />
              
              {/* Shared routes */}
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

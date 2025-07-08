import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageParents from "./pages/admin/ManageParents";
import ManageClasses from "./pages/admin/ManageClasses";
import AdminReports from "./pages/admin/AdminReports";
import PostAnnouncement from "./pages/admin/PostAnnouncement";

// Teacher pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import ManageGrades from "./pages/teacher/ManageGrades";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import PostAssignment from "./pages/teacher/PostAssignment";
import TeacherAnnouncements from "./pages/teacher/TeacherAnnouncements";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentGrades from "./pages/student/StudentGrades";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentSchedule from "./pages/student/StudentSchedule";
import StudentAnnouncements from "./pages/student/StudentAnnouncements";
import StudentProfile from "./pages/student/StudentProfile";

// Parent pages
import ParentDashboard from "./pages/parent/ParentDashboard";
import ChildGrades from "./pages/parent/ChildGrades";
import ChildAttendance from "./pages/parent/ChildAttendance";
import ParentAnnouncements from "./pages/parent/ParentAnnouncements";

// Director pages
import DirectorDashboard from "./pages/director/DirectorDashboard";
import AssignTeachers from "./pages/director/AssignTeachers";
import ClassAttendance from "./pages/director/ClassAttendance";
import ManageStaff from "./pages/director/ManageStaff";
import WriteLetters from "./pages/director/WriteLetters";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LocalizationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="services" element={<Services />} />
              </Route>

              {/* Auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Admin routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<ManageStudents />} />
                <Route path="teachers" element={<ManageTeachers />} />
                <Route path="parents" element={<ManageParents />} />
                <Route path="classes" element={<ManageClasses />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="announcements" element={<PostAnnouncement />} />
              </Route>

              {/* Teacher routes */}
              <Route path="/teacher" element={<DashboardLayout />}>
                <Route index element={<TeacherDashboard />} />
                <Route path="students" element={<TeacherStudents />} />
                <Route path="grades" element={<ManageGrades />} />
                <Route path="attendance" element={<TeacherAttendance />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="post-assignment" element={<PostAssignment />} />
                <Route path="announcements" element={<TeacherAnnouncements />} />
              </Route>

              {/* Student routes */}
              <Route path="/student" element={<DashboardLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="grades" element={<StudentGrades />} />
                <Route path="attendance" element={<StudentAttendance />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="schedule" element={<StudentSchedule />} />
                <Route path="announcements" element={<StudentAnnouncements />} />
                <Route path="profile" element={<StudentProfile />} />
              </Route>

              {/* Parent routes */}
              <Route path="/parent" element={<DashboardLayout />}>
                <Route index element={<ParentDashboard />} />
                <Route path="child-grades" element={<ChildGrades />} />
                <Route path="child-attendance" element={<ChildAttendance />} />
                <Route path="announcements" element={<ParentAnnouncements />} />
              </Route>

              {/* Director routes */}
              <Route path="/director" element={<DashboardLayout />}>
                <Route index element={<DirectorDashboard />} />
                <Route path="assign-teachers" element={<AssignTeachers />} />
                <Route path="class-attendance" element={<ClassAttendance />} />
                <Route path="manage-staff" element={<ManageStaff />} />
                <Route path="write-letters" element={<WriteLetters />} />
              </Route>

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

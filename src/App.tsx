
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
import ViewReports from "./pages/admin/ViewReports";
import PostAnnouncement from "./pages/admin/PostAnnouncement";

// Teacher pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ViewStudents from "./pages/teacher/ViewStudents";
import ManageGrades from "./pages/teacher/ManageGrades";
import ManageAttendance from "./pages/teacher/ManageAttendance";
import ViewAssignments from "./pages/teacher/ViewAssignments";
import PostAssignment from "./pages/teacher/PostAssignment";
import Announcements from "./pages/teacher/Announcements";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ViewGrades from "./pages/student/ViewGrades";
import ViewAttendance from "./pages/student/ViewAttendance";
import StudentAssignments from "./pages/student/StudentAssignments";
import ClassSchedule from "./pages/student/ClassSchedule";
import StudentAnnouncements from "./pages/student/StudentAnnouncements";
import StudentProfile from "./pages/student/StudentProfile";

// Parent pages
import ParentDashboard from "./pages/parent/ParentDashboard";
import ViewChildGrades from "./pages/parent/ViewChildGrades";
import ViewChildAttendance from "./pages/parent/ViewChildAttendance";
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
                <Route path="reports" element={<ViewReports />} />
                <Route path="announcements" element={<PostAnnouncement />} />
              </Route>

              {/* Teacher routes */}
              <Route path="/teacher" element={<DashboardLayout />}>
                <Route index element={<TeacherDashboard />} />
                <Route path="students" element={<ViewStudents />} />
                <Route path="grades" element={<ManageGrades />} />
                <Route path="attendance" element={<ManageAttendance />} />
                <Route path="assignments" element={<ViewAssignments />} />
                <Route path="post-assignment" element={<PostAssignment />} />
                <Route path="announcements" element={<Announcements />} />
              </Route>

              {/* Student routes */}
              <Route path="/student" element={<DashboardLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="grades" element={<ViewGrades />} />
                <Route path="attendance" element={<ViewAttendance />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="schedule" element={<ClassSchedule />} />
                <Route path="announcements" element={<StudentAnnouncements />} />
                <Route path="profile" element={<StudentProfile />} />
              </Route>

              {/* Parent routes */}
              <Route path="/parent" element={<DashboardLayout />}>
                <Route index element={<ParentDashboard />} />
                <Route path="child-grades" element={<ViewChildGrades />} />
                <Route path="child-attendance" element={<ViewChildAttendance />} />
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

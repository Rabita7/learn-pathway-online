
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

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Role-specific Dashboards
import AdminDashboard from "@/pages/admin/AdminDashboard";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import StudentDashboard from "@/pages/student/StudentDashboard";
import ViewGrades from "@/pages/student/ViewGrades";
import ParentDashboard from "@/pages/parent/ParentDashboard";

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
              
              {/* Authentication routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Route>
            
            {/* Dashboard routes */}
            <Route element={<DashboardLayout />}>
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/manage-students" element={<div>Manage Students Page</div>} />
              <Route path="/admin/manage-teachers" element={<div>Manage Teachers Page</div>} />
              <Route path="/admin/manage-parents" element={<div>Manage Parents Page</div>} />
              <Route path="/admin/manage-classes" element={<div>Manage Classes Page</div>} />
              <Route path="/admin/view-reports" element={<div>View Reports Page</div>} />
              <Route path="/admin/post-announcement" element={<div>Post Announcement Page</div>} />
              
              {/* Teacher routes */}
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/view-students" element={<div>View Students Page</div>} />
              <Route path="/teacher/manage-grades" element={<div>Manage Grades Page</div>} />
              <Route path="/teacher/manage-attendance" element={<div>Manage Attendance Page</div>} />
              <Route path="/teacher/post-assignment" element={<div>Post Assignment Page</div>} />
              <Route path="/teacher/announcements" element={<div>Teacher Announcements Page</div>} />
              
              {/* Student routes */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/view-grades" element={<ViewGrades />} />
              <Route path="/student/view-attendance" element={<div>View Attendance Page</div>} />
              <Route path="/student/class-schedule" element={<div>Class Schedule Page</div>} />
              <Route path="/student/assignments" element={<div>Assignments Page</div>} />
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

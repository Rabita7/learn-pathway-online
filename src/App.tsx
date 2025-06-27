
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ManagerRegister from './pages/auth/ManagerRegister';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostAnnouncement from './pages/admin/PostAnnouncement';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageStudents from './pages/admin/ManageStudents';
import ManageParents from './pages/admin/ManageParents';
import ManageClasses from './pages/admin/ManageClasses';
import ViewReports from './pages/admin/ViewReports';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import GuestDashboard from './pages/guest/GuestDashboard';
import ManageUserAccounts from './pages/admin/ManageUserAccounts';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/manager-register" element={<ManagerRegister />} />
          <Route path="/guest" element={<GuestDashboard />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/parent" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
          <Route path="/manager" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />

          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="post-announcement" element={<PostAnnouncement />} />
            <Route path="manage-teachers" element={<ManageTeachers />} />
            <Route path="manage-students" element={<ManageStudents />} />
            <Route path="manage-parents" element={<ManageParents />} />
            <Route path="manage-classes" element={<ManageClasses />} />
            <Route path="manage-users" element={<ManageUserAccounts />} />
            <Route path="view-reports" element={<ViewReports />} />
          </Route>

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default App;

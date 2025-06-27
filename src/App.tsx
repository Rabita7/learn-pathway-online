import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ManagerRegister from './pages/auth/ManagerRegister';
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

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/post-announcement" element={<ProtectedRoute><PostAnnouncement /></ProtectedRoute>} />
          <Route path="/admin/manage-teachers" element={<ProtectedRoute><ManageTeachers /></ProtectedRoute>} />
          <Route path="/admin/manage-students" element={<ProtectedRoute><ManageStudents /></ProtectedRoute>} />
          <Route path="/admin/manage-parents" element={<ProtectedRoute><ManageParents /></ProtectedRoute>} />
          <Route path="/admin/manage-classes" element={<ProtectedRoute><ManageClasses /></ProtectedRoute>} />
          <Route path="/admin/manage-users" element={<ProtectedRoute><ManageUserAccounts /></ProtectedRoute>} />
          <Route path="/admin/view-reports" element={<ProtectedRoute><ViewReports /></ProtectedRoute>} />

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

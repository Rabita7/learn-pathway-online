
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@school.edu',
    role: 'admin',
    avatarUrl: '/assets/avatars/admin.jpg',
  },
  {
    id: '2',
    name: 'Teacher Smith',
    email: 'teacher@school.edu',
    role: 'teacher',
    avatarUrl: '/assets/avatars/teacher.jpg',
  },
  {
    id: '3',
    name: 'Student Doe',
    email: 'student@school.edu',
    role: 'student',
    avatarUrl: '/assets/avatars/student.jpg',
  },
  {
    id: '4',
    name: 'Parent Johnson',
    email: 'parent@example.com',
    role: 'parent',
    avatarUrl: '/assets/avatars/parent.jpg',
  },
  {
    id: '5',
    name: 'Manager Wilson',
    email: 'manager@school.edu',
    role: 'manager',
    avatarUrl: '/assets/avatars/manager.jpg',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is saved in localStorage
    const storedUser = localStorage.getItem('highschool_portal_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email (in real app, would verify password too)
    const foundUser = mockUsers.find(user => user.email === email);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // Save user in state and localStorage
    setUser(foundUser);
    localStorage.setItem('highschool_portal_user', JSON.stringify(foundUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('highschool_portal_user');
  };
  
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // In a real app, this would be handled by the backend
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role,
    };
    
    // Save user in state and localStorage
    setUser(newUser);
    localStorage.setItem('highschool_portal_user', JSON.stringify(newUser));
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

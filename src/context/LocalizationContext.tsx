
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'am')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

const translations = {
  en: {
    // Common
    'welcome': 'Welcome',
    'home': 'Home',
    'about': 'About',
    'contact': 'Contact',
    'services': 'Services',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'search': 'Search',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    
    // Auth
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'email': 'Email',
    'password': 'Password',
    'confirm_password': 'Confirm Password',
    'full_name': 'Full Name',
    'your_role': 'Your Role',
    'create_account': 'Create Account',
    'forgot_password': 'Forgot your password?',
    'already_have_account': 'Already have an account?',
    'dont_have_account': "Don't have an account?",
    
    // Roles
    'student': 'Student',
    'teacher': 'Teacher',
    'parent': 'Parent',
    'admin': 'Administrator',
    'director': 'Director',
    
    // Navigation
    'students': 'Students',
    'teachers': 'Teachers',
    'parents': 'Parents',
    'classes': 'Classes',
    'grades': 'Grades',
    'attendance': 'Attendance',
    'assignments': 'Assignments',
    'announcements': 'Announcements',
    'reports': 'Reports',
    'manage_grades': 'Manage Grades',
    'my_grades': 'My Grades',
    'my_attendance': 'My Attendance',
    'class_schedule': 'Class Schedule',
    'my_profile': 'My Profile',
    'child_grades': 'Child Grades',
    'child_attendance': 'Child Attendance',
    
    // Grade Management
    'grade_management': 'Grade Management',
    'update_review_grades': 'Update and review grades for your assigned classes',
    'your_assignments': 'Your Assignments',
    'class_statistics': 'Class Statistics',
    'average': 'Average',
    'highest': 'Highest',
    'lowest': 'Lowest',
    'total_students': 'Total Students',
    'select_subject': 'Select a Subject',
    'choose_subject_to_start': 'Choose a subject from the filters above to start managing grades',
    'grades_saved_successfully': 'Grades Saved Successfully',
    'no_subject_selected': 'No Subject Selected',
    'select_subject_before_saving': 'Please select a subject before saving grades',
    
    // Hero Section
    'hero_title': 'Welcome to Bright Future School Portal',
    'hero_subtitle': 'A comprehensive platform connecting students, teachers, parents, and administrators',
    'get_started': 'Get Started',
    'learn_more': 'Learn More',
    
    // Features
    'our_features': 'Our Features',
    'comprehensive_management': 'Comprehensive Management',
    'role_based_access': 'Role-Based Access',
    'data_driven_insights': 'Data-Driven Insights',
    
    // Footer
    'all_rights_reserved': 'All rights reserved',
    'privacy_policy': 'Privacy Policy',
    'terms_of_service': 'Terms of Service',
  },
  am: {
    // Common
    'welcome': 'እንኳን ደህና መጡ',
    'home': 'ቤት',
    'about': 'ስለ እኛ',
    'contact': 'ያነጋግሩን',
    'services': 'አገልግሎቶች',
    'login': 'ግባ',
    'register': 'ተመዝገብ',
    'logout': 'ውጣ',
    'dashboard': 'ዳሽቦርድ',
    'profile': 'መገለጫ',
    'settings': 'ቅንብሮች',
    'save': 'አስቀምጥ',
    'cancel': 'ሰርዝ',
    'edit': 'አርትዕ',
    'delete': 'ሰርዝ',
    'search': 'ፈልግ',
    'loading': 'እየተጫነ...',
    'error': 'ስህተት',
    'success': 'ተሳክቷል',
    
    // Auth
    'sign_in': 'ግባ',
    'sign_up': 'ተመዝገብ',
    'email': 'ኢሜይል',
    'password': 'የይለፍ ቃል',
    'confirm_password': 'የይለፍ ቃሉን ያረጋግጡ',
    'full_name': 'ሙሉ ስም',
    'your_role': 'የእርስዎ ሚና',
    'create_account': 'መለያ ፍጠር',
    'forgot_password': 'የይለፍ ቃልዎን ረስተዋል?',
    'already_have_account': 'አስቀድመው መለያ አለዎት?',
    'dont_have_account': 'መለያ የለዎትም?',
    
    // Roles
    'student': 'ተማሪ',
    'teacher': 'መምህር',
    'parent': 'ወላጅ',
    'admin': 'አስተዳዳሪ',
    'director': 'ዳይሬክተር',
    
    // Navigation
    'students': 'ተማሪዎች',
    'teachers': 'መምህራን',
    'parents': 'ወላጆች',
    'classes': 'ክፍሎች',
    'grades': 'ውጤቶች',
    'attendance': 'ተገኝነት',
    'assignments': 'ስራዎች',
    'announcements': 'ማስታወቂያዎች',
    'reports': 'ሪፖርቶች',
    'manage_grades': 'ውጤቶችን አስተዳድር',
    'my_grades': 'የኔ ውጤቶች',
    'my_attendance': 'የኔ ተገኝነት',
    'class_schedule': 'የክፍል መርሃግብር',
    'my_profile': 'የኔ መገለጫ',
    'child_grades': 'የልጅ ውጤቶች',
    'child_attendance': 'የልጅ ተገኝነት',
    
    // Grade Management
    'grade_management': 'የውጤት አስተዳደር',
    'update_review_grades': 'ለተመደቡዎት ክፍሎች ውጤቶችን ያዘምኑ እና ይገምግሙ',
    'your_assignments': 'የእርስዎ ስራዎች',
    'class_statistics': 'የክፍል ስታትስቲክስ',
    'average': 'አማካይ',
    'highest': 'ከፍተኛ',
    'lowest': 'ዝቅተኛ',
    'total_students': 'ጠቅላላ ተማሪዎች',
    'select_subject': 'ትምህርት ይምረጡ',
    'choose_subject_to_start': 'ውጤቶችን ለማስተዳደር ከላይ ያሉትን ማጣሪያዎች ውስጥ ትምህርት ይምረጡ',
    'grades_saved_successfully': 'ውጤቶች በተሳካ ሁኔታ ተቀምጠዋል',
    'no_subject_selected': 'ምንም ትምህርት አልተመረጠም',
    'select_subject_before_saving': 'ውጤቶችን ከማስቀመጥ በፊት ትምህርት ይምረጡ',
    
    // Hero Section
    'hero_title': 'እንኳን ወደ ብራይት ፊውቸር ትምህርት ቤት ፖርታል በደህና መጡ',
    'hero_subtitle': 'ተማሪዎችን፣ መምህራንን፣ ወላጆችን እና አስተዳዳሪዎችን የሚያገናኝ ሁለንተናዊ መድረክ',
    'get_started': 'ጀምር',
    'learn_more': 'የበለጠ ለመረዳት',
    
    // Features
    'our_features': 'የእኛ ባህሪያት',
    'comprehensive_management': 'ሁለንተናዊ አስተዳደር',
    'role_based_access': 'በሚና ላይ የተመሰረተ መዳረሻ',
    'data_driven_insights': 'በመረጃ ላይ የተመሰረተ ግንዛቤ',
    
    // Footer
    'all_rights_reserved': 'ሁሉም መብቶች የተጠበቁ ናቸው',
    'privacy_policy': 'የግላዊነት ፖሊሲ',
    'terms_of_service': 'የአገልግሎት ውሎች',
  }
};

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
    'submit': 'Submit',
    'close': 'Close',
    'view': 'View',
    'add': 'Add',
    'update': 'Update',
    'remove': 'Remove',
    'manage': 'Manage',
    'create': 'Create',
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'address': 'Address',
    'date': 'Date',
    'time': 'Time',
    'status': 'Status',
    'active': 'Active',
    'inactive': 'Inactive',
    'description': 'Description',
    'title': 'Title',
    'content': 'Content',
    'message': 'Message',
    'send': 'Send',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'yes': 'Yes',
    'no': 'No',
    'confirm': 'Confirm',
    'all': 'All',
    'none': 'None',
    'select': 'Select',
    'actions': 'Actions',
    'details': 'Details',
    'overview': 'Overview',
    
    // Auth
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'password': 'Password',
    'confirm_password': 'Confirm Password',
    'full_name': 'Full Name',
    'your_role': 'Your Role',
    'create_account': 'Create Account',
    'forgot_password': 'Forgot your password?',
    'already_have_account': 'Already have an account?',
    'dont_have_account': "Don't have an account?",
    'access_denied': 'Access denied',
    'privileges_required': 'privileges required',
    
    // Roles
    'student': 'Student',
    'teacher': 'Teacher',
    'parent': 'Parent',
    'admin': 'Administrator',
    'director': 'Director',
    'manager': 'Manager',
    
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
    'staff': 'Staff',
    'schedule': 'Schedule',
    'letters': 'Letters',
    
    // Dashboard specific
    'manage_students': 'Manage Students',
    'manage_teachers': 'Manage Teachers',
    'manage_parents': 'Manage Parents',
    'manage_classes': 'Manage Classes',
    'manage_grades': 'Manage Grades',
    'manage_attendance': 'Manage Attendance',
    'manage_staff': 'Manage Staff',
    'my_grades': 'My Grades',
    'my_attendance': 'My Attendance',
    'class_schedule': 'Class Schedule',
    'my_profile': 'My Profile',
    'child_grades': 'Child Grades',
    'child_attendance': 'Child Attendance',
    'view_reports': 'View Reports',
    'post_announcement': 'Post Announcement',
    'view_students': 'View Students',
    'view_assignments': 'View Assignments',
    'post_assignment': 'Post Assignment',
    'assign_teachers': 'Assign Teachers',
    'write_letters': 'Write Letters',
    
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
    
    // Attendance
    'present': 'Present',
    'absent': 'Absent',
    'late': 'Late',
    'excused': 'Excused',
    'attendance_rate': 'Attendance Rate',
    'total_classes': 'Total Classes',
    'classes_attended': 'Classes Attended',
    'classes_missed': 'Classes Missed',
    
    // Assignment Management
    'assignment_title': 'Assignment Title',
    'due_date': 'Due Date',
    'submitted': 'Submitted',
    'not_submitted': 'Not Submitted',
    'graded': 'Graded',
    'pending': 'Pending',
    'late_submission': 'Late Submission',
    'submission_date': 'Submission Date',
    'assignment_description': 'Assignment Description',
    'upload_file': 'Upload File',
    'download': 'Download',
    
    // Staff Management
    'position': 'Position',
    'department': 'Department',
    'hire_date': 'Hire Date',
    'salary': 'Salary',
    'qualification': 'Qualification',
    'experience': 'Experience',
    'contact_info': 'Contact Information',
    
    // Statistics
    'total': 'Total',
    'this_week': 'This Week',
    'this_month': 'This Month',
    'this_year': 'This Year',
    'last_week': 'Last Week',
    'last_month': 'Last Month',
    'improvement': 'Improvement',
    'decline': 'Decline',
    'stable': 'Stable',
    
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
    
    // Contact & About
    'contact_us': 'Contact Us',
    'our_mission': 'Our Mission',
    'our_vision': 'Our Vision',
    'our_values': 'Our Values',
    'get_in_touch': 'Get in Touch',
    'send_message': 'Send Message',
    'your_message': 'Your Message',
    'subject': 'Subject',
    
    // Services
    'our_services': 'Our Services',
    'academic_management': 'Academic Management',
    'student_tracking': 'Student Tracking',
    'parent_engagement': 'Parent Engagement',
    'administrative_tools': 'Administrative Tools',
    
    // Footer
    'all_rights_reserved': 'All rights reserved',
    'privacy_policy': 'Privacy Policy',
    'terms_of_service': 'Terms of Service',
    
    // Notifications
    'no_notifications': 'No new notifications',
    'mark_as_read': 'Mark as read',
    'notification_settings': 'Notification Settings',
    
    // Error Messages
    'page_not_found': 'Page Not Found',
    'something_went_wrong': 'Something went wrong',
    'try_again': 'Try again',
    'network_error': 'Network error',
    'unauthorized_access': 'Unauthorized access',
    
    // Success Messages
    'data_saved_successfully': 'Data saved successfully',
    'account_created_successfully': 'Account created successfully',
    'password_updated_successfully': 'Password updated successfully',
    'profile_updated_successfully': 'Profile updated successfully',
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
    'submit': 'አስገባ',
    'close': 'ዝጋ',
    'view': 'ይመልከቱ',
    'add': 'ጨምር',
    'update': 'አዘምን',
    'remove': 'አስወግድ',
    'manage': 'አስተዳድር',
    'create': 'ፍጠር',
    'name': 'ስም',
    'email': 'ኢሜይል',
    'phone': 'ስልክ',
    'address': 'አድራሻ',
    'date': 'ቀን',
    'time': 'ሰዓት',
    'status': 'ሁኔታ',
    'active': 'ንቁ',
    'inactive': 'ንቁ አይደለም',
    'description': 'መግለጫ',
    'title': 'ርዕስ',
    'content': 'ይዘት',
    'message': 'መልእክት',
    'send': 'ላክ',
    'back': 'ተመለስ',
    'next': 'ቀጣይ',
    'previous': 'ቀዳሚ',
    'yes': 'አዎ',
    'no': 'አይ',
    'confirm': 'አረጋግጥ',
    'all': 'ሁሉም',
    'none': 'ምንም',
    'select': 'ምረጥ',
    'actions': 'ድርጊቶች',
    'details': 'ዝርዝሮች',
    'overview': 'አጠቃላይ እይታ',
    
    // Auth
    'sign_in': 'ግባ',
    'sign_up': 'ተመዝገብ',
    'password': 'የይለፍ ቃል',
    'confirm_password': 'የይለፍ ቃሉን ያረጋግጡ',
    'full_name': 'ሙሉ ስም',
    'your_role': 'የእርስዎ ሚና',
    'create_account': 'መለያ ፍጠር',
    'forgot_password': 'የይለፍ ቃልዎን ረስተዋል?',
    'already_have_account': 'አስቀድመው መለያ አለዎት?',
    'dont_have_account': 'መለያ የለዎትም?',
    'access_denied': 'መዳረሻ ተከልክሏል',
    'privileges_required': 'ፍቃዶች ያስፈልጋሉ',
    
    // Roles
    'student': 'ተማሪ',
    'teacher': 'መምህር',
    'parent': 'ወላጅ',
    'admin': 'አስተዳዳሪ',
    'director': 'ዳይሬክተር',
    'manager': 'ሥራ አስኪያጅ',
    
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
    'staff': 'ሰራተኞች',
    'schedule': 'መርሃግብር',
    'letters': 'ደብዳቤዎች',
    
    // Dashboard specific
    'manage_students': 'ተማሪዎችን አስተዳድር',
    'manage_teachers': 'መምህራንን አስተዳድር',
    'manage_parents': 'ወላጆችን አስተዳድር',
    'manage_classes': 'ክፍሎችን አስተዳድር',
    'manage_grades': 'ውጤቶችን አስተዳድር',
    'manage_attendance': 'ተገኝነትን አስተዳድር',
    'manage_staff': 'ሰራተኞችን አስተዳድር',
    'my_grades': 'የኔ ውጤቶች',
    'my_attendance': 'የኔ ተገኝነት',
    'class_schedule': 'የክፍል መርሃግብር',
    'my_profile': 'የኔ መገለጫ',
    'child_grades': 'የልጅ ውጤቶች',
    'child_attendance': 'የልጅ ተገኝነት',
    'view_reports': 'ሪፖርቶችን ይመልከቱ',
    'post_announcement': 'ማስታወቂያ ለጥፍ',
    'view_students': 'ተማሪዎችን ይመልከቱ',
    'view_assignments': 'ስራዎችን ይመልከቱ',
    'post_assignment': 'ስራ ስጥ',
    'assign_teachers': 'መምህራን ይመድቡ',
    'write_letters': 'ደብዳቤዎች ይጻፉ',
    
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
    
    // Attendance
    'present': 'ተገኝቷል',
    'absent': 'ለቅሷል',
    'late': 'ዘግይቷል',
    'excused': 'ፍቃድ ተሰጥቷል',
    'attendance_rate': 'የተገኝነት መጠን',
    'total_classes': 'ጠቅላላ ክፍሎች',
    'classes_attended': 'የተገኙባቸው ክፍሎች',
    'classes_missed': 'የታዩባቸው ክፍሎች',
    
    // Assignment Management
    'assignment_title': 'የስራ ርዕስ',
    'due_date': 'የማስገባት ቀን',
    'submitted': 'ቀርቧል',
    'not_submitted': 'አልቀረበም',
    'graded': 'ውጤት ተሰጥቷል',
    'pending': 'በመጠባበቅ ላይ',
    'late_submission': 'ዘግይተው ቀርቧል',
    'submission_date': 'የቀረቡበት ቀን',
    'assignment_description': 'የስራ መግለጫ',
    'upload_file': 'ፋይል ከፍቶ ላክ',
    'download': 'አውርድ',
    
    // Staff Management
    'position': 'የስራ ቦታ',
    'department': 'ክፍል',
    'hire_date': 'የተቀጠረበት ቀን',
    'salary': 'ደሞዝ',
    'qualification': 'ብቃት',
    'experience': 'ልምድ',
    'contact_info': 'የመገናኛ መረጃ',
    
    // Statistics
    'total': 'ጠቅላላ',
    'this_week': 'በዚህ ሳምንት',
    'this_month': 'በዚህ ወር',
    'this_year': 'በዚህ ዓመት',
    'last_week': 'ባለፈው ሳምንት',
    'last_month': 'ባለፈው ወር',
    'improvement': 'መሻሻል',
    'decline': 'ቅነሳ',
    'stable': 'የተረጋጋ',
    
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
    
    // Contact & About
    'contact_us': 'ያገናኙን',
    'our_mission': 'የእኛ ተልእኮ',
    'our_vision': 'የእኛ ራዕይ',
    'our_values': 'የእኛ እሴቶች',
    'get_in_touch': 'ያግኙን',
    'send_message': 'መልእክት ላክ',
    'your_message': 'የእርስዎ መልእክት',
    'subject': 'ርዕስ',
    
    // Services
    'our_services': 'የእኛ አገልግሎቶች',
    'academic_management': 'የትምህርት አስተዳደር',
    'student_tracking': 'የተማሪ ክትትል',
    'parent_engagement': 'የወላጅ ተሳትፎ',
    'administrative_tools': 'የአስተዳደር መሳሪያዎች',
    
    // Footer
    'all_rights_reserved': 'ሁሉም መብቶች የተጠበቁ ናቸው',
    'privacy_policy': 'የግላዊነት ፖሊሲ',
    'terms_of_service': 'የአገልግሎት ውሎች',
    
    // Notifications
    'no_notifications': 'አዲስ ማስታወቂያዎች የሉም',
    'mark_as_read': 'እንደተነበበ ምልክት አድርግ',
    'notification_settings': 'የማስታወቂያ ቅንብሮች',
    
    // Error Messages
    'page_not_found': 'ገጽ አልተገኘም',
    'something_went_wrong': 'የሆነ ችግር ተፈጽሟል',
    'try_again': 'እንደገና ሞክር',
    'network_error': 'የኔትዎርክ ስህተት',
    'unauthorized_access': 'ያልተፈቀደ መዳረሻ',
    
    // Success Messages
    'data_saved_successfully': 'መረጃ በተሳካ ሁኔታ ተቀምጠዋል',
    'account_created_successfully': 'መለያ በተሳካ ሁኔታ ተፈጠረ',
    'password_updated_successfully': 'የይለፍ ቃል በተሳካ ሁኔታ ተሻሽሏል',
    'profile_updated_successfully': 'መገለጫ በተሳካ ሁኔታ ተሻሽሏል',
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
    'submit': 'አስገባ',
    'close': 'ዝጋ',
    'view': 'ይመልከቱ',
    'add': 'ጨምር',
    'update': 'አዘምን',
    'remove': 'አስወግድ',
    'manage': 'አስተዳድር',
    'create': 'ፍጠር',
    'name': 'ስም',
    'email': 'ኢሜይል',
    'phone': 'ስልክ',
    'address': 'አድራሻ',
    'date': 'ቀን',
    'time': 'ሰዓት',
    'status': 'ሁኔታ',
    'active': 'ንቁ',
    'inactive': 'ንቁ አይደለም',
    'description': 'መግለጫ',
    'title': 'ርዕስ',
    'content': 'ይዘት',
    'message': 'መልእክት',
    'send': 'ላክ',
    'back': 'ተመለስ',
    'next': 'ቀጣይ',
    'previous': 'ቀዳሚ',
    'yes': 'አዎ',
    'no': 'አይ',
    'confirm': 'አረጋግጥ',
    'all': 'ሁሉም',
    'none': 'ምንም',
    'select': 'ምረጥ',
    'actions': 'ድርጊቶች',
    'details': 'ዝርዝሮች',
    'overview': 'አጠቃላይ እይታ',
    
    // Auth
    'sign_in': 'ግባ',
    'sign_up': 'ተመዝገብ',
    'password': 'የይለፍ ቃል',
    'confirm_password': 'የይለፍ ቃሉን ያረጋግጡ',
    'full_name': 'ሙሉ ስም',
    'your_role': 'የእርስዎ ሚና',
    'create_account': 'መለያ ፍጠር',
    'forgot_password': 'የይለፍ ቃልዎን ረስተዋል?',
    'already_have_account': 'አስቀድመው መለያ አለዎት?',
    'dont_have_account': 'መለያ የለዎትም?',
    'access_denied': 'መዳረሻ ተከልክሏል',
    'privileges_required': 'ፍቃዶች ያስፈልጋሉ',
    
    // Roles
    'student': 'ተማሪ',
    'teacher': 'መምህር',
    'parent': 'ወላጅ',
    'admin': 'አስተዳዳሪ',
    'director': 'ዳይሬክተር',
    'manager': 'ሥራ አስኪያጅ',
    
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
    'staff': 'ሰራተኞች',
    'schedule': 'መርሃግብር',
    'letters': 'ደብዳቤዎች',
    
    // Dashboard specific
    'manage_students': 'ተማሪዎችን አስተዳድር',
    'manage_teachers': 'መምህራንን አስተዳድር',
    'manage_parents': 'ወላጆችን አስተዳድር',
    'manage_classes': 'ክፍሎችን አስተዳድር',
    'manage_grades': 'ውጤቶችን አስተዳድር',
    'manage_attendance': 'ተገኝነትን አስተዳድር',
    'manage_staff': 'ሰራተኞችን አስተዳድር',
    'my_grades': 'የኔ ውጤቶች',
    'my_attendance': 'የኔ ተገኝነት',
    'class_schedule': 'የክፍል መርሃግብር',
    'my_profile': 'የኔ መገለጫ',
    'child_grades': 'የልጅ ውጤቶች',
    'child_attendance': 'የልጅ ተገኝነት',
    'view_reports': 'ሪፖርቶችን ይመልከቱ',
    'post_announcement': 'ማስታወቂያ ለጥፍ',
    'view_students': 'ተማሪዎችን ይመልከቱ',
    'view_assignments': 'ስራዎችን ይመልከቱ',
    'post_assignment': 'ስራ ስጥ',
    'assign_teachers': 'መምህራን ይመድቡ',
    'write_letters': 'ደብዳቤዎች ይጻፉ',
    
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
    
    // Attendance
    'present': 'ተገኝቷል',
    'absent': 'ለቅሷል',
    'late': 'ዘግይቷል',
    'excused': 'ፍቃድ ተሰጥቷል',
    'attendance_rate': 'የተገኝነት መጠን',
    'total_classes': 'ጠቅላላ ክፍሎች',
    'classes_attended': 'የተገኙባቸው ክፍሎች',
    'classes_missed': 'የታዩባቸው ክፍሎች',
    
    // Assignment Management
    'assignment_title': 'የስራ ርዕስ',
    'due_date': 'የማስገባት ቀን',
    'submitted': 'ቀርቧል',
    'not_submitted': 'አልቀረበም',
    'graded': 'ውጤት ተሰጥቷል',
    'pending': 'በመጠባበቅ ላይ',
    'late_submission': 'ዘግይተው ቀርቧል',
    'submission_date': 'የቀረቡበት ቀን',
    'assignment_description': 'የስራ መግለጫ',
    'upload_file': 'ፋይል ከፍቶ ላክ',
    'download': 'አውርድ',
    
    // Staff Management
    'position': 'የስራ ቦታ',
    'department': 'ክፍል',
    'hire_date': 'የተቀጠረበት ቀን',
    'salary': 'ደሞዝ',
    'qualification': 'ብቃት',
    'experience': 'ልምድ',
    'contact_info': 'የመገናኛ መረጃ',
    
    // Statistics
    'total': 'ጠቅላላ',
    'this_week': 'በዚህ ሳምንት',
    'this_month': 'በዚህ ወር',
    'this_year': 'በዚህ ዓመት',
    'last_week': 'ባለፈው ሳምንት',
    'last_month': 'ባለፈው ወር',
    'improvement': 'መሻሻል',
    'decline': 'ቅነሳ',
    'stable': 'የተረጋጋ',
    
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
    
    // Contact & About
    'contact_us': 'ያገናኙን',
    'our_mission': 'የእኛ ተልእኮ',
    'our_vision': 'የእኛ ራዕይ',
    'our_values': 'የእኛ እሴቶች',
    'get_in_touch': 'ያግኙን',
    'send_message': 'መልእክት ላክ',
    'your_message': 'የእርስዎ መልእክት',
    'subject': 'ርዕስ',
    
    // Services
    'our_services': 'የእኛ አገልግሎቶች',
    'academic_management': 'የትምህርት አስተዳደር',
    'student_tracking': 'የተማሪ ክትትል',
    'parent_engagement': 'የወላጅ ተሳትፎ',
    'administrative_tools': 'የአስተዳደር መሳሪያዎች',
    
    // Footer
    'all_rights_reserved': 'ሁሉም መብቶች የተጠበቁ ናቸው',
    'privacy_policy': 'የግላዊነት ፖሊሲ',
    'terms_of_service': 'የአገልግሎት ውሎች',
    
    // Notifications
    'no_notifications': 'አዲስ ማስታወቂያዎች የሉም',
    'mark_as_read': 'እንደተነበበ ምልክት አድርግ',
    'notification_settings': 'የማስታወቂያ ቅንብሮች',
    
    // Error Messages
    'page_not_found': 'ገጽ አልተገኘም',
    'something_went_wrong': 'የሆነ ችግር ተፈጽሟል',
    'try_again': 'እንደገና ሞክር',
    'network_error': 'የኔትዎርክ ስህተት',
    'unauthorized_access': 'ያልተፈቀደ መዳረሻ',
    
    // Success Messages
    'data_saved_successfully': 'መረጃ በተሳካ ሁኔታ ተቀምጠዋል',
    'account_created_successfully': 'መለያ በተሳካ ሁኔታ ተፈጠረ',
    'password_updated_successfully': 'የይለፍ ቃል በተሳካ ሁኔታ ተሻሽሏል',
    'profile_updated_successfully': 'መገለጫ በተሳካ ሁኔታ ተሻሽሏል',
  }
};

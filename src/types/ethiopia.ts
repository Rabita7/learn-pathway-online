
export type EthiopianGradeLevel = 
  | 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5' | 'Grade 6' | 'Grade 7' | 'Grade 8' // Primary
  | 'Grade 9' | 'Grade 10' // Secondary
  | 'Grade 11' | 'Grade 12'; // Preparatory

export type EthiopianEducationLevel = 'Primary' | 'Secondary' | 'Preparatory';

export type EthiopianRegion = 
  | 'Addis Ababa' 
  | 'Afar' 
  | 'Amhara' 
  | 'Benishangul-Gumuz' 
  | 'Dire Dawa' 
  | 'Gambela' 
  | 'Harari' 
  | 'Oromia' 
  | 'Sidama' 
  | 'SNNP' 
  | 'Somali' 
  | 'Tigray';

export type EthiopianZone = string; // Zones vary by region

export interface EthiopianSchoolStructure {
  region: EthiopianRegion;
  zone?: EthiopianZone;
  woreda?: string;
  schoolType: 'Primary' | 'Secondary' | 'Preparatory' | 'Primary & Secondary' | 'Complete';
}

// Ethiopian curriculum subjects by education level
export const ETHIOPIAN_SUBJECTS = {
  Primary: [
    'English',
    'Amharic',
    'Mathematics',
    'Environmental Science',
    'Arts',
    'Physical Education',
    'Civics and Ethics',
    'Mother Tongue' // Regional language
  ],
  Secondary: [
    'English',
    'Amharic',
    'Mathematics',
    'Biology',
    'Chemistry',
    'Physics',
    'Geography',
    'History',
    'Civics and Ethics',
    'Physical Education',
    'Arts',
    'Information Technology'
  ],
  Preparatory: [
    // Natural Science Stream
    'English',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Geography',
    // Social Science Stream
    'History',
    'Geography',
    'Economics',
    'Civics and Ethics',
    // Common subjects
    'Amharic',
    'Physical Education'
  ]
};

// Ethiopian grading system
export type EthiopianGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type EthiopianGradePoints = 4 | 3 | 2 | 1 | 0;

export const ETHIOPIAN_GRADING_SCALE = {
  'A': { points: 4, range: '90-100', description: 'Excellent' },
  'B': { points: 3, range: '80-89', description: 'Very Good' },
  'C': { points: 2, range: '60-79', description: 'Good' },
  'D': { points: 1, range: '50-59', description: 'Satisfactory' },
  'F': { points: 0, range: '0-49', description: 'Fail' }
};

// Academic calendar (Ethiopian academic year)
export const ETHIOPIAN_ACADEMIC_CALENDAR = {
  startMonth: 9, // September
  endMonth: 6,   // June
  terms: [
    { name: 'First Term', start: 'September', end: 'December' },
    { name: 'Second Term', start: 'January', end: 'March' },
    { name: 'Third Term', start: 'April', end: 'June' }
  ]
};

export const ETHIOPIAN_REGIONS_ZONES = {
  'Addis Ababa': ['Addis Ketema', 'Akaky Kaliti', 'Arada', 'Bole', 'Gullele', 'Kirkos', 'Kolfe Keranio', 'Lideta', 'Nifas Silk-Lafto', 'Yeka'],
  'Afar': ['Zone 1 (Awsi Rasu)', 'Zone 2 (Kilbet Rasu)', 'Zone 3 (Gabi Rasu)', 'Zone 4 (Fantena Rasu)', 'Zone 5 (Hari Rasu)'],
  'Amhara': ['North Gondar', 'South Gondar', 'North Wollo', 'South Wollo', 'North Shewa', 'East Gojjam', 'West Gojjam', 'Awi', 'Waghemra', 'Oromia Special', 'Bahir Dar Special'],
  'Benishangul-Gumuz': ['Metekel', 'Assosa', 'Kamashi'],
  'Dire Dawa': ['Dire Dawa'],
  'Gambela': ['Nuer', 'Anuak', 'Mezhenger'],
  'Harari': ['Harari'],
  'Oromia': ['Arsi', 'Bale', 'Borena', 'East Hararghe', 'East Shewa', 'East Welega', 'Guji', 'Horo Gudru Welega', 'Illubabor', 'Jimma', 'North Shewa', 'South West Shewa', 'West Arsi', 'West Hararghe', 'West Shewa', 'West Welega'],
  'Sidama': ['Sidama'],
  'SNNP': ['Bench Sheko', 'Dawro', 'Gamo', 'Gofa', 'Hadiya', 'Kembata Tembaro', 'Sidama', 'Silte', 'Wolaita'],
  'Somali': ['Afder', 'Doolo', 'Fafan', 'Jarar', 'Korahe', 'Liben', 'Nogob', 'Shabelle', 'Sitti'],
  'Tigray': ['Central', 'Eastern', 'Mekelle Special', 'North Western', 'Southern', 'South Eastern', 'Western']
};

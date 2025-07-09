
export type Language = 'en' | 'am';

export interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface LocalizationProviderProps {
  children: React.ReactNode;
}

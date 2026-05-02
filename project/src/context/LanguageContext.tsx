import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'ab';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    'nav.catalog': 'Каталог',
    'nav.profile': 'Профиль',
    'nav.assignments': 'Задания',
    'nav.dashboard': 'Панель',
    'nav.logout': 'Выход',
    'search.placeholder': 'Поиск по названию или автору...',
    'filter.subject': 'Предмет',
    'filter.grade': 'Класс',
    'filter.type': 'Тип',
    'book.pages': 'стр.',
    'book.read': 'Читать',
    'book.download': 'Скачать',
    'profile.title': 'Личный кабинет',
    'profile.progress': 'Прогресс чтения',
    'profile.score': 'Общий счет',
    'assignments.title': 'Мои задания',
    'assignments.due': 'Срок сдачи',
    'assignments.completed': 'Выполнено',
    'login.title': 'Вход в систему',
    'login.email': 'Email',
    'login.password': 'Пароль',
    'login.submit': 'Войти',
    'welcome': 'Добро пожаловать в электронную библиотеку школ Абхазии'
  },
  ab: {
    'nav.catalog': 'Акаталог',
    'nav.profile': 'Асахьа',
    'nav.assignments': 'Азадачақәа',
    'nav.dashboard': 'Апанель',
    'nav.logout': 'Ахьәыц',
    'search.placeholder': 'Ахьӡ ахьа ма ауеиԥшы азы...',
    'filter.subject': 'Апредмет',
    'filter.grade': 'Аклас',
    'filter.type': 'Атип',
    'book.pages': 'ад.',
    'book.read': 'Аԥхьары',
    'book.download': 'Ахьчары',
    'profile.title': 'Избеи кабинет',
    'profile.progress': 'Аԥхьара прогрес',
    'profile.score': 'Зегь баллқәа',
    'assignments.title': 'Сара задачақәа',
    'assignments.due': 'Азин',
    'assignments.completed': 'Ихьаны',
    'login.title': 'Системаз акхамхара',
    'login.email': 'Email',
    'login.password': 'Ажәамаҷ',
    'login.submit': 'Акхамхаҩ',
    'welcome': 'Абхазеи школақәеи электрон библиотеказ акҭахәан'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ru' || savedLang === 'ab')) {
      setLanguage(savedLang);
    }
  }, []);

  const setLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent';
  grade?: string;
  studentIds?: string[]; // for parents
}

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  grade: string;
  type: 'textbook' | 'fiction' | 'reference';
  language: 'ru' | 'ab';
  coverUrl: string;
  pdfUrl?: string;
  epubUrl?: string;
  description: string;
  pages: number;
  questions?: Question[];
}

export interface Question {
  id: string;
  bookId: string;
  chapter: string;
  question: string;
  type: 'multiple' | 'text';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

export interface Assignment {
  id: string;
  teacherId: string;
  studentIds: string[];
  bookId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: string[];
  questions?: string[];
}

export interface UserProgress {
  userId: string;
  bookId: string;
  currentPage: number;
  totalPages: number;
  completed: boolean;
  score: number;
  notes: Note[];
}

export interface Note {
  id: string;
  userId: string;
  bookId: string;
  page: number;
  content: string;
  highlight?: string;
  createdAt: string;
}
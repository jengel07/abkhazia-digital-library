import { User, Book, Assignment, Question, UserProgress, Note } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Анна Петрова',
    email: 'anna@school.ab',
    role: 'student',
    grade: '10'
  },
  {
    id: '2',
    name: 'Мария Иванова',
    email: 'maria@school.ab',
    role: 'teacher'
  },
  {
    id: '3',
    name: 'Сергей Козлов',
    email: 'sergey@parent.ab',
    role: 'parent',
    studentIds: ['1']
  }
];

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Математика 10 класс',
    author: 'А.Н. Колмогоров',
    subject: 'Математика',
    grade: '10',
    type: 'textbook',
    language: 'ru',
    coverUrl: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Учебник по алгебре и началам анализа для 10 класса',
    pages: 384
  },
  {
    id: '2',
    title: 'История Абхазии',
    author: 'В.А. Аргун',
    subject: 'История',
    grade: '9',
    type: 'textbook',
    language: 'ru',
    coverUrl: 'https://images.pexels.com/photos/4855468/pexels-photo-4855468.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'История Абхазии с древнейших времен до наших дней',
    pages: 256
  },
  {
    id: '3',
    title: 'Мастер и Маргарита',
    author: 'М.А. Булгаков',
    subject: 'Литература',
    grade: '11',
    type: 'fiction',
    language: 'ru',
    coverUrl: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Роман М.А. Булгакова для изучения в старших классах',
    pages: 448
  },
  {
    id: '4',
    title: 'Физика 11 класс',
    author: 'Г.Я. Мякишев',
    subject: 'Физика',
    grade: '11',
    type: 'textbook',
    language: 'ru',
    coverUrl: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Учебник физики для 11 класса с основами квантовой физики',
    pages: 416
  },
  {
    id: '5',
    title: 'Абхазские народные сказки',
    author: 'Народное творчество',
    subject: 'Литература',
    grade: '5',
    type: 'fiction',
    language: 'ab',
    coverUrl: 'https://images.pexels.com/photos/4855421/pexels-photo-4855421.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Сборник традиционных абхазских сказок для младших классов',
    pages: 128
  },
  {
    id: '6',
    title: 'Биология 9 класс',
    author: 'В.В. Пасечник',
    subject: 'Биология',
    grade: '9',
    type: 'textbook',
    language: 'ru',
    coverUrl: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Учебник биологии для 9 класса с основами общей биологии',
    pages: 352
  }
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    bookId: '1',
    chapter: 'Глава 1',
    question: 'Что изучает алгебра?',
    type: 'multiple',
    options: ['Числа и операции', 'Геометрические фигуры', 'Исторические события', 'Живые организмы'],
    correctAnswer: 0,
    points: 5
  },
  {
    id: '2',
    bookId: '1',
    chapter: 'Глава 1',
    question: 'Объясните понятие функции',
    type: 'text',
    points: 10
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    teacherId: '2',
    studentIds: ['1'],
    bookId: '1',
    title: 'Изучение функций',
    description: 'Прочитать главы 1-3 и ответить на вопросы',
    dueDate: '2025-02-15',
    completed: [],
    questions: ['1', '2']
  }
];

export const mockProgress: UserProgress[] = [
  {
    userId: '1',
    bookId: '1',
    currentPage: 45,
    totalPages: 384,
    completed: false,
    score: 15,
    notes: []
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    userId: '1',
    bookId: '1',
    page: 23,
    content: 'Важная формула для запоминания',
    highlight: 'Производная суммы равна сумме производных',
    createdAt: '2025-01-10T10:30:00Z'
  }
];

export const subjects = [
  'Все предметы',
  'Математика',
  'Физика',
  'Химия',
  'Биология',
  'История',
  'География',
  'Литература',
  'Русский язык',
  'Абхазский язык'
];

export const grades = [
  'Все классы',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11'
];
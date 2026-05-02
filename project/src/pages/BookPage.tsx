import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Bookmark, MessageSquare, CheckCircle2 } from 'lucide-react';
import { mockBooks, mockQuestions, mockProgress } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const BookPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userNote, setUserNote] = useState('');

  const book = mockBooks.find(b => b.id === id);
  const questions = mockQuestions.filter(q => q.bookId === id);
  const progress = mockProgress.find(p => p.bookId === id && p.userId === user?.id);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Книга не найдена</h2>
        <button
          onClick={() => navigate('/catalog')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Вернуться к каталогу
        </button>
      </div>
    );
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitAnswers = () => {
    // Here would be the logic to submit answers
    alert('Ответы отправлены! Вы получили баллы за выполнение заданий.');
  };

  const progressPercentage = progress ? Math.round((progress.currentPage / progress.totalPages) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Назад
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-1">{book.author}</p>
            <p className="text-sm text-gray-500 mb-4">{book.subject} • {book.grade} класс</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span>Страниц:</span>
                <span>{book.pages}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Язык:</span>
                <span>{book.language === 'ru' ? 'Русский' : 'Абхазский'}</span>
              </div>
              {progress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Прогресс:</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Скачать PDF
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Bookmark className="w-4 h-4 mr-2" />
                Добавить в избранное
              </button>
              {questions.length > 0 && (
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Вопросы ({questions.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          {!showQuestions ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Чтение книги</h2>
                <div className="text-sm text-gray-500">
                  Страница {currentPage} из {book.pages}
                </div>
              </div>

              {/* Simulated book content */}
              <div className="prose max-w-none mb-8">
                <h3>Глава 1. Введение</h3>
                <p className="text-gray-700 leading-relaxed">
                  Это демонстрационное содержимое книги "{book.title}". В реальном приложении здесь был бы 
                  полный текст книги с возможностью навигации по страницам, поиска по тексту и создания заметок.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {book.description} Учебный материал структурирован таким образом, чтобы обеспечить 
                  последовательное изучение предмета с возможностью самопроверки.
                </p>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                  "Образование - это самое мощное оружие, которое можно использовать, чтобы изменить мир."
                </blockquote>
              </div>

              {/* Notes section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Мои заметки</h3>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Добавьте свою заметку к этой странице..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-3 flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Сохранить заметку
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Предыдущая
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(book.pages, currentPage + 1))}
                  disabled={currentPage === book.pages}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Следующая →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Вопросы по материалу</h2>
                <p className="text-gray-600">Ответьте на вопросы, чтобы получить баллы</p>
              </div>

              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {question.chapter}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                        {question.points} баллов
                      </span>
                    </div>
                    <h3 className="font-medium mb-3">{question.question}</h3>
                    
                    {question.type === 'multiple' && question.options ? (
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="radio"
                              name={question.id}
                              value={index.toString()}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="mr-2"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Введите ваш ответ..."
                        className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}

                <button
                  onClick={handleSubmitAnswers}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Отправить ответы
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
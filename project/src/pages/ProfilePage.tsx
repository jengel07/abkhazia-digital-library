import React from 'react';
import { BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockProgress, mockBooks, mockNotes } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const userProgress = mockProgress.filter(p => p.userId === user.id);
  const userNotes = mockNotes.filter(n => n.userId === user.id);
  const totalScore = userProgress.reduce((sum, p) => sum + p.score, 0);
  
  const readingStats = [
    { label: 'Прочитано книг', value: userProgress.filter(p => p.completed).length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Общий счет', value: totalScore, icon: Award, color: 'text-yellow-600' },
    { label: 'Активных заданий', value: userProgress.filter(p => !p.completed).length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Заметок создано', value: userNotes.length, icon: Calendar, color: 'text-purple-600' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('profile.title')}</h1>
        <p className="text-gray-600">Добро пожаловать, {user.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {readingStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reading Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">{t('profile.progress')}</h2>
          
          {userProgress.length > 0 ? (
            <div className="space-y-4">
              {userProgress.map((progress) => {
                const book = mockBooks.find(b => b.id === progress.bookId);
                if (!book) return null;
                
                const progressPercentage = Math.round((progress.currentPage / progress.totalPages) * 100);
                
                return (
                  <div key={progress.bookId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Страница {progress.currentPage} из {progress.totalPages}</span>
                            <span>{progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                        {progress.score > 0 && (
                          <div className="mt-2 flex items-center text-sm text-yellow-600">
                            <Award className="w-4 h-4 mr-1" />
                            {progress.score} баллов
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Вы еще не начали читать ни одну книгу</p>
            </div>
          )}
        </div>

        {/* Recent Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Мои заметки</h2>
          
          {userNotes.length > 0 ? (
            <div className="space-y-4">
              {userNotes.slice(0, 5).map((note) => {
                const book = mockBooks.find(b => b.id === note.bookId);
                if (!book) return null;
                
                return (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{book.title}</h3>
                      <span className="text-xs text-gray-500">стр. {note.page}</span>
                    </div>
                    {note.highlight && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-300 p-2 mb-2">
                        <p className="text-sm text-gray-700 italic">"{note.highlight}"</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(note.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">У вас пока нет заметок</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
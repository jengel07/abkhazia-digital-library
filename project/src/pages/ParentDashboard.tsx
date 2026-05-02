import React from 'react';
import { User, BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, mockProgress, mockBooks, mockAssignments } from '../data/mockData';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'parent' || !user.studentIds) return null;

  const children = mockUsers.filter(u => user.studentIds!.includes(u.id));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Родительская панель</h1>
        <p className="text-gray-600">Отслеживание прогресса ваших детей в обучении</p>
      </div>

      <div className="space-y-8">
        {children.map((child) => {
          const childProgress = mockProgress.filter(p => p.userId === child.id);
          const childAssignments = mockAssignments.filter(a => 
            a.studentIds.includes(child.id)
          );
          const completedAssignments = childAssignments.filter(a => 
            a.completed.includes(child.id)
          );
          const totalScore = childProgress.reduce((sum, p) => sum + p.score, 0);
          
          const stats = [
            { label: 'Прочитано книг', value: childProgress.filter(p => p.completed).length, icon: BookOpen, color: 'text-blue-600' },
            { label: 'Общий счет', value: totalScore, icon: Award, color: 'text-yellow-600' },
            { label: 'Выполнено заданий', value: completedAssignments.length, icon: TrendingUp, color: 'text-green-600' },
            { label: 'Всего заданий', value: childAssignments.length, icon: Calendar, color: 'text-purple-600' }
          ];

          return (
            <div key={child.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{child.name}</h2>
                  <p className="text-gray-600">{child.grade} класс</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reading Progress */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Текущее чтение</h3>
                  {childProgress.length > 0 ? (
                    <div className="space-y-3">
                      {childProgress.slice(0, 3).map((progress) => {
                        const book = mockBooks.find(b => b.id === progress.bookId);
                        if (!book) return null;
                        
                        const progressPercentage = Math.round((progress.currentPage / progress.totalPages) * 100);
                        
                        return (
                          <div key={progress.bookId} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-8 h-10 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm truncate">{book.title}</h4>
                                <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                                  <span>{progress.currentPage}/{progress.totalPages} стр.</span>
                                  <span>{progressPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Пока не начал читать книги</p>
                  )}
                </div>

                {/* Recent Assignments */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Задания</h3>
                  {childAssignments.length > 0 ? (
                    <div className="space-y-3">
                      {childAssignments.slice(0, 3).map((assignment) => {
                        const book = mockBooks.find(b => b.id === assignment.bookId);
                        const teacher = mockUsers.find(u => u.id === assignment.teacherId);
                        const isCompleted = assignment.completed.includes(child.id);
                        
                        if (!book || !teacher) return null;
                        
                        return (
                          <div key={assignment.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-gray-900 text-sm truncate">{assignment.title}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {isCompleted ? 'Выполнено' : 'В работе'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">{book.title}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Учитель: {teacher.name} • Срок: {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Нет заданий</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParentDashboard;
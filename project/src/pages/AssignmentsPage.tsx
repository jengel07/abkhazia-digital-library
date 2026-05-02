import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, BookOpen, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockAssignments, mockBooks, mockUsers } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  if (!user) return null;

  const userAssignments = mockAssignments.filter(assignment => 
    assignment.studentIds.includes(user.id)
  );

  const filteredAssignments = userAssignments.filter(assignment => {
    if (filter === 'completed') return assignment.completed.includes(user.id);
    if (filter === 'pending') return !assignment.completed.includes(user.id);
    return true;
  });

  const getStatusColor = (assignment: any) => {
    if (assignment.completed.includes(user.id)) return 'text-green-600 bg-green-100';
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    if (dueDate < now) return 'text-red-600 bg-red-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getStatusText = (assignment: any) => {
    if (assignment.completed.includes(user.id)) return 'Выполнено';
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    if (dueDate < now) return 'Просрочено';
    return 'В процессе';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('assignments.title')}</h1>
        <p className="text-gray-600">Отслеживайте выполнение заданий от учителей</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Все ({userAssignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'pending' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            В работе ({userAssignments.filter(a => !a.completed.includes(user.id)).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'completed' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Выполненные ({userAssignments.filter(a => a.completed.includes(user.id)).length})
          </button>
        </div>
      </div>

      {filteredAssignments.length > 0 ? (
        <div className="space-y-6">
          {filteredAssignments.map((assignment) => {
            const book = mockBooks.find(b => b.id === assignment.bookId);
            const teacher = mockUsers.find(u => u.id === assignment.teacherId);
            const isCompleted = assignment.completed.includes(user.id);
            const dueDate = new Date(assignment.dueDate);
            
            if (!book || !teacher) return null;

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{assignment.title}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment)}`}>
                        {getStatusText(assignment)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{assignment.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {teacher.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Срок: {dueDate.toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                  )}
                </div>

                {/* Book Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm text-gray-500">{book.subject} • {book.grade} класс</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/book/${book.id}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isCompleted ? 'Просмотреть книгу' : 'Начать чтение'}
                  </Link>
                  
                  {!isCompleted && (
                    <button
                      onClick={() => {
                        // Here would be logic to mark as completed
                        alert('Задание отмечено как выполненное!');
                      }}
                      className="flex-1 sm:flex-none bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Отметить выполненным
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === 'completed' ? 'Нет выполненных заданий' : 
             filter === 'pending' ? 'Нет заданий в работе' : 
             'Нет заданий'}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' ? 'Учителя пока не назначили вам заданий' : 
             filter === 'pending' ? 'Все текущие задания выполнены!' : 
             'Начните выполнять задания, чтобы они появились здесь'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
import React, { useState } from 'react';
import { Users, BookOpen, Plus, Calendar, BarChart3, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockAssignments, mockBooks, mockUsers, mockProgress } from '../data/mockData';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    bookId: '',
    dueDate: '',
    studentIds: [] as string[]
  });

  if (!user || user.role !== 'teacher') return null;

  const teacherAssignments = mockAssignments.filter(a => a.teacherId === user.id);
  const students = mockUsers.filter(u => u.role === 'student');
  
  const stats = [
    { label: 'Активных заданий', value: teacherAssignments.length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Учеников', value: students.length, icon: Users, color: 'text-green-600' },
    { label: 'Выполненных заданий', value: teacherAssignments.reduce((sum, a) => sum + a.completed.length, 0), icon: CheckCircle2, color: 'text-purple-600' },
    { label: 'Средний прогресс', value: '78%', icon: BarChart3, color: 'text-yellow-600' }
  ];

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to create assignment
    alert('Задание создано успешно!');
    setShowCreateAssignment(false);
    setNewAssignment({ title: '', description: '', bookId: '', dueDate: '', studentIds: [] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель учителя</h1>
            <p className="text-gray-600">Управление заданиями и отслеживание прогресса учеников</p>
          </div>
          <button
            onClick={() => setShowCreateAssignment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Создать задание
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
        {/* Assignments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Мои задания</h2>
          
          {teacherAssignments.length > 0 ? (
            <div className="space-y-4">
              {teacherAssignments.map((assignment) => {
                const book = mockBooks.find(b => b.id === assignment.bookId);
                const completedCount = assignment.completed.length;
                const totalStudents = assignment.studentIds.length;
                
                if (!book) return null;
                
                return (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {completedCount}/{totalStudents} выполнено
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{book.title}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Срок: {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(completedCount / totalStudents) * 100}%` }}
                          />
                        </div>
                        <span>{Math.round((completedCount / totalStudents) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Вы еще не создали ни одного задания</p>
            </div>
          )}
        </div>

        {/* Student Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Прогресс учеников</h2>
          
          <div className="space-y-4">
            {students.slice(0, 6).map((student) => {
              const studentProgress = mockProgress.filter(p => p.userId === student.id);
              const totalScore = studentProgress.reduce((sum, p) => sum + p.score, 0);
              const completedBooks = studentProgress.filter(p => p.completed).length;
              
              return (
                <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.grade} класс</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">{completedBooks} книг</span>
                      <span className="text-yellow-600 font-medium">{totalScore} баллов</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Создать новое задание</h2>
            
            <form onSubmit={handleCreateAssignment}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название задания
                  </label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                  </label>
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Книга
                  </label>
                  <select
                    value={newAssignment.bookId}
                    onChange={(e) => setNewAssignment({...newAssignment, bookId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Выберите книгу</option>
                    {mockBooks.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} ({book.grade} класс)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Срок выполнения
                  </label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateAssignment(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
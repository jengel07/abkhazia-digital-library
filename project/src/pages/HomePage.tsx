import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockBooks } from '../data/mockData';
import BookCard from '../components/Common/BookCard';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const featuredBooks = mockBooks.slice(0, 4);

  const stats = [
    { icon: BookOpen, label: 'Книг в библиотеке', value: '1,200+', color: 'text-blue-600' },
    { icon: Users, label: 'Активных пользователей', value: '850+', color: 'text-green-600' },
    { icon: Award, label: 'Заданий выполнено', value: '2,400+', color: 'text-yellow-600' },
    { icon: Globe, label: 'Языков поддержки', value: '2', color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Современная платформа для доступа к учебным материалам с поддержкой двух языков и интерактивными возможностями
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalog"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Перейти к каталогу
              </Link>
              {user && (
                <Link
                  to="/profile"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                >
                  Мой профиль
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Рекомендуемые книги</h2>
            <p className="text-gray-600 text-lg">Популярные учебные материалы для разных классов</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/catalog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Посмотреть все книги
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Возможности платформы</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Обширная библиотека</h3>
              <p className="text-gray-600">Учебники, художественная литература и справочные материалы для всех классов</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Для всех ролей</h3>
              <p className="text-gray-600">Отдельные интерфейсы для учеников, учителей и родителей</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Многоязычность</h3>
              <p className="text-gray-600">Поддержка русского и абхазского языков в интерфейсе</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
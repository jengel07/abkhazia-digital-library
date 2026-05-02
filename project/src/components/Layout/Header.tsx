import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, Globe, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'ab' : 'ru');
  };

  if (!user) return null;

  const getDashboardPath = () => {
    switch (user.role) {
      case 'teacher':
        return '/teacher-dashboard';
      case 'parent':
        return '/parent-dashboard';
      default:
        return '/profile';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Библиотека Абхазии
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/catalog" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {t('nav.catalog')}
            </Link>
            <Link 
              to={getDashboardPath()} 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {user.role === 'teacher' ? t('nav.dashboard') : user.role === 'parent' ? t('nav.dashboard') : t('nav.profile')}
            </Link>
            {user.role === 'student' && (
              <Link 
                to="/assignments" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {t('nav.assignments')}
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              title={`Switch to ${language === 'ru' ? 'Абхазский' : 'Русский'}`}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors hidden md:block"
                title={t('nav.logout')}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link 
              to="/catalog" 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.catalog')}
            </Link>
            <Link 
              to={getDashboardPath()} 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {user.role === 'teacher' ? t('nav.dashboard') : user.role === 'parent' ? t('nav.dashboard') : t('nav.profile')}
            </Link>
            {user.role === 'student' && (
              <Link 
                to="/assignments" 
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.assignments')}
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
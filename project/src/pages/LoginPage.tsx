import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { mockUsers } from '../data/mockData';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const { login, switchUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      alert('Неверный email или пароль');
    }
  };

  const handleDemoLogin = (userId: string) => {
    switchUser(userId);
    navigate('/');
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Ученик';
      case 'teacher': return 'Учитель';
      case 'parent': return 'Родитель';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Библиотека Абхазии</h1>
          <p className="text-blue-100">Электронная библиотека для школ</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">{t('login.title')}</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="example@school.ab"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('login.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {t('login.submit')}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="w-full flex items-center justify-between text-white hover:text-blue-100 transition-colors"
          >
            <span className="font-medium">Демо-аккаунты для тестирования</span>
            <ChevronDown className={`w-5 h-5 transform transition-transform ${showDemo ? 'rotate-180' : ''}`} />
          </button>
          
          {showDemo && (
            <div className="mt-4 space-y-2">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleDemoLogin(user.id)}
                  className="w-full text-left p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm opacity-75">{getRoleLabel(user.role)}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <p className="text-center text-blue-100 text-sm mt-6">
          Используйте любой из демо-аккаунтов для тестирования функционала
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
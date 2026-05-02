import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import BookPage from './pages/BookPage';
import ProfilePage from './pages/ProfilePage';
import AssignmentsPage from './pages/AssignmentsPage';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import LoginPage from './pages/LoginPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="book/:id" element={<BookPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="parent-dashboard" element={<ParentDashboard />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
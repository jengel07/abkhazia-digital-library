import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Download, Eye } from 'lucide-react';
import { Book as BookType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BookCardProps {
  book: BookType;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { t } = useLanguage();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'textbook':
        return 'bg-blue-100 text-blue-800';
      case 'fiction':
        return 'bg-green-100 text-green-800';
      case 'reference':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'textbook':
        return 'Учебник';
      case 'fiction':
        return 'Художественная';
      case 'reference':
        return 'Справочник';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 group">
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(book.type)}`}>
            {getTypeLabel(book.type)}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {book.grade} класс
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-1">{book.author}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{book.subject}</span>
            <span>{book.pages} {t('book.pages')}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {book.description}
        </p>
        
        <div className="flex gap-2">
          <Link
            to={`/book/${book.id}`}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t('book.read')}
          </Link>
          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
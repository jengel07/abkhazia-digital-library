import React, { useState, useMemo } from 'react';
import { mockBooks } from '../data/mockData';
import BookCard from '../components/Common/BookCard';
import SearchFilter from '../components/Common/SearchFilter';

const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Все предметы');
  const [selectedGrade, setSelectedGrade] = useState('Все классы');
  const [selectedType, setSelectedType] = useState('');

  const filteredBooks = useMemo(() => {
    return mockBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'Все предметы' || book.subject === selectedSubject;
      const matchesGrade = selectedGrade === 'Все классы' || book.grade === selectedGrade;
      const matchesType = !selectedType || book.type === selectedType;

      return matchesSearch && matchesSubject && matchesGrade && matchesType;
    });
  }, [searchTerm, selectedSubject, selectedGrade, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог книг</h1>
        <p className="text-gray-600">Найдите нужные учебные материалы</p>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Найдено книг: <span className="font-semibold">{filteredBooks.length}</span>
        </p>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Книги не найдены</h3>
          <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSubject('Все предметы');
              setSelectedGrade('Все классы');
              setSelectedType('');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
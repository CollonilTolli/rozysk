'use client';

import React, { useState, useMemo } from 'react';
import { wantedPersons, WantedPerson } from '@/lib/wanted-persons';
import WantedPersonModal from './WantedPersonModal';
import Image from "next/image";

interface WantedPersonsGalleryProps {
  isAccessibilityMode?: boolean;
}

const WantedPersonsGallery: React.FC<WantedPersonsGalleryProps> = ({ isAccessibilityMode = false }) => {
  const [selectedPerson, setSelectedPerson] = useState<WantedPerson | null>(null);
  const [visibleRows, setVisibleRows] = useState(2); // Начинаем с 2 рядов

  // Вычисляем количество элементов для отображения 2 рядов на разных устройствах
  const getItemsPerRow = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 2; // sm: 2 элемента в ряду
      if (width < 768) return 3; // md: 3 элемента в ряду  
      if (width < 1024) return 4; // lg: 4 элемента в ряду
      return 6; // xl: 6 элементов в ряду
    }
    return 6; // По умолчанию для SSR
  };

  const itemsToShow = useMemo(() => {
    const itemsPerRow = getItemsPerRow();
    const totalItemsToShow = itemsPerRow * visibleRows;
    return wantedPersons.slice(0, totalItemsToShow);
  }, [visibleRows]);

  const handlePersonClick = (person: WantedPerson) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  const handleShowMore = () => {
    setVisibleRows(prev => prev + 2); // Добавляем по 2 ряда
  };

  // Проверяем, есть ли ещё элементы для показа
  const hasMoreItems = useMemo(() => {
    const itemsPerRow = getItemsPerRow();
    const totalItemsToShow = itemsPerRow * visibleRows;
    return totalItemsToShow < wantedPersons.length;
  }, [visibleRows]);

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6">
      <h2 className={`text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
        Розыск лиц
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
        {itemsToShow.map((person) => (
          <div
            key={person.id}
            className={`${isAccessibilityMode ? 'bg-black border-white' : 'bg-white border-gray-300'} border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => handlePersonClick(person)}
          >
            <div className={`aspect-[3/4] relative ${isAccessibilityMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {person.photo ? (
                <Image 
                  width={170}
                  height={225}
                  src={person.photo}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUI5QjlCIi8+CjxwYXRoIGQ9Ik00NSAxNDBDNDUgMTIwIDU3IDEwNSA3NSAxMDVDOTMgMTA1IDEwNSAxMjAgMTA1IDE0MFYyMDBINDVWMTQwWiIgZmlsbD0iIzlCOUI5QiIvPgo8L3N2Zz4K';
                  }}
                />
              ) : (
                <Image fill
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUI5QjlCIi8+CjxwYXRoIGQ9Ik00NSAxNDBDNDUgMTIwIDU3IDEwNSA3NSAxMDVDOTMgMTA1IDEwNSAxMjAgMTA1IDE0MFYyMDBINDVWMTQwWiIgZmlsbD0iIzlCOUI5QiIvPgo8L3N2Zz4K"
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-1 sm:p-2">
              <h3 className={`text-xs font-semibold text-center leading-tight ${isAccessibilityMode ? 'text-white' : 'text-gray-900'}`}>
                {person.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка "Показать ещё" */}
      {hasMoreItems && (
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={handleShowMore}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
              isAccessibilityMode 
                ? 'bg-white text-black hover:bg-gray-200 border border-white' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            Показать ещё ({wantedPersons.length - itemsToShow.length})
          </button>
        </div>
      )}

      {selectedPerson && (
        <WantedPersonModal
          person={selectedPerson}
          onClose={handleCloseModal}
          isAccessibilityMode={isAccessibilityMode}
        />
      )}
    </div>
  );
};

export default WantedPersonsGallery;
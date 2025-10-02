'use client';

import React, { useState } from 'react';
import { wantedPersons, WantedPerson } from '@/lib/wanted-persons';
import WantedPersonModal from './WantedPersonModal';
import Image from "next/image";

interface WantedPersonsGalleryProps {
  isAccessibilityMode?: boolean;
}

const WantedPersonsGallery: React.FC<WantedPersonsGalleryProps> = ({ isAccessibilityMode = false }) => {
  const [selectedPerson, setSelectedPerson] = useState<WantedPerson | null>(null);

  const handlePersonClick = (person: WantedPerson) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className={`text-2xl font-bold text-center mb-6 ${isAccessibilityMode ? 'text-white' : 'text-gray-800'}`}>
        Розыск лиц
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {wantedPersons.map((person) => (
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
            <div className="p-2">
              <h3 className={`text-xs font-semibold text-center leading-tight ${isAccessibilityMode ? 'text-white' : 'text-gray-900'}`}>
                {person.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

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
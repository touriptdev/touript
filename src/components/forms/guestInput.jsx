import React, { useState, useRef, useEffect } from 'react';
import { Users, Minus, Plus, ChevronDown } from 'lucide-react';

export default function CounterInput () {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateGuestCount = (type, operation) => {
    setGuests(prev => {
      const newCount = { ...prev };
      
      if (operation === 'increment') {
        newCount[type] = prev[type] + 1;
      } else if (operation === 'decrement') {
        newCount[type] = Math.max(0, prev[type] - 1);
        
        // Ensure at least 1 adult remains
        if (type === 'adults' && newCount[type] === 0) {
          newCount[type] = 1;
        }
      }
      
      return newCount;
    });
  };

  const getTotalGuests = () => {
    return guests.adults + guests.children + guests.infants;
  };

  const getGuestSummary = () => {
    const parts = [];
    
    if (guests.adults > 0) {
      parts.push(`${guests.adults} adult${guests.adults !== 1 ? 's' : ''}`);
    }
    
    if (guests.children > 0) {
      parts.push(`${guests.children} child${guests.children !== 1 ? 'ren' : ''}`);
    }
    
    if (guests.infants > 0) {
      parts.push(`${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`);
    }
    
    return parts.join(', ');
  };

  const guestTypes = [
    {
      key: 'adults',
      label: 'Adults',
      description: 'Ages 13 or above',
      min: 1,
      max: 10
    },
    {
      key: 'children',
      label: 'Children',
      description: 'Ages 2-12',
      min: 0,
      max: 8
    },
    {
      key: 'infants',
      label: 'Infants',
      description: 'Under 2 years',
      min: 0,
      max: 4
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Guests
      </label>
      
      <div className="relative" ref={dropdownRef}>
        {/* Main input display */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full bg-white border rounded-lg px-3 py-3 pr-10 text-left cursor-pointer transition-colors ${
            isOpen ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {getTotalGuests()} guest{getTotalGuests() !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-gray-500">
                {getGuestSummary()}
              </div>
            </div>
          </div>
          
          {/* Dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Dropdown panel */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 py-2">
            {guestTypes.map((guestType, index) => (
              <div key={guestType.key} className={`px-4 py-3 ${index !== guestTypes.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {guestType.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {guestType.description}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Decrement button */}
                    <button
                      onClick={() => updateGuestCount(guestType.key, 'decrement')}
                      disabled={guests[guestType.key] <= guestType.min}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        guests[guestType.key] <= guestType.min
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    
                    {/* Count display */}
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {guests[guestType.key]}
                    </span>
                    
                    {/* Increment button */}
                    <button
                      onClick={() => updateGuestCount(guestType.key, 'increment')}
                      disabled={guests[guestType.key] >= guestType.max}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        guests[guestType.key] >= guestType.max
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                          : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Apply button */}
            <div className="px-4 pt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Guest details summary */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Guest Details:</h4>
        <div className="space-y-2">
          {guestTypes.map((guestType) => (
            <div key={guestType.key} className="flex justify-between items-center text-sm">
              <div>
                <span className="font-medium text-gray-900">{guestType.label}</span>
                <span className="text-gray-500 ml-1">({guestType.description})</span>
              </div>
              <span className={`font-medium ${guests[guestType.key] > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                {guests[guestType.key]}
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-900">Total Guests</span>
              <span className="text-blue-600">{getTotalGuests()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-3 text-xs text-gray-500">
        <p>• At least 1 adult is required</p>
        <p>• Maximum 10 adults, 8 children, and 4 infants allowed</p>
        <p>• Infants typically don't require a separate seat</p>
      </div>
    </div>
  );
};

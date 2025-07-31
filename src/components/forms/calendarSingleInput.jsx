import React, { useState, useRef, useEffect } from 'react';

import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, Calendar03Icon, CancelCircleIcon, CircleArrowRight01Icon, CircleArrowLeft01Icon } from '@hugeicons/core-free-icons';

export default function CalendarSingleInput  () {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysCount; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date, format = 'long') => {
    if (!date) return '';
    
    if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isToday = (date) => {
    return isSameDay(date, today);
  };

  const minDate = new Date(2010, 0, 1); // January 1, 2010

  const handleDateClick = (date) => {
    if (!date || date < minDate) return;
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(today);
    setIsOpen(false);
  };

  const getDayClassName = (date) => {
    if (!date) return '';
    
    const baseClass = 'w-10 h-10 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors relative';
    
    if (isSameDay(date, selectedDate)) {
      return `${baseClass} bg-blue-600 text-white font-semibold`;
    }
    
    if (isToday(date)) {
      return `${baseClass} bg-blue-100 text-blue-800 font-medium hover:bg-blue-200`;
    }
    
    if (date < minDate) {
      return `${baseClass} text-gray-300 cursor-not-allowed`;
    }
    
    return `${baseClass} hover:bg-gray-100 text-gray-900`;
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Date
      </label>
      
      <div className="relative" ref={calendarRef}>
        {/* Date input */}
        <div
          onClick={handleInputClick}
          className={`relative w-full bg-white border rounded-lg px-3 py-3 pr-10 text-left cursor-pointer transition-colors ${
            isOpen ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center">
            <HugeiconsIcon icon={Calendar03Icon} className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className={`text-sm ${selectedDate ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {selectedDate ? formatDate(selectedDate, 'short') : 'Choose a date'}
              </div>
              {selectedDate && (
                <div className="text-xs text-gray-500 mt-0.5">
                  {formatDate(selectedDate, 'long')}
                </div>
              )}
            </div>
          </div>
          
          {/* Clear button */}
          {selectedDate && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-700 text-gray-400"
            >
              <HugeiconsIcon icon={CancelCircleIcon} className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Calendar dropdown */}
        {isOpen && (
          <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 p-4 w-80">
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HugeiconsIcon icon={CircleArrowLeft01Icon} className="h-5 w-5 text-gray-600" />
              </button>
              
              <h3 className="text-lg font-semibold text-gray-900">{monthYear}</h3>
              
              <button
                onClick={() => navigateMonth(1)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HugeiconsIcon icon={CircleArrowRight01Icon} className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Today button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={goToToday}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Today
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <div key={index} className="relative">
                  {date && (
                    <button
                      onClick={() => handleDateClick(date)}
                      disabled={date < minDate}
                      className={getDayClassName(date)}
                    >
                      {date.getDate()}
                      {isToday(date) && !isSameDay(date, selectedDate) && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Footer with legend */}
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded mr-1"></div>
                Selected
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 rounded mr-1"></div>
                Today
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded mr-1"></div>
                Before 2010
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Selected Date:</h4>
          <p className="text-lg font-semibold text-gray-900">{formatDate(selectedDate, 'long')}</p>
          <p className="text-sm text-gray-500 mt-1">
            {selectedDate < today ? 
             `${Math.ceil((today - selectedDate) / (1000 * 60 * 60 * 24))} days ago` : 
             isToday(selectedDate) ? 'Today' : 
             `${Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24))} days from now`}
          </p>
        </div>
      )}

      {/* Quick date options */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Select:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedDate(today);
              setIsOpen(false);
            }}
            className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => {
              const yesterday = new Date(today);
              yesterday.setDate(today.getDate() - 1);
              setSelectedDate(yesterday);
              setIsOpen(false);
            }}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Yesterday
          </button>
          <button
            onClick={() => {
              const lastWeek = new Date(today);
              lastWeek.setDate(today.getDate() - 7);
              setSelectedDate(lastWeek);
              setIsOpen(false);
            }}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Last Week
          </button>
          <button
            onClick={() => {
              const lastMonth = new Date(today);
              lastMonth.setMonth(today.getMonth() - 1);
              setSelectedDate(lastMonth);
              setIsOpen(false);
            }}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Last Month
          </button>
        </div>
      </div>
    </div>
  );
};


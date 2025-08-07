import React, { useState, useRef, useEffect } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  CancelCircleIcon,
  CircleArrowRight01Icon,
  CircleArrowLeft01Icon,
} from "@hugeicons/core-free-icons";

export default function CalendarSingleInput({
  label = "Select Date",
  value,
  onChange,
  placeholder,
  quickDate = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (value) {
      setInputValue(formatDate(value, "short"));
      setCurrentMonth(value);
    } else {
      setInputValue("");
    }
  }, [value]);

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const formatDate = (date, format = "long") => {
    if (!date) return "";

    if (format === "long") {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
    // setSelectedDate(date);
    if (onChange) onChange(date);
    setIsOpen(false);
  };

  // Clear the month Selections
  const handleClear = (e) => {
    e.stopPropagation();
    // setSelectedDate(null);
    if (onChange) onChange(null);
  };

  // When arrow button is pressed for changing the months
  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Style for Calendar Dates
  const getDayClassName = (date) => {
    if (!date) return "";

    const baseClass =
      "w-11 h-11 flex items-center justify-center text-sm sm:text-base cursor-pointer rounded-lg transition-colors relative";

    // if (isSameDay(date, selectedDate)) {
    if (isSameDay(date, value)) {
      return `${baseClass} bg-emerald-500 text-white font-semibold`;
    }

    if (isToday(date)) {
      return `${baseClass} bg-gray-50 text-gray-900 font-medium hover:bg-gray-100`;
    }

    if (date < minDate) {
      return `${baseClass} text-gray-200 cursor-not-allowed`;
    }

    return `${baseClass} hover:bg-gray-100 text-gray-900`;
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // useEffect(() => {
  //   if (selectedDate) {
  //     setInputValue(formatDate(selectedDate, "short"));
  //   } else {
  //     setInputValue("");
  //   }
  // }, [selectedDate]);

  return (
    <div className="w-full">
      <label className="sr-only">{label}</label>

      <div className="relative" ref={calendarRef}>
        {/* <div className="relative w-full" ref={calendarRef}> */}
        <div className="relative w-full">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-900">
            <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={2} />
          </div>

          <input
            id={label}
            name={label}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              const parsed = new Date(inputValue);
              if (!isNaN(parsed) && parsed >= minDate) {
                if (onChange) onChange(parsed);
                setCurrentMonth(parsed);
              } else {
                setInputValue(value ? formatDate(value, "short") : "");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const parsed = new Date(inputValue);
                if (!isNaN(parsed) && parsed >= minDate) {
                  // setSelectedDate(parsed);
                  if (onChange) onChange(parsed);
                  setCurrentMonth(parsed);
                  setIsOpen(false);
                }
              }
            }}
            className="h-14 w-full rounded-lg border border-gray-200 px-14 transition-all delay-100 duration-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
          {/* {selectedDate && ( */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-900"
            >
              <HugeiconsIcon
                icon={CancelCircleIcon}
                size={24}
                strokeWidth={2}
              />
            </button>
          )}
          {/* </div> */}
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-lg sm:px-8 sm:py-8">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors delay-150 duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <HugeiconsIcon
                  icon={CircleArrowLeft01Icon}
                  size={24}
                  strokeWidth={2}
                />
              </button>

              <h3 className="text-base font-semibold text-gray-900">
                {monthYear}
              </h3>

              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors delay-150 duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <HugeiconsIcon
                  icon={CircleArrowRight01Icon}
                  size={24}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Today button */}
            {(currentMonth.getMonth() !== today.getMonth() ||
              currentMonth.getFullYear() !== today.getFullYear()) && (
              <div className="mb-2 flex justify-center">
                <button
                  type="button"
                  onClick={goToToday}
                  className="cursor-pointer text-sm font-medium text-gray-400 transition-colors delay-150 duration-300 hover:text-gray-900"
                >
                  Go to Today
                </button>
              </div>
            )}

            {/* Calendar grid */}
            <div className="sm:px-11">
              <div className="mb-2 grid grid-cols-7 gap-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="flex h-11 items-center justify-center text-xs font-medium text-gray-400 sm:text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => (
                  <div
                    key={index}
                    className="relative flex h-11 items-center justify-center font-medium"
                  >
                    {date && (
                      <button
                        type="button"
                        onClick={() => handleDateClick(date)}
                        disabled={date < minDate}
                        className={getDayClassName(date)}
                      >
                        {date.getDate()}
                        {/* {isToday(date) && !isSameDay(date, selectedDate) && ( */}
                        {isToday(date) && !isSameDay(date, value) && (
                          <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-emerald-500"></div>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick date options */}
      {quickDate && (
        <div className="mt-2">
          <div className="flex h-14 items-center gap-4 overflow-x-auto px-4 py-1">
            {["Today", "Yesterday", "Last Week", "Last Month"].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  let date = new Date(today);
                  if (label === "Yesterday") date.setDate(today.getDate() - 1);
                  if (label === "Last Week") date.setDate(today.getDate() - 7);
                  if (label === "Last Month")
                    date.setMonth(today.getMonth() - 1);
                  // setSelectedDate(date);
                  if (onChange) onChange(date);
                  setIsOpen(false);
                }}
                className="h-11 w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-900 transition-all transition-colors delay-150 duration-300 hover:bg-white hover:ring-2 hover:ring-gray-900"
              >
                <span className="whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

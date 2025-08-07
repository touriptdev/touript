import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CircleArrowRight01Icon,
  CircleArrowLeft01Icon,
} from "@hugeicons/core-free-icons";

export default function CalendarRangeInput({
  label = "SelectDates",
  // name = "dateRange",
  value = { departureDate: null, returnDate: null },
  onChange,
  // placeholder = "Select dates",
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingType, setSelectingType] = useState("departure");
  const [hoveredDate, setHoveredDate] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isBackDisabled =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const isDateInRange = (date) => {
    const { departureDate, returnDate } = value;
    if (!departureDate || !returnDate || !date) return false;
    return date >= departureDate && date <= returnDate;
  };

  const isDateInHoverRange = (date) => {
    const { departureDate, returnDate } = value;
    if (
      !departureDate ||
      !hoveredDate ||
      !date ||
      selectingType !== "return" ||
      returnDate
    )
      return false;
    const start = departureDate;
    const end = hoveredDate > departureDate ? hoveredDate : departureDate;
    return date >= start && date <= end && hoveredDate > departureDate;
  };

  // const handleDateClick = (date) => {
  //   if (!date || date < today) return;

  //   let newDeparture = value.departureDate;
  //   let newReturn = value.returnDate;

  //   if (selectingType === "departure") {
  //     newDeparture = date;
  //     newReturn = null;
  //     setSelectingType("return");
  //   } else {
  //     if (date < newDeparture) {
  //       newDeparture = date;
  //       newReturn = null;
  //       setSelectingType("return");
  //     } else {
  //       newReturn = date;
  //       setSelectingType("done");
  //       setHoveredDate(null);
  //     }
  //   }

  //   if (onChange) {
  //     onChange({ departureDate: newDeparture, returnDate: newReturn });
  //   }
  // };

  const handleDateClick = (date) => {
    if (!date || date < today) return;

    let newDeparture = value.departureDate;
    let newReturn = value.returnDate;

    if (selectingType === "departure") {
      // First click: set departure
      newDeparture = date;
      newReturn = null;
      setSelectingType("return");
    } else {
      // Second click: set return
      if (!newDeparture || date < newDeparture) {
        // If departure is missing or clicked before departure
        newDeparture = date;
        newReturn = null;
        setSelectingType("return");
      } else {
        newReturn = date;
        setSelectingType("done");
        setHoveredDate(null);
      }
    }

    if (onChange) {
      onChange({
        departureDate: newDeparture,
        returnDate: newReturn,
      });
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      return next;
    });
  };

  const getDayClassName = (date) => {
    const { departureDate, returnDate } = value;
    if (!date) return "";

    const base =
      "w-full h-full relative flex items-center justify-center text-sm sm:text-base cursor-pointer transition-all duration-300";

    if (date < today) return `${base} text-gray-200 cursor-not-allowed`;

    const isStart = isSameDay(date, departureDate);
    const isEnd = isSameDay(date, returnDate);
    const isInRange = isDateInRange(date);
    const isInHover = isDateInHoverRange(date);

    if (isStart || isEnd) return `${base} text-white font-semibold z-10`;
    if (isInRange || isInHover) return `${base} bg-gray-100 text-gray-900`;

    return `${base} hover:bg-gray-100 text-gray-900`;
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={label} className="sr-only">
          {label}
        </label>
      )}
      <div className="w-full">
        {/* Two-month calendar */}
        <div className="flex flex-col gap-8 sm:flex-row">
          {[0, 1].map((offset) => {
            const monthDate = new Date(currentMonth);
            monthDate.setMonth(currentMonth.getMonth() + offset);
            const days = getDaysInMonth(monthDate);
            const monthYear = monthDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            });

            return (
              <div key={offset} className="flex-1">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  {offset === 0 ? (
                    <button
                      onClick={() => !isBackDisabled && navigateMonth(-1)}
                      disabled={isBackDisabled}
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 duration-300${
                        isBackDisabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={CircleArrowLeft01Icon}
                        size={24}
                        strokeWidth={2}
                      />
                    </button>
                  ) : (
                    <div className="w-11" />
                  )}
                  <h3 className="flex-1 text-center text-base font-semibold text-gray-900">
                    {monthYear}
                  </h3>
                  {offset === 1 ? (
                    <button
                      onClick={() => navigateMonth(1)}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <HugeiconsIcon
                        icon={CircleArrowRight01Icon}
                        size={24}
                        strokeWidth={2}
                      />
                    </button>
                  ) : (
                    <div className="w-11" />
                  )}
                </div>

                {/* Weekdays */}
                <div className="mb-2 grid grid-cols-7">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="flex h-11 items-center justify-center text-xs font-medium text-gray-400 sm:text-sm"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7">
                  {days.map((date, index) => (
                    <div
                      key={index}
                      className="relative mb-4 flex h-14 items-center justify-center font-medium"
                    >
                      {date && (
                        <button
                          onClick={() => handleDateClick(date)}
                          onMouseEnter={() => setHoveredDate(date)}
                          onMouseLeave={() => setHoveredDate(null)}
                          disabled={date < today}
                          className={getDayClassName(date)}
                        >
                          {(isSameDay(date, value.departureDate) ||
                            isSameDay(date, value.returnDate)) && (
                            <>
                              <span className="absolute inset-0 z-0 bg-gray-100" />
                              <span className="absolute inset-0 z-10 rounded-lg bg-emerald-500" />
                            </>
                          )}
                          <span className="relative z-20">
                            {date.getDate()}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

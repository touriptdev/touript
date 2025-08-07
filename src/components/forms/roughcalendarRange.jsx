// import React, { useState, useRef, useEffect } from "react";
// // import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
// import { HugeiconsIcon } from "@hugeicons/react";
// import {
//   Calendar03Icon,
//   CancelCircleIcon,
//   CircleArrowRight01Icon,
//   CircleArrowLeft01Icon,
// } from "@hugeicons/core-free-icons";

// export default function CalendarRangeInput() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [departureDate, setDepartureDate] = useState(null);
//   const [returnDate, setReturnDate] = useState(null);
//   const [selectingType, setSelectingType] = useState("departure"); // 'departure' or 'return'
//   const [hoveredDate, setHoveredDate] = useState(null);
//   const calendarRef = useRef(null);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   // Handle click outside to close calendar
//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//   //       setIsOpen(false);
//   //     }
//   //   };

//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => document.removeEventListener("mousedown", handleClickOutside);
//   // }, []);

//   // Get days in month
//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysCount = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];

//     // Add empty cells for days before the first day of month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }

//     // Add all days of the month
//     for (let day = 1; day <= daysCount; day++) {
//       days.push(new Date(year, month, day));
//     }

//     return days;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatDateShort = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const isSameDay = (date1, date2) => {
//     if (!date1 || !date2) return false;
//     return date1.toDateString() === date2.toDateString();
//   };

//   const isDateInRange = (date) => {
//     if (!departureDate || !returnDate || !date) return false;
//     return date >= departureDate && date <= returnDate;
//   };

//   const isDateInHoverRange = (date) => {
//     if (!departureDate || !hoveredDate || !date || selectingType !== "return")
//       return false;
//     const start = departureDate;
//     const end = hoveredDate > departureDate ? hoveredDate : departureDate;
//     return date >= start && date <= end && hoveredDate > departureDate;
//   };

//   const handleDateClick = (date) => {
//     if (!date || date < today) return;

//     if (selectingType === "departure") {
//       setDepartureDate(date);
//       setReturnDate(null); // Clear return date when selecting new departure
//       setSelectingType("return");
//     } else {
//       if (date < departureDate) {
//         // If selected date is before departure, make it the new departure
//         setDepartureDate(date);
//         setReturnDate(null);
//         setSelectingType("return");
//       } else {
//         setReturnDate(date);
//         setIsOpen(false); // Close calendar after selecting return date
//       }
//     }
//   };

//   const handleInputClick = (type) => {
//     setSelectingType(type);
//     setIsOpen(true);
//   };

//   const handleClear = () => {
//     setDepartureDate(null);
//     setReturnDate(null);
//     setSelectingType("departure");
//   };

//   const navigateMonth = (direction) => {
//     setCurrentMonth((prev) => {
//       const newMonth = new Date(prev);
//       newMonth.setMonth(prev.getMonth() + direction);
//       return newMonth;
//     });
//   };

//   const getDayClassName = (date) => {
//     if (!date) return "";

//     const baseClass =
//       // "w-10 h-10 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors";
//       "w-11 h-11 flex items-center justify-center text-sm sm:text-base cursor-pointer transition-colors relative";

//     if (date < today) {
//       return `${baseClass} text-gray-200 cursor-not-allowed`;
//     }

//     if (isSameDay(date, departureDate)) {
//       return `${baseClass} rounded-lg bg-emerald-500 text-white font-semibold`;
//     }

//     if (isSameDay(date, returnDate)) {
//       return `${baseClass} rounded-lg  bg-emerald-500 text-white font-semibold`;
//     }

//     if (isDateInRange(date) || isDateInHoverRange(date)) {
//       return `${baseClass} bg-gray-100 text-gray-900`;
//     }

//     return `${baseClass} hover:bg-gray-100 text-gray-900`;
//   };

//   const days = getDaysInMonth(currentMonth);
//   const monthYear = currentMonth.toLocaleDateString("en-US", {
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div className="w-full">
//       <label className="sr-only">Select your travel dates</label>

//       <div className="relative" ref={calendarRef}>
//         {/* Date inputs */}
//         <div className="mb-2 grid grid-cols-2 gap-2">
//           {/* Departure Date Input */}
//           {/* <div
//             onClick={() => handleInputClick("departure")}
//             className={`relative cursor-pointer rounded-lg border bg-white px-3 py-2 transition-colors ${
//               selectingType === "departure" && isOpen
//                 ? "border-blue-500 ring-2 ring-blue-500"
//                 : "border-gray-300 hover:border-gray-400"
//             }`}
//           >
//             <div className="flex items-center">
//               <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={2} />
//               <div>
//                 <div className="text-xs text-gray-500">Departure</div>
//                 <div
//                   className={`text-sm ${
//                     departureDate ? "text-gray-900" : "text-gray-400"
//                   }`}
//                 >
//                   {departureDate
//                     ? formatDateShort(departureDate)
//                     : "Select date"}
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* Return Date Input */}
//           {/* <div
//             onClick={() => handleInputClick("return")}
//             className={`relative cursor-pointer rounded-lg border bg-white px-3 py-2 transition-colors ${
//               selectingType === "return" && isOpen
//                 ? "border-blue-500 ring-2 ring-blue-500"
//                 : "border-gray-300 hover:border-gray-400"
//             } ${!departureDate ? "cursor-not-allowed opacity-50" : ""}`}
//           >
//             <div className="flex items-center">
//               <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={2} />
//               <div>
//                 <div className="text-xs text-gray-500">Return</div>
//                 <div
//                   className={`text-sm ${
//                     returnDate ? "text-gray-900" : "text-gray-400"
//                   }`}
//                 >
//                   {returnDate ? formatDateShort(returnDate) : "Select date"}
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* <div className="relative w-full">
//             <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-900">
//               <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={2} />
//             </div>

//             <input
//               type="text"
//               // value={inputValue}
//               // placeholder={placeholder}
//               onFocus={() => setIsOpen(true)}
//               // onChange={(e) => setInputValue(e.target.value)}
//               // onBlur={() => {
//               //   const parsed = new Date(inputValue);
//               //   if (!isNaN(parsed) && parsed >= minDate) {
//               //     if (onChange) onChange(parsed);
//               //     setCurrentMonth(parsed);
//               //   } else {
//               //     setInputValue(value ? formatDate(value, "short") : "");
//               //   }
//               // }}
//               // onKeyDown={(e) => {
//               //   if (e.key === "Enter") {
//               //     const parsed = new Date(inputValue);
//               //     if (!isNaN(parsed) && parsed >= minDate) {
//               //       // setSelectedDate(parsed);
//               //       if (onChange) onChange(parsed);
//               //       setCurrentMonth(parsed);
//               //       setIsOpen(false);
//               //     }
//               //   }
//               // }}
//               className="h-14 w-full rounded-lg border border-gray-200 px-14 transition-all delay-100 duration-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
//             />

//             <button
//               type="button"
//               onClick={handleClear}
//               className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-900"
//             >
//               <HugeiconsIcon
//                 icon={CancelCircleIcon}
//                 size={24}
//                 strokeWidth={2}
//               />
//             </button>
//           </div> */}

//           {/* <div className="relative w-full">
//             <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-900">
//               <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={2} />
//             </div>

//             <input
//               type="text"
//               // value={inputValue}
//               // placeholder={placeholder}
//               onFocus={() => setIsOpen(true)}
//               // onChange={(e) => setInputValue(e.target.value)}
//               // onBlur={() => {
//               //   const parsed = new Date(inputValue);
//               //   if (!isNaN(parsed) && parsed >= minDate) {
//               //     if (onChange) onChange(parsed);
//               //     setCurrentMonth(parsed);
//               //   } else {
//               //     setInputValue(value ? formatDate(value, "short") : "");
//               //   }
//               // }}
//               // onKeyDown={(e) => {
//               //   if (e.key === "Enter") {
//               //     const parsed = new Date(inputValue);
//               //     if (!isNaN(parsed) && parsed >= minDate) {
//               //       // setSelectedDate(parsed);
//               //       if (onChange) onChange(parsed);
//               //       setCurrentMonth(parsed);
//               //       setIsOpen(false);
//               //     }
//               //   }
//               // }}
//               className="h-14 w-full rounded-lg border border-gray-200 px-14 transition-all delay-100 duration-300 focus:ring-2 focus:ring-gray-900 focus:outline-none"
//             />

//             <button
//               type="button"
//               onClick={handleClear}
//               className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-900"
//             >
//               <HugeiconsIcon
//                 icon={CancelCircleIcon}
//                 size={24}
//                 strokeWidth={2}
//               />
//             </button>
//           </div> */}
          
//         </div>

//         {/* Clear button */}
//         {/* {(departureDate || returnDate) && (
//           <button
//             onClick={handleClear}
//             className="mb-2 text-xs text-gray-500 hover:text-gray-700"
//           >
//             Clear dates
//           </button>
//         )} */}

//         {/* Calendar */}
        
//           <div className="absolute z-10 mt-1 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
//             {/* Calendar header */}
//             <div className="mb-4 flex items-center justify-between">
//               <button
//                 onClick={() => navigateMonth(-1)}
//                 className="rounded p-1 hover:bg-gray-100"
//               >
//                 {/* <ChevronLeft className="h-5 w-5 text-gray-600" /> */}
//               </button>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {monthYear}
//               </h3>
//               <button
//                 onClick={() => navigateMonth(1)}
//                 className="rounded p-1 hover:bg-gray-100"
//               >
//                 {/* <ChevronRight className="h-5 w-5 text-gray-600" /> */}
//               </button>
//             </div>

//             {/* Selection indicator */}
//             <div className="mb-4 flex items-center justify-center">
//               <div className="text-sm text-gray-600">
//                 {selectingType === "departure" ? (
//                   <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800">
//                     Select departure date
//                   </span>
//                 ) : (
//                   <span className="rounded-full bg-green-100 px-2 py-1 text-green-800">
//                     Select return date
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Calendar grid */}
//             <div className="mb-2 grid grid-cols-7 gap-1">
//               {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//                 <div
//                   key={day}
//                   className="flex h-10 items-center justify-center text-xs font-medium text-gray-500"
//                 >
//                   {day}
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-1">
//               {days.map((date, index) => (
//                 <div key={index} className="relative">
//                   {date && (
//                     <button
//                       onClick={() => handleDateClick(date)}
//                       onMouseEnter={() => setHoveredDate(date)}
//                       onMouseLeave={() => setHoveredDate(null)}
//                       disabled={date < today}
//                       className={getDayClassName(date)}
//                     >
//                       {date.getDate()}
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Legend */}
//             {/* <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
//               <div className="flex items-center">
//                 <div className="mr-1 h-3 w-3 rounded bg-blue-600"></div>
//                 Selected
//               </div>
//               <div className="flex items-center">
//                 <div className="mr-1 h-3 w-3 rounded bg-blue-100"></div>
//                 Range
//               </div>
//             </div> */}
//           </div>

//       </div>

//       {/* Selected dates summary */}
//       {/* {(departureDate || returnDate) && (
//         <div className="mt-4 rounded-lg bg-gray-50 p-4">
//           <h4 className="mb-2 text-sm font-medium text-gray-700">
//             Selected Dates:
//           </h4>
//           <div className="space-y-1 text-sm text-gray-600">
//             {departureDate && (
//               <div>
//                 <span className="font-medium">Departure:</span>{" "}
//                 {formatDate(departureDate)}
//               </div>
//             )}
//             {returnDate && (
//               <div>
//                 <span className="font-medium">Return:</span>{" "}
//                 {formatDate(returnDate)}
//               </div>
//             )}
//             {departureDate && returnDate && (
//               <div className="mt-2 border-t border-gray-200 pt-2">
//                 <span className="font-medium">Duration:</span>{" "}
//                 {Math.ceil(
//                   (returnDate - departureDate) / (1000 * 60 * 60 * 24),
//                 )}{" "}
//                 days
//               </div>
//             )}
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// }











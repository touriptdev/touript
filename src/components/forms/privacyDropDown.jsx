// import { useState, useRef, useEffect } from "react";
// import { HugeiconsIcon } from "@hugeicons/react";
// import {
//   ArrowDown01Icon,
//   CheckmarkCircle01Icon,
//   GlobalIcon,
//   SquareLock01Icon,
// } from "@hugeicons/core-free-icons";
// import clsx from "clsx";

// export default function PrivacyDropdownSelect({
//   label,
//   value,
//   onChange,
//   options = [],
//   defaultPrivacy,
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const selectedIcon = options.find((opt) => opt.value === value)?.icon;

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       {/* Label for Accessibility only */}
//       <label htmlFor={label} className="sr-only">
//         {label}
//       </label>

//       {/* Button But working as Select Input ( Custom Made ) */}
//       <button
//         type="button"
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="w-full h-14 px-14 border border-gray-200 rounded-lg text-left text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100 cursor-pointer"
//       >
//         {selectedIcon || defaultPrivacy === "public" ? (
//           <HugeiconsIcon icon={GlobalIcon} size={24} strokeWidth={2} />
//         ) : (
//           <HugeiconsIcon icon={SquareLock01Icon} size={24} strokeWidth={2} />
//         )}

//         {/* Dropdown Icon (Inside the button ) */}
//         <span className="absolute inset-y-0 right-4 flex items-center ">
//           <HugeiconsIcon
//             icon={ArrowDown01Icon}
//             size={24}
//             className="text-gray-400 hover:text-gray-900 transition duration-300 delay-150"
//             strokeWidth={2}
//           />
//         </span>
//       </button>

//       {/* Dropdown List */}
//       {isOpen && (
//         <ul className="absolute z-10 w-full mt-1  bg-white border border-gray-200 rounded-lg shadow-xl overflow-auto text-start">
//           {options.map((opt, idx) => (
//             <li
//               key={opt.value}
//               onClick={() => {
//                 onChange({ target: { value: opt.value } });
//                 setIsOpen(false);
//               }}
//               className={clsx(
//                 "px-4 py-4 cursor-pointer hover:bg-gray-100 text-gray-900 border-b border-gray-200 transition-all duration-300 delay-150",
//                 value === opt.value ? "font-medium" : "",
//                 idx === options.length - 1
//                   ? "border-none"
//                   : "border-b border-gray-200"
//               )}
//             >
//               <div className="flex items-center justify-start gap-4">
//                 <HugeiconsIcon
//                   icon={opt.icon}
//                   size={24}
//                   className={"text-gray-900"}
//                   strokeWidth={2}
//                 />
//                 <span>{opt.label}</span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  GlobalIcon,
  SquareLock01Icon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function PrivacyDropdownSelect({
  label,
  value,
  onChange,
  options = [],
  defaultPrivacy = "public",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const selectedIcon =
    selectedOption?.icon ||
    (defaultPrivacy === "private" ? SquareLock01Icon : GlobalIcon);
  const selectedLabel =
    selectedOption?.label ||
    (defaultPrivacy === "private" ? "Private" : "Public");

  return (
    <div ref={dropdownRef} className={clsx("relative", className)}>
      {/* Screen Reader Only Label */}
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        id={label}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-14 pl-4 pr-14 border border-gray-200 rounded-lg text-left bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200 relative"
      >
        <div className="flex items-center">
          <HugeiconsIcon icon={selectedIcon} size={24} strokeWidth={2} />
          <span className="text-sm font-medium invisible w-0">
            {selectedLabel}
          </span>
        </div>

        <span className="absolute inset-y-0 right-4 flex items-center">
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={24}
            strokeWidth={2}
            className="text-gray-400 hover:text-gray-900 transition duration-200"
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 w-40 mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <li
                key={opt.value}
                onClick={() => {
                  onChange({ target: { value: opt.value } });
                  setIsOpen(false);
                }}
                className={clsx(
                  "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-900 transition duration-200",
                  isSelected && "font-medium bg-gray-50"
                )}
              >
                <HugeiconsIcon icon={opt.icon} size={24} strokeWidth={2} />
                <span className="text-sm">{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function DropdownSelect({
  label,
  value,
  onChange,
  options = [],
  labelIcon,
  placeholder = "Select",
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

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Label Icon */}
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <HugeiconsIcon
          icon={labelIcon}
          size={24}
          className="text-gray-900"
          strokeWidth={2}
        />
      </span>

      {/* Label for Accessibility only */}
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      {/* Button But working as Select Input ( Custom Made ) */}
      <button
        id={label}
        name={label}
        type="button"
        placeholder={placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-14 px-14 border border-gray-200 rounded-lg text-left text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100 cursor-pointer"
      >
        {selectedLabel || <span className="text-gray-400">{placeholder}</span>}

        {/* Dropdown Icon (Inside the button ) */}
        <span className="absolute inset-y-0 right-4 flex items-center ">
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={24}
            className="text-gray-400 hover:text-gray-900 transition duration-300 delay-150"
            strokeWidth={2}
          />
        </span>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1  bg-white border border-gray-200 rounded-lg shadow-xl overflow-auto text-start">
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange({ target: { value: opt.value } });
                setIsOpen(false);
              }}
              className={clsx(
                "px-4 py-4 cursor-pointer hover:bg-gray-100 text-gray-900 border-b border-gray-200 transition-all duration-300 delay-150",
                value === opt.value ? "font-medium" : "",
                idx === options.length - 1
                  ? "border-none"
                  : "border-b border-gray-200"
              )}
            >
              <div className="flex items-center justify-start gap-4">
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  size={24}
                  className={
                    value === opt.value ? "text-gray-900" : "text-transparent"
                  }
                  strokeWidth={2}
                />
                <span>{opt.label}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

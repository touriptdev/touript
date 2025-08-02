import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function SearchSelect({
  label,
  options = [],
  onChange,
  value,
  labelIcon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || null;
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    setIsOpen(false);
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
    onChange({ target: { value: option?.value } });
  };

  const handleClear = (e) => {
    e.stopPropagation();

    setSearchTerm("");
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onChange({ target: { value: "" } });
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;

    setSearchTerm(newValue);

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="w-full w-full mx-auto h-14">
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      <div className="relative" ref={dropdownRef}>
        {/* Main search input */}
        <div className="relative">
          <HugeiconsIcon
            icon={labelIcon}
            size={24}
            strokeWidth={2}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 z-1"
          />
          <input
            ref={inputRef}
            type="text"
            // value={searchTerm || (selectedOption ? selectedOption.label : "")}
            value={
              isOpen || searchTerm
                ? searchTerm
                : selectedOption
                ? selectedOption.label
                : ""
            }
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            placeholder={
              selectedOption
                ? ""
                : `Search and select an ${label.toLowerCase()}`
            }
            className={clsx(
              "w-full px-14 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100 transition-colors",
              selectedOption && !searchTerm
                ? "text-gray-900 font-medium text-base lg:text-sm"
                : "text-gray-700"
            )}
          />

          {/* Clear button */}
          {(selectedOption || searchTerm) && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400  hover:text-gray-900 cursor-pointer z-10 transition transition-colors duration-300 delay-100"
            >
              <HugeiconsIcon icon={CancelCircleIcon} ize={24} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Dropdown menu - only show when there's a search term or focus */}
        {isOpen && (searchTerm || !selectedOption) && (
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-xl max-h-60 rounded-lg py-1 text-base overflow-auto border border-gray-200  focus:outline-none">
            {/* Options list */}
            {searchTerm && filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <li
                  key={option.value}
                  onClick={() => {
                    handleSelect(option);
                  }}
                  className={clsx(
                    "px-4 py-4 cursor-pointer hover:bg-gray-100 text-gray-900 border-b border-gray-200 transition-all duration-300 delay-150",
                    value === option.value ? "font-medium" : "",
                    idx === filteredOptions.length - 1
                      ? "border-none"
                      : "border-b border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-start gap-4">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={24}
                      strokeWidth={2}
                      className={clsx(
                        value === option.value
                          ? "text-gray-900"
                          : "text-transparent"
                      )}
                    />
                    <span
                      className={clsx(
                        "block truncate",
                        value === option.value ? "font-medium" : "font-normal"
                      )}
                    >
                      {option.label}
                    </span>
                  </div>
                </li>
              ))
            ) : searchTerm && filteredOptions.length === 0 ? (
              <li className="px-14 h-14 text-gray-400 text-sm flex flex items-center justify-center">
                No results found for {searchTerm}
              </li>
            ) : !searchTerm && !selectedOption ? (
              <div className="h-full flex flex-col items-center w-full">
                <span className="flex items-ceter justify-center text-gray-400 w-full py-4 border-b border-gray-200 text-sm">Start typing to search {label.toLowerCase()}</span>
                
                {filteredOptions.map((option, idx) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      handleSelect(option);
                    }}
                    className={clsx(
                      "w-full px-4 py-4 cursor-pointer hover:bg-gray-100 text-gray-900 border-b border-gray-200 transition-all duration-300 delay-150",
                      value === option.value ? "font-medium" : "",
                      idx === filteredOptions.length - 1
                        ? "border-none"
                        : "border-b border-gray-200"
                    )}
                  >
                    <div className="flex items-center justify-start gap-4">
                      <HugeiconsIcon
                        icon={CheckmarkCircle01Icon}
                        size={24}
                        strokeWidth={2}
                        className={clsx(
                          value === option.value
                            ? "text-gray-900"
                            : "text-transparent"
                        )}
                      />
                      <span
                        className={clsx(
                          "block truncate",
                          value === option.value ? "font-medium" : "font-normal"
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                  </li>
                ))}
              </div>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
}

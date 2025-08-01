import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  // Search01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function MultiSelectTagInput({
  label,
  labelIcon,
  options = [],
  value = [],
  onChange = () => {},
  allowCustom = true,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filtered options excluding already selected ones
  const filteredOptions = options.filter((option) => {
    const matchesSearch = option.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const notSelected = !value.some((tag) => tag.value === option.value);
    return matchesSearch && notSelected;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Create a custom tag
  const createCustomTag = (label) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    if (value.some((tag) => tag.label.toLowerCase() === trimmed.toLowerCase()))
      return;

    const newTag = {
      id: Date.now(),
      label: trimmed,
      value: trimmed.toLowerCase().replace(/\s+/g, "-"),
      isCustom: true,
    };
    onChange([...value, newTag]);
  };

  // Input change
  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val.includes(",")) {
      const [first, ...rest] = val.split(",");
      if (allowCustom) createCustomTag(first);
      setSearchTerm(rest.join(","));
    } else {
      setSearchTerm(val);
    }
    setIsOpen(val.trim() ? true : false);
  };

  // Keyboard actions
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        if (allowCustom) createCustomTag(searchTerm);
        setSearchTerm("");
        setIsOpen(false);
      }
    } else if (e.key === "Backspace" && !searchTerm && value.length > 0) {
      // Remove last tag
      onChange(value.slice(0, -1));
    }
  };

  // Select from predefined options
  const handleSelectOption = (option) => {
    onChange([...value, { ...option, isCustom: false }]);
    setSearchTerm("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag.id !== tagToRemove.id));
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <label className="sr-only">
        Tags (search existing or create new with comma)
      </label>

      <div className="relative" ref={dropdownRef}>
        {/* Tag input container */}
        <div className={"relative"}>
          <HugeiconsIcon
            icon={labelIcon}
            ize={24}
            strokeWidth={2}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900"
          />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchTerm.trim()) setIsOpen(true);
            }}
            placeholder={
              value.length === 0
                ? `Search or add new ${label.toLowerCase()}`
                : `Add more ${label.toLowerCase()}`
            }
            className="w-full px-14 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100 transition-colors"
            {...props}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && searchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-xl max-h-60 rounded-lg py-1 text-base overflow-auto border border-gray-200 focus:outline-none">
            {/* Show existing options that match search */}
            {filteredOptions.length > 0 && (
              <>
                {/* Show option to create custom tag */}
                {searchTerm.trim() && (
                  <>
                    {/* Existing Tags */}
                    <div className="px-4 py-2 text-xs font-medium text-gray-400">
                      Existing {label.toLowerCase()}
                    </div>
                    {filteredOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleSelectOption(option)}
                        className={clsx(
                          "px-4 py-4 cursor-pointer hover:bg-gray-100 text-gray-900 border-b border-gray-200 transition-all duration-300 delay-150",
                          value === option.value ? "font-medium" : ""
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
                              value === option.value
                                ? "font-medium"
                                : "font-normal"
                            )}
                          >
                            {option.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

            {/* Create Custom Tags */}
            {allowCustom && searchTerm.trim() && (
              <>
                <div className="px-4 py-2 text-xs font-medium text-gray-400 ">
                  Add new {label.toLowerCase()}
                </div>
                <div
                  onClick={() => {
                    createCustomTag(searchTerm);
                    setSearchTerm("");
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "px-4 py-4 cursor-pointer hover:bg-gray-100 text-gray-900 transition-all duration-300 delay-150 font-medium"
                  )}
                >
                  <div className="flex items-center justify-start gap-4">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={24}
                      strokeWidth={2}
                      className="text-transparent"
                    />
                    <span className="block truncate">
                      "{searchTerm.trim()}"
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* No results message */}
            {filteredOptions.length === 0 && !searchTerm.trim() && (
              <div className="px-3 py-2 text-gray-500 text-sm flex items-center justify-center">
                Start typing to search {label} or create new {label}...
              </div>
            )}
          </div>
        )}

        {/* Selected tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {value.map((tag) => (
            <span
              key={tag.id}
              className={
                "flex items-center justify-between gap-2 px-4 h-14 rounded-lg text-sm lg:text-base font-medium bg-gray-50 text-gray-900 border-2 border-gray-200"
              }
            >
              {tag.label}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-900 transition-all transition-colors duration-300 delay-100"
              >
                <HugeiconsIcon
                  icon={CancelCircleIcon}
                  size={16}
                  strokeWidth={2}
                />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

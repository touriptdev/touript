import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

export default function TagInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Predefined options that users can search and select from
  const predefinedOptions = [
    { id: 1, label: "JavaScript", value: "javascript" },
    { id: 2, label: "React", value: "react" },
    { id: 3, label: "Vue", value: "vue" },
    { id: 4, label: "Angular", value: "angular" },
    { id: 5, label: "Node.js", value: "nodejs" },
    { id: 6, label: "Python", value: "python" },
    { id: 7, label: "Django", value: "django" },
    { id: 8, label: "Flask", value: "flask" },
    { id: 9, label: "CSS", value: "css" },
    { id: 10, label: "HTML", value: "html" },
    { id: 11, label: "TypeScript", value: "typescript" },
    { id: 12, label: "MongoDB", value: "mongodb" },
  ];

  // Filter options based on search term and exclude already selected tags
  const filteredOptions = predefinedOptions.filter((option) => {
    const matchesSearch = option.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const notAlreadySelected = !selectedTags.some(
      (tag) => tag.value === option.value
    );
    return matchesSearch && notAlreadySelected;
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Don't clear search term here to allow custom tag creation
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createCustomTag = (value) => {
    const trimmedValue = value.trim();
    if (
      trimmedValue &&
      !selectedTags.some(
        (tag) => tag.value.toLowerCase() === trimmedValue.toLowerCase()
      )
    ) {
      const newTag = {
        id: Date.now(), // Simple ID generation
        label: trimmedValue,
        value: trimmedValue.toLowerCase().replace(/\s+/g, "-"),
        isCustom: true,
      };
      setSelectedTags([...selectedTags, newTag]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    // Check if user typed a comma
    if (value.includes(",")) {
      const parts = value.split(",");
      const tagToCreate = parts[0];
      const remaining = parts.slice(1).join(",");

      // Create tag from the part before comma
      if (tagToCreate.trim()) {
        createCustomTag(tagToCreate);
      }

      // Set remaining text (after comma) as new search term
      setSearchTerm(remaining);
      setIsOpen(remaining.trim() ? true : false);
    } else {
      setSearchTerm(value);
      setIsOpen(value.trim() ? true : false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim()) {
        createCustomTag(searchTerm);
        setSearchTerm("");
        setIsOpen(false);
      }
    } else if (
      e.key === "Backspace" &&
      !searchTerm &&
      selectedTags.length > 0
    ) {
      // Remove last tag when backspace is pressed on empty input
      setSelectedTags(selectedTags.slice(0, -1));
    }
  };

  const handleSelectOption = (option) => {
    setSelectedTags([...selectedTags, { ...option, isCustom: false }]);
    setSearchTerm("");
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagToRemove.id));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    if (searchTerm.trim()) {
      setIsOpen(true);
    }
  };

  return (
    <div className="w-full">
      <label className="sr-only">
        Tags (search existing or create new with comma)
      </label>

      <div className="relative" ref={dropdownRef}>
        {/* Tag input container */}
        <div
          className={`min-h-[42px] w-full bg-white border rounded-lg px-3 py-2 flex flex-wrap items-center gap-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors ${
            isOpen
              ? "border-blue-500 ring-2 ring-blue-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {/* Selected tags */}
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                tag.isCustom
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              {tag.label}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1.5 h-3 w-3 rounded-full inline-flex items-center justify-center hover:bg-black hover:bg-opacity-10 focus:outline-none"
              >
               <HugeiconsIcon icon={CancelCircleIcon} ize={24} strokeWidth={2} />
              </button>
            </span>
          ))}

          {/* Search input */}
          <div className="flex-1 relative min-w-[120px]">
            {/* <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */} 
            <HugeiconsIcon icon={Search01Icon} ize={24} strokeWidth={2} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder={
                selectedTags.length === 0
                  ? "Search tags or type new ones..."
                  : "Add more tags..."
              }
              className="w-full pl-6 py-1 text-sm bg-transparent border-none focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && searchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            <div className="py-1">
              {/* Show existing options that match search */}
              {filteredOptions.length > 0 && (
                <>
                  <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Existing Tags
                  </div>
                  {filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option)}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-3 hover:bg-blue-50 hover:text-blue-900 text-gray-900"
                    >
                      <div className="flex items-center justify-between">
                        <span className="block truncate font-normal">
                          {option.label}
                        </span>
                        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-0.5 rounded">
                          existing
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Show option to create custom tag */}
              {searchTerm.trim() && (
                <>
                  {filteredOptions.length > 0 && (
                    <div className="border-t border-gray-200 my-1"></div>
                  )}
                  <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Create New
                  </div>
                  <div
                    onClick={() => {
                      createCustomTag(searchTerm);
                      setSearchTerm("");
                      setIsOpen(false);
                    }}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-3 hover:bg-green-50 hover:text-green-900 text-gray-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="block truncate font-normal">
                        "{searchTerm.trim()}"
                      </span>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-0.5 rounded">
                        new tag
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* No results message */}
              {filteredOptions.length === 0 && !searchTerm.trim() && (
                <div className="px-3 py-2 text-gray-500 text-sm">
                  Start typing to search or create tags...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions
      <div className="mt-2 text-xs text-gray-500">
        • Type to search existing tags or create new ones
        • Add comma (,) or press Enter to create a custom tag
        • Press Backspace to remove the last tag
        • Click × on any tag to remove it
      </div> */}

      {/* Current tags display */}
      {/* {selectedTags.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Selected Tags:</p>
          <div className="space-y-1">
            {selectedTags.map((tag) => (
              <div key={tag.id} className="text-sm text-gray-600">
                <span className="font-medium">{tag.label}</span>
                <span className="text-gray-400 ml-2">
                  ({tag.isCustom ? 'custom' : 'existing'})
                </span>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

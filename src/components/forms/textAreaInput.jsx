// import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon } from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function TextAreaInput({
  label,
  useLabelIcon = true,
  value,
  onChange,
  maxLength,
}) {
  // const [isFocused, setIsFocused] = useState(false);
  const minRows = 2;
  const maxRows = 8;

  const handleTextChange = (e) => {
    let newValue = e.target.value;

    // Enforce max length
    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }

    onChange(newValue);

    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = 24;
    const rows = Math.min(
      Math.max(Math.ceil(scrollHeight / lineHeight), minRows),
      maxRows
    );
    textarea.style.height = `${rows * lineHeight}px`;
  };

  const remainingChars = maxLength - (value?.length || 0);
  const isNearLimit = remainingChars <= 20;
  const isOverLimit = remainingChars === 0;

  return (
    <div className="w-full relative font-poppins">
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      {/* Icon */}
      {useLabelIcon && (
        <div className="absolute left-4 top-4 text-gray-900">
          <HugeiconsIcon icon={File01Icon} size={24} strokeWidth={2} />
        </div>
      )}

      {/* Textarea */}
      <textarea
        id={label}
        name={label}
        value={value}
        onChange={handleTextChange}
        // onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
        placeholder="Enter your message here..."
        rows={minRows}
        className={clsx(
          "w-full px-14 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-150"
        )}
        style={{
          minHeight: `${minRows * 24}px`,
          maxHeight: `${maxRows * 24}px`,
        }}
      />

      {/* Character count */}
      <div className="flex items-center justify-between mt-2 text-sm">
        {/* Validation */}

        <div
          className={`font-normal ${
            isOverLimit
              ? "text-pink-500"
              : isNearLimit
              ? "text-yellow-500"
              : "text-gray-900"
          }`}
        >
          {remainingChars}
          <span className="text-gray-400">/500 characters remaining</span>
        </div>
        {isOverLimit && (
          <p className=" text-pink-500">
            Maximum length of {maxLength} characters
          </p>
        )}
      </div>
    </div>
  );
}

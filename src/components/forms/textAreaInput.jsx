import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon } from "@hugeicons/core-free-icons";

export default function TextAreaInput({ label, useLabelIcon = true }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const maxLength = 500; // Character limit
  const minRows = 4;
  const maxRows = 8;

  // Auto-resize textarea based on content
  const handleTextChange = (e) => {
    setText(e.target.value);

    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = 24; // Approximate line height
    const rows = Math.min(
      Math.max(Math.ceil(scrollHeight / lineHeight), minRows),
      maxRows
    );
    textarea.style.height = `${rows * lineHeight}px`;
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 50;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="w-full relative font-poppins">
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      {/* Textarea */}
      <div className="absolute left-4 top-4 text-gray-900">
        {useLabelIcon && (
          <HugeiconsIcon icon={File01Icon} size={24} strokeWidth={2} />
        )}
      </div>
      <textarea
        value={text}
        onChange={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Enter your message here..."
        rows={minRows}
        className={`w-full px-14 py-4 border rounded-lg resize-none focus:outline-none transition-colors ${
          isFocused
            ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20"
            : isOverLimit
            ? "border-red-300 hover:border-red-400"
            : "border-gray-300 hover:border-gray-400"
        }`}
        style={{
          minHeight: `${minRows * 24}px`,
          maxHeight: `${maxRows * 24}px`,
        }}
      />

      {/* Character count and info */}
      <div className="flex items-center justify-between mt-2 text-sm">
        <div className="text-gray-500">
          {text.split("\n").length} line
          {text.split("\n").length !== 1 ? "s" : ""} •{" "}
          {text.split(" ").filter((word) => word.length > 0).length} word
          {text.split(" ").filter((word) => word.length > 0).length !== 1
            ? "s"
            : ""}
        </div>

        <div
          className={`font-medium ${
            isOverLimit
              ? "text-red-600"
              : isNearLimit
              ? "text-yellow-600"
              : "text-gray-500"
          }`}
        >
          {remainingChars} characters remaining
        </div>
      </div>

      {/* Validation message */}
      {isOverLimit && (
        <p className="mt-1 text-sm text-red-600">
          Message exceeds the maximum length of {maxLength} characters.
        </p>
      )}
    </div>
  );
}

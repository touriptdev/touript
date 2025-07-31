import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const BasicTextarea = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const maxLength = 500; // Character limit
  const minRows = 4;
  const maxRows = 8;

  // Auto-resize textarea based on content
  const handleTextChange = (e) => {
    setText(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = 24; // Approximate line height
    const rows = Math.min(Math.max(Math.ceil(scrollHeight / lineHeight), minRows), maxRows);
    textarea.style.height = `${rows * lineHeight}px`;
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 50;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Message
      </label>
      
      <div className="relative">
        {/* Textarea */}
        <textarea
          value={text}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your message here..."
          rows={minRows}
          className={`w-full px-3 py-3 border rounded-lg resize-none focus:outline-none transition-colors ${
            isFocused 
              ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' 
              : isOverLimit
              ? 'border-red-300 hover:border-red-400'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          style={{ minHeight: `${minRows * 24}px`, maxHeight: `${maxRows * 24}px` }}
        />

        {/* Icon */}
        <div className="absolute top-3 right-3">
          <MessageSquare className={`h-4 w-4 ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
      </div>

      {/* Character count and info */}
      <div className="flex items-center justify-between mt-2 text-sm">
        <div className="text-gray-500">
          {text.split('\n').length} line{text.split('\n').length !== 1 ? 's' : ''} • {text.split(' ').filter(word => word.length > 0).length} word{text.split(' ').filter(word => word.length > 0).length !== 1 ? 's' : ''}
        </div>
        
        <div className={`font-medium ${
          isOverLimit 
            ? 'text-red-600' 
            : isNearLimit 
            ? 'text-yellow-600' 
            : 'text-gray-500'
        }`}>
          {remainingChars} characters remaining
        </div>
      </div>

      {/* Validation message */}
      {isOverLimit && (
        <p className="mt-1 text-sm text-red-600">
          Message exceeds the maximum length of {maxLength} characters.
        </p>
      )}

      {/* Preview of entered text */}
      {text.trim() && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
          <div className="text-sm text-gray-900 whitespace-pre-wrap bg-white p-3 rounded border">
            {text}
          </div>
        </div>
      )}

      {/* Quick action buttons */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => setText('')}
          disabled={!text}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear
        </button>
        
        <button
          onClick={() => {
            navigator.clipboard.writeText(text);
            // You could add a toast notification here
          }}
          disabled={!text}
          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Copy
        </button>
        
        <button
          disabled={!text || isOverLimit}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit
        </button>
      </div>

      {/* Usage tips */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-1">Tips:</h5>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• The textarea automatically resizes as you type</li>
          <li>• Maximum {maxLength} characters allowed</li>
          <li>• Line breaks are preserved in the preview</li>
          <li>• Use the copy button to copy your text to clipboard</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicTextarea;
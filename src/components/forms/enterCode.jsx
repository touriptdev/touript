import React, { useRef, useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";

export default function EnterCode({ callback, reset, isLoading }) {
  const [code, setCode] = useState("");

  // Refs to control each digit input element
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Reset all inputs and clear state
  const resetCode = () => {
    inputRefs.forEach((ref) => {
      ref.current.value = "";
    });
    inputRefs[0].current.focus();
    setCode("");
  };

  // Call our callback when code = 6 chars
  useEffect(() => {
    if (code.length === 6) {
      if (typeof callback === "function") callback(code);
      resetCode();
    }
  }, [code]); //eslint-disable-line

  // Listen for external reset toggle
  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line

  // Handle input
  function handleInput(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    // Update code state with single digit
    const newCode = [...code];
    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      inputRefs[index].current.value = uc;
    } else {
      newCode[index] = input.value;
    }
    setCode(newCode.join(""));

    input.select();

    if (input.value === "") {
      // If the value is deleted, select previous input, if exists
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }

  // Select the contents on focus
  function handleFocus(e) {
    e.target.select();
  }

  // Handle backspace key
  function handleKeyDown(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];

    const nextInput = inputRefs[index + 1]; //eslint-disable-line

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1),
      );
      if (previousInput) {
        previousInput.current.focus();
      }
    }
  }

  // Capture pasted characters
  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  // Clear button deletes all inputs and selects the first input for entry

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-end w-full h-8">
        {/* Clear button deletes all inputs and selects the first input for entry */}
        {code.length > 0 && (
          <button onClick={resetCode}>
            <span className="underline text-md font-poppins font-medium text-gray-700 cursor-pointer">
              Clear Code
            </span>
          </button>
        )}
      </div>
      <div className="flex gap-4 relative w-full items-center justify-evenly">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            className="text-2xl text-gray-900 font-poppins font-medium bg-gray-50 flex my-8 text-center w-full rounded-lg h-18 lg:h-24 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
            ref={inputRefs[index]}
            autoFocus={index === 0}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

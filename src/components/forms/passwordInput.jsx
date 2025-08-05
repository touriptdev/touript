import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SquareLockPasswordIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";

export default function PasswordInput({
  label = "password",
  placeholderText = "Password",
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative ">
      {/* Label for accssibility only */}
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      {/* Leading icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900">
        <HugeiconsIcon
          icon={SquareLockPasswordIcon}
          size={24}
          strokeWidth={2}
        />
      </div>

      {/* Input field */}
      <input
        id={label}
        type={showPassword ? "text" : "password"}
        name={label}
        placeholder={placeholderText}
        value={value}
        autoComplete="current-password"
        onChange={onChange}
        // required
        className="w-full px-14 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
      />

      {/* Trailing icon (View button) */}
      {value && (
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-all duration-300 delay-100"
        >
          <HugeiconsIcon
            icon={showPassword ? ViewOffSlashIcon : ViewIcon}
            size={24}
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
}

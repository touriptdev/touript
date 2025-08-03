import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle01Icon,
  CancelCircleIcon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function TextInput({
  label,
  labelIcon,
  value,
  onChange,
  placeholderText,
  unique = false,
  autocomplete = "",
  useLabelIcon = true,
  required=false,
}) {
  //   const [query, setQuery] = useState("");
  return (
    <div className="relative w-full">
      {/* Label only for accessibility */}
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      {/* Leading icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900">
        {useLabelIcon && (
          <HugeiconsIcon icon={labelIcon} size={24} strokeWidth={2} />
        )}
      </div>

      {/* Input field */}
      <input
        id={label}
        name={label}
        placeholder={placeholderText}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
        required={required}
        className={clsx("w-full h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100", useLabelIcon ? "px-14":"px-4")}
      />

      {/* Trailing icon (Clear button) */}
      {unique && value && (
        <div
          className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 cursor-pointer transition-all duration-300 delay-150"
          //   onClick={() => onChange({ target: { value: "" } })}
        >
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={24}
            strokeWidth={2}
          />
        </div>
      )}

      {value && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 cursor-pointer"
          onClick={() => onChange({ target: { value: "" } })}
        >
          <HugeiconsIcon icon={CancelCircleIcon} size={24} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}

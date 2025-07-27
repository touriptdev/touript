import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";

export default function EmailInput({ value, onChange }) {
  //   const [query, setQuery] = useState("");
  return (
    <div className="relative ">
      {/* Label only for accessibility */}
      <label htmlFor="email" className="sr-only">
        Email Address
      </label>

      {/* Leading icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900">
        <HugeiconsIcon icon={Mail01Icon} size={24} strokeWidth={2} />
      </div>

      {/* Input field */}
      <input
        type="email"
        name="emailAddress"
        placeholder="Email Address"
        value={value}
        onChange={onChange}
        // required
        className="w-full px-14 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
      />

      {/* Trailing icon (Clear button) */}
      {value && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 cursor-pointer"
          // onClick={() => onChange({ target: { value: "" } })}
        >
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={24}
            strokeWidth={2}
          />
        </div>
      )}
    </div>
  );
}

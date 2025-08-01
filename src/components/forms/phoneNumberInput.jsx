import { HugeiconsIcon } from "@hugeicons/react";
import { SmartPhone01Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";

export default function PhoneNumberInput({ label, value, onChange }) {
  //   const [query, setQuery] = useState("");
  return (
    <div className="relative ">
      {/* Label only for accessibility */}
      <label htmlFor={label} className="sr-only">
        Phone Number
      </label>

      {/* Leading icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900">
        <HugeiconsIcon icon={SmartPhone01Icon} size={24} strokeWidth={2} />
      </div>

      {/* Input field */}
      <input
        type="tel"
        id={label}
        name={label}
        placeholder="+x (xxx) xxxx xxxx"
        value={value}
        onChange={onChange}
        autoComplete="tel"
        // required
        className="w-full px-14 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
      />

      {/* Trailing icon (Clear button) */}
      {value && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 cursor-pointer transition-all duration-300 delay-100"
          onClick={() => onChange({ target: { value: "" } })}
        >
          <HugeiconsIcon icon={CancelCircleIcon} size={24} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}

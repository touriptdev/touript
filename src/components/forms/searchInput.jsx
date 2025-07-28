import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";

export default function SearchInput() {
  const [query, setQuery] = useState("");

  const clearInput = () => setQuery("");

  return (
    <div className="relative ">
      {/* Leading icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900">
        <HugeiconsIcon icon={Search01Icon} size={24} strokeWidth={2} />
      </div>

      {/* Input field */}
      <input
        type="text"
        name="search"
        placeholder="Search here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        className="w-full px-14 h-14 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
      />

      {/* Trailing icon (Clear button) */}
      {query && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 cursor-pointer"
          onClick={clearInput}
        >
          <HugeiconsIcon icon={CancelCircleIcon} size={24} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}

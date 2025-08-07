import {
  User02Icon,
  MinusSignIcon,
  Add01Icon,
  SquareArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

export default function CounterInput({ options, value, onChange }) {
  const counts = value;

  const updateCounts = (type, operation) => {
    const newCounts = { ...counts };
    if (operation === "increment") {
      newCounts[type] += 1;
    } else {
      newCounts[type] = Math.max(0, newCounts[type] - 1);
      if (type === "adults" && newCounts[type] === 0) {
        newCounts[type] = 1;
      }
    }
    onChange(newCounts);
  };

  return (
    <div className="w-full">
      <label className="sr-only">counts</label>

      <div className="relative flex w-full flex-col gap-4">
        {options.map((counter, id) => (
          <div key={id} className={`flex h-14 items-center justify-between`}>
            <div className="flex flex-1 flex-col items-start justify-center gap-1">
              <div className="text-base font-medium text-gray-900">
                {counter.label}
              </div>
              <div className="text-sm font-normal text-gray-400">
                {counter.description}
              </div>
            </div>

            <div className="flex items-center text-gray-900">
              <button
                onClick={() => updateCounts(counter.value, "decrement")}
                disabled={counts[counter.value] <= counter.min}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 transition-colors duration-300 ${
                  counts[counter.value] <= counter.min
                    ? "cursor-not-allowed border-gray-200 text-gray-200"
                    : "cursor-pointer border-gray-200 text-gray-900 hover:bg-white hover:text-gray-900"
                }`}
              >
                <HugeiconsIcon icon={MinusSignIcon} size={24} strokeWidth={2} />
              </button>

              <span
                className={clsx(
                  "w-14 text-center text-lg font-medium",
                  counts[counter.value] >= counter.max ||
                    counts[counter.value] <= counter.min
                    ? "text-gray-400"
                    : "text-gray-900",
                )}
              >
                {counts[counter.value]}
              </span>

              <button
                onClick={() => updateCounts(counter.value, "increment")}
                disabled={counts[counter.value] >= counter.max}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 transition-colors duration-300 ${
                  counts[counter.value] >= counter.max
                    ? "cursor-not-allowed border-gray-200 text-gray-200"
                    : "cursor-pointer border-gray-200 text-gray-900 hover:bg-white hover:text-gray-900"
                }`}
              >
                <HugeiconsIcon icon={Add01Icon} size={24} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

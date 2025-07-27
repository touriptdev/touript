import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function CheckboxInput({
  id,
  name,
  label,
  checked,
  onChange,
  description = null,
}) {
  return (
    <div
      className={clsx(
        "flex gap-4",
        description !== null ? "items-center" : "items-start"
      )}
    >
      <label htmlFor={id} className="flex items-center cursor-pointer gap-2">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer hidden"
        />
        <div
          className={clsx(
            "w-6 h-6 rounded border-2 border-gray-200",
            "flex items-center justify-center",
            "transition duration-300 delay-150",
            "peer-checked:bg-emerald-500 peer-checked:border-emerald-500"
          )}
        >
          {checked && (
            <HugeiconsIcon
              icon={Tick01Icon}
              size={24}
              strokeWidth={2}
              className="text-white transition-all duration-300 delay-150"
            />
          )}
        </div>
      </label>

      <div className="text-md flex flex-col items-start justify-start gap-1">
        <label
          htmlFor={id}
          className="font-medium text-gray-700 cursor-pointer"
        >
          {label}
        </label>
        {description && <p className="text-gray-400 text-xs">{description}</p>}
      </div>
    </div>
  );
}

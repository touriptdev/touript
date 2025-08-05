import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

export default function RadioInput({
  label,
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  direction = "vertical",
  required = false,
  variant = "default", // 'default', 'card', 'button'
  size = "md", // 'sm', 'md', 'lg'
  ...props
}) {
  const sizeClasses = {
    sm: { container: "w-4 h-4", dot: "w-2 h-2" },
    md: { container: "w-5 h-5", dot: "w-2.5 h-2.5" },
    lg: { container: "w-6 h-6", dot: "w-3 h-3" },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const renderOption = (option, index) => {
    const optionValue = typeof option === "object" ? option.value : option;
    const optionLabel = typeof option === "object" ? option.label : option;
    const optionIcon = typeof option === "object" ? option.icon : option;
    const optionDescription =
      typeof option === "object" ? option.description : option;
    const optionDisabled = typeof option === "object" ? option.disabled : false;
    const optionId = `${name}-${index}`;
    const isChecked = value === optionValue;
    const isDisabled = disabled || optionDisabled;

    if (variant === "card") {
      return (
        <div key={optionValue} className="relative w-full">
          <input
            type="radio"
            id={optionId}
            name={name}
            value={optionValue}
            checked={isChecked}
            required={required}
            onChange={(e) => onChange && onChange(e.target.value, e)}
            disabled={isDisabled}
            className="peer hidden"
          />
          <label
            htmlFor={optionId}
            className={clsx(
              "flex items-center px-4 gap-4 border border-gray-200 rounded-lg cursor-pointer text-base font-medium transition-all duration-300",
              optionDescription ? "h-16" : "h-14",
              isChecked
                ? "bg-white text-gray-900 ring-2 ring-gray-900 "
                : "bg-gray-50 text-gray-900",
              isDisabled ? "opacity-50 cursor-not-allowed" : "",
            )}
          >
            {/* <div className="flex items-center"> */}
            <div
              className={clsx(
                currentSize.container,
                "border-2 rounded-full flex items-center justify-center transition-all duration-200",

                isChecked
                  ? "border-gray-900 bg-gray-900"
                  : "border-gray-200 hover:border-gray-900",
              )}
            >
              {isChecked && (
                <div className={`${currentSize.dot} bg-white rounded-full`} />
              )}
            </div>
            {optionDescription ? (
              <div className="flex flex-col items-start justify-start text-gray-900 font-medium font-poppins gap-1">
                <span>{optionLabel}</span>
                <span className="text-sm font-normal text-gray-400">
                  {optionDescription}
                </span>
              </div>
            ) : (
              <div className="text-gray-900 font-medium font-poppins">
                <span>{optionLabel}</span>
              </div>
            )}
          </label>
        </div>
      );
    }

    if (variant === "button") {
      return (
        <div key={optionValue} className="relative flex-1 whitespace-nowrap ">
          <input
            type="radio"
            id={optionId}
            name={name}
            value={optionValue}
            checked={isChecked}
            required={required}
            onChange={(e) => onChange && onChange(e.target.value, e)}
            disabled={isDisabled}
            className="peer hidden"
          />
          <label
            htmlFor={optionId}
            className={clsx(
              "flex items-center justify-center px-4 h-14 gap-2 border border-gray-200 rounded-lg cursor-pointer text-base font-medium transition-all duration-300 delay-150",
              isChecked
                ? "bg-white text-gray-900 ring-2 ring-gray-900 "
                : "bg-gray-50 text-gray-900",
              isDisabled ? "opacity-50 cursor-not-allowed" : "",
            )}
          >
            {optionIcon && (
              <HugeiconsIcon icon={optionIcon} size={24} strokeWidth={2} />
            )}
            {optionLabel}
          </label>
        </div>
      );
    }

    // Default variant
    return (
      <div key={optionValue} className={clsx("relative flex items-center")}>
        <input
          type="radio"
          id={optionId}
          name={name}
          value={optionValue}
          checked={isChecked}
          required={required}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          disabled={isDisabled}
          className="peer hidden"
        />
        <label
          htmlFor={optionId}
          className={clsx(
            "flex items-center cursor-pointer gap-4 font-poppins text-base font-medium w-full",
            optionDescription ? "h-14" : "h-8",
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
          )}
        >
          <div
            className={clsx(
              currentSize.container,
              "border-2 rounded-full flex items-center justify-center transition-all duration-200",

              isChecked
                ? "border-gray-900 bg-gray-900"
                : "border-gray-200 hover:border-gray-900",
            )}
          >
            {isChecked && (
              <div className={`${currentSize.dot} bg-white rounded-full`} />
            )}
          </div>
          {/* <span className="text-gray-900">{optionLabel}</span> */}
          {optionDescription ? (
            <div className="flex flex-col items-start justify-start text-gray-900 font-medium font-poppins gap-1">
              <span>{optionLabel}</span>
              <span className="text-sm font-normal text-gray-400">
                {optionDescription}
              </span>
            </div>
          ) : (
            <div className="text-gray-900 font-medium font-poppins">
              <span>{optionLabel}</span>
            </div>
          )}
        </label>
      </div>
    );
  };

  return (
    <div className="w-full" {...props}>
      {label && <div className="sr-only">{label}</div>}

      <div
        className={clsx(
          direction === "horizontal"
            ? "flex flex-wrap gap-4 w-full"
            : "space-y-4",
        )}
      >
        {options.map(renderOption)}
      </div>
    </div>
  );
}

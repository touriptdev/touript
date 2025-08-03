import { Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

export default function CheckboxInput({
  label,
  options = [],
  value = [],
  onChange,
  name,
  disabled = false,
  direction = "vertical",
  required = false,
  selectAll = false,
  variant = "default",
  size = "md",
  ...props
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const handleSingleChange = (optionValue, checked) => {
    let newValue;
    if (checked) {
      newValue = [...value, optionValue];
    } else {
      newValue = value.filter((v) => v !== optionValue);
    }
    onChange && onChange(newValue);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allValues = options.map((option) =>
        typeof option === "object" ? option.value : option
      );
      onChange && onChange(allValues);
    } else {
      onChange && onChange([]);
    }
  };

  const isAllSelected =
    options.length > 0 &&
    options.every((option) => {
      const optionValue = typeof option === "object" ? option.value : option;
      return value.includes(optionValue);
    });

  const isSomeSelected = value.length > 0 && !isAllSelected;

  const CheckIcon = () => (
    <HugeiconsIcon
      icon={Tick01Icon}
      size={16}
      strokeWidth={2}
      className="text-white"
    />
  );

  const renderOption = (option, index) => {
    const optionValue = typeof option === "object" ? option.value : option;
    const optionLabel = typeof option === "object" ? option.label : option;
    const optionIcon = typeof option === "object" ? option.icon : option;
    const optionDescription =
      typeof option === "object" ? option.description : option;
    const optionDisabled = typeof option === "object" ? option.disabled : false;
    const optionId = `${name}-${index}`;
    const isChecked = value.includes(optionValue);
    const isDisabled = disabled || optionDisabled;

    if (variant === "switch") {
      return (
        <div
          key={optionValue}
          className="relative flex items-center justify-between"
        >
          {/* <span className="text-gray-800 font-medium">{optionLabel}</span> */}
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

          <input
            type="checkbox"
            id={optionId}
            checked={isChecked}
            required={required}
            onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
            disabled={isDisabled}
            className="absolute opacity-0 w-0 h-0"
          />
          <div className="flex items-center justify-end gap-2">
            {isChecked ? (
              <span className="font-medium font-poppins text-emerald-500">
                On
              </span>
            ) : (
              <span className="font-medium font-poppins text-gray-400">
                Off
              </span>
            )}

            <label
              htmlFor={optionId}
              className={`relative inline-flex h-8 w-14 items-center rounded-full cursor-pointer transition-colors duration-200
              ${isChecked ? "bg-emerald-500" : "bg-gray-200"}
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200
              ${isChecked ? "translate-x-7" : "translate-x-1"}`}
              />
            </label>
          </div>
        </div>
      );
    }

    if (variant === "card") {
      return (
        <div key={optionValue} className="relative w-full">
          <input
            type="checkbox"
            id={optionId}
            checked={isChecked}
            required={required}
            onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
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
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <div
              className={clsx(
                currentSize,
                "border-2 rounded-md flex items-center justify-center transition-all duration-200",
                isChecked
                  ? "border-gray-900 bg-gray-900"
                  : "border-gray-200 hover:border-gray-900"
              )}
            >
              {isChecked && <CheckIcon />}
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
        <div key={optionValue} className="relative">
          <input
            type="checkbox"
            id={optionId}
            checked={isChecked}
            required={required}
            onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
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
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {optionIcon && 
            <HugeiconsIcon icon={optionIcon} size={24} strokeWidth={2} />}
            {optionLabel}
          </label>
        </div>
      );
    }

    // Default variant
    return (
      <div key={optionValue} className="relative flex items-center">
        <input
          type="checkbox"
          id={optionId}
          checked={isChecked}
          required={required}
          onChange={(e) => handleSingleChange(optionValue, e.target.checked)}
          disabled={isDisabled}
          className="peer hidden"
        />
        <label
          htmlFor={optionId}
          className={clsx(
            "flex items-center cursor-pointer gap-4 font-poppins text-base font-medium w-full",
            optionDescription ? "h-14" : "h-8",
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          <div
            className={clsx(
              currentSize,
              "border-2 rounded-md flex items-center justify-center transition-all duration-200",
              isChecked
                ? "border-gray-900 bg-gray-900"
                : "border-gray-200 hover:border-gray-900"
            )}
          >
            {isChecked && <CheckIcon />}
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
  };

  return (
    <div className="w-full" {...props}>
      {label && <div className="sr-only">{label}</div>}

      <div
        className={clsx(
          direction === "horizontal" ? "flex flex-wrap gap-4 w-full" : "space-y-4"
        )}
      >
        {/* Select All option */}
        {selectAll && options.length > 0 && (
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <input
              type="checkbox"
              id={`${name}-select-all`}
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              disabled={disabled}
              className="peer hidden"
            />
            <label
              htmlFor={`${name}-select-all`}
              className={clsx(
                "flex items-center cursor-pointer",
                disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              <div
                className={clsx(
                  currentSize,
                  "border-2 rounded mr-3 flex items-center justify-center transition-all duration-200",
                  isAllSelected || isSomeSelected
                    ? "border-gray-900 bg-gray-900"
                    : "border-gray-200 hover:border-gray-900 transition-colors duration-200"
                )}
              >
                {isAllSelected && <CheckIcon />}
                {isSomeSelected && !isAllSelected && (
                  <div className="w-2 h-0.5 bg-white"></div>
                )}
              </div>
              <span className="text-gray-900 font-medium select-none">
                Select All
              </span>
            </label>
          </div>
        )}

        {options.map(renderOption)}
      </div>
    </div>
  );
}

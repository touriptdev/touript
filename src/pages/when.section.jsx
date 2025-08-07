import React, { forwardRef, useState } from "react";
import AirportForm from "../components/airport";
import { CalendarRangeInput, RadioInput } from "../components/forms";

import { CancelCircleIcon } from "@hugeicons/core-free-icons";

import {
  ArrowRight04Icon,
  ArrowDataTransferHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const When = forwardRef((props, ref) => {
  const [travelDates, setTravelDates] = useState({
    departureDate: null,
    returnDate: null,
  });

  const handleDepartureClear = () => {
    setTravelDates({
      departureDate: null,
      returnDate: null,
    });
  };

  const handleReturnClear = () => {
    setTravelDates((prevDates) => ({
      ...prevDates,
      returnDate: null,
    }));
  };
  return (
    <div
      ref={ref}
      className={`font-poppins flex flex-col gap-2 px-8 py-8 font-medium`}
    >
      {/* Header */}
      <div className="font-poppins flex w-full flex-col items-center justify-start gap-1 border-b border-gray-200 pb-4 text-gray-900">
        <span className="text-lg">When are you traveling</span>
        <span className="text-sm font-normal text-gray-500">
          Pick the dates that work for your travel plans
        </span>
      </div>
      {/* Form */}
      {/* <div className="flex w-full items-start justify-between gap-8 py-4"> */}
        <div className="flex w-full flex-col items-start py-4">
          <CalendarRangeInput
            label="travelDates"
            // name="travel-dates"
            value={travelDates}
            onChange={setTravelDates}
            // placeholder="Select your travel period"
          />

          <div className="flex w-full items-center justify-between gap-8">
            {/* Departure */}
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
              <span className="text-sm text-gray-500 uppercase">
                Departure Date
              </span>

              <div className="flex items-center justify-end gap-2 transition-all delay-150 duration-300">
                {travelDates.departureDate !== null && (
                  <>
                    <span className="text-sm text-gray-900">
                      {travelDates.departureDate.toDateString()}
                    </span>

                    <button
                      onClick={handleDepartureClear}
                      className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-gray-900"
                    >
                      <HugeiconsIcon
                        icon={CancelCircleIcon}
                        size={16}
                        strokeWidth={2}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Return */}
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
              <span className="text-sm text-gray-500 uppercase">
                Arrival/Return Date
              </span>

              <div className="flex items-center justify-end gap-2 transition-all duration-300">
                {travelDates.returnDate !== null && (
                  <>
                    <span className="text-sm text-gray-900">
                      {travelDates.returnDate.toDateString()}
                    </span>

                    <button
                      onClick={handleReturnClear}
                      className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-gray-900"
                    >
                      <HugeiconsIcon
                        icon={CancelCircleIcon}
                        size={16}
                        strokeWidth={2}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
});

export default When;

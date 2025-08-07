import React, { forwardRef, useState } from "react";
import AirportForm from "../components/airport";
import { RadioInput } from "../components/forms";

import {
  ArrowRight04Icon,
  ArrowDataTransferHorizontalIcon,
} from "@hugeicons/core-free-icons";

const routeOptions = [
  { value: "oneway", label: "One Way" },
  { value: "roundway", label: "Round Way" },
  { value: "multicity", label: "Multi City" },
];

const coachOptions = [
  { value: "eco", label: "Economy" },
  { value: "premEco", label: "Premium Economy" },
  { value: "busi", label: "Business Class" },
  { value: "first", label: "First Class" },
];

const Where = forwardRef((props, ref) => {
  const [route, setRoute] = useState(null);
  const [coach, setCoach] = useState(null);
  // const [isRouteSelected, setIsRouteSelected] = useState(false);

  return (
    <div
      ref={ref}
      className={`font-poppins flex flex-col gap-2 px-8 py-8 font-medium`}
    >
      {/* Header */}
      <div className="font-poppins flex w-full flex-col items-center justify-start gap-1 border-b border-gray-200 pb-4 text-gray-900">
        <span className="text-lg">What is your travel plan</span>
        <span className="text-sm font-normal text-gray-500">
          Tell us how you want to fly
        </span>
      </div>
      {/* Form */}
      <div className="flex w-full items-start justify-between gap-8 py-4">
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-sm text-gray-500 uppercase">
            Route Information
          </span>
          <RadioInput
            label="route"
            options={routeOptions}
            value={route}
            onChange={(val) => {
              setRoute(val);
              // setIsRouteSelected(true);
            }}
            name="route"
            variant="card"
          />
        </div>

        <div className="w-px self-stretch bg-gray-200"></div>
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-sm text-gray-500 uppercase">
            Coach Information
          </span>
          <RadioInput
            label="coach"
            options={coachOptions}
            value={coach}
            onChange={setCoach}
            name="coach"
            variant="card"
          />
        </div>
      </div>
    </div>
  );
});

export default Where;

import React, { forwardRef, useState } from "react";
import AirportForm from "../components/airport";
import { CounterInput, RadioInput } from "../components/forms";

import {
  ArrowRight04Icon,
  ArrowDataTransferHorizontalIcon,
} from "@hugeicons/core-free-icons";

// const routeOptions = [
//   { value: "oneway", label: "One Way" },
//   { value: "roundway", label: "Round Way" },
//   { value: "multicity", label: "Multi City" },
// ];

const guestOptions = [
  {
    value: "adults",
    label: "Adults",
    description: "Ages 13 or above",
    min: 1,
    max: 10,
  },
  {
    value: "children",
    label: "Children",
    description: "Ages 2-12",
    min: 0,
    max: 8,
  },
  {
    value: "infants",
    label: "Infants",
    description: "Under 2 years",
    min: 0,
    max: 4,
  },
];

const Who = forwardRef((props, ref) => {
  // const [route, setRoute] = useState(null);
  // const [coach, setCoach] = useState(null);
  // const [isRouteSelected, setIsRouteSelected] = useState(false);

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // const getTotalcounts = () => {
  //   return guests.adults + guests.children + guests.infants;
  // };

  return (
    <div
      ref={ref}
      className={`font-poppins flex flex-col gap-2 px-8 py-8 font-medium`}
    >
      {/* Header */}
      <div className="font-poppins flex w-full flex-col items-center justify-start gap-1 border-b border-gray-200 pb-4 text-gray-900">
        <span className="text-lg">Who is traveling with you</span>
        <span className="text-sm font-normal text-gray-500">
          Every seat tells a story, we’ve got everyone covered
        </span>
      </div>
      {/* Form */}
      <div className="flex w-full items-start justify-between gap-8 py-4">
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-sm text-gray-500 uppercase">
            Passenger Information 
            {/* {guests.adults + guests.children + guests.infants} */}
          </span>
          <CounterInput
            options={guestOptions}
            value={guests}
            onChange={setGuests}
          />
        </div>
      </div>
    </div>
  );
});

export default Who;

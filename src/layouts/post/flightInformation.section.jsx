import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import {
  AirplaneTakeOff01Icon,
  AirplaneLanding01Icon,
  ArrowRight04Icon,
} from "@hugeicons/core-free-icons";

export default function FlightInformation({
  departureIcon = AirplaneTakeOff01Icon,
  departureDate = "Jan 01",
  departureAirport = "JFK",
  departureAirline = "",
  routeIcon = ArrowRight04Icon,
  arrivalAirline = "",
  arrivalIcon = AirplaneLanding01Icon,
  arrivalDate = "Dec 31",
  arrivalAirport = "LAX",
  diffrentAirline = false,
}) {
  return (
    <div className="flex w-full items-center justify-center ">
      {/* Departure Information */}
      <div className="font-poppins flex w-full flex-1 items-center justify-start gap-2 font-medium whitespace-nowrap text-gray-900">
        <HugeiconsIcon
          icon={departureIcon}
          size={24}
          strokeWidth={2}
          className="text-gray-400"
        />
        {departureDate && (
          <span className="text-gray-500">{departureDate}</span>
        )}
        {departureAirport && <span>{departureAirport}</span>}
      </div>
      {/* Route & Airlines Information */}
      <div className="font-poppins flex w-full items-center justify-center gap-2 font-medium text-gray-900">
        <img
          src={departureAirline}
          // src={departureAirline || "/images/communityPlaceholder.jpg"}
          alt="Departure Airline image"
          className="h-6 w-18 rounded-lg object-contain"
        />
        <HugeiconsIcon
          icon={routeIcon}
          size={24}
          strokeWidth={2}
          className="text-gray-400"
        />
        {diffrentAirline && (
          <img
            src={arrivalAirline}
            alt="Departure Airline image"
            className={clsx(
              "h-6 w-18 rounded-lg object-contain",
              diffrentAirline ? "" : "hidden",
            )}
          />
        )}
      </div>
      {/* Arrival Information */}
      <div className="font-poppins flex w-full flex-1 items-center justify-end gap-2 font-medium whitespace-nowrap text-gray-900">
        {arrivalAirport && <span>{arrivalAirport}</span>}
        {arrivalDate && <span className="text-gray-500">{arrivalDate}</span>}
        <HugeiconsIcon
          icon={arrivalIcon}
          size={24}
          strokeWidth={2}
          className="text-gray-400"
        />
      </div>
    </div>
  );
}

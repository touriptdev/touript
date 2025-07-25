import AirportForm from "../components/airport";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  SearchAreaIcon,
  ArrowDataTransferHorizontalIcon,
  AirplaneTakeOff01Icon,
  ArrowRight04Icon,
  Calendar03Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import IconButton from "../components/buttons/iconButton.components";
import { useState } from "react";

export default function BookNow() {
  const tabs = [
    {
      label: "What",
      primaryIcon: SearchAreaIcon,
      primaryText: "Round",
      secondaryIcon: ArrowDataTransferHorizontalIcon,
      secondaryText: "Economy",
    },
    {
      label: "Where",
      primaryIcon: AirplaneTakeOff01Icon,
      primaryText: "From",
      secondaryIcon: ArrowRight04Icon,
      secondaryText: "To",
    },
    {
      label: "When",
      primaryIcon: Calendar03Icon,
      primaryText: "Departure",
      secondaryIcon: ArrowRight04Icon,
      secondaryText: "Return",
    },
    {
      label: "Who",
      primaryIcon: UserIcon,
      primaryText: "Number of Persons",
      secondaryIcon: null,
      secondaryText: "",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <div className="flex items-center justify-center">
      <div className="w-6xl h-22 relative flex items-center justify-center px-1 py-1 bg-white hover:bg-gray-50 rounded-lg drop-shadow-2xl hover:drop-shadow-none drop-shadow-gray-200 border-1 border-gray-100">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            // className="h-full w-full font-poppins relative hover:bg-white hover:rounded-lg hover:drop-shadow-xl hover:drop-shadow-gray-200 cursor-pointer "
            className={`h-full font-poppins relative flex items-center hover:bg-white hover:rounded-lg hover:drop-shadow-xl hover:drop-shadow-gray-200 cursor-pointer ${idx === 3 ? "flex-[1.2]" : "flex-1"}`}
          >
            <div className="flex items-center pl-8 gap-2">
              <HugeiconsIcon
                icon={tab.primaryIcon}
                size={24}
                strokeWidth={2}
                className="text-gray-400"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-xs text-gray-700">
                  {tab.label}
                </span>
                <div className="flex items-center justify-start text-base gap-1 text-gray-900 font-medium">
                  <span className="font-normal text-gray-700">
                    {tab.primaryText}
                  </span>

                  {tab.secondaryIcon && (
                    <HugeiconsIcon
                      icon={tab.secondaryIcon}
                      size={16}
                      strokeWidth={2}
                      className="text-gray-400"
                    />
                  )}
                  <span className="font-normal text-gray-700">
                    {tab?.secondaryText}
                  </span>
                </div>
              </div>
              {idx !== 3 && (
                <div className="absolute right-0 top-1/3 w-px h-6 bg-gray-200" />
              )}
            </div>
          </button>
        ))}

        <button className="absolute right-4"> 
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center w-12 h-12">
            <HugeiconsIcon
              icon={Search01Icon}
              size={24}
              className="text-white"
              strokeWidth={2}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Search01Icon,
  SearchAreaIcon,
  ArrowDataTransferHorizontalIcon,
  AirplaneTakeOff01Icon,
  ArrowRight04Icon,
  Calendar03Icon,
  UserIcon,
  CircleArrowUpRightIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

import clsx from "clsx";

import { SlideWrapper } from "./slideWrapper";
import { ResponsiveModal } from "../layouts";
import { EditProfile, WritePostReviewRecom } from "./modal";
import Who from "./who.section";
import What from "./what.section";
import Where from "./where.section";
import When from "./when.section";
import LightweightSpaceshipGame from "./LightweightSpaceshipGame";

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
    },
  ];

  const leftCities = [
    {
      name: "New York",
      country: "United States of America",
      image:
        "https://images.unsplash.com/photo-1639775722393-6bd891bae010?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
    {
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sydney",
      country: "Australia",
      image:
        "https://images.unsplash.com/photo-1734007929985-ced7bdd53843?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "London",
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Dubai",
      country: "United Arab Emirates",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const rightCities = [
    {
      name: "Rome",
      country: "Italy",
      image:
        "https://images.unsplash.com/photo-1575540668264-4485aacd78c3?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Barcelona",
      country: "Spain",
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Singapore",
      country: "Singapore",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2104&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bangkok",
      country: "Thailand",
      image:
        "https://images.unsplash.com/photo-1668107710159-10fbbab2a9dd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Cape Town",
      country: "South Africa",
      image:
        "https://images.unsplash.com/photo-1591742708307-ce49d19450d4?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Define widths for each menu when active (in pixels)
  const menuWidths = {
    0: 672, // What ( Route & Coach )
    1: 900, // Where ( From & To )
    2: 900, // When ( Departure & Arrival )
    3: 448, // Who ( Adult & Children )
  };

  const [active, setActive] = useState(null);
  const [hoverRect, setHoverRect] = useState({
    highlightLeft: 0,
    highlightWidth: 0,
    menuLeft: 0,
    // menuWidth: 600,
  });
  const [popoverHeight, setPopoverHeight] = useState(0);

  const tabRefs = useRef([]);
  const menuRefs = useRef([]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tabRefs.current.every((ref) => !ref?.contains(e.target)) &&
        !e.target.closest(".popover-content")
      ) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Observe height changes
  useEffect(() => {
    if (active === null) return;
    const el = menuRefs.current[active];
    if (!el) return;

    const observer = new ResizeObserver(() =>
      setPopoverHeight(el.offsetHeight),
    );
    observer.observe(el);
    setPopoverHeight(el.offsetHeight);

    return () => observer.disconnect();
  }, [active]);

  const handleTabClick = (idx) => {
    const tabEl = tabRefs.current[idx];
    const parentRect = tabEl?.parentNode.getBoundingClientRect();
    const tabRect = tabEl?.getBoundingClientRect();

    if (!tabRect || !parentRect) return;

    const desiredWidth = menuWidths[idx] || parentRect.width;
    const maxWidth = parentRect.width; // prevent overflow
    const menuWidth = Math.min(desiredWidth, maxWidth);

    // Calculate center position
    const tabCenter = tabRect.left - parentRect.left + tabRect.width / 2;
    let menuLeft = tabCenter - menuWidth / 2;

    // Clamp so it stays inside parent
    const minLeft = 0; // parent left edge
    const maxLeft = parentRect.width - menuWidth; // parent right edge
    menuLeft = Math.max(minLeft, Math.min(menuLeft, maxLeft));

    setHoverRect({
      highlightLeft: tabRect.left - parentRect.left,
      highlightWidth: tabRect.width,
      menuLeft,
      menuWidth,
    });

    setActive(idx);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex w-full flex-col items-center justify-center bg-gray-50 pt-30"

        // style={{ backgroundImage: "url('../../public/images/booknowBackground.jpg')" }}
      >
        <h1 className="font-poppins w-xl text-center text-6xl leading-18 font-extrabold text-gray-900">
          Visit the places with your <span className="">comfort</span>
        </h1>
        <div className="flex items-center justify-center pt-11 pb-16">
          <div
            className={clsx(
              "relative flex h-22 max-w-5xl items-center justify-center rounded-lg px-1 py-1",
              active !== null
                ? "border border-gray-200 bg-gray-100 shadow-none"
                : "border border-white bg-white shadow-xl shadow-gray-200",
            )}
          >
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => handleTabClick(idx)}
                ref={(el) => (tabRefs.current[idx] = el)}
                className={clsx(
                  "font-poppins relative z-1 flex h-full min-w-57 cursor-pointer items-center rounded-lg px-4 hover:bg-gray-100",
                  idx === 3 ? "pr-20" : "",
                  active === idx && "hover:bg-transparent",
                )}
              >
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={tab.primaryIcon}
                    size={24}
                    strokeWidth={2}
                    className="text-gray-400"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-gray-700">
                      {tab.label}
                    </span>
                    <div className="flex items-center gap-1 text-base font-medium text-gray-900">
                      <span className="font-normal text-gray-700">
                        {tab.primaryText}
                      </span>
                      {tab.secondaryIcon && (
                        <>
                          <HugeiconsIcon
                            icon={tab.secondaryIcon}
                            size={16}
                            strokeWidth={2}
                            className="text-gray-400"
                          />
                          <span className="font-normal text-gray-700">
                            {tab.secondaryText}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Highlight background */}
            {active !== null && (
              <div
                // className="absolute z-0 h-20 rounded-lg bg-white shadow-xl shadow-gray-200 transition-all duration-300"
                className={clsx(
                  "absolute z-0 h-20 rounded-lg bg-white shadow-xl shadow-gray-200 transition-all duration-300", // smooth morph for movement
                  popoverHeight === 0
                    ? "scale-50 opacity-0"
                    : "scale-100 opacity-100", // pop-in only
                )}
                style={{
                  left: `${hoverRect.highlightLeft}px`,
                  width: `${hoverRect.highlightWidth}px`,
                }}
              />
            )}

            {/* Popover Menu */}
            {/* Popover Menu */}
            {active !== null && (
              <div
                className={`popover-content absolute top-20 pt-6 transition-all duration-300 ${popoverHeight === 0 ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
                style={{
                  left: `${hoverRect.menuLeft}px`,
                  width: `${hoverRect.menuWidth}px`,
                }}
              >
                <div
                  className="rounded-lg bg-white shadow-2xl shadow-gray-200 transition-all duration-300"
                  style={{
                    height: popoverHeight || "auto",
                  }}
                >
                  <SlideWrapper index={0} active={active}>
                    <What ref={(el) => (menuRefs.current[0] = el)} />
                  </SlideWrapper>
                  <SlideWrapper index={1} active={active}>
                    <Where ref={(el) => (menuRefs.current[1] = el)} />
                  </SlideWrapper>
                  <SlideWrapper index={2} active={active}>
                    <When ref={(el) => (menuRefs.current[2] = el)} />
                  </SlideWrapper>
                  <SlideWrapper index={3} active={active}>
                    <Who ref={(el) => (menuRefs.current[3] = el)} />
                  </SlideWrapper>
                </div>
              </div>
            )}

            {/* Search Button */}
            <button className="absolute right-4 z-10 cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={24}
                  strokeWidth={2}
                  className="text-white"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <section className="flex w-7xl flex-col items-center justify-center py-50">
        {/* FarFable Header */}
        <div className="flex w-full items-end justify-between">
          <h3 className="font-poppins flex flex-col items-start gap-4 text-start font-bold">
            <div className="flex flex-col items-start justify-start gap-1 text-2xl font-normal text-gray-400 lowercase">
              <span>Connecting with</span>
              <span>Travelers Like Never Before</span>
            </div>

            <span className="text-6xl font-extrabold text-gray-900">
              - Farfable
            </span>
          </h3>
          <button className="h-14 cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-xl hover:shadow-gray-200">
            <span className="font-medium">Join The Farfable Community </span>
          </button>
        </div>

        {/* Bento Grid */}

        <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="h-160 w-full rounded-lg bg-gray-100 sm:w-140"></div>

          <div className="flex h-160 w-full flex-col items-center gap-4 rounded-lg border-gray-200">
            <div className="flex h-full w-full items-center justify-between gap-4 rounded-lg border-gray-200">
              <div className="h-full w-full rounded-lg border-gray-200 bg-gray-100"></div>
              <div className="h-full w-full rounded-lg border-gray-200 bg-gray-100"></div>
            </div>
            <div className="h-full w-full rounded-lg border-gray-200 bg-gray-50"></div>
          </div>
        </div>
      </section>

      <section className="flex w-full items-center justify-center bg-neutral-950 py-50">
        <div className="flex w-7xl flex-col items-center justify-center">
          {/* FarFable Header */}

          <h3 className="font-poppins flex flex-col items-center justify-center gap-4 text-center font-bold">
            <span className="text-2xl font-normal text-gray-400 lowercase">
              Top Cities to
            </span>
            <span className="text-6xl font-extrabold text-white capitalize">
              Fly to Right Now
            </span>
          </h3>

          {/* City Grid */}
          <div className="mt-16 flex h-176 w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex h-full w-full flex-col items-center justify-end gap-4">
              {leftCities.map((city, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between rounded-lg bg-neutral-900 px-4 py-4"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="h-18 w-18 rounded-lg"
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-lg font-medium text-white">
                        {city.name}
                      </span>
                      <span className="text-sm font-normal text-gray-400">
                        {city.country}
                      </span>
                    </div>
                  </div>

                  <button className="cursor-pointer text-gray-400 hover:text-white">
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={24}
                      strokeWidth={2}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-gray-200 px-8 py-8">
              <div className="flex w-sm items-center justify-center overflow-x-auto gap-4">
                <div className="flex flex-col w-full items-center justify-center rounded-lg bg-white px-8 py-8">
                  <img
                    src="https://images.unsplash.com/photo-1583743220494-3da91330c2fd?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="card Image"
                    className="h-full w-full rounded-lg shadow-2xl shadow-gray-400"
                  />
                  <div className="flex w-full flex-col items-start gap-1 pt-4">
                    <span className="text-xl font-medium text-gray-900">
                      San Francisco
                    </span>
                    <span className="text-base font-normal text-gray-400">
                      California, United States of America
                    </span>
                  </div>
                </div>

                <div className="flex flex-col  w-full items-center justify-center rounded-lg bg-white px-8 py-8">
                  <img
                    src="https://images.unsplash.com/photo-1583743220494-3da91330c2fd?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="card Image"
                    className="h-full w-full rounded-lg shadow-2xl shadow-gray-400"
                  />
                  <div className="flex w-full flex-col items-start gap-1 pt-4">
                    <span className="text-xl font-medium text-gray-900">
                      San Francisco
                    </span>
                    <span className="text-base font-normal text-gray-400">
                      California, United States of America
                    </span>
                  </div>
                </div>
                
              </div>

              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-white">
                <button className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-gray-900">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>

            <div className="flex h-full w-full flex-col items-center justify-end gap-4">
              {rightCities.map((city, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between rounded-lg bg-neutral-900 px-4 py-4"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="h-18 w-18 rounded-lg"
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-lg font-medium text-white">
                        {city.name}
                      </span>
                      <span className="text-sm font-normal text-gray-400">
                        {city.country}
                      </span>
                    </div>
                  </div>

                  <button className="cursor-pointer text-gray-400 hover:text-white">
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={24}
                      strokeWidth={2}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <LightweightSpaceshipGame /> */}
    </div>
  );
}

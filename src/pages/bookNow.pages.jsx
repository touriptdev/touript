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
} from "@hugeicons/core-free-icons";

import clsx from "clsx";

import { SlideWrapper } from "./slideWrapper";
import { ResponsiveModal } from "../layouts";
import { EditProfile, WritePostReviewRecom } from "./modal";
import Who from "./who.section";
import What from "./what.section";
import Where from "./where.section";
import When from "./when.section";

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
  const [openModal, setOpenModal] = useState(null);

  const toggleModal = (modalType) => {
    setOpenModal((prev) => (prev === modalType ? null : modalType));
  };

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
    <div>
      <div className="flex items-center justify-center bg-gray-50 py-16">
        <div
          className={clsx(
            "relative flex h-22 max-w-5xl items-center justify-center rounded-lg  px-1 py-1",
            active !== null
              ? "bg-gray-100 shadow-none border border-gray-200"
              : "bg-white shadow-xl shadow-gray-200 border border-white",
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

      <div className="flex cursor-pointer items-center gap-8">
        <button onClick={() => toggleModal("edit")}>Edit Profile</button>
        <button onClick={() => toggleModal("write")}>Write</button>
      </div>

      {openModal === "edit" && (
        <ResponsiveModal onClose={() => setOpenModal(null)}>
          <EditProfile onClose={() => setOpenModal(null)} />
        </ResponsiveModal>
      )}

      {openModal === "write" && (
        <ResponsiveModal onClose={() => setOpenModal(null)}>
          <WritePostReviewRecom onClose={() => setOpenModal(null)} />
        </ResponsiveModal>
      )}
    </div>
  );
}

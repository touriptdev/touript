// import { HugeiconsIcon } from "@hugeicons/react";
// import {
//   Search01Icon,
//   SearchAreaIcon,
//   ArrowDataTransferHorizontalIcon,
//   AirplaneTakeOff01Icon,
//   ArrowRight04Icon,
//   Calendar03Icon,
//   UserIcon,
// } from "@hugeicons/core-free-icons";

// import { useEffect, useRef, useState } from "react";
// import Menu0 from "./menu0";
// import clsx from "clsx";
// import Menu1 from "./menu1";
// import Menu2 from "./menu2";
// import { SlideWrapper } from "./slideWrapper";

// export default function BookNow() {
//   const tabs = [
//     {
//       label: "What",
//       primaryIcon: SearchAreaIcon,
//       primaryText: "Round",
//       secondaryIcon: ArrowDataTransferHorizontalIcon,
//       secondaryText: "Economy",
//     },
//     {
//       label: "Where",
//       primaryIcon: AirplaneTakeOff01Icon,
//       primaryText: "From",
//       secondaryIcon: ArrowRight04Icon,
//       secondaryText: "To",
//     },
//     {
//       label: "When",
//       primaryIcon: Calendar03Icon,
//       primaryText: "Departure",
//       secondaryIcon: ArrowRight04Icon,
//       secondaryText: "Return",
//     },
//     {
//       label: "Who",
//       primaryIcon: UserIcon,
//       primaryText: "Number of Persons",
//       secondaryIcon: null,
//       secondaryText: "",
//     },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         tabRefs.current.every((ref) => !ref?.contains(e.target)) &&
//         !e.target.closest(".popover-content")
//       ) {
//         setActive(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [active, setActive] = useState(null);
//   const [hoverRect, setHoverRect] = useState({ left: 0, width: 0 });
//   const tabRefs = useRef([]);
//   const [popoverHeight, setPopoverHeight] = useState(null);
//   const menuRefs = useRef([]);

//   // useEffect(() => {
//   //   if (active !== null) {
//   //     const menuElement = menuRefs.current[active];
//   //     if (menuElement) {
//   //       setPopoverHeight(menuElement.offsetHeight);
//   //     }
//   //   }
//   // }, [active]);
//   useEffect(() => {
//   if (active !== null && menuRefs.current[active]) {
//     const element = menuRefs.current[active];
//     const resizeObserver = new ResizeObserver(() => {
//       setPopoverHeight(element.offsetHeight);
//     });

//     resizeObserver.observe(element);

//     // Set initial height immediately
//     setPopoverHeight(element.offsetHeight);

//     return () => resizeObserver.disconnect();
//   }
// }, [active]);

//   return (
//     <div className="flex items-center justify-center">
//       <div
//         className={clsx(
//           "w-6xl h-22 relative flex items-center justify-center px-1 py-1 rounded-lg shadow-gray-200 border-1 border-gray-100",
//           active !== null ? "bg-gray-50" : "bg-white",
//           active !== null ? "shadow-none" : "shadow-xl"
//         )}
//       >
//         {tabs.map((tab, idx) => (
//           <button
//             key={idx}
//             onClick={() => {
//               const tabEl = tabRefs.current[idx];
//               const tabRect = tabEl.getBoundingClientRect();
//               const parentRect =
//                 tabRefs.current[0].parentNode.getBoundingClientRect();

//               const menuWidth = 600;
//               const tabCenter =
//                 tabRect.left - parentRect.left + tabRect.width / 2;
//               let menuLeft = tabCenter - menuWidth / 2;
//               menuLeft = Math.max(
//                 0,
//                 Math.min(menuLeft, parentRect.width - menuWidth)
//               );

//               setHoverRect({
//                 highlightLeft: tabRect.left - parentRect.left,
//                 highlightWidth: tabRect.width,
//                 menuLeft,
//                 menuWidth,
//               });

//               setActive(idx === active ? null : idx);

//               // const menuElement = menuRefs.current[idx];
//               // if (menuElement) {
//               //   setPopoverHeight(menuElement.offsetHeight);
//               // }
//             }}
//             ref={(el) => (tabRefs.current[idx] = el)}
//             className={`z-1 h-full font-poppins relative flex items-center cursor-pointer rounded-lg hover:bg-gray-100 ${
//               idx === 3 ? "flex-[1.2]" : "flex-1"
//             } ${active === idx ? "hover:bg-transparent" : ""}`}
//           >
//             <div className="flex items-center pl-8 gap-2">
//               <HugeiconsIcon
//                 icon={tab.primaryIcon}
//                 size={24}
//                 strokeWidth={2}
//                 className="text-gray-400"
//               />
//               <div className="flex flex-col items-start">
//                 <span className="font-semibold text-xs text-gray-700">
//                   {tab.label}
//                 </span>
//                 <div className="flex items-center justify-start text-base gap-1 text-gray-900 font-medium">
//                   <span className="font-normal text-gray-700">
//                     {tab.primaryText}
//                   </span>

//                   {tab.secondaryIcon && (
//                     <HugeiconsIcon
//                       icon={tab.secondaryIcon}
//                       size={16}
//                       strokeWidth={2}
//                       className="text-gray-400"
//                     />
//                   )}
//                   <span className="font-normal text-gray-700">
//                     {tab?.secondaryText}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </button>
//         ))}
//         {active !== null && (
//           <div
//             className="absolute h-20 bg-white overflow-hidden rounded-lg shadow-xl shadow-gray-200 transition-all duration-400 z-0"
//             style={{
//               left: `${hoverRect.highlightLeft}px`,
//               width: `${hoverRect.highlightWidth}px`,
//             }}
//           />
//         )}

//         {active !== null && (
//           <div
//             style={{
//               left: `${hoverRect.menuLeft}px`,
//               // width: `${hoverRect.menuWidth}px`,
//               // height: popoverHeight,
//             }}
//             className={clsx(
//               "popover-content absolute top-20 pt-6 max-w-xl duration-300",
//               active !== null
//                 ? "opacity-100"
//                 : "opacity-0 pointer-events-none"
//             )}
//           >
//             <div
//               className="bg-white rounded-lg shadow-xl shadow-gray-200 transition-all duration-300"
//               style={{
//                 // left: `${hoverRect.menuLeft}px`,
//                 width: `${hoverRect.menuWidth}px`,
//                 height: popoverHeight || 0,

//               }}
//             >
//               <SlideWrapper index={0} active={active}>
//                 <Menu0 ref={(element) => (menuRefs.current[0] = element)} />
//               </SlideWrapper>

//               <SlideWrapper index={1} active={active}>
//                 <Menu1 ref={(element) => (menuRefs.current[1] = element)} />
//               </SlideWrapper>

//               <SlideWrapper index={2} active={active}>
//                 <Menu2 ref={(element) => (menuRefs.current[2] = element)} />
//               </SlideWrapper>

//               <SlideWrapper index={3} active={active}>
//                 <Menu0 ref={(element) => (menuRefs.current[3] = element)} />
//               </SlideWrapper>
//             </div>
//           </div>
//         )}

//         <button className="absolute right-4 z-100 cursor-pointer">
//           <div className="bg-emerald-500 rounded-full flex items-center justify-center w-12 h-12">
//             <HugeiconsIcon
//               icon={Search01Icon}
//               size={24}
//               className="text-white"
//               strokeWidth={2}
//             />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }

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
import Menu0 from "./menu0";
import Menu1 from "./menu1";
import Menu2 from "./menu2";
import { SlideWrapper } from "./slideWrapper";
import { ResponsiveModal } from "../layouts";
import EditProfile from "./editProfile.pages";

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

  const [active, setActive] = useState(null);
  const [hoverRect, setHoverRect] = useState({
    highlightLeft: 0,
    highlightWidth: 0,
    menuLeft: 0,
    menuWidth: 600,
  });
  const [popoverHeight, setPopoverHeight] = useState(0);

  const tabRefs = useRef([]);
  const menuRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
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
      setPopoverHeight(el.offsetHeight)
    );
    observer.observe(el);
    setPopoverHeight(el.offsetHeight); // Set initial height

    return () => observer.disconnect();
  }, [active]);

  const handleTabClick = (idx) => {
    const tabEl = tabRefs.current[idx];
    const parentRect = tabEl?.parentNode.getBoundingClientRect();
    const tabRect = tabEl?.getBoundingClientRect();

    if (!tabRect || !parentRect) return;

    const menuWidth = 600;
    const tabCenter = tabRect.left - parentRect.left + tabRect.width / 2;
    const menuLeft = Math.max(
      0,
      Math.min(tabCenter - menuWidth / 2, parentRect.width - menuWidth)
    );

    setHoverRect({
      highlightLeft: tabRect.left - parentRect.left,
      highlightWidth: tabRect.width,
      menuLeft,
      menuWidth,
    });

    setActive(active === idx ? null : idx);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div
          className={clsx(
            "max-w-5xl  h-22 relative flex items-center justify-center px-1 py-1 rounded-lg border border-gray-100",
            active !== null
              ? "bg-gray-50 shadow-none"
              : "bg-white shadow-xl shadow-gray-200"
          )}
        >
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleTabClick(idx)}
              ref={(el) => (tabRefs.current[idx] = el)}
              className={clsx(
                "z-1 px-4 h-full min-w-57 font-poppins relative flex items-center cursor-pointer rounded-lg hover:bg-gray-100",
                idx === 3 ? "pr-20" : "",
                active === idx && "hover:bg-transparent"
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
                  <span className="font-semibold text-xs text-gray-700">
                    {tab.label}
                  </span>
                  <div className="flex items-center gap-1 text-base text-gray-900 font-medium">
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
              className="absolute h-20 bg-white rounded-lg shadow-xl shadow-gray-200 transition-all duration-300 z-0"
              style={{
                left: `${hoverRect.highlightLeft}px`,
                width: `${hoverRect.highlightWidth}px`,
              }}
            />
          )}

          {/* Popover Menu */}
          {active !== null && (
            <div
              className="popover-content absolute top-20 pt-6 max-w-xl duration-300"
              style={{ left: hoverRect.menuLeft }}
            >
              <div
                className="bg-white rounded-lg shadow-2xl shadow-gray-300 transition-all duration-300"
                style={{
                  width: hoverRect.menuWidth,
                  height: popoverHeight || 0,
                }}
              >
                <SlideWrapper index={0} active={active}>
                  <Menu0 ref={(el) => (menuRefs.current[0] = el)} />
                </SlideWrapper>
                <SlideWrapper index={1} active={active}>
                  <Menu1 ref={(el) => (menuRefs.current[1] = el)} />
                </SlideWrapper>
                <SlideWrapper index={2} active={active}>
                  <Menu2 ref={(el) => (menuRefs.current[2] = el)} />
                </SlideWrapper>
                <SlideWrapper index={3} active={active}>
                  <Menu0 ref={(el) => (menuRefs.current[3] = el)} />
                </SlideWrapper>
              </div>
            </div>
          )}

          {/* Search Button */}
          <button className="absolute right-4 z-10 cursor-pointer">
            <div className="bg-emerald-500 rounded-full w-12 h-12 flex items-center justify-center">
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

      <button onClick={toggleModal}>Edit Profile</button>

      {isModalOpen && (
        <ResponsiveModal onClose={toggleModal}>
          <EditProfile onClose={toggleModal} />
        </ResponsiveModal>
      )}
    </div>
  );
}

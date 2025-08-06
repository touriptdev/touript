import { ModalHeader } from "../../layouts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PropertyEditIcon,
  QuoteUpIcon,
  AiIdeaIcon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  PostSection,
  RecommendationSection,
  ReviewSection,
} from "../../layouts/write";

const writeTabs = [
  {
    Icon: PropertyEditIcon,
    Text: "Post",
  },
  {
    Icon: QuoteUpIcon,
    Text: "Review",
  },
  {
    Icon: AiIdeaIcon,
    Text: "Recommendation",
  },
];

export default function WritePostReviewRecom({ onClose }) {
  const tabRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [hoverRect, setHoverRect] = useState({
    highlightLeft: 0,
    highlightWidth: 0,
    menuLeft: 0,
  });

  useEffect(() => {
    const tabEl = tabRefs.current[active];
    const parentRect = tabEl?.parentNode.getBoundingClientRect();
    const tabRect = tabEl?.getBoundingClientRect();

    if (tabEl && parentRect && tabRect) {
      const tabCenter = tabRect.left - parentRect.left;
      const menuLeft = Math.max(0, Math.min(tabCenter, parentRect.width));

      setHoverRect({
        highlightLeft: tabRect.left - parentRect.left,
        highlightWidth: tabRect.width,
        menuLeft,
      });
    }
  }, []);

  const handleTabClick = (idx) => {
    const tabEl = tabRefs.current[idx];
    const parentRect = tabEl?.parentNode.getBoundingClientRect();
    const tabRect = tabEl?.getBoundingClientRect();

    if (!tabRect || !parentRect) return;
    const tabCenter = tabRect.left - parentRect.left;
    const menuLeft = Math.max(0, Math.min(tabCenter, parentRect.width));

    setHoverRect({
      highlightLeft: tabRect.left - parentRect.left,
      highlightWidth: tabRect.width,
      menuLeft,
    });

    // setActive(active === idx ? null : idx);
    setActive(idx);
  };
  return (
    <div className="w-full font-poppins">
      {/* Header */}
      <ModalHeader title="Compose" onClose={onClose} />
      {/* Tab Navigation */}
      <div
        className={clsx(
          "w-full h-20 sm:h-18 relative flex items-center justify-start px-1 py-1 border border-gray-100",
          active !== null
            ? "bg-gray-50 shadow-none"
            : "bg-white shadow-xl shadow-gray-200",
        )}
      >
        {writeTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => handleTabClick(idx)}
            ref={(el) => (tabRefs.current[idx] = el)}
            className={clsx(
              "flex items-center justify-center z-1 px-4 h-full w-full font-poppins relative  cursor-pointer rounded-lg gap-2 hover:bg-gray-100",
              active === idx && "hover:bg-transparent",
            )}
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 transition-all duration-300 delay-150">
              <HugeiconsIcon
                icon={tab.Icon}
                size={24}
                strokeWidth={2}
                className={clsx(
                  "transition-all duration-300 delay-150",
                  active === idx ? "text-gray-900" : "text-gray-400",
                )}
              />
              <span
                className={clsx(
                  "text-sm sm:text-base font-medium transition-all duration-300 delay-150",
                  active === idx ? "text-gray-900" : "text-gray-400",
                )}
              >
                {tab.Text}
              </span>
            </div>
          </button>
        ))}

        {/* Highlight background */}
        {active !== null && (
          <div
            className="absolute h-18 sm:h-16 bg-white rounded-lg shadow-xl shadow-gray-200 transition-all duration-300 delay-100 z-0"
            style={{
              left: `${hoverRect.highlightLeft}px`,
              width: `${hoverRect.highlightWidth}px`,
            }}
          />
        )}
      </div>
      {/* Content for Each Tab */}

      <main className="flex items-center justify-center w-full transition-all duration-300 delay-150">
        {active === 0 && <PostSection />}

        {active === 1 && <ReviewSection />}

        {active === 2 && <RecommendationSection />}
      </main>
    </div>
  );
}

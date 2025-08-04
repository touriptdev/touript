import { useEffect, useState } from "react";

import {
  Search01Icon,
  HonourStarIcon,
  PropertyAddIcon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
// import Post from "../layouts/post";
import clsx from "clsx";
import { SearchSelect } from "../../components/forms";

export default function LargeScreenSearchNav() {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const searchOptions = [
    { id: 1, label: "United States of America", value: "usa" },
    { id: 2, label: "Bangladesh", value: "bd" },
    { id: 3, label: "India", value: "ind" },
    { id: 4, label: "Pakistan", value: "pak" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // shrink after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={clsx(
        "sticky top-0 z-10 font-poppins bg-gray-50 pt-4 pb-8 transition-all duration-300 delay-50",
        isScrolled ? "w-2xl" : "w-full"
      )}
    >
      <div className="flex items-center justify-center w-full gap-8">
        {/* Search bar */}
        <div
          onClick={() => setIsScrolled(false)}
          className={clsx(
            "flex items-center justify-start bg-white transition-all duration-300",
            isScrolled ? "w-lg" : "w-2xl"
          )}
        >
          <SearchSelect
            label="search"
            labelIcon={Search01Icon}
            options={searchOptions}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Action buttons */}
        <div
          role="toolbar"
          aria-label="Flight actions"
          className="flex items-center justify-center w-sm min-w-sm gap-4 font-medium "
        >
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full whitespace-nowrap h-14 text-gray-900 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer hover:border-white hover:bg-white hover:shadow-lg hover:shadow-gray-200 transition-all duration-300 delay-150"
          >
            <HugeiconsIcon
              icon={HonourStarIcon}
              size={24}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="">Flight Ratings</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full whitespace-nowrap h-14 text-white bg-emerald-600  rounded-lg cursor-pointer hover:bg-emerald-500  hover:shadow-lg ghover:shadow-gray-200 transition-all duration-300 delay-150"
          >
            <HugeiconsIcon
              icon={PropertyAddIcon}
              size={24}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="">Compose</span>
          </button>
        </div>
      </div>
    </section>
  );
}

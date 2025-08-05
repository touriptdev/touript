import { useState } from "react";
import { SearchSelect } from "../components/forms";
import {
  Search01Icon,
  HonourStarIcon,
  PropertyAddIcon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Post from "../layouts/post";
import LargeScreenSearchNav from "../layouts/post/largeScreenSearchNav";

export default function FarFable() {
  const [search, setSearch] = useState("");

  const searchOptions = [
    { id: 1, label: "United States of America", value: "usa" },
    { id: 2, label: "Bangladesh", value: "bd" },
    { id: 3, label: "India", value: "ind" },
    { id: 4, label: "Pakistan", value: "pak" },
  ];

  return (
    <section className="bg-gray-50">
      <section className="sticky top-0 z-10 font-poppins w-full bg-gray-50 px-6 sm:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center w-full">
          {/* Search bar */}

          <div className=" flex items-center justify-center w-full min-w-sm sm:w-2xl gap-4 py-8 bg-gray-50">
            <SearchSelect
              label="search"
              labelIcon={Search01Icon}
              options={searchOptions}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="button"
              className="flex items-center justify-center px-4 w-14 h-14 text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-emerald-500 hover:shadow-lg ghover:shadow-gray-200 transition-all duration-300 delay-150 sm:hidden"
            >
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={24}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Action buttons */}
          <div
            role="toolbar"
            aria-label="Flight actions"
            className="flex items-center justify-end w-full min-w-sm sm:w-sm gap-4 font-medium pb-8"
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

      <section className="hidden sm:flex items-center justify-center w-full sticky top-0 z-10 bg-gray-50">
        <LargeScreenSearchNav />
      </section>

      <main className="flex items-center justify-center w-full py-8 gap-8 bg-white">
        <div className="flex flex-col items-center justify-center">
          <Post />
        </div>
        <aside className="hidden sm:flex items-center justify-center w-sm gap-4 font-medium">
          Side Bar
        </aside>
      </main>
    </section>
  );
}

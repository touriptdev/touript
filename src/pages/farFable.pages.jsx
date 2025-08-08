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
      <section className="font-poppins sticky top-0 z-10 w-full bg-gray-50 px-6 sm:hidden">
        <div className="flex w-full flex-col items-center justify-center sm:flex-row">
          {/* Search bar */}

          <div className="flex w-full min-w-sm items-center justify-center gap-4 bg-gray-50 py-8 sm:w-2xl">
            <SearchSelect
              label="search"
              labelIcon={Search01Icon}
              options={searchOptions}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="button"
              className="ghover:shadow-gray-200 flex h-14 w-14 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 px-4 text-gray-900 transition-all delay-150 duration-300 hover:bg-emerald-500 hover:shadow-lg sm:hidden"
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
            className="flex w-full min-w-sm items-center justify-end gap-4 pb-8 font-medium sm:w-sm"
          >
            <button
              type="button"
              className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 whitespace-nowrap text-gray-900 transition-all delay-150 duration-300 hover:border-white hover:bg-white hover:shadow-lg hover:shadow-gray-200"
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
              className="ghover:shadow-gray-200 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 whitespace-nowrap text-white transition-all delay-150 duration-300 hover:bg-emerald-500 hover:shadow-lg"
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

      <section className="sticky top-0 z-10 hidden w-full items-center justify-center bg-gray-50 sm:flex">
        <LargeScreenSearchNav />
      </section>

      <main className="flex w-full items-center justify-center gap-8 bg-white py-8">
        <div className="flex flex-col items-center justify-center">
          <Post />
        </div>
        <aside className="hidden w-sm items-center justify-center gap-4 font-medium sm:flex">
          Side Bar
        </aside>
      </main>
    </section>
  );
}

{
  /* 

  const [openModal, setOpenModal] = useState(null);
  
    const toggleModal = (modalType) => {
      setOpenModal((prev) => (prev === modalType ? null : modalType));
    };
  
  
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
      )} */
}

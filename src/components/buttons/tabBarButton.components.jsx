import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router-dom";

export default function TabBarButton({ iconName, iconText, iconLink }) {
  const baseClass =
    "flex flex-col items-center justify-center h-full py-2 gap-2 transition-all delay-150 duration-300 font-poppins";

  const activeClass = "text-emerald-500 ";
  const inactiveClass = "text-gray-500   hover:text-emerald-500 ";
  return (
    <NavLink
      to={iconLink}
      className={({ isActive }) =>
        `${baseClass} ${isActive ? activeClass : inactiveClass}`
      }
    >
      <HugeiconsIcon icon={iconName} size={24} strokeWidth={2} />
      <span className="text-xs">{iconText}</span>
    </NavLink>
  );
}

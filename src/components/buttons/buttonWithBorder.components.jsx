// import { HugeiconsIcon } from "@hugeicons/react";
// import { Link, NavLink } from "react-router-dom";

// /**
//  * ButtonWithBorder component:
//  * - Uses NavLink if `useNavLink` is true
//  * - Defaults to Link otherwise
// */

// export default function ButtonWithBorder({
//   iconText,
//   iconName,
//   iconLink,
//   useNavLink = false,
// }) {
//   const baseClass =
//     "flex items-center text-sm h-full py-4 gap-2 border-b-2 font-medium font-poppins";

//   const activeClass = "text-emerald-500 border-emerald-500";
//   const inactiveClass =
//     "text-gray-500  border-transparent hover:text-emerald-500 hover:border-emerald-500";

//   if (useNavLink) {
//     return (
//       <NavLink
//         to={iconLink}
//         className={({ isActive }) =>
//           `${baseClass} ${isActive ? activeClass : inactiveClass}`
//         }
//       >
//         {iconName && (
//           <HugeiconsIcon icon={iconName} size={24} strokeWidth={2} />
//         )}
//         <span>{iconText}</span>
//       </NavLink>
//     );
//   }

//   return (
//     <Link to={iconLink} className={`${baseClass} ${inactiveClass}`}>
//       {iconName && <HugeiconsIcon icon={iconName} size={24} strokeWidth={2} />}
//       <span>{iconText}</span>
//     </Link>
//   );
// }



import { HugeiconsIcon } from "@hugeicons/react";
import { Link, NavLink } from "react-router-dom";

/**
 * ButtonWithBorder:
 * - Optional NavLink
 * - Used in top navigation bar
 * - No border: indicator handled externally
 */
export default function ButtonWithBorder({
  iconText,
  iconName,
  iconLink,
  useNavLink = false,
}) {
  const baseClass =
    "flex items-center text-sm h-full py-4 px-2 gap-2 font-medium font-poppins transition-colors";

  const activeClass = "text-emerald-500";
  const inactiveClass = "text-gray-500 hover:text-emerald-500";

  if (useNavLink) {
    return (
      <NavLink
        to={iconLink}
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        {iconName && <HugeiconsIcon icon={iconName} size={24} strokeWidth={2} />}
        <span>{iconText}</span>
      </NavLink>
    );
  }

  return (
    <Link to={iconLink} className={`${baseClass} ${inactiveClass}`}>
      {iconName && <HugeiconsIcon icon={iconName} size={24} strokeWidth={2} />}
      <span>{iconText}</span>
    </Link>
  );
}


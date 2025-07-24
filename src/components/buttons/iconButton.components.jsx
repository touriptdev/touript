import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";

function IconButton({
  buttonSize,
  iconSize,
  iconName,
  bgColor,
  iconColor,
  iconLink,
}) {
  return (
    <Link to={iconLink}>
      <div
        className={`w-${buttonSize} h-${buttonSize} ${bgColor} rounded-full flex items-center justify-center`}
      >
        <HugeiconsIcon icon={iconName} size={iconSize} className={iconColor} strokeWidth={2}/>
      </div>
    </Link>
  );
}

export default IconButton;

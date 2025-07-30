import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function ModalHeader({ title, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  const toggleClose = () => {
    // Close modal via state
    if (onClose) {
      onClose();
    } else {
      // Fallback route-based close
      navigate(backgroundLocation || "/");
    }
  };

  return (
    <div className="flex items-center justify-between w-full relative border-b-1 border-gray-200 pb-4">
      {/* Close Button */}
      <button
        onClick={toggleClose}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 delay-150 hover:bg-gray-50 cursor-pointer"
      >
        <HugeiconsIcon
          icon={CancelCircleIcon}
          size={24}
          className="text-gray-700 hover:text-gray-900"
          strokeWidth={2}
        />
      </button>
      {/* heading of section */}
      <h5 className="absolute left-1/2 my-auto -translate-x-1/2 flex-1 text-center font-medium text-xl lg:text-lg text-gray-900 font-poppins">
        {title}
      </h5>
    </div>
  );
}

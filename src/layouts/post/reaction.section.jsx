import { useState, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalCircle01Icon } from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function ReactionSection({ value, onChange, reactionOptions }) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(value || null);
  const timerRef = useRef(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => setShowReactions(true), 400); // hold for menu
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
    if (!showReactions) {
      // quick click = default first reaction
      const defaultReaction = reactionOptions[0];
      setSelectedReaction(defaultReaction);
      onChange?.(defaultReaction);
    }
  };

  const handleReactionClick = (reaction) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
    onChange?.(reaction);
  };

  return (
    <main className="relative inline-block">
      {/* Main button */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none h-14 w-44 border-b-2 border-transparent hover:border-gray-900"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => clearTimeout(timerRef.current)}
      >
        {selectedReaction ? (
          <HugeiconsIcon
            icon={selectedReaction.icon}
            size={24}
            strokeWidth={2}
            className={clsx(
              selectedReaction ? `${selectedReaction.color}` : "text-gray-900"
            )}
          />
        ) : (
          <HugeiconsIcon
            icon={MoreVerticalCircle01Icon}
            size={24}
            strokeWidth={2}
          />
        )}
        <span
          className={clsx(
            selectedReaction ? `${selectedReaction.color}` : "text-gray-900"
          )}
        >
          {selectedReaction ? selectedReaction.label : "Like"}
        </span>
      </div>

      {/* Reaction menu */}
      {showReactions && (
        <div className="absolute bottom-full mb-2 left-0 flex gap-2 bg-gray-50 border border-gray-200 p-2 rounded-lg shadow-2xl shadow-gray-300">
          {reactionOptions.map((reaction) => (
            <button
              key={reaction.id}
              className="flex flex-col items-center justify-evenly gap-1 transition-transform cursor-pointer"
              onClick={() => handleReactionClick(reaction)}
            >
              <div
                className={clsx(
                  "flex items-center justify-center w-11 h-11 rounded-full  hover:bg-white hover:shadow-md transition-all duration-300",
                  reaction.color === "text-emerald-600" &&
                    "hover:text-emerald-600",
                  reaction.color === "text-teal-600" && "hover:text-teal-600",
                  reaction.color === "text-pink-600" && "hover:text-pink-600",
                  reaction.color === "text-blue-600" && "hover:text-blue-600",
                  reaction.color === "text-purple-600" &&
                    "hover:text-purple-600",
                  reaction.color === "text-red-600" && "hover:text-red-600"
                )}
              >
                <HugeiconsIcon icon={reaction.icon} size={28} strokeWidth={2} />
              </div>
              <span className="text-xs font-poppins font-medium text-gray-400 capitalize">
                {reaction.value}
              </span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

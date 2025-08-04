import {
  ThumbsUpEllipseIcon,
  LaughingIcon,
  FavouriteCircleIcon,
  DollarCircleIcon,
  AiBrain01Icon,
  AngryIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalCircle01Icon } from "@hugeicons/core-free-icons";
import ReactionSection from "./reaction.section";
import { useState } from "react";

export default function Post({
  //   memberImage = "",
  //   communityImage = "",
  communityName = ">communityname<",
  memberUsername = "@memberusername",
  postTime = "2:45PM",
  postTitle = "Hidden Paradise in Bali – Nusa Penida Travel Experience",
  //   postType = "",
  postDescription = "Hey fellow travelers! ✈️ I just got back from Nusa Penida, a breathtaking island off the coast of Bali, and I had to share my experience! 🏖️ . We rented a scooter from the harbor and explored Kelingking Beach, Broken Beach, and Angel’s Billabong. The cliffs are insane, and the views are straight out of a postcard. The roads are a bit rough, so be prepared for a bumpy ride 😅 — but totally worth it!",
  // postReactions = [],
  // postComments = [],
  // postShare = "",
}) {
    const [reaction, setReaction] = useState(null);
  const reactionOptions = [
    { id: 1, label: "liked", value: "like", icon: ThumbsUpEllipseIcon, color:"text-emerald-600" },
    { id: 2, label: "laughed", value: "laugh", icon: LaughingIcon, color:"text-teal-600" },
    { id: 3, label: "loved", value: "love", icon: FavouriteCircleIcon, color:"text-pink-600" },
    { id: 4, label: "budgetly", value: "budgetly", icon: DollarCircleIcon, color:"text-blue-600" },
    { id: 5, label: "insightful", value: "insightful", icon: AiBrain01Icon, color:"text-purple-600" },
    { id: 6, label: "angry", value: "angry", icon: AngryIcon, color:"text-red-600" },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-2xl bg-white font-poppins">
      <div className="flex items-center justify-between  w-full">
        {communityName && (
          <div className="flex items-center justify-start gap-2">
            <div className="w-11 h-11 bg-gray-200 rounded-lg"></div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold text-sm text-gray-900">
                {communityName}
              </span>
              <span className="font-normal text-sm text-gray-500">
                {memberUsername}
              </span>
            </div>
          </div>
        )}

        {!communityName && (
          <div className="flex items-center justify-start gap-2">
            <div className="w-11 h-11 border-2 border-gray-200 rounded-full flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold text-sm text-gray-900">
                {memberUsername}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 text-sm text-gray-500 font-poppins">
          <time dateTime={postTime}>{postTime}</time>
          <button className="cursor-pointer">
            <HugeiconsIcon
              icon={MoreVerticalCircle01Icon}
              size={24}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      <main className="flex flex-col items-start justify-center gap-4">
        <div className="flex flex-col items-start justify-center w-full my-4 gap-4 text-gray-900 font-poppins">
          <h5 className="font-semibold text-lg">{postTitle}</h5>
          <span className="text-sm/7 text-gray-700">{postDescription}</span>
        </div>

        <div className="flex items-center justify-between w-full h-11 font-poppins font-medium text-gray-900">
          <div className="flex flex-col sm:flex-row items-center justify-start gap-2 h-11">
            <ReactionSection value={reaction} onChange={(e)=>setReaction(e)} reactionOptions={reactionOptions}/>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-start px-4 gap-2 h-11">
            <HugeiconsIcon
              icon={MoreVerticalCircle01Icon}
              size={24}
              strokeWidth={2}
            />
            <span>Comment</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-start px-4 gap-2 h-11">
            <HugeiconsIcon
              icon={MoreVerticalCircle01Icon}
              size={24}
              strokeWidth={2}
            />
            <span>Share</span>
          </div>
        </div>
      </main>
    </section>
  );
}

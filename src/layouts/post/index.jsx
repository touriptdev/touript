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
  memberImage = "https://plus.unsplash.com/premium_photo-1682095669766-fba591bd2ca9?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  communityImage = "https://images.unsplash.com/photo-1706026803368-d84389566a80?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   communityName = ">communityname<",
  communityName = "",
  memberUsername = "@memberusername",
  postTime = "2:45PM",
  postTitle = "Hidden Paradise in Bali – Nusa Penida Travel Experience",
  postType = "review",
  postDescription = "Hey fellow travelers! ✈️ I just got back from Nusa Penida, a breathtaking island off the coast of Bali, and I had to share my experience! 🏖️ . We rented a scooter from the harbor and explored Kelingking Beach, Broken Beach, and Angel’s Billabong. The cliffs are insane, and the views are straight out of a postcard. The roads are a bit rough, so be prepared for a bumpy ride 😅 — but totally worth it!",
  // postReactions = [],
  // postComments = [],
  // postShare = "",
}) {
  const [reaction, setReaction] = useState(null);
  const reactionOptions = [
    {
      id: 1,
      label: "liked",
      value: "like",
      icon: ThumbsUpEllipseIcon,
      color: "text-emerald-600",
    },
    {
      id: 2,
      label: "laughed",
      value: "laugh",
      icon: LaughingIcon,
      color: "text-teal-600",
    },
    {
      id: 3,
      label: "loved",
      value: "love",
      icon: FavouriteCircleIcon,
      color: "text-pink-600",
    },
    {
      id: 4,
      label: "budgetly",
      value: "budgetly",
      icon: DollarCircleIcon,
      color: "text-blue-600",
    },
    {
      id: 5,
      label: "insightful",
      value: "insightful",
      icon: AiBrain01Icon,
      color: "text-purple-600",
    },
    {
      id: 6,
      label: "angry",
      value: "angry",
      icon: AngryIcon,
      color: "text-red-600",
    },
  ];

  return (
    <section className="font-poppins flex w-2xl flex-col items-center justify-center bg-white">
      <div className="flex w-full items-center justify-between">
        {communityName && (
          <div className="flex items-center justify-start gap-2">
            <img
              src={communityImage || "/images/communityPlaceholder.jpg"}
              alt="Community image"
              className="h-11 w-11 rounded-lg bg-gray-200 object-cover"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {communityName}
              </span>
              <span className="text-sm font-normal text-gray-500">
                {memberUsername}
              </span>
            </div>
          </div>
        )}

        {!communityName && (
          <div className="flex items-center justify-start gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-200">
              <img
                src={memberImage || "/images/memberPlaceholder.jpg"}
                className="h-9 w-9 rounded-full bg-gray-200 object-cover"
              ></img>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {memberUsername}
              </span>
            </div>
          </div>
        )}
        <div className="font-poppins flex items-center justify-end gap-2 text-sm text-gray-500">
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
        {postType === "text" && (
          <div className="font-poppins my-4 flex w-full flex-col items-start justify-start gap-4 text-gray-900">
            <h5 className="text-lg font-semibold">{postTitle}</h5>
            <span className="text-sm/7 text-gray-700">{postDescription}</span>
          </div>
        )}

        {postType === "review" && (
          <div className="font-poppins my-4 flex w-full flex-col items-start justify-start gap-4 text-gray-900">
            <h5 className="text-lg font-semibold">{postTitle}</h5>
          </div>
        )}

        <div className="font-poppins flex h-11 w-full items-center justify-between font-medium text-gray-900">
          <div className="flex h-11 flex-col items-center justify-start gap-2 sm:flex-row">
            <ReactionSection
              value={reaction}
              onChange={(e) => setReaction(e)}
              reactionOptions={reactionOptions}
            />
          </div>

          <div className="flex h-11 flex-col items-center justify-start gap-2 px-4 sm:flex-row">
            <HugeiconsIcon
              icon={MoreVerticalCircle01Icon}
              size={24}
              strokeWidth={2}
            />
            <span>Comment</span>
          </div>
          <div className="flex h-11 flex-col items-center justify-start gap-2 px-4 sm:flex-row">
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

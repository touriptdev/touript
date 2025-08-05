import {
  ThumbsUpEllipseIcon,
  LaughingIcon,
  FavouriteCircleIcon,
  DollarCircleIcon,
  AiBrain01Icon,
  AngryIcon,
  QuoteUpIcon,
  AirplaneTakeOff01Icon,
  AirplaneTakeOff02Icon,
  AirplaneLanding01Icon,
  ArrowRight04Icon,
  ArrowDataTransferHorizontalIcon,
  AiIdeaIcon,
  StopCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalCircle01Icon } from "@hugeicons/core-free-icons";
import ReactionSection from "./reaction.section";
import { useState } from "react";
import FlightInformation from "./flightInformation.section";

export default function Post({
  memberImage = "https://plus.unsplash.com/premium_photo-1682095669766-fba591bd2ca9?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  communityImage = "https://images.unsplash.com/photo-1706026803368-d84389566a80?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  communityName = ">communityname<",
  // communityName = "",
  memberUsername = "@memberusername",
  postTime = "2:45PM",
  postTitle = "Hidden Paradise in Bali – Nusa Penida Travel Experience",
  postType = "recommendation",
  postDescription = "Hey fellow travelers! ✈️ I just got back from Nusa Penida, a breathtaking island off the coast of Bali, and I had to share my experience! 🏖️ . We rented a scooter from the harbor and explored Kelingking Beach, Broken Beach, and Angel’s Billabong. The cliffs are insane, and the views are straight out of a postcard. The roads are a bit rough, so be prepared for a bumpy ride 😅 — but totally worth it!",
  departureDate = "Jul 26, 25",
  arrivalDate = "Aug 6, 25",
  returnDate = "Aug 6, 25",
  cityOneDate = "Jul 27, 25",
  departureAirport = "SEA",
  arrivalAirport = "DAC",
  returnAirport = "DAC",
  cityOneAirport = "DXB",
  flightType = "multi",
  departureAirline = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Qatar_Airways_logo.svg/2560px-Qatar_Airways_logo.svg.png",
  diffrentAirline = false,
  arrivalAirline = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Turkish_Airlines_logo_2019_compact.svg/2560px-Turkish_Airlines_logo_2019_compact.svg.png",
  cityOneAirline = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Turkish_Airlines_logo_2019_compact.svg/2560px-Turkish_Airlines_logo_2019_compact.svg.png",
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

      <main className="flex w-full flex-col items-start justify-center gap-4">
        {postType === "text" && (
          <div className="font-poppins my-4 flex w-full flex-col items-start justify-center gap-4 text-gray-900">
            <h5 className="w-full text-lg font-semibold">{postTitle}</h5>
            <span className="w-full text-sm/7 text-gray-700">
              {postDescription}
            </span>
          </div>
        )}

        {postType === "review" && (
          <div className="font-poppins my-4 flex w-full flex-col items-start justify-center gap-4 text-gray-900">
            <h5 className="w-full text-lg font-semibold">{postTitle}</h5>
            <div className="w-full rounded-lg border border-gray-200 p-4">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl shadow-gray-200">
                    <HugeiconsIcon
                      icon={QuoteUpIcon}
                      size={24}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex w-full items-center justify-center gap-4 rounded-lg border border-gray-200 p-4">
                    {flightType === "one" && (
                      <FlightInformation
                        departureIcon={AirplaneTakeOff01Icon}
                        departureDate={departureDate}
                        departureAirport={departureAirport}
                        departureAirline={departureAirline}
                        routeIcon={ArrowRight04Icon}
                        arrivalAirline={arrivalAirline}
                        arrivalIcon={AirplaneLanding01Icon}
                        arrivalDate={arrivalDate}
                        arrivalAirport={arrivalAirport}
                        diffrentAirline={diffrentAirline}
                      />
                    )}

                    {flightType === "round" && (
                      <FlightInformation
                        departureIcon={AirplaneTakeOff01Icon}
                        departureDate={departureDate}
                        departureAirport={departureAirport}
                        departureAirline={departureAirline}
                        routeIcon={ArrowDataTransferHorizontalIcon}
                        arrivalAirline={arrivalAirline}
                        arrivalIcon={AirplaneTakeOff02Icon}
                        arrivalDate={returnDate}
                        arrivalAirport={returnAirport}
                        diffrentAirline={diffrentAirline}
                      />
                    )}

                    {/* Multicity Information */}
                    {flightType === "multi" && (
                      <div className="flex w-full flex-col items-center justify-center gap-4">
                        <FlightInformation
                          departureIcon={AirplaneTakeOff01Icon}
                          departureDate={departureDate}
                          departureAirport={departureAirport}
                          departureAirline={departureAirline}
                          routeIcon={ArrowRight04Icon}
                          // arrivalAirline={arrivalAirline}
                          arrivalIcon={StopCircleIcon}
                          arrivalDate={cityOneDate}
                          arrivalAirport={cityOneAirport}
                          diffrentAirline={false}
                        />
                        <FlightInformation
                          departureIcon={StopCircleIcon}
                          departureDate={cityOneDate}
                          departureAirport={cityOneAirport}
                          departureAirline={cityOneAirline}
                          routeIcon={ArrowRight04Icon}
                          // arrivalAirline={arrivalAirline}
                          arrivalIcon={AirplaneLanding01Icon}
                          arrivalDate={arrivalDate}
                          arrivalAirport={arrivalAirport}
                          diffrentAirline={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full text-center text-sm/7 text-gray-700">
                  {postDescription}
                </div>
              </div>
            </div>
          </div>
        )}

        {postType === "recommendation" && (
          <div className="font-poppins my-4 flex w-full flex-col items-start justify-center gap-4 text-gray-900">
            <h5 className="w-full text-lg font-semibold">{postTitle}</h5>
            <div className="w-full rounded-lg border border-gray-200 p-4">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl shadow-gray-200">
                    <HugeiconsIcon
                      icon={AiIdeaIcon}
                      size={24}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex w-full items-center justify-center gap-4 rounded-lg border border-gray-200 p-4">
                    <span className="font-poppins text-center font-semibold text-gray-900">
                      Asking for Recommendations
                    </span>
                  </div>
                </div>
                <div className="w-full text-center text-sm/7 text-gray-700">
                  {postDescription}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="font-poppins flex h-14 w-full items-center justify-between font-medium text-gray-900 border-b border-gray-200">
          <div className="flex h-14 flex-col items-center justify-start gap-2 sm:flex-row ">
            <ReactionSection
              value={reaction}
              onChange={(e) => setReaction(e)}
              reactionOptions={reactionOptions}
            />
          </div>

          <div className="flex h-14 flex-col items-center justify-start gap-2 px-4 sm:flex-row ">
            <HugeiconsIcon
              icon={MoreVerticalCircle01Icon}
              size={24}
              strokeWidth={2}
            />
            <span>Comment</span>
          </div>
          <div className="flex h-14 flex-col items-center justify-start gap-2 px-4 sm:flex-row">
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

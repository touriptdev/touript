import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultiple03Icon,
  Search01Icon,
  PropertyEditIcon,
  AiIdeaIcon,
  GridIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import {
  MultiImagesInput,
  MultiSelectTagInput,
  SearchSelect,
  TextAreaInput,
  TextInput,
} from "../../components/forms";

export default function RecommendationSection() {
  const [community, setCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState([]);

  const communityOptions = [
    { id: 1, label: ">seattleTour<", value: "seattletour" },
    { id: 2, label: ">newyorkTrip<", value: "newyorktrip" },
    { id: 3, label: ">bdtraveler<", value: "bdtraveler" },
  ];

  const tagOptions = [
    { id: 1, label: "#lovetravel", value: "#lovetravel" },
    { id: 2, label: "#places", value: "#places" },
    { id: 3, label: "#solotravel", value: "#solotravel" },
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      community,
      title,
      bodyText,
      tags,
    });
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full font-poppins gap-4 mt-8"
      onSubmit={handlePostSubmit}
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-start w-full ">
        <span className="text-lg font-medium text-gray-900">Ask a recommendation</span>
        <span className="text-base font-normal text-gray-500">
          Share your thoughts to get recommendation
        </span>
      </div>

      {/* Community */}
      <div className="flex flex-col items-center w-full py-4 gap-4">
        <div className="flex items-center gap-2 text-base font-poppins font-medium w-full">
          <HugeiconsIcon icon={UserMultiple03Icon} size={24} strokeWidth={2} />
          <span>Community</span>
        </div>

        <div className="w-full">
          <SearchSelect
            label="community"
            labelIcon={Search01Icon}
            options={communityOptions}
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            required={true}
          />
        </div>
      </div>

      {/* Write Post */}
      <div className="flex flex-col items-center w-full py-4 gap-4">
        <div className="flex items-center gap-2 text-base font-poppins font-medium w-full">
          <HugeiconsIcon icon={AiIdeaIcon} size={24} strokeWidth={2} />
          <span>Ask Recommendation</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          <TextInput
            label="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholderText="Write a title for the recommendation"
            useLabelIcon={false}
            required={true}
          />
          <TextAreaInput
            label="bodyText"
            useLabelIcon={false}
            value={bodyText}
            onChange={setBodyText}
            maxLength={500}
            placeholder="What are you interested in"
          />
        </div>
      </div>

      

      {/* Tags */}
      <div className="flex flex-col items-center w-full py-4 gap-4">
        <div className="flex items-center gap-2 text-base font-poppins font-medium w-full">
          <HugeiconsIcon icon={GridIcon} size={24} strokeWidth={2} />
          <span>
            Add Tags
            <span className="text-sm text-gray-400 font-normal p-2">
              (use comma “,” to separate tags)
            </span>
          </span>
        </div>

        <div className="w-full">
          <MultiSelectTagInput
            label="tags"
            useLabelIcon={false}
            options={tagOptions}
            value={tags}
            onChange={setTags}
            allowCustom={true}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-4">
        <button
          // onClick={onBack}
          className="bg-gray-200 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
        >
          <span className="text-gray-900">Cancel</span>
        </button>

        <button
          type="submit"
          className="bg-emerald-500 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
        >
          <span>Publish</span>
        </button>
      </div>
    </form>
  );
}

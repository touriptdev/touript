import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserMultiple03Icon,
  Search01Icon,
  QuoteUpIcon,
  Image02Icon,
  GridIcon,
  AirplaneModeIcon,
  AirportIcon,
  ArrowRight04Icon,
  ArrowDataTransferHorizontalIcon,
  Route01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import {
  CalendarSingleInput,
  CheckboxInput,
  DropdownSelect,
  MultiImagesInput,
  MultiSelectTagInput,
  RadioInput,
  SearchSelect,
  TextAreaInput,
  TextInput,
} from "../../components/forms";

export default function ReviewSection() {
  const [community, setCommunity] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [multiImage, setMultiImage] = useState("");
  const [tags, setTags] = useState([]);
  const [departureDate, setDepartureDate] = useState(null);
  const [airlines, setAirlines] = useState("");
  //   const [route, setRoute] = useState([]);
  const [routeRadio, setRouteRadio] = useState([]);
  //   console.log(route);
  console.log(routeRadio);

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

  const routeOptionsRadio = [
    {
      label: "One Way",
      value: "oneway",
      icon: ArrowRight04Icon,
      description: "Wonderful Oneway journey ahead",
    },
    {
      label: "Round Way",
      value: "roundway",
      icon: ArrowDataTransferHorizontalIcon,
      description: "We all love round way tour",
    },
    {
      label: "Multi City",
      value: "multicity",
      icon: Route01Icon,
      description: "You are an excelent traveler",
    },
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      community,
      bodyText,
      multiImage,
      tags,
    });
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full font-poppins gap-4 mt-8"
      onSubmit={handlePostSubmit}
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-start w-full">
        <span className="text-lg font-medium text-gray-900">
          Write a review
        </span>
        <span className="text-base font-normal text-gray-500">
          Share your travel experiences
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

      {/* Community */}
      <div className="flex flex-col items-center w-full py-4 gap-4 ">
        <div className="flex items-center gap-2 text-base font-poppins font-medium w-full">
          <HugeiconsIcon icon={UserMultiple03Icon} size={24} strokeWidth={2} />
          <span>Flight Details</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-8">
          <RadioInput
            label="radio"
            name="radio"
            options={routeOptionsRadio}
            value={routeRadio}
            onChange={setRouteRadio}
            variant="button"
            direction="horizontal"
          />

          {/* ))} */}
          <DropdownSelect
            label="airlines"
            value={airlines}
            onChange={(e) => setAirlines(e.target.value)}
            labelIcon={AirplaneModeIcon}
            options={[
              { value: "qatarAirways", label: "Qatar Airways" },
              { value: "female", label: "Emiretes" },
              { value: "other", label: "Other" },
              { value: "notDisclosed", label: "Not Preferred To Disclose" },
            ]}
          />
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <DropdownSelect
              label="departureAirport"
              value={airlines}
              placeholder="Departure Airport"
              onChange={(e) => setAirlines(e.target.value)}
              labelIcon={AirportIcon}
              options={[
                { value: "qatarAirways", label: "Qatar Airways" },
                { value: "female", label: "Emiretes" },
                { value: "other", label: "Other" },
                { value: "notDisclosed", label: "Not Preferred To Disclose" },
              ]}
            />

            <CalendarSingleInput
              label="departureDate"
              placeholder="Select a date or type in MM/DD/YYYY format"
              value={departureDate}
              quickDate={false}
              onChange={(date) => {
                setDepartureDate(date);
                console.log("Date changed:", date);
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <DropdownSelect
              label="arrivalAirport"
              value={airlines}
              placeholder="Arrival Airport"
              onChange={(e) => setAirlines(e.target.value)}
              labelIcon={AirportIcon}
              options={[
                { value: "qatarAirways", label: "Qatar Airways" },
                { value: "female", label: "Emiretes" },
                { value: "other", label: "Other" },
                { value: "notDisclosed", label: "Not Preferred To Disclose" },
              ]}
            />

            <CalendarSingleInput
              label="departureDate"
              placeholder="Select a date or type in MM/DD/YYYY format"
              value={departureDate}
              quickDate={false}
              onChange={(date) => {
                setDepartureDate(date);
                console.log("Date changed:", date);
              }}
            />
          </div>
        </div>
      </div>

      {/* Write Post */}
      <div className="flex flex-col items-center w-full py-4 gap-4">
        <div className="flex items-center gap-2 text-base font-poppins font-medium w-full">
          <HugeiconsIcon icon={QuoteUpIcon} size={24} strokeWidth={2} />
          <span>Write Review</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          <TextAreaInput
            label="bodyText"
            useLabelIcon={false}
            value={bodyText}
            onChange={setBodyText}
            maxLength={500}
            placeholder="Share your experience"
          />
        </div>
      </div>

      {/* Image */}
      <div className="flex flex-col items-center w-full py-4 gap-4">
        <div className="flex items-center gap-2 text-base font-poppins font-medium w-full">
          <HugeiconsIcon icon={Image02Icon} size={24} strokeWidth={2} />
          <span>Media Attachment</span>
        </div>

        <div className="w-full">
          <MultiImagesInput
            label="postAttachments"
            value={multiImage}
            cropShape="rect"
            cropHeight={1090}
            maxFiles={5}
            options={1090}
            onChange={(croppedUrl, file) => {
              setMultiImage(croppedUrl);
              console.log(croppedUrl);
              console.log(file);
            }}
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

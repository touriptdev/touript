import { useState } from "react";
import {
  DropdownSelect,
  EmailInput,
  MultiImagesInput,
  MultiSelectTagInput,
  PhoneNumberInput,
  PrivacyDropdownSelect,
  SearchSelect,
  SingleImageInput,
  TextAreaInput,
  TextInput,
} from "../components/forms";
import { ModalHeader } from "../layouts";
import {
  AppleIcon,
  UserLove01Icon,
  User02Icon,
  CircleIcon,
  GlobalIcon,
  SquareLock01Icon,
  Road02Icon,
  City01Icon,
  RealEstate02Icon,
  RoadLocation01Icon,
  GlobeIcon,
  Baby01Icon,
  Home03Icon,
  Backpack01Icon,
  FavouriteCircleIcon,
} from "@hugeicons/core-free-icons";

export default function EditProfile({ onClose }) {
  // const [fruit, setFruit] = useState(null);
  // const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [firstnamePrivacy, setFirstnamePrivacy] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnamePrivacy, setLastnamePrivacy] = useState("");
  const [gender, setGender] = useState("");
  const [genderPrivacy, setGenderPrivacy] = useState("");
  const [bio, setBio] = useState("");

  const [email, setEmail] = useState("");
  const [emailPrivacy, setEmailPrivacy] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberPrivacy, setPhoneNumberPrivacy] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddressPrivacy, setStreetAddressPrivacy] = useState("");
  const [city, setCity] = useState("");
  const [cityPrivacy, setCityPrivacy] = useState("");
  const [state, setState] = useState("");
  const [statePrivacy, setStatePrivacy] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodePrivacy, setZipCodePrivacy] = useState("");
  const [country, setCountry] = useState("");
  const [countryPrivacy, setCountryPrivacy] = useState("");

  const [birthCountry, setBirthCountry] = useState("");
  const [birthCountryPrivacy, setBirthCountryPrivacy] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCountryPrivacy, setCurrentCountryPrivacy] = useState("");
  const [visitedCountry, setVisitedCountry] = useState([]);
  const [visitedCountryPrivacy, setVisitedCountryPrivacy] = useState("");

  const [interest, setInterest] = useState([]);

  // const [multiImage, setMultiImage] = useState(null);

  const countryOptions = [
    { id: 1, label: "United States of America", value: "usa" },
    { id: 2, label: "Bangladesh", value: "bd" },
    { id: 3, label: "India", value: "ind" },
    { id: 4, label: "Pakistan", value: "pak" },
  ];

  const techOptions = [
    { id: 1, label: "JavaScript", value: "javascript" },
    { id: 2, label: "React", value: "react" },
    { id: 3, label: "Python", value: "python" },
  ];

  // const options = [
  //   { id: 1, label: "Apple", value: "apple" },
  //   { id: 2, label: "Banana", value: "banana" },
  //   { id: 3, label: "Cherry", value: "cherry" },
  //   { id: 4, label: "Date", value: "date" },
  //   { id: 5, label: "Elderberry", value: "elderberry" },
  //   { id: 6, label: "Fig", value: "fig" },
  //   { id: 7, label: "Grape", value: "grape" },
  //   { id: 8, label: "Honeydew", value: "honeydew" },
  //   { id: 9, label: "Kiwi", value: "kiwi" },
  //   { id: 10, label: "Lemon", value: "lemon" },
  //   { id: 11, label: "Mango", value: "mango" },
  //   { id: 12, label: "Orange", value: "orange" },
  // ];

  const privacyOptions = [
    { id: 1, value: "public", label: "Public", icon: GlobalIcon },
    { id: 2, value: "private", label: "Private", icon: SquareLock01Icon },
  ];
  const handleSignUpForm = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      image,
      firstname,
      firstnamePrivacy,
      lastname,
      lastnamePrivacy,
      gender,
      genderPrivacy,
      bio,
      email,
      emailPrivacy,
      phoneNumber,
      phoneNumberPrivacy,
      streetAddress,
      streetAddressPrivacy,
      city,
      cityPrivacy,
      state,
      statePrivacy,
      zipCode,
      zipCodePrivacy,
      country,
      countryPrivacy,
      birthCountry,
      birthCountryPrivacy,
      currentCountry,
      currentCountryPrivacy,
      visitedCountry,
      visitedCountryPrivacy,
      interest,
    });
  };

  return (
    <div className="font-poppins">
      {/* Header */}
      <ModalHeader title="Edit Profile" onClose={onClose} />

      <form onSubmit={handleSignUpForm}>
        <div className="flex flex-col items-center w-full py-4">
          <div className="flex items-center text-base font-poppins font-medium pb-4 w-full">
            Profile Photo
          </div>
          <SingleImageInput
            label="profilePhoto"
            value={image}
            cropShape="round"
            cropHeight={264}
            onChange={(croppedUrl, file) => {
              setImage(croppedUrl);
              console.log(file);
            }}
          />
        </div>

        <div className="flex flex-col items-center w-full py-4 gap-4">
          <div className="flex items-center text-base font-poppins font-medium w-full">
            About Me
          </div>
          {/* First Name */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                labelIcon={User02Icon}
                placeholderText="First Name"
                autocomplete="given-name"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="firstnamePrivacy"
                value={firstnamePrivacy}
                onChange={(e) => setFirstnamePrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                labelIcon={User02Icon}
                placeholderText="Last Name"
                autocomplete="family-name"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="lastnamePrivacy"
                value={lastnamePrivacy}
                onChange={(e) => setLastnamePrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* Gender */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <DropdownSelect
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                labelIcon={CircleIcon}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                  { value: "notDisclosed", label: "Not Preferred To Disclose" },
                ]}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="genderPrivacy"
                value={genderPrivacy}
                onChange={(e) => setGenderPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* Bio */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextAreaInput
                label="aboutMe"
                useLabelIcon={true}
                value={bio}
                onChange={setBio}
                maxLength={500}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full py-4 gap-4">
          <div className="flex items-center text-base font-poppins font-medium w-full">
            Contact Information
          </div>
          {/* Email */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="emailPrivacy"
                value={emailPrivacy}
                onChange={(e) => setEmailPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* Phone Number */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <PhoneNumberInput
                label="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="phoneNumberPrivacy"
                value={phoneNumberPrivacy}
                onChange={(e) => setPhoneNumberPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* Street Address */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                labelIcon={Road02Icon}
                placeholderText="Street Address"
                autocomplete="street-address"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="streetAddressPrivacy"
                value={streetAddressPrivacy}
                onChange={(e) => setStreetAddressPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* City */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                labelIcon={City01Icon}
                placeholderText="City"
                autocomplete="address-level2"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="cityPrivacy"
                value={cityPrivacy}
                onChange={(e) => setCityPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* State */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                labelIcon={RealEstate02Icon}
                placeholderText="State/Province"
                autocomplete="address-level1"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="statePrivacy"
                value={statePrivacy}
                onChange={(e) => setStatePrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* Zip Code */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                labelIcon={RoadLocation01Icon}
                placeholderText="Zip Code / Postal Code"
                autocomplete="postal-code"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="zipCodePrivacy"
                value={zipCodePrivacy}
                onChange={(e) => setZipCodePrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
          </div>
          {/* Country */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <SearchSelect
                label="country"
                labelIcon={GlobeIcon}
                options={countryOptions}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="countryPrivacy"
                value={countryPrivacy}
                onChange={(e) => setCountryPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full py-4 gap-4">
          <div className="flex items-center text-base font-poppins font-medium w-full">
            Places
          </div>

          {/* Birth Country */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <SearchSelect
                label="birthCountry"
                labelIcon={Baby01Icon}
                options={countryOptions}
                value={birthCountry}
                onChange={(e) => setBirthCountry(e.target.value)}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="birthCountryPrivacy"
                value={birthCountryPrivacy}
                onChange={(e) => setBirthCountryPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div>
          </div>

          {/* Current Country */}
          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <SearchSelect
                label="currentCountry"
                labelIcon={Home03Icon}
                options={countryOptions}
                value={currentCountry}
                onChange={(e) => setCurrentCountry(e.target.value)}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="currentCountryPrivacy"
                value={currentCountryPrivacy}
                onChange={(e) => setCurrentCountryPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div>
          </div>

          {/* Visited Country */}
          <div className="flex items-start justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <MultiSelectTagInput
                label="visitedCountry"
                labelIcon={Backpack01Icon}
                options={countryOptions}
                value={visitedCountry}
                onChange={setVisitedCountry}
                allowCustom={false}
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="visitedCountryPrivacy"
                value={visitedCountryPrivacy}
                onChange={(e) => setVisitedCountryPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full py-4 gap-4">
          <div className="flex items-center text-base font-poppins font-medium w-full">
            Interests
          </div>

          {/* Visited Country */}
          <div className="flex items-start justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <MultiSelectTagInput
                label="interest"
                labelIcon={FavouriteCircleIcon}
                options={techOptions}
                value={interest}
                onChange={setInterest}
              />
            </div>

            {/* <div className="">
              <PrivacyDropdownSelect
                label="visitedCountryPrivacy"
                value={visitedCountryPrivacy}
                onChange={(e) => setVisitedCountryPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div> */}
          </div>
        </div>

        <div className="flex flex-col items-center w-full py-4 gap-4">
          <div className="flex items-center text-base font-poppins font-medium w-full">
            Social Links
          </div>
          <button className="w-full h-14 flex items-center justify-bewteen px-4 bg-gray-50 border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 delay-150 hover:bg-white hover:shadow-lg shadow-gray-200 hover:border-transparent">
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src="/images/google.png"
                alt="Google Logo"
                className="cover-fit"
              />
            </div>
            <span className="flex-1 text-center text-lg lg:text-base">
              Connect With Google
            </span>
          </button>

          <button className="w-full h-14 flex items-center justify-bewteen px-4 bg-gray-50 border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 delay-150 hover:bg-white hover:shadow-lg shadow-gray-200 hover:border-transparent">
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src="/images/facebook.png"
                alt="Facebook Logo"
                className="cover-fit"
              />
            </div>
            <span className="flex-1 text-center text-lg lg:text-base">
              Connect With Facebook
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          <button
            // onClick={onBack}
            className="bg-gray-200 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
          >
            <span className="text-gray-900">Back</span>
          </button>

          <button
            type="submit"
            className="bg-emerald-500 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
          >
            <span>Continue</span>
          </button>
        </div>
      </form>
    </div>
  );
}

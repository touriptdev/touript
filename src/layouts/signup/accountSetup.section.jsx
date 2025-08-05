import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  CircleIcon,
  UserAccountIcon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { DropdownSelect, TextInput } from "../../components/forms";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { ModalHeader } from "../../layouts";

export default function AccountSetup({
  onBack,
  onNext,
  username,
  setUsername,
  firstname,
  lastname,
  setFirstname,
  setLastname,
  gender,
  setGender,
}) {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const backgroundLocation = location.state?.backgroundLocation;

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header*/}
      <ModalHeader title="touript" />

      {/* Title + Form*/}
      <main className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 py-8">
        <h3 className="font-semibold text-4xl">Account Set Up</h3>
        <div className="font-normal text-gray-500 text-lg lg:text-base leading-[1.7]">
          Let us know about you so that we can personalize your feed. You can
          use touript anonymously. So your username needs to be unique
        </div>
        {/* Form*/}
        <form onSubmit={handleSubmit} className="w-full space-y-4 py-8">
          <TextInput
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            labelIcon={UserAccountIcon}
            placeholderText="Username"
            unique={true}
            autocomplete="username"
          />

          <TextInput
            label="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            labelIcon={User02Icon}
            placeholderText="First Name"
            autocomplete="given-name"
          />
          <TextInput
            label="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            labelIcon={User02Icon}
            placeholderText="Last Name"
            autocomplete="family-name"
          />

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

          {/* Action Button*/}
          <div className="flex items-center justify-between w-full gap-4">
            <button
              onClick={onBack}
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

        {/* <div className="flex flex-col items-center justify-center w-full gap-4 py-8">
          
        </div> */}
      </main>
    </div>
  );
}

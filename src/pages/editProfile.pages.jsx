import { useState } from "react";
import {
  DropdownSelect,
  MultiImagesInput,
  MultiSelectTagInput,
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

  // const [multiImage, setMultiImage] = useState(null);

  // const techOptions = [
  //   { id: 1, label: "JavaScript", value: "javascript" },
  //   { id: 2, label: "React", value: "react" },
  //   { id: 3, label: "Python", value: "python" },
  // ];

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
  return (
    <div className="font-poppins">
      {/* Header */}
      <ModalHeader title="Edit Profile" onClose={onClose} />

      <div>
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
                label="privacy"
                value={firstnamePrivacy}
                onChange={(e) => setFirstnamePrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="public"
              />
            </div>
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="flex-1 w-full">
              <TextInput
                label="firstname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                labelIcon={User02Icon}
                placeholderText="Last Name"
                autocomplete="family-name"
              />
            </div>

            <div className="">
              <PrivacyDropdownSelect
                label="privacy"
                value={lastnamePrivacy}
                onChange={(e) => setLastnamePrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>

          </div>

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
                label="privacy"
                value={genderPrivacy}
                onChange={(e) => setGenderPrivacy(e.target.value)}
                options={privacyOptions}
                defaultPrivacy="private"
              />
            </div>
            
          </div>



        </div>

        <TextAreaInput/>

        {/* <SearchSelect
          label="Fruits"
          labelIcon={AppleIcon}
          options={options}
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
        /> */}

        {/* <MultiSelectTagInput
          label="Fruits"
          labelIcon={AppleIcon}
          options={options}
          value={tags}
          onChange={setTags}
        /> */}

        {/* <MultiImagesInput
          label="Fruits"
          value={multiImage}
          cropShape="rect"
          cropHeight={1090}
          maxFiles={3}
          options={1090}
          onChange={(croppedUrl, file) => {
            setMultiImage(croppedUrl);
            console.log(croppedUrl);
            console.log(file);
          }}
        /> */}
      </div>
    </div>
  );
}

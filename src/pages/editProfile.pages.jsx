import { useState } from "react";
import { FileUpload, SearchSelect, TagInput } from "../components/forms";
import { ModalHeader } from "../layouts";
import { AppleIcon } from "@hugeicons/core-free-icons";

export default function EditProfile({ onClose }) {
  const [fruit,setFruit] = useState(null);
  const options = [
      { id: 1, label: "Apple", value: "apple" },
      { id: 2, label: "Banana", value: "banana" },
      { id: 3, label: "Cherry", value: "cherry" },
      { id: 4, label: "Date", value: "date" },
      { id: 5, label: "Elderberry", value: "elderberry" },
      { id: 6, label: "Fig", value: "fig" },
      { id: 7, label: "Grape", value: "grape" },
      { id: 8, label: "Honeydew", value: "honeydew" },
      { id: 9, label: "Kiwi", value: "kiwi" },
      { id: 10, label: "Lemon", value: "lemon" },
      { id: 11, label: "Mango", value: "mango" },
      { id: 12, label: "Orange", value: "orange" },
    ];
  return (
    <div>
      {/* Header */}
      <ModalHeader title="Edit Profile" onClose={onClose} />

      <div className="space-y-8">
        <FileUpload />
        <SearchSelect label="Fruits" labelIcon={AppleIcon} options={options} value={fruit} onChange={(e) => setFruit(e.target.value)}/>

        <TagInput />



        <FileUpload />
      </div>
    </div>
  );
}

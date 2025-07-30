import { FileUpload } from "../components/forms";
import { ModalHeader } from "../layouts";

export default function EditProfile({ onClose }) {
  return (
    <div>
      {/* Header */}
      <ModalHeader title="Edit Profile" onClose={onClose} />

      <div className="space-y-8">
        <FileUpload />
        <FileUpload multiFile={true} />
      </div>
    </div>
  );
}

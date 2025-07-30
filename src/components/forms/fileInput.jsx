// import { useState } from "react";

// import { ImageCrop } from "../../layouts";

// export default function FileUpload() {
//   const [imgUrl, setImgUrl] = useState(null);
//   const [croppedImageUrl, setCroppedImageUrl] = useState(null);
//   const [showCropper, setShowCropper] = useState(true);
//   // const [cropImgUrl, setCropImgUrl] = useState(null)
//   // const [cropInit, setCropInit] = useState({x:0, y:0})
//   // const [zoom, setZoom] = useState(1);
//   // const [aspect, setAspect] = useState(null);
//   // const [previewUrl, setPreviewUrl] = useState("");
//   // const [uploadProgress, setUploadProgress] = useState(0);
//   // const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         const imageUrl = reader.result?.toString() || "";
//         setImgUrl(imageUrl);
//       });
//       reader.readAsDataURL(file);
//       // setPreviewUrl(URL.createObjectURL(selected));
//       // uploadFile(selected);
//     }
//   };

//   const handleCropComplete = (croppedUrl) => {
//     setCroppedImageUrl(croppedUrl);
//     setShowCropper(false);
//   };
//   // const uploadFile = async (file) => {
//   //   const formData = new FormData();
//   //   formData.append("file", file);

//   //   setUploading(true);
//   //   setUploadProgress(0);
//   // };

//   // const handleRemove = () => {
//   //   setFile(null);
//   //   setPreviewUrl("");
//   //   setUploadProgress(0);
//   // };

//   return (
//     <>
//       {/* Upload Input */}

//       {/* Image Preview & Progress */}
//       {imgUrl === null ? (
//         // Befor uploading the button
//         <div className="flex items-center justify-between w-full min-w-sm h-full text-center rounded-lg border-2 border-dashed border-gray-200 px-4 py-4">
//           <div className="text-base lg:text-sm text-gray-900 ">
//             {/* label is button here */}
//             <label
//               htmlFor="fileUpload"
//               className="relative flex items-center cursor-pointer rounded-lg bg-gray-50 border border-gray-200 font-medium font-poppins px-4 h-14 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
//             >
//               <span className="text-base lg:text-sm">Upload Image</span>
//               <input
//                 id="fileUpload"
//                 name="fileUpload"
//                 type="file"
//                 accept="image/*"
//                 className="sr-only"
//                 onChange={handleFileChange}
//               />
//             </label>
//           </div>
//           {/* Side Text */}
//           <p className="text-xs text-gray-400 font-medium">
//             JPG, JPEG up to 5MB
//           </p>
//         </div>
//       ) : croppedImageUrl  !== null && showCropper ? (
//         <div className="relative w-full border border-gray-200 rounded-lg p-4 bg-white">
//           {/* Delete Button */}
//           <button
//             onClick={() => setShowCropper(false)}
//             className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-red-600 border border-gray-300 hover:border-red-400 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
//           >
//             ✕
//           </button>

//           <img
//             src={croppedImageUrl}
//             alt="Preview"
//             className="w-32 h-32 object-cover rounded-md mb-2"
//           />

//           <div className="text-sm text-gray-700 text-center">
//             <p className="font-medium">{imgUrl.name}</p>
//             <p className="text-xs text-gray-500">
//               {(imgUrl.size / 1024).toFixed(2)} KB
//             </p>
//           </div>

//           {/* Progress Bar */}
//           {/* {uploading && (
//             <div className="w-full mt-2 bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${uploadProgress}%` }}
//               />
//             </div>
//           )} */}
//         </div>) : (
//         <ImageCrop
//           imgUrl={imgUrl}
//           onCancel={() => {
//             console.log(showCropper);
//             setShowCropper(false);}}
//           onComplete={handleCropComplete}
//         />
//       )

//     }
//     </>
//   );
// }

// // UploadWithCrop.jsx
import { useState } from "react";
import { ImageCrop } from "../../layouts";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";

function SinglefileInput() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    e.target.value = null;
    setCroppedImageUrl(null);

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCropComplete = (croppedUrl) => {
    setCroppedImageUrl(croppedUrl);
    setShowCropper(false);
  };

  const handleRemove = () => {
    setFile(null);
    setCroppedImageUrl(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full">
      {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
      <div className="flex items-center justify-between w-full min-w-sm h-full text-center rounded-lg border-2 border-dashed border-gray-200 px-4 py-4">
        <div className="text-base lg:text-sm text-gray-900 ">
          {/* label is button here */}
          <label
            htmlFor="fileUpload"
            className="relative flex items-center cursor-pointer rounded-lg bg-gray-50 border border-gray-200 font-medium font-poppins px-4 h-14 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
          >
            {file?.name === null ? (
              <span className="text-base lg:text-sm">Upload Image</span>
            ) : (
              <span className="text-base lg:text-sm">Upload Again</span>
            )}

            <input
              id="fileUpload"
              name="fileUpload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {/* Side Text */}
        <p className="text-sm text-gray-400 font-medium">
          JPG, JPEG, PNG up to 5MB
        </p>
      </div>

      {croppedImageUrl && (
        <div className="flex items-center justify-between w-full border border-gray-200 rounded-lg px-4 py-4 mt-2 bg-white transition-all duration-300 delay-150">
          <div className="flex items-center justify-start gap-2">
            <img
              src={croppedImageUrl}
              alt="Preview"
              className="w-14 h-14 object-cover rounded-full"
            />

            {file &&
              (() => {
                const nameParts = file.name.split(".");
                const extension = nameParts.pop();
                const baseName = nameParts.join(".");

                return (
                  <span className="text-sm w-full truncate">
                    {baseName.length > 10
                      ? `${baseName.slice(0, 10)}...`
                      : baseName}
                    .{extension}
                  </span>
                );
              })()}
          </div>

          <div className="flex items-center justify-end gap-8">
            <div
              // onClick={handleRemove}
              className="flex items-center justify-end gap-2"
            >
              <div className="w-20 h-1 bg-gray-200">
                <div className="w-10 h-1 bg-gray-900"></div>
              </div>
              <span>uploading</span>
            </div>

            <button
              onClick={handleRemove}
              className="bg-white text-red-500 hover:text-red-600 rounded-full w-full h-full py-4 flex items-center justify-end cursor-pointer"
            >
              <HugeiconsIcon icon={Delete02Icon} />
            </button>
          </div>
        </div>
      )}

      {showCropper && previewUrl && (
        <ImageCrop
          imageSrc={previewUrl}
          onCancel={() => setShowCropper(false)}
          onComplete={handleCropComplete}
          // outputOptions={{ imgDimention: 872 }}
          cropShape="round"
          cropHeight={264}
        />
      )}
    </div>
  );
}

function MultiFileInput() {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [alert, setAlert] = useState(null);

  // const handleFileChange = (e) => {
  //   const newFiles = Array.from(e.target.files);
  //   newFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setFiles((prev) => [...prev, file]);
  //       setPreviewUrls((prev) => [...prev, reader.result]);
  //       setCroppedImages((prev) => [...prev, null]);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleCrop = (index) => {
    setCurrentFileIndex(index);
    setShowCropper(true);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if selection would exceed the limit
    if (files.length + selectedFiles.length > 3) {
      setAlert("You can only upload up to 3 images.");
      return;
    }

    const allowedFiles = selectedFiles.slice(0, 3 - files.length);

    allowedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles((prev) => [...prev, file]);
        setPreviewUrls((prev) => [...prev, reader.result]);
        setCroppedImages((prev) => [...prev, null]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCropComplete = (croppedUrl) => {
    setCroppedImages((prev) => {
      const updated = [...prev];
      updated[currentFileIndex] = croppedUrl;
      return updated;
    });
    setShowCropper(false);
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setCroppedImages((prev) => prev.filter((_, i) => i !== index));
    if (currentFileIndex === index) setShowCropper(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
        disabled={files.length >= 3}
      />

      {alert && <span>{alert}</span>}
      {/* Image Previews */}
      <div className="grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg p-2 bg-white"
          >
            <button
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-white text-gray-500 hover:text-red-600 border border-gray-300 hover:border-red-400 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
            >
              ✕
            </button>

            <img
              src={croppedImages[index] || url}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-md mx-auto"
            />

            <div className="mt-1 text-center text-xs text-gray-600 truncate">
              {files[index]?.name}
            </div>

            <button
              onClick={() => handleCrop(index)}
              className="block mt-2 text-indigo-600 hover:underline text-xs mx-auto"
            >
              {croppedImages[index] ? "Re-crop" : "Crop"}
            </button>
          </div>
        ))}
      </div>

      {/* Cropper Modal */}
      {showCropper && currentFileIndex !== null && (
        <ImageCrop
          imageSrc={previewUrls[currentFileIndex]}
          onCancel={() => setShowCropper(false)}
          onComplete={handleCropComplete}
          outputOptions={{ imgDimention: 872 }}
        />
      )}
    </div>
  );
}

export default function FileInput({ multiFile = false }) {
  return <>{multiFile ? <MultiFileInput /> : <SinglefileInput />}</>;
}

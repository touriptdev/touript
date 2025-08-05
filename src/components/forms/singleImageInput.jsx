// // UploadWithCrop.jsx
import { useEffect, useState } from "react";
import { ImageCrop } from "../../layouts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  ImageCropIcon,
  Album02Icon,
} from "@hugeicons/core-free-icons";

export default function SingleImageInput({
  label = "fileUpload",
  cropShape = "round",
  cropHeight = 264,
  onChange,
  value = null,
  // resetTrigger = null,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    if (value !== croppedImageUrl) {
      setCroppedImageUrl(value);
    }
  }, [value, croppedImageUrl]);

  // useEffect(() => {
  //   if (resetTrigger) {
  //     handleRemove();
  //   }
  // }, [resetTrigger]);

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
      // setCroppedImageUrl(reader.result);
      // onChange?.(reader.result, selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCropComplete = (croppedUrl, croppedFile) => {
    setCroppedImageUrl(croppedUrl);
    onChange?.(croppedUrl, croppedFile);
    setShowCropper(false);
  };

  const handleRemove = () => {
    setFile(null);
    setCroppedImageUrl(null);
    setPreviewUrl(null);
    onChange?.(null, null);
  };

  return (
    <div className="w-full font-poppins">
      {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
      <div className="flex items-center justify-between w-full min-w-sm h-full text-center rounded-lg border-2 border-dashed border-gray-200 px-4 py-4">
        <div className="text-base lg:text-sm text-gray-900 ">
          {/* label is button here */}
          <label
            htmlFor={label}
            className="relative flex items-center cursor-pointer rounded-lg bg-gray-50 border border-gray-200 font-medium font-poppins px-4 h-14 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 delay-100"
          >
            {file !== null ? (
              <span className="text-base lg:text-sm">Upload Again</span>
            ) : (
              <span className="text-base lg:text-sm">Upload Image</span>
            )}

            <input
              id={label}
              name={label}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {/* Side Text */}
        <p className="text-xs text-gray-400 font-medium">
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
                  <span className="text-sm w-full truncate text-gray-900 ">
                    {baseName.length > 20
                      ? `${baseName.slice(0, 20)}...`
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
              className=" text-pink-500 px-4 h-11 flex items-center justify-center gap-1 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 delay-100 cursor-pointer"
            >
              <HugeiconsIcon icon={Delete02Icon} size={16} strokeWidth={2} />
              <span className="text-sm font-medium font-poppins">Delete</span>
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
          cropShape={cropShape}
          cropHeight={cropHeight}
        />
      )}
    </div>
  );
}

function MultiFileInput({
  label = "imageFiles",
  cropShape = "rect",
  cropHeight = 1090,
  maxFiles = 3,
  value = [],
  onChange,
}) {
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
  useEffect(() => {
    if (value && value.length !== croppedImages.length) {
      setCroppedImages(value);
    }
  }, [value, croppedImages]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    // Check if selection would exceed the limit
    const numberOfImages = maxFiles - files.length;
    if (numberOfImages <= 0) {
      setAlert(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    const filesToAdd = selectedFiles.slice(0, numberOfImages);

    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles((prev) => [...prev, file]);
        setPreviewUrls((prev) => [...prev, reader.result]);
        setCroppedImages((prev) => [...prev, null]);
      };
      reader.readAsDataURL(file);
    });
    setAlert(null);
  };

  const handleCrop = (index) => {
    setCurrentFileIndex(index);
    setShowCropper(true);
  };

  // const handleCropComplete = (croppedUrl) => {
  //   setCroppedImages((prev) => {
  //     const updated = [...prev];
  //     updated[currentFileIndex] = croppedUrl;
  //     return updated;
  //   });
  //   setShowCropper(false);
  // };

  const handleCropComplete = (croppedUrl, croppedFile) => {
    const updated = [...croppedImages];
    updated[currentFileIndex] = croppedUrl;
    setCroppedImages(updated);
    onChange?.(updated, croppedFile);
    setShowCropper(false);
  };

  const handleRemove = (index) => {
    // setFiles((prev) => prev.filter((_, i) => i !== index));
    // setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    // setCroppedImages((prev) => prev.filter((_, i) => i !== index));
    // if (currentFileIndex === index) setShowCropper(false);

    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedCrops = croppedImages.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    setCroppedImages(updatedCrops);
    // onChange?.(updatedCrops);

    // if (currentFileIndex === index) setShowCropper(false);

    onChange?.(updatedCrops, null);

    if (currentFileIndex === index) {
      setShowCropper(false);
      setCurrentFileIndex(null);
    } else if (currentFileIndex > index) {
      setCurrentFileIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full font-poppins">
      <div className="flex flex-col items-center justify-center w-full min-w-sm h-full text-center rounded-lg border-2 border-dashed border-gray-200 px-4 py-4">
        <div className="text-base lg:text-sm text-gray-900 w-full">
          {/* label is button here */}
          <label
            htmlFor={label}
            className="relative flex flex-col items-center justify-center cursor-pointer rounded-lg font-medium font-poppins px-4 py-1 gap-1 transition-all duration-300 delay-100"
          >
            <HugeiconsIcon icon={Album02Icon} size={24} strokeWidth={2} />

            <span className="text-base lg:text-sm">
              {files.length ? "Upload More" : "Upload Images"}
            </span>

            <input
              id={label}
              name={label}
              type="file"
              accept="image/*"
              className="sr-only"
              multiple
              onChange={handleFileChange}
              disabled={files.length >= maxFiles}
            />
          </label>
        </div>
        {/* Bottom Text */}
        <p className="text-xs text-gray-400 font-medium">
          JPG, JPEG, PNG up to 5MB
        </p>
      </div>

      {alert && <p className="text-xs text-pink-500 mt-2">{alert}</p>}

      {/* Image Previews */}
      <div className="flex flex-col items-center w-full gap-2 mt-2">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-4 bg-white  w-full"
          >
            <div className="flex items-center gap-2">
              <img
                src={croppedImages[index] || url}
                alt={`Preview ${index}`}
                className="w-14 h-14 object-cover rounded-lg"
              />

              {files[index] &&
                (() => {
                  const nameParts = files[index].name.split(".");
                  const extension = nameParts.pop();
                  const baseName = nameParts.join(".");

                  return (
                    <span className="text-sm w-full truncate text-gray-900 ">
                      {baseName.length > 25
                        ? `${baseName.slice(0, 25)}...`
                        : baseName}
                      .{extension}
                    </span>
                  );
                })()}
            </div>

            <div className="flex items-center justify-end h-11">
              <button
                onClick={() => handleCrop(index)}
                className="flex-1 text-gray-900 px-4 h-full flex items-center justify-center gap-1 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 delay-100 cursor-pointer"
              >
                <HugeiconsIcon icon={ImageCropIcon} size={16} strokeWidth={2} />
                {croppedImages[index] ? (
                  <span className="text-sm font-medium font-poppins">
                    Recrop Image
                  </span>
                ) : (
                  <span className="text-sm font-medium font-poppins">
                    Crop Image
                  </span>
                )}
              </button>

              <button
                onClick={() => handleRemove(index)}
                className=" text-pink-500 px-4 h-full flex items-center justify-center gap-1 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 delay-100 cursor-pointer"
              >
                <HugeiconsIcon icon={Delete02Icon} size={16} strokeWidth={2} />
                <span className="text-sm font-medium font-poppins">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cropper Modal */}
      {showCropper && currentFileIndex !== null && (
        <ImageCrop
          imageSrc={previewUrls[currentFileIndex]}
          onCancel={() => setShowCropper(false)}
          onComplete={handleCropComplete}
          options={{ imgDimention: 1090 }}
          cropShape={cropShape}
          cropHeight={cropHeight}
        />
      )}
    </div>
  );
}

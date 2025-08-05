// // UploadWithCrop.jsx
import { useEffect, useState } from "react";
import { ImageCrop } from "../../layouts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  ImageCropIcon,
  Album02Icon,
} from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function MultiImagesInput({
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
  const [autoCropQueue, setAutoCropQueue] = useState([]);
  const [isAutoCropping, setIsAutoCropping] = useState(true);

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
        setIsAutoCropping(true);
        setAutoCropQueue((prev) => [...prev, files.length + prev.length]);
      };
      reader.readAsDataURL(file);
    });
    setAlert(null);
  };

  const handleCrop = (index) => {
    setIsAutoCropping(false);
    setCurrentFileIndex(index);
    setShowCropper(true);
  };

  useEffect(() => {
    if (!showCropper && autoCropQueue.length > 0) {
      const nextIndex = autoCropQueue[0];
      setCurrentFileIndex(nextIndex);
      setShowCropper(true);
    }
  }, [autoCropQueue, showCropper]);

  const handleCropComplete = (croppedUrl, croppedFile) => {
    const updated = [...croppedImages];
    updated[currentFileIndex] = croppedUrl;
    setCroppedImages(updated);
    onChange?.(updated, croppedFile);
    setShowCropper(false);

    setAutoCropQueue((prev) => {
      const nextQueue = prev.slice(1);
      if (nextQueue.length === 0) setIsAutoCropping(false);
      return nextQueue;
    });
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
      <div className="flex flex-col items-center justify-center w-full h-full text-center rounded-lg border-2 border-dashed border-gray-200 px-4 py-4">
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

                <span className="text-sm font-medium font-poppins">
                  Crop Image
                </span>
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
        <div
          className={clsx(
            "transition-all duration-300",
            isAutoCropping
              ? "opacity-0 scale-90 pointer-events-none absolute top-0 left-0 w-full h-full invisible"
              : "opacity-100 scale-100 visible relative",
          )}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <ImageCrop
            imageSrc={previewUrls[currentFileIndex]}
            onCancel={() => setShowCropper(false)}
            onComplete={handleCropComplete}
            options={{ imgDimention: 1090 }}
            cropShape={cropShape}
            cropHeight={cropHeight}
            autoCrop={isAutoCropping}
          />
        </div>
      )}
    </div>
  );
}

// import { useCallback, useState } from "react";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../utils/getCroppedImgUtils";

// export default function ImageCrop({ imgUrl, onCancel, onComplete }) {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const onCropComplete = useCallback((_, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleDone = async () => {
//     console.log("Pressed");
//     const croppedImageUrl = await getCroppedImg(imgUrl, croppedAreaPixels);
//     onComplete(croppedImageUrl);
//   };

//   return (
//     <div className=" flex items-center justify-center z-50">
//       <div className="mt-4 flex justify-end space-x-3">
//         <button
//           onClick={onCancel}
//           className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleDone}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
//         >
//           Crop & Save
//         </button>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[50vh] relative">
//         <Cropper
//           image={imgUrl}
//           crop={crop}
//           zoom={zoom}
//           aspect={1 / 1}
//           onCropChange={setCrop}
//           onCropComplete={onCropComplete}
//           onZoomChange={setZoom}
//           cropShape="round"
//           //   cropSize={{ width: 150, height: 150 }}
//         />
//         <div className="mt-4">
//           {/* <Slider
//             value={zoom}
//             min={1}
//             max={3}
//             step={0.1}
//             onChange={(e, val) => setZoom(val)}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// ImageCropper.jsx

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
// import Slider from "@mui/material/Slider";
import getCroppedImg from "../utils/getCroppedImgUtils";
import clsx from "clsx";

export default function ImageCrop({
  imageSrc,
  onCancel,
  onComplete,
  outputOptions,
  cropShape = "rect",
  cropHeight = 436
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    const croppedImageUrl = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      outputOptions
    );
    onComplete(croppedImageUrl);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200 gap-8 pb-8 mt-4">
        <div className={clsx ("bg-white w-full", cropHeight === 264? "h-66":"h-109","relative rounded-t-lg overflow-hidden")}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape={cropShape}
          />
          <div className="mt-4">
            {/* <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, val) => setZoom(val)}
          /> */}
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 w-full px-8 font-medium">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-900 w-full h-14 rounded-lg text-base lg:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="bg-emerald-500 text-white w-full h-14 rounded-lg text-base lg:text-sm"
          >
            Crop Image
          </button>
        </div>
      </div>
    </>
  );
}

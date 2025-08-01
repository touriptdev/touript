// cropImageUtils.js
export default function getCroppedImg(imageSrc, pixelCrop, options = {}) {
  const { imgDimention = 264, mimeType = "image/jpeg", originalFileName = "image", } = options;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Fixes CORS issue
    image.src = imageSrc;
    image.onload = () => {
      const cropSize = Math.min(
        pixelCrop.width,
        pixelCrop.height,
        imgDimention
      );

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = cropSize;
      canvas.height = cropSize;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        cropSize,
        cropSize
      );

      // canvas.toBlob((blob) => {
      //   if (!blob) return reject("Canvas is empty");
      //   const fileUrl = URL.createObjectURL(blob);
      //   resolve(fileUrl);
      // }, "image/jpeg");

      // canvas.toBlob(
      //   (blob) => {
      //     if (!blob) return reject("Canvas is empty");

      //     const file = new File([blob], "cropped-image.jpg", {
      //       type: mimeType,
      //     });

      //     const previewUrl = URL.createObjectURL(blob);

      //     resolve({ file, previewUrl });
      //   },
      //   mimeType, 1
      //   // quality
      // );

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Canvas is empty");

          const ext = mimeType.split("/")[1];
          const fileName = `${originalFileName.replace(
            /\.[^/.]+$/,
            ""
          )}-${Date.now()}.${ext}`;

          const file = new File([blob], fileName, {
            type: mimeType,
          });

          const previewUrl = URL.createObjectURL(blob);

          resolve({ file, previewUrl });
        },
        mimeType,
        1
      );
    };
    image.onerror = () => reject("Failed to load image");
  });
}

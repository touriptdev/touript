// cropImageUtils.js
export default function getCroppedImg(imageSrc, pixelCrop, options = {}) {
  const { imgDimention = 264 } = options;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Fixes CORS issue
    image.src = imageSrc;
    image.onload = () => {
      const originalWidth = pixelCrop.width;
      const originalHeight = pixelCrop.height;

      let cropSize;

      if (originalWidth >= imgDimention && originalHeight >= imgDimention) {
        cropSize = imgDimention;
      } else {
        cropSize = Math.min(originalWidth, originalHeight);
      }

      const canvas = document.createElement("canvas");
      canvas.width = cropSize;
      canvas.height = cropSize;
      const ctx = canvas.getContext("2d");

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

      canvas.toBlob((blob) => {
        if (!blob) return reject("Canvas is empty");
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    };
    image.onerror = () => reject("Failed to load image");
  });
}

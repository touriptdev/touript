import React from "react";

export default function VisualMastermindCard() {
  // const bgImages = [
  //   // Top row
  //   {
  //     src: "../../public/images/image_1.png",
  //     className: "top-[-50px] left-[20%] rotate-[-10deg]",
  //   },
  //   {
  //     src: "../../public/images/image_2.png",
  //     className: "top-[-60px] right-[15%] rotate-[8deg]",
  //   },

  //   // Bottom row
  //   {
  //     src: "../../public/images/image_3.png",
  //     className: "bottom-[-50px] left-[25%] rotate-[15deg]",
  //   },
  //   {
  //     src: "../../public/images/image_4.png",
  //     className: "bottom-[-60px] right-[20%] rotate-[-12deg]",
  //   },

  //   // Left side
  //   {
  //     src: "../../public/images/image_5.png",
  //     className: "left-[-60px] top-[20%] rotate-[-20deg]",
  //   },
  //   {
  //     src: "../../public/images/image_6.png",
  //     className: "left-[-70px] bottom-[30%] rotate-[12deg]",
  //   },

  //   // Right side
  //   {
  //     src: "../../public/images/image_7.png",
  //     className: "right-[-60px] top-[25%] rotate-[18deg]",
  //   },
  //   {
  //     src: "../../public/images/image_8.png",
  //     className: "right-[-70px] bottom-[25%] rotate-[-15deg]",
  //   },
  // ];

  const bgImages = [
    // Top row
    { src: "../../public/images/image_1.png", className: "top-[-50px] left-[10%] rotate-[-10deg]" },
    { src: "../../public/images/image_2.png", className: "top-[-60px] left-[30%] rotate-[8deg]" },
    { src: "../../public/images/image_3.png", className: "top-[-55px] right-[30%] rotate-[5deg]" },
    { src: "../../public/images/image_4.png", className: "top-[-50px] right-[10%] rotate-[-8deg]" },

    // Bottom row
    { src: "../../public/images/image_5.png", className: "bottom-[-50px] left-[10%] rotate-[15deg]" },
    { src: "../../public/images/image_6.png", className: "bottom-[-60px] left-[30%] rotate-[-12deg]" },
    { src: "../../public/images/image_7.png", className: "bottom-[-55px] right-[30%] rotate-[10deg]" },
    { src: "../../public/images/image_8.png", className: "bottom-[-50px] right-[10%] rotate-[-15deg]" },

    // Left side
    { src: "../../public/images/image_1.png", className: "left-[-60px] top-[10%] rotate-[-20deg]" },
    { src: "../../public/images/image_2.png", className: "left-[-70px] top-[35%] rotate-[12deg]" },
    { src: "../../public/images/image_3.png", className: "left-[-65px] bottom-[35%] rotate-[-14deg]" },
    { src: "../../public/images/image_4.png", className: "left-[-55px] bottom-[10%] rotate-[8deg]" },

    // Right side
    { src: "../../public/images/image_5.png", className: "right-[-60px] top-[10%] rotate-[18deg]" },
    { src: "../../public/images/image_6.png", className: "right-[-70px] top-[35%] rotate-[-15deg]" },
    { src: "../../public/images/image_7.png", className: "right-[-65px] bottom-[35%] rotate-[14deg]" },
    { src: "../../public/images/image_8.png", className: "right-[-55px] bottom-[10%] rotate-[-12deg]" },
  ];



  return (
    <div className="relative flex h-[700px] w-xl items-center justify-center ">
      {/* Background images all around the card */}
      {bgImages.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt=""
          className={`absolute h-44 rounded-xl  object-cover  ${img.className} z-0`}
        />
      ))}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md h-[600px] bg-neutral-950 p-8 shadow-xl">

      </div>
    </div>
  );
}

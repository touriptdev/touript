// import { useEffect, useRef } from "react";

// export default function DataPathAnimation() {
//   const circleRef = useRef(null);

//   useEffect(() => {
//     const path = document.querySelector("#dataPath");
//     const circle = circleRef.current;

//     const pathLength = path.getTotalLength();
//     let start = null;

//     function animate(timestamp) {
//       if (!start) start = timestamp;
//       const progress = ((timestamp - start) / 3000) % 1; // loop every 3s
//       const point = path.getPointAtLength(progress * pathLength);

//       circle.setAttribute("cx", point.x);
//       circle.setAttribute("cy", point.y);

//       requestAnimationFrame(animate);
//     }

//     requestAnimationFrame(animate);
//   }, []);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-900">
//       <svg
//         viewBox="0 0 600 300"
//         className="w-[80%] h-[80%]"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* Path */}
//         <path
//           id="dataPath"
//           d="M50 250 C150 50, 450 50, 550 250"
//           stroke="white"
//           strokeWidth="2"
//           fill="none"
//           strokeDasharray="10 6"
//         />

//         {/* Moving Data Circle */}
//         <circle
//           ref={circleRef}
//           r="6"
//           fill="#38bdf8" // Tailwind sky-400
//           stroke="white"
//           strokeWidth="2"
//         />
//       </svg>
//     </div>
//   );
// }









// import { useEffect, useRef } from "react";

// export default function DataPathAnimation() {
//   const pathRefs = useRef([]);
//   const planeRefs = useRef([]);

//   // Define SVG paths (flight routes)
//   // Define SVG paths (flight routes)
//   // const pathsData = [
//   //   // Top center to middle to top-left corner
//   //   "M300 0 Q300 150, 50 0",

//   //   // Top center to middle to top-right corner
//   //   "M300 0 Q300 150, 550 0",

//   //   // Bottom center to middle to bottom-left corner
//   //   "M300 300 Q300 150, 50 300",

//   //   // Bottom center to middle to bottom-right corner
//   //   "M300 300 Q300 150, 550 300",

//   //   // Straight left to right (center)
//   //   "M0 150 L600 150",
//   // ];
//   // Rounded rectangle sides (top, right, bottom, left)
// //  const pathsData = [
// //   // Top-left to top-right (top edge)
// //   "M70 20 L530 20 Q550 20, 550 40",

// //   // Top-right to bottom-right (right edge)
// //   "M550 40 L550 260 Q550 280, 530 280",

// //   // Bottom-right to bottom-left (bottom edge)
// //   "M530 280 L70 280 Q50 280, 50 260",

// //   // Bottom-left to top-left (left edge)
// //   "M50 260 L50 40 Q50 20, 70 20",

// //   // Optional: middle horizontal inside (for variety)
// //   "M70 150 L530 150",
// // ];

// // const pathsData = [
// //   // Top-left rounded rectangle
// //   "M30 30 H130 Q150 30 150 50 V110 Q150 130 130 130 H30 Q10 130 10 110 V50 Q10 30 30 30 Z",

// //   // Top-right rounded rectangle
// //   "M450 30 H550 Q570 30 570 50 V110 Q570 130 550 130 H450 Q430 130 430 110 V50 Q430 30 450 30 Z",

// //   // Bottom-left rounded rectangle
// //   "M30 170 H130 Q150 170 150 190 V250 Q150 270 130 270 H30 Q10 270 10 250 V190 Q10 170 30 170 Z",

// //   // Bottom-right rounded rectangle
// //   "M450 170 H550 Q570 170 570 190 V250 Q570 270 550 270 H450 Q430 270 430 250 V190 Q430 170 450 170 Z",
// // ];

// const pathsData = [
//   // Top-left quarter rounded rectangle
//   "M10 10 H290 Q310 10 310 30 V140 Q310 160 290 160 H10 Q-10 160 -10 140 V30 Q-10 10 10 10 Z",

//   // Top-right quarter rounded rectangle
//   "M310 10 H590 Q610 10 610 30 V140 Q610 160 590 160 H310 Q290 160 290 140 V30 Q290 10 310 10 Z",

//   // Bottom-left quarter rounded rectangle
//   "M10 140 H290 Q310 140 310 160 V290 Q310 310 290 310 H10 Q-10 310 -10 290 V160 Q-10 140 10 140 Z",

//   // Bottom-right quarter rounded rectangle
//   "M310 140 H590 Q610 140 610 160 V290 Q610 310 590 310 H310 Q290 310 290 290 V160 Q290 140 310 140 Z",
// ];



//   useEffect(() => {
//     const animations = [];

//     planeRefs.current.forEach((plane, i) => {
//       const pathIndex = i % pathsData.length;
//       const path = pathRefs.current[pathIndex];
//       const pathLength = path.getTotalLength();

//       let start = performance.now() - Math.random() * 2000; // random start offset
//       const speed = 2000 + Math.random() * 20000; // 2–4 seconds per loop

//       function animate(timestamp) {
//         const progress = ((timestamp - start) / speed) % 1;
//         const point = path.getPointAtLength(progress * pathLength);

//         plane.setAttribute("cx", point.x);
//         plane.setAttribute("cy", point.y);

//         animations[i] = requestAnimationFrame(animate);
//       }

//       animations[i] = requestAnimationFrame(animate);
//     });

//     return () => animations.forEach((id) => cancelAnimationFrame(id));
//   }, [pathsData]);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-900">
//       <svg
//         viewBox="0 0 600 300"
//         className="h-[90%] w-[90%]"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* Draw paths */}
//         {pathsData.map((d, index) => (
//           <path
//             key={index}
//             ref={(el) => (pathRefs.current[index] = el)}
//             d={d}
//             stroke="white"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="6 6"
//           />
//         ))}

//         {/* Multiple moving dots */}
//         {Array.from({ length: 6 }).map((_, index) => (
//           <circle
//             key={index}
//             ref={(el) => (planeRefs.current[index] = el)}
//             r="6"
//             fill="#fbbf24" // Tailwind yellow-400
//             stroke="white"
//             strokeWidth="1"
//           />
//         ))}
//       </svg>
//     </div>
//   );
// }




import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AirplaneModeIcon } from "@hugeicons/core-free-icons";

export default function DataPathAnimation() {
  const pathRefs = useRef([]);
  const planeRefs = useRef([]);

  const pathsData = [
  // Top-left organic curve shape
  "M20 40 C80 10, 180 20, 200 70 S140 140, 60 130 Q20 110 20 40 Z",

  // Top-right organic curve shape
  "M400 40 C460 10, 560 20, 580 70 S520 140, 440 130 Q400 110 400 40 Z",

  // Bottom-left organic curve shape
  "M20 220 C80 190, 180 200, 200 250 S140 300, 60 290 Q20 270 20 220 Z",

  // Bottom-right organic curve shape
  "M400 220 C460 190, 560 200, 580 250 S520 300, 440 290 Q400 270 400 220 Z",
];


  useEffect(() => {
    const animations = [];

    planeRefs.current.forEach((plane, i) => {
      const pathIndex = i % pathsData.length;
      const path = pathRefs.current[pathIndex];
      const pathLength = path.getTotalLength();

      let start = performance.now() - Math.random() * 2000;
      const speed = 4000 + Math.random() * 8000;

      function animate(timestamp) {
        const progress = ((timestamp - start) / speed) % 1;
        const point = path.getPointAtLength(progress * pathLength);

        plane.setAttribute("transform", `translate(${point.x} ${point.y})`);

        animations[i] = requestAnimationFrame(animate);
      }

      animations[i] = requestAnimationFrame(animate);
    });

    return () => animations.forEach((id) => cancelAnimationFrame(id));
  }, [pathsData]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <svg
        viewBox="0 0 600 300"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {pathsData.map((d, index) => (
          <path
            key={index}
            ref={(el) => (pathRefs.current[index] = el)}
            d={d}
            stroke="#E5E7EB"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 6"
          />
        ))}

        {Array.from({ length: 6 }).map((_, index) => (
          <g
            key={index}
            ref={(el) => (planeRefs.current[index] = el)}
            className="text-gray-400"
            style={{ transformOrigin: "center" }}
          >
            <HugeiconsIcon icon={AirplaneModeIcon} />
          </g>
        ))}
      </svg>
    </div>
  );
}

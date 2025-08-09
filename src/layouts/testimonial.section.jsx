import { QuoteUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
export default function TestimonialCard({ name, text, image, social, url }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-8 rounded-lg bg-white p-8 text-center shadow-2xl shadow-gray-900/10">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400">
        <HugeiconsIcon icon={QuoteUpIcon} size={24} strokeWidth={2} />
      </div>
      <p className="flex flex-1 text-start text-lg/9 font-medium text-gray-900">
        {text}
      </p>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
            <img
              src={image}
              alt={name}
              className="h-6 w-6 rounded-full object-cover"
            />
          </div>

          <span className="font-semibold text-gray-900">{name}</span>
        </div>
        <button
          onClick={() => (window.location.href = { url })}
          className="cursor-pointer"
        >
          <span className="font-normal text-gray-400">{social}</span>
        </button>
      </div>
    </div>
  );
}



{
  /* {[
          { top: "10%", left: "15%", size: "w-40 h-24" },
          { top: "20%", left: "70%", size: "w-32 h-20" },
          { top: "60%", left: "10%", size: "w-44 h-28" },
          { top: "65%", left: "75%", size: "w-36 h-24" },
          { top: "35%", left: "45%", size: "w-48 h-32" },
        ].map((card, i) => (
          <div
            key={i}
            className={`absolute rounded-xl bg-white shadow-lg ${card.size}`}
            style={{
              top: card.top,
              left: card.left,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-4 font-medium text-gray-700">
              Card {i + 1}
            </div>
          </div>
        ))} */
}

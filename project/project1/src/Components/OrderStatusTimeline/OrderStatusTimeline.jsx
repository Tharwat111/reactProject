
import React from "react";

export default function OrderStatusTimeline({ status }) {
  const steps = ["Ordered", "Confirmed", "Out for delivery", "Delivered", "Paid"];

  const getColor = (step) => {
    if (step === status) return "border-green-500 bg-green-500";
    const stepIndex = steps.indexOf(step);
    const statusIndex = steps.indexOf(status);
    return stepIndex < statusIndex ? "border-primary bg-primary" : "border-gray-300 bg-white";
  };

  return (
    <div className="flex gap-4 items-start">

      <div className="flex flex-col gap-8 items-center justify-center">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative p-[11px] size-1 border rounded-full flex items-center justify-center 
              ${getColor(step).split(" ")[0]} 
              after:w-[1px] after:h-[33px] after:translate-x-1/2 after:bg-slate-400 after:absolute 
              after:top-full after:right-1/2 ${i === steps.length - 1 ? "after:hidden" : ""}`}
          >
            <div className={`size-1 p-[7px] rounded-full ${getColor(step).split(" ")[1]}`}></div>
          </div>
        ))}
      </div>

      
      <div className="flex flex-col gap-8 py-1">
        {steps.map((step) => (
          <h2 key={step} className="text-sm font-medium">
            {step}
          </h2>
        ))}
      </div>
    </div>
  );
}

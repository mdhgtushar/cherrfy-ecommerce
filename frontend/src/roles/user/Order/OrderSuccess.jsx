import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function OrderSuccess() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    // ✅ Confetti burst from bottom center and spread upward
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;

    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // ✅ Bottom center blast
      confetti({
        particleCount,
        origin: { x: 0.5, y: 1 }, // from bottom
        ...defaults,
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      
      {/* ✅ Smooth fade-in */}
      <div className={`transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        
        {/* ✅ Green Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* ✅ Heading */}
        <h1 className="text-3xl font-bold text-[#333333]">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2 text-sm">
          Thank you for your purchase! Your order has been successfully placed.
        </p>
        
        {/* ✅ Order ID Example */}
        <p className="text-gray-500 text-xs mt-1">
          Order ID: <span className="font-semibold">#CFF-20251109</span>
        </p>

        {/* ✅ Button Back to Home */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium px-6 py-2 rounded-md text-sm"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

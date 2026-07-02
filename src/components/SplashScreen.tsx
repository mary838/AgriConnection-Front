"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setVisible(true);

    const fadeTimer = setTimeout(() => setFading(true), 2300);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1e3d18] transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Leaf ring */}
      <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center mb-6">
        <span className="text-[48px] select-none">🌾</span>
      </div>

      <h1
        className="text-white text-[38px] font-semibold tracking-tight mb-2"
        style={{ fontFamily: "Georgia, serif" }}
      >
        AgriConnect
      </h1>
      <p className="text-white/50 text-[14px] tracking-widest uppercase">
        From the farm to your table
      </p>

      {/* Pulsing dots */}
      <div className="flex gap-2.5 mt-12">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}

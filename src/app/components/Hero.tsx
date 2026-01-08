"use client";
import { useState, useRef } from "react";
import Avatar from "./ui/Avatar";
import { useLanguage } from "../../context/LanguageContext";

const Hero = () => {
  const [glowSide, setGlowSide] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const topDist = y;
    const bottomDist = rect.height - y;
    const leftDist = x;
    const rightDist = rect.width - x;

    const min = Math.min(topDist, bottomDist, leftDist, rightDist);

    if (min === topDist) setGlowSide("top");
    else if (min === bottomDist) setGlowSide("bottom");
    else if (min === leftDist) setGlowSide("left");
    else if (min === rightDist) setGlowSide("right");
  };

  const handleMouseLeave = () => setGlowSide("");

  const shadowMap: Record<string, string> = {
    top: "shadow-[0_-4px_8px_-2px_black]",
    bottom: "shadow-[0_4px_8px_-2px_black]",
    left: "shadow-[-4px_0_8px_-2px_black]",
    right: "shadow-[4px_0_8px_-2px_black]",
    "": "shadow-none"
  };

  const { t } = useLanguage();

  return (
    <div className="flex flex-col mt-20 items-center mb-8">
      {/* Profile Section */}
      <div className="text-center mt-8">
        <Avatar />
      </div>

      {/* Name and Title */}
      <h1 className="text-5xl font-bold mt-5">{t.headings.heroName}</h1>
      <p className="text-2xl font-light text-gray-600 mt-1">{t.headings.heroTitle}</p>

      {/* Glow Box - No movement, just shadow */}
      <div
        ref={boxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`text-sm text-center text-light mt-4 px-6 py-3 rounded-full max-w-xl border border-gray-300 transition-all duration-200 ${shadowMap[glowSide]}`}
      >
        {t.headings.heroIntro}
      </div>
    </div>
  );
};

export default Hero;





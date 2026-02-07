import { useState, useRef } from "react";
import TypingName from "./TypingName";
import EvasiveButton from "./EvasiveButton";

const PERSUASIVE_TEXTS = [
  "",
  "Just say yes 💕",
  "You know you want to 😌",
  "Pretty please? 🥺",
  "C'mon, don't be shy 💗",
  "I won't give up 💘",
  "You're making me blush 🌹",
  "Say yes already! 😍",
  "Resistance is futile 💝",
];

interface QuestionScreenProps {
  names: string[];
  onYes: () => void;
}

const QuestionScreen = ({ names, onYes }: QuestionScreenProps) => {
  const [evadeCount, setEvadeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const persuasiveText = PERSUASIVE_TEXTS[Math.min(evadeCount, PERSUASIVE_TEXTS.length - 1)];
  const yesScale = 1 + evadeCount * 0.08;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl sm:text-3xl opacity-20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `float-heart ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            💕
          </span>
        ))}
      </div>

      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16 z-10">
        <h1 className="text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 min-h-[1.2em]">
          <TypingName names={names} />
        </h1>
        <p className="font-magofah text-2xl sm:text-3xl md:text-4xl text-foreground/90">
          will you be my Valentine? ❤️
        </p>
      </div>

      {/* Button area */}
      <div className="z-10 flex flex-col items-center gap-4">
        {/* Persuasive text */}
        <p
          className="text-lg sm:text-xl text-accent min-h-[1.8em] transition-all duration-500 font-medium"
          key={evadeCount}
          style={{ animation: evadeCount > 0 ? "fade-in 0.4s ease-out" : "none" }}
        >
          {persuasiveText}
        </p>

        {/* Button container */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center gap-6 w-[320px] sm:w-[400px] h-[120px] sm:h-[140px]"
        >
          {/* Yes button */}
          <button
            onClick={onYes}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg
                       shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 z-10"
            style={{
              transform: `scale(${yesScale})`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Yes 💖
          </button>

          {/* No button (evasive) */}
          <EvasiveButton
            containerRef={containerRef}
            onEvade={() => setEvadeCount((c) => c + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;

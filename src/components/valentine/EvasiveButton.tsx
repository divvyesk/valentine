import { useState, useRef, useCallback } from "react";

interface EvasiveButtonProps {
  onEvade: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const EvasiveButton = ({ onEvade, containerRef }: EvasiveButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const evade = useCallback(() => {
    if (!containerRef.current || !btnRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = btnRef.current.getBoundingClientRect();
    const btnW = btn.width;
    const btnH = btn.height;

    // Available movement space
    const maxX = container.width - btnW - 16;
    const maxY = container.height - btnH - 16;

    // Random new position within container
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setPosition({ x: newX, y: newY });
    onEvade();
  }, [containerRef, onEvade]);

  return (
    <button
      ref={btnRef}
      onMouseEnter={evade}
      onTouchStart={(e) => {
        e.preventDefault();
        evade();
      }}
      className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold text-lg
                 transition-all duration-300 ease-out hover:bg-secondary/80 select-none touch-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      No 😢
    </button>
  );
};

export default EvasiveButton;

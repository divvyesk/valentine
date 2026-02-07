import { useState, useEffect, useCallback } from "react";

interface TypingNameProps {
  names: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDuration?: number;
}

const TypingName = ({
  names,
  typingSpeed = 120,
  erasingSpeed = 80,
  pauseDuration = 1500,
}: TypingNameProps) => {
  const [displayed, setDisplayed] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  const currentName = names[nameIndex];

  const tick = useCallback(() => {
    if (!isErasing) {
      if (displayed.length < currentName.length) {
        setDisplayed(currentName.slice(0, displayed.length + 1));
        return typingSpeed;
      } else {
        setIsErasing(true);
        return pauseDuration;
      }
    } else {
      if (displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
        return erasingSpeed;
      } else {
        setIsErasing(false);
        setNameIndex((prev) => (prev + 1) % names.length);
        return typingSpeed;
      }
    }
  }, [displayed, isErasing, currentName, names.length, nameIndex, typingSpeed, erasingSpeed, pauseDuration]);

  useEffect(() => {
    const delay = tick();
    const timer = setTimeout(() => {
      // trigger re-render by calling tick logic via state changes already done
    }, delay);

    // Actually we need to re-trigger. Let's use a counter approach.
    return () => clearTimeout(timer);
  }, [tick]);

  // Simpler approach with a single effect
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      setDisplayed((prev) => {
        // We need access to current state, so let's use refs instead
        return prev;
      });
    };

    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="font-adelia typing-cursor inline-block pr-1">
      {displayed}
    </span>
  );
};

// Let me rewrite this more cleanly with a ref-based approach
export default function TypingNameComponent({
  names,
  typingSpeed = 120,
  erasingSpeed = 80,
  pauseDuration = 1500,
}: TypingNameProps) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">("typing");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const name = names[idx % names.length];

    if (phase === "typing") {
      if (text.length < name.length) {
        const t = setTimeout(() => setText(name.slice(0, text.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 0);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), pauseDuration);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), erasingSpeed);
        return () => clearTimeout(t);
      } else {
        setIdx((i) => (i + 1) % names.length);
        setPhase("typing");
      }
    }
  }, [text, phase, idx, names, typingSpeed, erasingSpeed, pauseDuration]);

  return (
    <span className="font-adelia typing-cursor inline-block pr-1 text-primary">
      {text}
    </span>
  );
}

import { useState, useEffect } from "react";

interface EnvelopeRevealProps {
  onGoBack: () => void;
}

const LETTER_TEXT = `I knew you'd say yes 💕

Thank you for making this Valentine's Day extra special !

You are my today, my tomorrow and my forever <3



I love you endlessly, Yaahvi ❤️❤️‍🔥

Yours truly, Divvye`;

const EnvelopeReveal = ({ onGoBack }: EnvelopeRevealProps) => {
  const [phase, setPhase] = useState<"envelope" | "letter">("envelope");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showLetter, setShowLetter] = useState(false);

  // Open envelope after mount
  useEffect(() => {
    const t1 = setTimeout(() => setEnvelopeOpen(true), 500);
    const t2 = setTimeout(() => {
      setShowLetter(true);
      setPhase("letter");
    }, 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Typewriter effect for letter
  useEffect(() => {
    if (phase !== "letter") return;
    if (typedText.length >= LETTER_TEXT.length) return;

    const char = LETTER_TEXT[typedText.length];
    const delay = char === "\n" ? 300 : char === "." || char === "," ? 150 : 50;

    const t = setTimeout(() => {
      setTypedText(LETTER_TEXT.slice(0, typedText.length + 1));
    }, delay);

    return () => clearTimeout(t);
  }, [typedText, phase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in">
      {/* Envelope */}
      <div className="relative mb-8">
        <div
          className={`transition-all duration-1000 ease-out ${
            envelopeOpen ? "scale-90 opacity-40" : "scale-100 opacity-100"
          }`}
        >
          {/* Envelope body */}
          <div className="relative w-72 h-48 sm:w-96 sm:h-56 mx-auto">
            {/* Back */}
            <div className="absolute inset-0 bg-primary/30 rounded-lg border-2 border-primary/40" />
            {/* Flap */}
            <div
              className="absolute top-0 left-0 right-0 h-24 sm:h-28 origin-top border-2 border-primary/40 rounded-t-lg"
              style={{
                background: "linear-gradient(180deg, hsl(340, 70%, 50%) 0%, hsl(340, 60%, 35%) 100%)",
                transform: envelopeOpen ? "rotateX(180deg)" : "rotateX(0deg)",
                transition: "transform 1s ease-out",
                transformStyle: "preserve-3d",
                clipPath: "polygon(0 0, 50% 80%, 100% 0)",
              }}
            />
            {/* Front triangle */}
            <div
              className="absolute bottom-0 left-0 right-0 h-28 sm:h-32"
              style={{
                background: "linear-gradient(0deg, hsl(350, 55%, 30%) 0%, hsl(340, 50%, 40%) 100%)",
                clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
                borderRadius: "0 0 8px 8px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Letter */}
      {showLetter && (
        <div
        className="w-[95vw] max-w-3xl bg-card/90 backdrop-blur-sm rounded-2xl
                   px-10 py-12 shadow-2xl border border-primary/20 animate-scale-in"
      >
      
      <p className="font-royal-wedding text-lg sm:text-xl text-card-foreground
             whitespace-pre-line text-center leading-loose tracking-wide">

            {typedText}
            {typedText.length < LETTER_TEXT.length && (
              <span className="typing-cursor inline-block w-0">&nbsp;</span>
            )}
          </p>
        </div>
      )}

      {/* Go Back */}
      {typedText.length >= LETTER_TEXT.length && (
        <button
          onClick={onGoBack}
          className="font-royal-wedding mt-10 px-6 py-3 rounded-full bg-secondary/50 text-secondary-foreground
                     hover:bg-secondary/70 transition-all duration-300 animate-fade-in"
        >
          Go Back 💌
        </button>
      )}
    </div>
  );
};

export default EnvelopeReveal;

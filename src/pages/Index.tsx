import { useState } from "react";
import QuestionScreen from "@/components/valentine/QuestionScreen";
import EnvelopeReveal from "@/components/valentine/EnvelopeReveal";

// ✏️ EDIT THIS LIST — these names cycle in the animated heading
const NAMES = [
  "Yaahvi,", "Champakali,", "Boo,", "Bacchuu,", "Dikku,", "Jaanuu,",
  "Babeyyy,", "Kukkuuu,", "Darling,", "Babudii,", "Princess,", "Cutuu,",
  "Mommy,", "My Love,", "Dhinglu,", "Wifeyyy,",
];

const Index = () => {
  const [showEnvelope, setShowEnvelope] = useState(false);

  return (
    <div
      className="min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(340, 60%, 18%) 0%, hsl(350, 55%, 28%) 50%, hsl(330, 50%, 22%) 100%)",
      }}
    >
      {showEnvelope ? (
        <EnvelopeReveal onGoBack={() => setShowEnvelope(false)} />
      ) : (
        <QuestionScreen names={NAMES} onYes={() => setShowEnvelope(true)} />
      )}
    </div>
  );
};

export default Index;


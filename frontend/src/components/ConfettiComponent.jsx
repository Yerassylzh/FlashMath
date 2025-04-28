import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiComponent() {
  const [run, setRun] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    setRun(true);
    const timer = setTimeout(() => setRun(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        !run ? "opacity-0" : "opacity-100"
      }`}
    >
      <Confetti
        run={run}
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={300}
        gravity={0.2}
      />
    </div>
  );
}

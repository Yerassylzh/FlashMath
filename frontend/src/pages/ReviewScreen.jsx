import { useApp } from "../context/useApp";
import ResultCard from "../components/ResultCard";
import { useState, useEffect, useMemo } from "react";
import $ from "jquery";
import Confetti from "react-confetti";

function animateProgressBar(percent) {
  function animateProgress(targetPercent, duration) {
    const circle = document.querySelector(".progress-ring__circle");
    const text = document.getElementById("progressText");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;

    let startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let progress = Math.min(elapsed / duration, 1);
      let easedProgress = easeOutCubic(progress);

      const currentPercent = +(easedProgress * targetPercent).toFixed(0);
      const offset =
        circumference * (1 - (easedProgress * targetPercent) / 100);

      circle.style.strokeDashoffset = offset;
      text.textContent = `${currentPercent}%`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        text.textContent = `${targetPercent}%`;
      }
    }

    circle.style.transition = "none";

    requestAnimationFrame(animate);
  }

  animateProgress(percent, 1000);

  setTimeout(() => {
    $(".progress-ring__background").css("stroke", "#dc2626");
  }, 1000);
}

export default function ReviewScreen() {
  const {
    testStartTime,
    testEndTime,
    selectedOptions,
    setSelectedOptions,
    testCards,
  } = useApp();

  let totalScore = useMemo(() => {
    let total = 0;
    for (let i = 0; i < testCards.length; i++) {
      total += selectedOptions[i] == testCards[i].solutionIndex;
    }
    return total;
  }, []);

  const secondsElapsed = useMemo(() => {
    return testEndTime - testStartTime;
  }, []);

  const [show, setShow] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    setShow(true);
    const timer = setTimeout(() => setShow(false), 5000);
    animateProgressBar((totalScore / testCards.length) * 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={300}
          gravity={0.2}
        />
      )}
      <main className="relative flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen">
        <ResultCard
          totalScore={totalScore}
          testCards={testCards}
          selectedOptions={selectedOptions}
          secondsElapsed={secondsElapsed}
        />
      </main>
    </>
  );
}

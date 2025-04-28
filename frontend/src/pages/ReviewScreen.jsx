import { useApp } from "../context/useApp";
import ResultCard from "../components/ResultCard";
import { useState, useEffect, useMemo } from "react";
import Confetti from "react-confetti";
import ProgressBar from "../components/ProgressBar";
import { formatSeconds } from "../utils";
import ConfettiComponent from "../components/ConfettiComponent";

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

  let percent = (totalScore / testCards.length) * 100;

  const secondsElapsed = testEndTime - testStartTime;

  return (
    <>
      <ConfettiComponent />
      <main className="relative flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen">
        <div className="w-[500px]">
          <div className="flex flex-col justify-start align-center mb-8 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
              {getFeedback(percent)}
            </h1>
            <p className="text-base sm:text-lg text-gray-200">
              {`Время прохождения: ${formatSeconds(secondsElapsed)}`}
            </p>
            <div className="flex mt-2 gap-7">
              <ProgressBar percent={percent} />
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 justify-center">
                  <div className="text-[16px] text-green-600">Верно</div>
                  <div className="text-[16px] text-red-600">Неверно</div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <div className="w-[40px] font-semibold flex justify-center text-green-600 bg-green-100 border-green-600 border-1 rounded-2xl">
                    {totalScore}
                  </div>
                  <div className="w-[40px] font-semibold flex justify-center text-red-600 bg-red-100 border-red-600 border-1 rounded-2xl">
                    {testCards.length - totalScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flashcard-container w-full flex flex-col items-center gap-5 justify-center mb-8">
            {testCards.map((card, cardId) => (
              <ResultCard
                card={card}
                cardId={cardId}
                selectedOptions={selectedOptions}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function getFeedback(percent) {
  if (percent <= 25) {
    return "Не сдавайся!";
  } else if (percent <= 50) {
    return "Неплохо!";
  } else if (percent <= 75) {
    return "Хорошо!";
  } else if (percent <= 90) {
    return "Отлично!";
  } else {
    return "Превосходно!";
  }
}

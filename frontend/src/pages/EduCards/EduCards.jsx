import { useEffect, useState } from "react";
import { BackgroundImageType, useApp } from "../../context/useApp";
import $ from "jquery";

import EduCard from "./components/EduCard";
import "./EduCards.module.css";

export default function EduCards() {
  const { prompt, setAppStage, eduCards, testCards, setBackgroundImageType } =
    useApp();

  useEffect(() => {
    setBackgroundImageType(BackgroundImageType.MATH);
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [currentCard, setCurrentCard] = useState(eduCards[0]);

  useEffect(() => {
    setCurrentCard(eduCards[currentCardIndex - 1]); // 0 based indexing
    $("#flashcard").removeClass("is-flipped");
    if (currentCardIndex === eduCards.length) {
      $("#start-test-btn").css("display", "flex");
    } else {
      $("#start-test-btn").css("display", "none");
    }

    currentCardIndex == eduCards.length
      ? $("#next-button").attr("disabled", "true")
      : $("#next-button").removeAttr("disabled");

    currentCardIndex == 1
      ? $("#prev-button").attr("disabled", "true")
      : $("#prev-button").removeAttr("disabled");
  }, [currentCardIndex]);

  return (
    <>
      <main className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen">
        <EduCard
          prompt={prompt}
          currentCard={currentCard}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
        />
      </main>
    </>
  );
}

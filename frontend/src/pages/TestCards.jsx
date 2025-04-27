import { useEffect, useState } from "react";
import { AppStages, BackgroundImageType, useApp } from "../context/useApp";
import { useRef } from "react";
import $ from "jquery";

import "../styles/TestCards.css";
import { useToast } from "../context/useToast";
import TestCard from "../components/TestCard";

export default function TestCards() {
  const {
    selectedOptions,
    setSelectedOptions,
    prompt,
    setAppStage,
    testCards,
    setBackgroundImageType,
  } = useApp();

  const { showToast } = useToast();
  const { setTestStartTime, setTestEndTime } = useApp();

  useEffect(() => {
    setTestStartTime(Date.now() * 1000);
    setBackgroundImageType(BackgroundImageType.MATH);
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [currentCard, setCurrentCard] = useState(testCards[0]);

  useEffect(() => {
    setCurrentCard(testCards[currentCardIndex - 1]); // 0 based indexing
  }, [currentCardIndex]);

  return (
    <main className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen">
      <TestCard
        prompt={prompt}
        currentCard={currentCard}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        testCards={testCards}
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        setAppStage={setAppStage}
      />
    </main>
  );
}

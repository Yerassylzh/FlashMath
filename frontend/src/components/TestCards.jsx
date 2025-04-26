import { useEffect, useState } from "react";
import { AppStages, BackgroundImageType, useApp } from "../context/useApp";
import { useRef } from "react";
import $ from "jquery";

import "../styles/TestCards.css";
import { useToast } from "../context/useToast";

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

  useEffect(() => {
    setBackgroundImageType(BackgroundImageType.MATH);
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [currentCard, setCurrentCard] = useState(testCards[0]);

  useEffect(() => {
    setCurrentCard(testCards[currentCardIndex - 1]); // 0 based indexing
  }, [currentCardIndex]);

  return (
    <main className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen">
      <div className="text-center mb-8 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
          {prompt}
        </h1>
        <p className="text-base sm:text-lg text-gray-200">
          Пройди тестовые задания и проверь свои знания
        </p>
      </div>

      <div className="flashcard-container w-full flex justify-center mb-8">
        <div id="flashcard" className="flashcard">
          <div className="flashcard-face flashcard-front w-full">
            <div className="flex flex-col w-full h-full items-start justify-between">
              <div className="gap-2 flex flex-col w-full items-start justify-start">
                <button className="flex gap-2 cursor-pointer border-none outline-none">
                  <i className="flex items-center content-center text-black text-[16px] fa-regular fa-lightbulb"></i>
                  <div
                    className="text-gray-700 text-[15px]"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast(currentCard.hint, "success");
                    }}
                  >
                    Подсказка
                  </div>
                </button>
                <div className="text-gray-700 text-[17px]">
                  {currentCard.problem}
                </div>
              </div>
              <div className="flex flex-col content-between items-start w-full gap-2">
                <div className="text-gray-600">Выбери правильный ответ</div>
                <div className="w-full grid grid-cols-2 gap-4 place-items-center text-[16px] text-gray-600">
                  {currentCard.solutionOptions.map((option, id) => (
                    <button
                      id={`s-o-${id}`}
                      key={`s-o-${id}`}
                      className={
                        selectedOptions[currentCardIndex - 1] == null ||
                        selectedOptions[currentCardIndex - 1] !== id
                          ? "cursor-pointer w-full pt-1 pb-1 border-1 hover:border-blue-500 border-gray-400 rounded-[5px]"
                          : "cursor-pointer w-full pt-1 pb-1 border-1 hover:border-blue-500 border-blue-500 bg-gray-100 rounded-[5px]"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedOptions((prevSelectedOptions) => {
                          let newOptions = [...prevSelectedOptions];
                          newOptions[currentCardIndex - 1] = parseInt(
                            e.target.id.replace("s-o-", "")
                          );
                          return newOptions;
                        });
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            id="prev-button"
            className="nav-button bg-white cursor-pointer"
            aria-label="Previous card"
            disabled
          >
            <svg
              className="text-blue-700 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <span
            id="progress-indicator"
            className="text-base font-medium text-gray-200 whitespace-nowrap tabular-nums"
          >
            {currentCardIndex} / {testCards.length}
          </span>

          <button
            id="next-button"
            className="nav-button bg-white cursor-pointer hover"
            aria-label="Next card"
            onClick={(e) => {
              if (selectedOptions[currentCardIndex - 1] == null) {
                showToast("Выберите вариант", "failure");
                return;
              }
              if (currentCardIndex == testCards.length) {
                setAppStage(AppStages.REVIEW);
                return;
              }
              setCurrentCardIndex(
                Math.min(testCards.length, currentCardIndex + 1)
              );
            }}
          >
            <svg
              className="text-blue-500 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="w-full max-w-xs bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div
            id="progress-bar-fill"
            className="bg-blue-600 h-1.5 rounded-full"
            style={{
              width: (currentCardIndex / testCards.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}

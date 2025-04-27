import { useApp } from "../context/useApp";
import { AppStages } from "../context/useApp";

import "../styles/EduCard.css";
import $ from "jquery";

export default function EduCard({
  prompt,
  currentCard,
  currentCardIndex,
  setCurrentCardIndex,
}) {
  const { eduCards, setAppStage } = useApp();

  return (
    <>
      <div className="text-center mb-8 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
          {prompt}
        </h1>
        <p className="text-base sm:text-lg text-gray-200">
          Изучи эти карточки, чтобы понять тему
        </p>
      </div>

      <div className="flashcard-container w-full flex justify-center mb-8">
        <div
          id="flashcard"
          onClick={(e) => $("#flashcard").toggleClass("is-flipped")}
          className="flashcard"
        >
          <div className="flashcard-face flashcard-front">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black px-3 py-1 rounded inline-block">
              {currentCard.name}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {currentCard.explanation}
            </p>
          </div>
          <div
            className="flashcard-face flashcard-back"
            dangerouslySetInnerHTML={{ __html: currentCard.svg }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            id="prev-button"
            className="nav-button bg-white cursor-pointer"
            aria-label="Previous card"
            onClick={(e) =>
              setCurrentCardIndex(Math.max(1, currentCardIndex - 1))
            }
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
            {currentCardIndex} / {eduCards.length}
          </span>

          <button
            id="next-button"
            className="nav-button bg-white cursor-pointer hover"
            aria-label="Next card"
            onClick={(e) =>
              setCurrentCardIndex(
                Math.min(eduCards.length, currentCardIndex + 1)
              )
            }
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
              width: (currentCardIndex / eduCards.length) * 100 + "%",
            }}
          ></div>
        </div>
        <button
          id="start-test-btn"
          className="bg-blue-600 hover:bg-blue-500 cursor-pointer pl-4 pr-4 pt-2 pb-2 rounded-[7px] mt-3"
          onClick={(e) => {
            e.preventDefault();
            setAppStage(AppStages.TEST);
          }}
          style={{
            display: "none",
          }}
        >
          Начать Тест
        </button>
      </div>
    </>
  );
}

import { useToast } from "../context/useToast";
import { formatSeconds } from "../utils";
import { useEffect } from "react";
import $ from "jquery";

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

export default function ResultCard({
  totalScore,
  testCards,
  selectedOptions,
  secondsElapsed,
}) {
  const percent = Math.round((totalScore / testCards.length) * 100);
  const { showToast } = useToast();

  return (
    <>
      <div className="w-[500px]">
        <div className="flex flex-col justify-start align-center mb-8 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
            {getFeedback(percent)}
          </h1>
          <p className="text-base sm:text-lg text-gray-200">
            {`Время прохождения: ${formatSeconds(secondsElapsed)}`}
          </p>
          <div className="flex mt-2 gap-7">
            <div className="w-[100px] h-[100px] progress-container relative flex justify-center items-center">
              <svg className="progress-ring w-[100px] h-[100px] absolute">
                <defs>
                  <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                </defs>
                <circle
                  className="progress-ring__background"
                  cx="50"
                  cy="50"
                  r="40"
                />
                <circle
                  className="progress-ring__circle"
                  cx="50"
                  cy="50"
                  r="40"
                />
              </svg>
              <div
                className="text-white text-[17px] font-bold"
                id="progressText"
              >
                0%
              </div>
            </div>
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
            <>
              <div key={`${card}-${cardId}`} className="flashcard">
                <div className="flashcard-face flashcard-front w-full">
                  <div className="flex flex-col w-full h-full items-start justify-between">
                    <div className="gap-2 flex flex-col w-full items-start justify-start">
                      <div className="w-full flex items-center justify-start">
                        <div className="font-semibold text-black">Вопросы</div>
                        <div className="w-full text-gray-400 flex justify-end items-end">
                          {cardId + 1} из {testCards.length}
                        </div>
                      </div>
                      <div className="text-gray-700 text-[17px]">
                        {card.problem}
                      </div>
                    </div>
                    <div className="flex flex-col content-between items-start w-full gap-2">
                      {selectedOptions[cardId] == card.solutionIndex ? (
                        <div className="text-green-600">Правильный ответ</div>
                      ) : (
                        <div className="text-red-600">Неверный ответ</div>
                      )}
                      <div className="w-full grid grid-cols-2 gap-4 place-items-center text-[16px] text-gray-600">
                        {card.solutionOptions.map((option, id) => (
                          <button
                            data-index={id}
                            key={`${option}-${id}`}
                            className={
                              (card.solutionIndex === id &&
                              id == selectedOptions[cardId]
                                ? "border-green-500 bg-green-50"
                                : card.solutionIndex !== id &&
                                  id === selectedOptions[cardId]
                                ? "border-red-500 bg-red-50"
                                : card.solutionIndex === id &&
                                  id !== selectedOptions[cardId]
                                ? "border-green-500 bg-green-50 border-dashed"
                                : "border-gray-200") +
                              " gap-1 rounded-[5px] cursor-pointer w-full pt-2 pb-2 pl-2 pr-2 border-1 flex justify-start items-center"
                            }
                          >
                            {card.solutionIndex === id &&
                            id == selectedOptions[cardId] ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-green-500 w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            ) : card.solutionIndex !== id &&
                              id === selectedOptions[cardId] ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-red-500 w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            ) : card.solutionIndex === id &&
                              id !== selectedOptions[cardId] ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="text-green-500 w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            ) : (
                              <div></div>
                            )}
                            <p>{option}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="flex gap-2 cursor-pointer border-none outline-none">
                      <i className="flex items-center content-center text-black text-[16px] fa-regular fa-lightbulb"></i>
                      <div
                        className="text-gray-700 text-[15px]"
                        onClick={(e) => {
                          e.preventDefault();
                          const panel =
                            e.target.closest(".flashcard").nextElementSibling;
                          panel.classList.toggle("hidden");
                        }}
                      >
                        Объяснение
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white w-[500px] p-[1.5rem] rounded-2xl hidden">
                <div className="mt-2 gap-2 flex flex-col justify-start">
                  <div className="font-medium text-black">Решение от ИИ</div>
                  <div className="text-black">{card.explanation}</div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

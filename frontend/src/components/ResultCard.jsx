import { useToast } from "../context/useToast";
import { formatSeconds } from "../utils";
import { useEffect } from "react";
import $ from "jquery";
import { useApp } from "../context/useApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

export default function ResultCard({ card, cardId, selectedOptions }) {
  const { testCards } = useApp();

  return (
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
              <div className="text-gray-700 text-[17px]">{card.problem}</div>
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
            <button className="flex items-center justify-start gap-2 cursor-pointer border-none outline-none">
              <FontAwesomeIcon
                className="flex items-center content-center text-black text-[16px]"
                icon={faLightbulb}
              />
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
  );
}

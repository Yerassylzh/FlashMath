import { useToast } from "../../../context/useToast";
import { AppStages, useApp } from "../../../context/useApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

import styles from "../TestCards.module.css";

export default function TestCard({
  prompt,
  currentCard,
  setSelectedOptions,
  selectedOptions,
  testCards,
  currentCardIndex,
  setCurrentCardIndex,
  setAppStage,
}) {
  const { showToast } = useToast();
  const { setTestEndTime } = useApp();

  return (
    <>
      <div className="text-center mb-8 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
          {prompt}
        </h1>
        <p className="text-base sm:text-lg text-gray-200">
          Пройди тестовые задания и проверь свои знания
        </p>
      </div>

      <div
        className={`${styles["flashcard-container"]} flex justify-center mb-8 xl:w-[500px] md:w-[500px] sm:w-[400px] w-full`}
      >
        <div id="flashcard" className={`${styles["flashcard"]}`}>
          <div
            className={`${styles["flashcard-face"]} ${styles["flashcard-front"]} w-full`}
          >
            <div className="flex flex-col w-full h-full items-start justify-between">
              <div className="gap-2 flex flex-col w-full items-start justify-start">
                <button className="flex items-center justify-start gap-2 cursor-pointer border-none outline-none">
                  <FontAwesomeIcon
                    className="flex items-center content-center text-black text-[16px]"
                    icon={faLightbulb}
                  />
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
                      data-index={id}
                      key={`s-o-${id}`}
                      className={
                        (selectedOptions[currentCardIndex - 1] == null ||
                        selectedOptions[currentCardIndex - 1] !== id
                          ? "hover:border-blue-500 border-gray-200"
                          : "hover:border-blue-500 border-blue-500 bg-gray-100") +
                        " rounded-[5px] cursor-pointer w-full pt-2 pb-2 pl-2 pr-2 border-1 flex justify-start items-center"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedOptions((prevSelectedOptions) => {
                          let newOptions = [...prevSelectedOptions];
                          newOptions[currentCardIndex - 1] = parseInt(
                            e.target.dataset.index
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
            className={`${styles["nav-button"]} bg-white cursor-pointer`}
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
            className={`${styles["nav-button"]} bg-white cursor-pointer hover`}
            aria-label="Next card"
            onClick={(e) => {
              if (selectedOptions[currentCardIndex - 1] == null) {
                showToast("Выберите вариант", "failure");
                return;
              }
              if (currentCardIndex == testCards.length) {
                setTestEndTime(Date.now() * 1000);
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
    </>
  );
}

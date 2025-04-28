import { useEffect } from "react";
import calculatorIcon from "../../public/calculator.png"; // Correct relative path
import GradientCircle from "../components/GradientCircle";
import { AppStages, BackgroundImageType, useApp } from "../context/useApp";

export default function WaitingScreen() {
  const { setBackgroundImageType } = useApp();
  useEffect(() => {
    setBackgroundImageType(BackgroundImageType.MATH);
  }, []);

  return (
    <main className="flex-grow flex flex-col gap-30 items-center justify-center py-10 px-4 min-h-screen overflow-x-hidden">
      <div className="flex flex-col justify-start items-center gap-5">
        <div className="relative bg-transparent flex flex-col justify-center items-center gap-5">
          <GradientCircle />
          <div className="absolute">
            <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
              <g>
                <circle cx="60" cy="11" r="4" fill="#808080">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 60 60"
                    to="360 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#a0a0a0" opacity="0.9">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="45 60 60"
                    to="405 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#c0c0c0" opacity="0.8">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="90 60 60"
                    to="450 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#ffffff" opacity="0.7">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="135 60 60"
                    to="495 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#ffffff" opacity="0.6">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="180 60 60"
                    to="540 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#c0c0c0" opacity="0.5">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="225 60 60"
                    to="585 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#a0a0a0" opacity="0.4">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="270 60 60"
                    to="630 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="60" cy="11" r="4" fill="#808080" opacity="0.3">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="315 60 60"
                    to="675 60 60"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </div>
          <div className="w-[120px] top-0 absolute h-[120px]">
            <img
              className="w-[120px] h-[120px] object-contain"
              src="/calculator.png"
              alt=""
            />
          </div>
        </div>
        <div className="waiting-text text-3xl md:text-4xl text-gray-400 font-bold whitespace-nowrap">
          Генерация карточек...
        </div>
      </div>

      <div className="xl:w-[500px] md:w-[300px] sm:w-[300px] rounded-2xl gap-3 pt-2 pb-3 pl-5 pr-5 flex flex-col justify-start items-start bg-white shadow-2xl">
        <div className="text-[20px] font-bold text-black w-full flex justify-center">
          Факты
        </div>
        <div className="flex w-full justify-center align-center gap-3">
          <div className="text-black">
            Число Пи (π) - бесконечно и не повторяется
          </div>
        </div>
      </div>
    </main>
  );
}

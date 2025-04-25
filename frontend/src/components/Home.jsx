import { useCallback, useEffect, useState } from "react";
import { api, AI_MODEL } from "../constants";
import React from "react";
import { AppStages, useApp } from "../context/useApp";
import { useToast } from "../context/useToast";
import "../styles/Home.css";
import $ from "jquery";

const getEduCardsGenerationPrompt = (topic) => {
  return `
    Создай 10 обучательных карточек по математике на тему: ${topic}.
    Дай ответ ввиде корректного кода в JSON-формате: массив объектов, каждый объект содержит 3 поля: name, svg, explanation.
    
      Каждая карточка должна быть объектом с пятью полями:
      name — чёткое и осмысленное название темы (например, "Наибольшее значение квадратичной функции", а не просто "Функции 2").
      svg — красивое, красочное и понятное SVG-изображение, которое визуально помогает понять тему. Используй элементы <path>, <circle>, <line>, и другие графические элементы. SVG должен быть содержательным и иметь смысл, соответствующий задаче. Если задача не требует рисунка (например, простая алгебра), поле svg всё равно может содержать простую визуализацию (например, координатную ось, стрелки, сетку).
      explanation — подробное, но простое объяснение, которое пошагово объясняет тему.
    Важно:
      Расположи карточки по возрастанию сложности (от более лёгких к более трудным).
      Составляй нестандартные и интересные темы.
      Сделай так, чтобы при конвертации твоего ответа в JSON, не было ошибок
  `;
};

const getTestCardsGenerationPrompt = (topic, genEduCards) => {
  return `
    Создай 10 тестовых карточек по математике на тему: ${topic}.
    Используй ниже приведенные темы и обучательные теории:
    ${JSON.stringify(genEduCards)}
    Дай ответ ввиде корректного кода в JSON-формате: массив объектов, каждый объект содержит 5 полей: name, svg, problem, solution, explanation.
    
    Каждая карточка должна быть объектом с пятью полями:
      name — чёткое и осмысленное название задачи (например, "Наибольшее значение квадратичной функции", а не просто "Задача 3").
      svg — красивое, красочное и понятное SVG-изображение, которое визуально помогает понять задачу. Используй элементы <path>, <circle>, <line>, и другие графические элементы. SVG должен быть содержательным и иметь смысл, соответствующий задаче. Если задача не требует рисунка (например, простая алгебра), поле svg всё равно может содержать простую визуализацию (например, координатную ось, стрелки, сетку).
      problem — чёткая и понятная формулировка задачи.
      solution — числовой ответ в виде одного десятичного числа (например, "3.14").
      explanation — подробное, но простое объяснение, которое пошагово объясняет решение задачи.
      hint - маленькая подсказка которая поможет решить задачу
    Важно:
      Расположи карточки по возрастанию сложности (от более лёгких к более трудным).
      Последние задачи сделай очень сложными и интересными.
      Используй разные задачи из разных источников.
      Составляй нестандартные задачи.
      Не повторяй задачи из обучательной теории, которую я дал тебе выше.
      Сделай так, чтобы при конвертации твоего ответа в JSON, не было ошибок
  `;
};

const generateEduCards = async (topic) => {
  const prompt = getEduCardsGenerationPrompt(topic);

  try {
    const response = await api.post("/chat/completions", {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: AI_MODEL,
    });

    const message = response.data.choices[0].message.content;
    return JSON.parse(message.match(/```json\s*([\s\S]*?)\s*```/)[1]);
  } catch (error) {
    console.error("Error generating edu cards:", error);
    throw error;
  }
};

const generateTestCards = async (topic, eduCards) => {
  const prompt = getTestCardsGenerationPrompt(topic, eduCards);

  try {
    const response = await api.post("/chat/completions", {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: AI_MODEL,
    });

    const message = response.data.choices[0].message.content;
    return JSON.parse(message.match(/```json\s*([\s\S]*?)\s*```/)[1]);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw error;
  }
};

export default function Home({ onComplete }) {
  const { setAppStage, eduCards, setEduCards, testCards, setTestCards } =
    useApp();

  const { showToast } = useToast();

  const loadCards = useCallback(async (topic) => {
    try {
      let genEduCards = await generateEduCards(topic);
      let genTestCards = await generateTestCards(topic, genEduCards);

      setEduCards(genEduCards);
      setTestCards(genTestCards);
      setAppStage(AppStages.EDU);
    } catch (error) {
      showToast("Произошла ошибка при генерации карточек", "failure");
      setEduCards(null);
      setTestCards(null);
      setAppStage(AppStages.HOME);
    }
  }, []);

  const topicSamples = useMemo(() => {
    return [
      "Теорема Пифагора",
      "Производные",
      "Логарифмы",
      "Квадратные уравнения",
    ];
  }, []);

  const handleSampleChoice = useCallback((e) => {
    e.preventDefault();

    document.getElementById("prompt").value = e.target.textContent;
  }, []);

  const handlePromptSubmition = useCallback((e) => {
    e.preventDefault();
    loadCards(document.getElementById("prompt").value);
    setAppStage(AppStages.GENERATING);
  }, []);

  return (
    <React.Fragment>
      <header className="py-4 px-6 md:px-10 lg:px-16 opacity-0 animate-fade-in animation-delay-500">
        <div className="text-3xl font-extrabold">FlashMath</div>
      </header>

      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-xl text-center opacity-0 animate-fade-in-up">
          <span className="text-4xl mb-4 inline-block opacity-0 animate-fade-in-up animation-delay-600">
            👋
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 opacity-0 animate-fade-in-up animation-delay-700">
            Добро пожаловать в FlashMath!
          </h1>
          <p className="text-gray-200 mb-8 text-base md:text-lg opacity-0 animate-fade-in-up animation-delay-800">
            Введите тему по математике, и мы создадим карточки специально для
            тебя!
          </p>
          <div className="relative mb-5 opacity-0 animate-fade-in-up animation-delay-900">
            <input
              type="text"
              placeholder="Введите тему..."
              id="prompt"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent placeholder-gray-200 text-gray-100"
            />
            <button
              type="submit"
              id="submit-prompt"
              aria-label="Submit topic"
              onClick={handlePromptSubmition}
              className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-md p-1.5 flex items-center justify-center transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 opacity-0 animate-fade-in-up animation-delay-1000">
            {topicSamples.map((topic, id) => (
              <button
                key={id}
                onClick={handleSampleChoice}
                className="px-4 py-1.5 border border-gray-300 rounded-full text-sm text-gray-200 hover:text-gray-50 cursor-pointer transition duration-150 ease-in-out"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

import { useCallback, useEffect, useState } from "react";
import { api, AI_MODEL } from "../constants";
import React from "react";
import { AppStages, useApp } from "../context/useApp";
import { useToast } from "../context/useToast";

export default function Home({ onComplete }) {
  const getEduCardsGenerationPrompt = useCallback((topic) => {
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
  }, []);

  const getTestCardsGenerationPrompt = useCallback((topic, genEduCards) => {
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
  }, []);

  const generateEduCards = useCallback(async (topic) => {
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
  }, []);

  const generateTestCards = useCallback(async (topic, eduCards) => {
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
  }, []);

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
      throw 1;
    } catch (error) {
      showToast("Произошла ошибка при генерации карточек", "failure");
      setEduCards(null);
      setTestCards(null);
      setAppStage(AppStages.HOME);
    }
  });

  const handleInputSubmition = (e) => {
    e.preventDefault();
    loadCards(e.target.prompt.value);
    setAppStage(AppStages.GENERATING);
  };

  return (
    <form onSubmit={handleInputSubmition}>
      <input className="bg-gray-400" type="text" name="prompt" />
      <button className="bg-blue-700" type="submit">
        Submit
      </button>
    </form>
  );
}

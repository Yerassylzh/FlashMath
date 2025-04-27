import { createContext, useContext, useState } from "react";
import { CARDS_CNT } from "../constants";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppStages = {
  HOME: "HOME",
  GENERATING: "GENERATING",
  EDU: "EDU",
  TEST: "TEST",
  REVIEW: "REVIEW",
};

export const BackgroundImageType = {
  BLUR: "BLUR",
  MATH: "MATH",
};

export default function AppProvider({ children }) {
  const [appStage, setAppStage] = useState(AppStages.HOME);
  const [eduCards, setEduCards] = useState(null);
  const [testCards, setTestCards] = useState(null);
  const [backgroundImageType, setBackgroundImageType] = useState(
    BackgroundImageType.BLUR
  );
  const [prompt, setPrompt] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    return Array(CARDS_CNT).fill(null);
  });

  const [testStartTime, setTestStartTime] = useState(null);
  const [testEndTime, setTestEndTime] = useState(null);

  const contextData = {
    appStage: appStage,
    setAppStage: setAppStage,
    eduCards: eduCards,
    setEduCards: setEduCards,
    testCards: testCards,
    setTestCards: setTestCards,
    backgroundImageType: backgroundImageType,
    setBackgroundImageType: setBackgroundImageType,
    prompt: prompt,
    setPrompt: setPrompt,
    selectedOptions: selectedOptions,
    setSelectedOptions: setSelectedOptions,
    testStartTime: testStartTime,
    setTestStartTime: setTestStartTime,
    testEndTime: testEndTime,
    setTestEndTime: setTestEndTime,
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
}

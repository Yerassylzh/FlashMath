import { createContext, useContext, useState } from "react";

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

  const contextData = {
    appStage: appStage,
    setAppStage: setAppStage,
    eduCards: eduCards,
    setEduCards: setEduCards,
    testCards: testCards,
    setTestCards: setTestCards,
    backgroundImageType: backgroundImageType,
    setBackgroundImageType: setBackgroundImageType,
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
}

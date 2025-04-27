import { useMemo } from "react";
import React from "react";
import { AppStages, useApp } from "../context/useApp";
import Home from "./Home";
import WaitingScreen from "./WaitingScreen";
import EduCards from "./EduCards";
import TestCards from "./TestCards";
import ReviewScreen from "./ReviewScreen";
import Header from "../components/Header";

export default function App() {
  const { appStage } = useApp();

  let stageToComponent = useMemo(() => {
    return {
      [AppStages.HOME]: <Home />,
      [AppStages.GENERATING]: <WaitingScreen />,
      [AppStages.EDU]: <EduCards />,
      [AppStages.TEST]: <TestCards />,
      [AppStages.REVIEW]: <ReviewScreen />,
    };
  }, []);

  return (
    <>
      <Header />
      {stageToComponent[appStage]}
    </>
  );
}

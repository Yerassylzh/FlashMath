import { useMemo } from "react";
import React from "react";
import { AppStages, useApp } from "../../context/useApp";
import Home from "../Home/Home";
import WaitingScreen from "../WaitingScreen/WaitingScreen";
import EduCards from "../EduCards/EduCards";
import TestCards from "../TestCards/TestCards";
import ReviewScreen from "../ReviewScreen/ReviewScreen";
import Header from "../../components/Header";
import Http404 from "../Http404/Http404";

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
      {!stageToComponent[appStage] ? <Http404 /> : stageToComponent[appStage]}
    </>
  );
}

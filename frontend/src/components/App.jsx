import { useCallback, useEffect, useState } from "react";
import { api, AI_MODEL } from "../constants";
import React from "react";
import { AppStages, useApp } from "../context/useApp";
import Home from "./Home";
import WaitingScreen from "./WaitingScreen";
import EduCards from "./EduCards";
import TestCards from "./TestCards";
import ReviewScreen from "./ReviewScreen";
import Http404 from "./Http404";

function App() {
  const [eduCards, setEduCards] = useState(null);
  const [testCards, setTestCards] = useState(null);
  const [topic, setTopic] = useState(null);

  const { appStage } = useApp();

  if (appStage === AppStages.HOME) {
    return <Home />;
  }

  if (appStage === AppStages.GENERATING) {
    return <WaitingScreen />;
  }

  if (appStage === AppStages.EDU) {
    return <EduCards />;
  }

  if (appStage === AppStages.TEST) {
    return <TestCards />;
  }

  if (appStage === AppStages.REVIEW) {
    return <ReviewScreen />;
  }

  return <Http404 />;
}

export default App;

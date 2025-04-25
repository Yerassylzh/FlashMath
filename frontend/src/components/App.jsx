import { useCallback, useEffect, useState, useMemo } from "react";
import { api, AI_MODEL } from "../constants";
import React from "react";
import { AppStages, useApp } from "../context/useApp";
import Home from "./Home";
import WaitingScreen from "./WaitingScreen";
import EduCards from "./EduCards";
import TestCards from "./TestCards";
import ReviewScreen from "./ReviewScreen";
import Http404 from "./Http404";
import { Routes, Route, useNavigate } from "react-router-dom";
import Wallpaper from "./Wallpaper";

export default function App() {
  const [eduCards, setEduCards] = useState(null);
  const [testCards, setTestCards] = useState(null);
  const [topic, setTopic] = useState(null);

  const { appStage } = useApp();

  let stageToUrl = useMemo(() => {
    return {
      [AppStages.HOME]: "/",
      [AppStages.GENERATING]: "/wait/",
      [AppStages.EDU]: "/edu/",
      [AppStages.TEST]: "/test/",
      [AppStages.REVIEW]: "/results/",
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(stageToUrl[appStage]);
  }, [appStage]);

  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/wait/" element={<WaitingScreen />} />
        <Route path="/edu/" element={<EduCards />} />
        <Route path="/test/" element={<TestCards />} />
        <Route path="/results/" element={<ReviewScreen />} />
        <Route path="*" element={<Http404 />} />
      </Routes>
    </React.Fragment>
  );
}

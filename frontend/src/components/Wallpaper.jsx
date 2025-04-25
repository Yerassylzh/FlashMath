import React, { useEffect, useRef } from "react";
import { useMemo } from "react";
import { BackgroundImageType, useApp } from "../context/useApp";
import { TWallpaper } from "@twallpaper/react";
import "@twallpaper/react/css";

const Wallpaper = () => {
  const { backgroundImageType } = useApp();

  const options = useMemo(() => {
    return {
      fps: 60,
      tails: 90,
      animate: true,
      scrollAnimate: true,
      colors: ["#527bdd", "#009fdd", "#a4dbff"],
      pattern: {
        image: "https://twallpaper.js.org/patterns/math.svg",
        background: "#000",
        blur: 0,
        size: "400px",
        opacity: backgroundImageType == BackgroundImageType.BLUR ? 0.1 : 0.3,
        mask: false,
      },
    };
  }, [backgroundImageType]);

  useEffect(() => {
    document.querySelector(".tw-pattern").style.opacity =
      options.pattern.opacity;
  }, [options]);

  return <TWallpaper options={options} />;
};

export default Wallpaper;

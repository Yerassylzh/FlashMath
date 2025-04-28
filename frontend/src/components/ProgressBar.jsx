import React, { useEffect } from "react";
import $ from "jquery";
import { useState } from "react";

function animateProgress(targetPercent, duration) {
  const circle = document.querySelector(".progress-ring__circle");
  const text = document.getElementById("progressText");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;

  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    let progress = Math.min(elapsed / duration, 1);
    let easedProgress = easeOutCubic(progress);

    const currentPercent = +(easedProgress * targetPercent).toFixed(0);
    const offset = circumference * (1 - (easedProgress * targetPercent) / 100);

    circle.style.strokeDashoffset = offset;
    text.textContent = `${currentPercent}%`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      text.textContent = `${targetPercent}%`;
    }
  }

  circle.style.transition = "none";

  requestAnimationFrame(animate);
}

export default function ProgressBar({ percent }) {
  useEffect(() => {
    animateProgress(percent, 1000);
  }, []);

  return (
    <div className="w-[100px] h-[100px] progress-container relative flex justify-center items-center">
      <svg className="progress-ring w-[100px] h-[100px] absolute">
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
        <circle className="progress-ring__background" cx="50" cy="50" r="40" />
        <circle className="progress-ring__circle" cx="50" cy="50" r="40" />
      </svg>
      <div className="text-white text-[17px] font-bold" id="progressText">
        0%
      </div>
    </div>
  );
}

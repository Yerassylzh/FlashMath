import React, { useEffect } from "react";
import $ from "jquery";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";

// function animateProgress(targetPercent, duration) {
//   const circle = document.querySelector(".progress-ring__circle");
//   const text = document.getElementById("progressText");
//   const radius = circle.r.baseVal.value;
//   const circumference = 2 * Math.PI * radius;

//   circle.style.strokeDasharray = circumference;

//   let startTime = null;

//   function easeOutCubic(t) {
//     return 1 - Math.pow(1 - t, 3);
//   }

//   function animate(timestamp) {
//     if (!startTime) startTime = timestamp;
//     const elapsed = timestamp - startTime;

//     let progress = Math.min(elapsed / duration, 1);
//     let easedProgress = easeOutCubic(progress);

//     const currentPercent = +(easedProgress * targetPercent).toFixed(0);
//     const offset = circumference * (1 - (easedProgress * targetPercent) / 100);

//     circle.style.strokeDashoffset = offset;
//     text.textContent = `${currentPercent}%`;

//     if (progress < 1) {
//       requestAnimationFrame(animate);
//     } else {
//       text.textContent = `${targetPercent}%`;
//     }
//   }

//   circle.style.transition = "none";

//   requestAnimationFrame(animate);
// }

// function ProgressBar({ percent }) {
//   useEffect(() => {
//     animateProgress(percent, 1000);
//     const timer = setTimeout(() => {
//       $(".progress-ring__background").css("stroke", "#dc2626");
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="w-[100px] h-[100px] progress-container relative flex justify-center items-center">
//       <svg className="progress-ring w-[100px] h-[100px] absolute">
//         <defs>
//           <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#00c6ff" />
//             <stop offset="100%" stopColor="#0072ff" />
//           </linearGradient>
//         </defs>
//         <circle className="progress-ring__background" cx="50" cy="50" r="40" />
//         <circle className="progress-ring__circle" cx="50" cy="50" r="40" />
//       </svg>
//       <div className="text-white text-[17px] font-bold" id="progressText">
//         0%
//       </div>
//     </div>
//   );
// }

export default function ProgressBar() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pathColor =
    percentage <= 50
      ? `rgba(34, 197, 94, ${percentage / 100})` // Green
      : `rgba(239, 68, 68, ${(percentage - 50) / 100})`; // Red

  return (
    <div style={{ width: 120, height: 120 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor,
          textColor: "black",
          trailColor: "#d6d6d6",
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
}

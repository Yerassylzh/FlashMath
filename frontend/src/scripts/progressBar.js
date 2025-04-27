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

animateProgress(80, 1000);

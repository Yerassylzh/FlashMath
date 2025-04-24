import React, { useEffect, useState } from "react";

const Toast = ({ id, type = "success", message, onRemove }) => {
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade("fade-out");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    if (fade === "fade-out") {
      onRemove(id);
    }
  };

  const typeStyles = {
    success: "bg-green-100 text-green-700 border border-green-400",
    failure: "bg-red-100 text-red-700 border border-red-400",
  };

  return (
    <div
      className={`w-full max-w-sm p-4 mb-2 rounded shadow ${typeStyles[type]} ${fade}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {message}
    </div>
  );
};

export default Toast;

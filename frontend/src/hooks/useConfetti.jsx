import React, { useEffect, useState } from "react";

function useConfetti(initValue) {
  const [show, setShow] = useState(initValue);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    setShow(true);
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return [show, setShow, dimensions, setDimensions];
}

export default useConfetti;

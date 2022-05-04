import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

const useWindowHeight = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }, [size]);

  return size;
};

export default useWindowHeight;

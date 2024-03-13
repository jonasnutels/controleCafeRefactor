import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => {
    const width = window.innerWidth;
    return width < 990;
  });
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 990 && !screenSize) {
        setScreenSize(true);
      } else if (width >= 990 && screenSize) {
        setScreenSize(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenSize]);

  return screenSize;
};

export default useScreenSize;

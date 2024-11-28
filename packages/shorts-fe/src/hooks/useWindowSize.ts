import { useEffect, useState } from 'react';

function isMobileSize(size: number) {
  return size <= 600
}

type HookProps = {
  isClient: boolean | undefined
}

export default function useWindowSize({ isClient }: HookProps) {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth: undefined,
    height: isClient ? window.innerHeight: undefined,
  });
  const [isMobile, setMobile] = useState(isClient ? isMobileSize(window.innerWidth): false)
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setMobile(isMobileSize(window.innerWidth))
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return {...windowSize, isMobile};
}

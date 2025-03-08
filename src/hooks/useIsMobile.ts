import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current viewport is mobile-sized
 * @param breakpoint - The width threshold in pixels (default: 768)
 * @returns boolean indicating if the viewport is mobile-sized
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [breakpoint]);

  return isMobile;
}

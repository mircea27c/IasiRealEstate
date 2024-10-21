import { useEffect, useState } from "react";
import { BREAKPOINT_MOBILE } from "./responsiveSizes";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.matchMedia(`(max-width: ${BREAKPOINT_MOBILE})`).matches,
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;

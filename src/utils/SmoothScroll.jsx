
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";


const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      orientation: "vertical",
      gestureDirection: "vertical",
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      if (lenisRef.current) {
        try {
          lenisRef.current.scrollTo(0, { duration: 0.8 });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;

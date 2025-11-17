import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook for page transitions with accessibility support
 * Respects prefers-reduced-motion automatically via CSS
 */
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true);
    
    // Reset after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 250); // Match --motion-duration-base

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isTransitioning };
};

/**
 * Component wrapper for page transitions
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-transition-enter">
      {children}
    </div>
  );
};

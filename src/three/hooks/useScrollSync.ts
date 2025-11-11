import { useEffect, useRef, useState } from 'react';

interface UseScrollSyncOptions {
  enabled?: boolean;
  smoothing?: number;
  onScrollProgress?: (progress: number) => void;
}

/**
 * Synchronizes scroll position with 3D scene progression
 * Problem-solver approach: bridging 2D scrolling with 3D navigation
 */
export const useScrollSync = (options: UseScrollSyncOptions = {}) => {
  const { enabled = true, smoothing = 0.1, onScrollProgress } = options;

  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      targetScroll.current = scrollTop / scrollHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth animation loop
    const animate = () => {
      // Lerp towards target
      currentScroll.current +=
        (targetScroll.current - currentScroll.current) * smoothing;

      const progress = Math.max(0, Math.min(1, currentScroll.current));

      setScrollProgress(progress);
      onScrollProgress?.(progress);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, smoothing, onScrollProgress]);

  return scrollProgress;
};

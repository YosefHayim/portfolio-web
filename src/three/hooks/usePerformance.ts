import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  quality: 'low' | 'medium' | 'high';
  memoryUsage?: number;
}

interface UsePerformanceOptions {
  targetFps?: number;
  autoAdjust?: boolean;
  onQualityChange?: (quality: 'low' | 'medium' | 'high') => void;
}

/**
 * Performance monitoring hook with automatic quality adjustment
 * Military precision: monitors and optimizes in real-time
 */
export const usePerformance = (options: UsePerformanceOptions = {}) => {
  const { targetFps = 60, autoAdjust = true, onQualityChange } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    quality: 'high',
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const qualityCheckInterval = useRef(0);

  useEffect(() => {
    const measurePerformance = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime.current;

      // Calculate FPS every second
      if (delta >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        frameCount.current = 0;
        lastTime.current = currentTime;

        // Get memory usage if available
        const memory =
          (performance as any).memory?.usedJSHeapSize /
          (1024 * 1024); // MB

        setMetrics((prev) => ({
          ...prev,
          fps,
          memoryUsage: memory,
        }));

        // Auto-adjust quality based on FPS
        if (autoAdjust) {
          qualityCheckInterval.current++;

          // Only adjust every 3 seconds to avoid flickering
          if (qualityCheckInterval.current >= 3) {
            qualityCheckInterval.current = 0;

            let newQuality: 'low' | 'medium' | 'high' = prev.quality;

            if (fps < targetFps * 0.6 && prev.quality !== 'low') {
              newQuality = 'low';
            } else if (
              fps < targetFps * 0.8 &&
              prev.quality === 'high'
            ) {
              newQuality = 'medium';
            } else if (fps > targetFps * 0.95 && prev.quality !== 'high') {
              newQuality = 'high';
            }

            if (newQuality !== prev.quality) {
              onQualityChange?.(newQuality);
              return { ...prev, fps, quality: newQuality, memoryUsage: memory };
            }
          }
        }

        return prev;
      }

      requestAnimationFrame(measurePerformance);
    };

    const animationId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [autoAdjust, targetFps, onQualityChange]);

  return metrics;
};

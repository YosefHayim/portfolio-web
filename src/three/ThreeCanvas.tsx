import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import type { ReactNode } from 'react';

interface ThreeCanvasProps {
  children: ReactNode;
  fallback?: ReactNode;
  onPerformanceChange?: (quality: 'low' | 'medium' | 'high') => void;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Main Three.js canvas wrapper component
 * Follows React Three Fiber best practices:
 * - Uses Suspense for lazy loading
 * - Performance monitoring with adaptive quality
 * - On-demand rendering for optimization
 */
export const ThreeCanvas = ({
  children,
  fallback = null,
  onPerformanceChange,
  quality = 'high',
}: ThreeCanvasProps) => {
  // Adaptive DPR based on quality
  const dpr = quality === 'low' ? [1, 1] : quality === 'medium' ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      dpr={dpr} // Adaptive pixel ratio based on quality
      frameloop="always" // Always render for animations and post-processing
      gl={{
        antialias: quality !== 'low', // Disable antialiasing on low quality
        alpha: true,
        powerPreference: quality === 'low' ? 'default' : 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      {/* Color management for consistent colors */}
      <color attach="background" args={['#0a0e1a']} />

      {/* Ambient fog for depth */}
      <fog attach="fog" args={['#0a0e1a', 10, 50]} />

      <Suspense fallback={fallback}>
        <PerformanceMonitor
          onIncline={() => onPerformanceChange?.('high')}
          onDecline={() => onPerformanceChange?.('medium')}
          onFallback={() => onPerformanceChange?.('low')}
          flipflops={3}
        >
          {children}
        </PerformanceMonitor>
      </Suspense>
    </Canvas>
  );
};

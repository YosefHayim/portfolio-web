import { useEffect, useRef } from 'react';
import { Vector2 } from 'three';
import type { Camera } from 'three';

interface UseMouseParallaxOptions {
  enabled?: boolean;
  intensity?: number;
  smoothing?: number;
}

/**
 * Custom hook for smooth camera parallax following mouse movement
 * Embodies the personality trait: responsive and interactive
 */
export const useMouseParallax = (
  camera: Camera | null,
  options: UseMouseParallaxOptions = {}
) => {
  const { enabled = true, intensity = 0.5, smoothing = 0.05 } = options;

  const mousePosition = useRef(new Vector2(0, 0));
  const targetPosition = useRef(new Vector2(0, 0));

  useEffect(() => {
    if (!enabled || !camera) return;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      targetPosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetPosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!camera) return;

      // Smooth lerp towards target
      mousePosition.current.lerp(targetPosition.current, smoothing);

      // Apply to camera position with intensity
      camera.position.x += mousePosition.current.x * intensity;
      camera.position.y += mousePosition.current.y * intensity;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [camera, enabled, intensity, smoothing]);

  return mousePosition.current;
};

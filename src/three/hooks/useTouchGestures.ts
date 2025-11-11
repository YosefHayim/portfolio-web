import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface TouchGesturesOptions {
  enabled?: boolean;
  onPinch?: (scale: number, delta: number) => void;
  onRotate?: (angle: number, delta: number) => void;
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right', velocity: number) => void;
  onDoubleTap?: (position: { x: number; y: number }) => void;
  enableCameraControl?: boolean;
  sensitivity?: number;
}

interface Touch {
  id: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
  startTime: number;
}

export function useTouchGestures(options: TouchGesturesOptions = {}) {
  const {
    enabled = true,
    onPinch,
    onRotate,
    onSwipe,
    onDoubleTap,
    enableCameraControl = true,
    sensitivity = 1,
  } = options;

  const { camera, gl } = useThree();
  const touches = useRef<Map<number, Touch>>(new Map());
  const lastDistance = useRef<number>(0);
  const lastAngle = useRef<number>(0);
  const lastTapTime = useRef<number>(0);
  const cameraRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const canvas = gl.domElement;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();

      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        touches.current.set(touch.identifier, {
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
          startX: touch.clientX,
          startY: touch.clientY,
          startTime: Date.now(),
        });
      }

      // Check for double tap
      const now = Date.now();
      if (now - lastTapTime.current < 300 && e.touches.length === 1) {
        onDoubleTap?.({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      }
      lastTapTime.current = now;

      // Initialize multi-touch gestures
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        lastDistance.current = Math.sqrt(dx * dx + dy * dy);
        lastAngle.current = Math.atan2(dy, dx);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      // Single touch - camera rotation
      if (e.touches.length === 1 && enableCameraControl) {
        const touch = e.touches[0];
        const prevTouch = touches.current.get(touch.identifier);

        if (prevTouch) {
          const deltaX = (touch.clientX - prevTouch.x) * sensitivity * 0.005;
          const deltaY = (touch.clientY - prevTouch.y) * sensitivity * 0.005;

          cameraRotation.current.y -= deltaX;
          cameraRotation.current.x -= deltaY;

          // Clamp vertical rotation
          cameraRotation.current.x = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, cameraRotation.current.x)
          );

          // Apply rotation to camera
          camera.rotation.order = 'YXZ';
          camera.rotation.y = cameraRotation.current.y;
          camera.rotation.x = cameraRotation.current.x;

          // Update touch position
          touches.current.set(touch.identifier, {
            ...prevTouch,
            x: touch.clientX,
            y: touch.clientY,
          });
        }
      }

      // Two touches - pinch and rotate
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Pinch zoom
        if (lastDistance.current > 0) {
          const scale = distance / lastDistance.current;
          const delta = distance - lastDistance.current;
          onPinch?.(scale, delta);

          // Apply zoom to camera
          if (enableCameraControl) {
            const zoomSpeed = 0.01 * sensitivity;
            const newZ = camera.position.z - delta * zoomSpeed;
            camera.position.z = Math.max(5, Math.min(50, newZ));
          }
        }

        // Rotation gesture
        if (lastAngle.current !== 0) {
          const angleDelta = angle - lastAngle.current;
          onRotate?.(angle, angleDelta);
        }

        lastDistance.current = distance;
        lastAngle.current = angle;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();

      // Check for swipe gesture
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const prevTouch = touches.current.get(touch.identifier);

        if (prevTouch) {
          const dx = touch.clientX - prevTouch.startX;
          const dy = touch.clientY - prevTouch.startY;
          const dt = Date.now() - prevTouch.startTime;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const velocity = distance / dt;

          // Swipe detection (distance > 50px, time < 300ms)
          if (distance > 50 && dt < 300) {
            const angle = Math.atan2(dy, dx);
            const absAngle = Math.abs(angle);

            let direction: 'up' | 'down' | 'left' | 'right';
            if (absAngle < Math.PI / 4) {
              direction = 'right';
            } else if (absAngle > (3 * Math.PI) / 4) {
              direction = 'left';
            } else if (angle > 0) {
              direction = 'down';
            } else {
              direction = 'up';
            }

            onSwipe?.(direction, velocity);
          }

          touches.current.delete(touch.identifier);
        }
      }

      // Reset multi-touch state
      if (e.touches.length < 2) {
        lastDistance.current = 0;
        lastAngle.current = 0;
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, camera, gl, onPinch, onRotate, onSwipe, onDoubleTap, enableCameraControl, sensitivity]);

  return {
    touches: touches.current,
  };
}

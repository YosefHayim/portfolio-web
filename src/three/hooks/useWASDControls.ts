import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface WASDControlsOptions {
  speed?: number;
  enabled?: boolean;
  bounds?: {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
    minZ?: number;
    maxZ?: number;
  };
}

export function useWASDControls(options: WASDControlsOptions = {}) {
  const { speed = 0.1, enabled = true, bounds } = options;
  const { camera } = useThree();

  const keysPressed = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    q: false, // Up
    e: false, // Down
    shift: false, // Sprint
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'w') keysPressed.current.w = true;
      if (key === 'a') keysPressed.current.a = true;
      if (key === 's') keysPressed.current.s = true;
      if (key === 'd') keysPressed.current.d = true;
      if (key === 'q') keysPressed.current.q = true;
      if (key === 'e') keysPressed.current.e = true;
      if (key === 'shift') keysPressed.current.shift = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === 'w') keysPressed.current.w = false;
      if (key === 'a') keysPressed.current.a = false;
      if (key === 's') keysPressed.current.s = false;
      if (key === 'd') keysPressed.current.d = false;
      if (key === 'q') keysPressed.current.q = false;
      if (key === 'e') keysPressed.current.e = false;
      if (key === 'shift') keysPressed.current.shift = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;

    const keys = keysPressed.current;
    const moveSpeed = keys.shift ? speed * 2 : speed;

    // Get camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    // Get right vector
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();

    // Calculate movement
    const movement = new THREE.Vector3();

    if (keys.w) movement.add(direction.multiplyScalar(moveSpeed));
    if (keys.s) movement.add(direction.multiplyScalar(-moveSpeed));
    if (keys.a) movement.add(right.multiplyScalar(moveSpeed));
    if (keys.d) movement.add(right.multiplyScalar(-moveSpeed));
    if (keys.q) movement.y += moveSpeed;
    if (keys.e) movement.y -= moveSpeed;

    // Apply movement
    camera.position.add(movement);

    // Apply bounds if specified
    if (bounds) {
      if (bounds.minX !== undefined) camera.position.x = Math.max(bounds.minX, camera.position.x);
      if (bounds.maxX !== undefined) camera.position.x = Math.min(bounds.maxX, camera.position.x);
      if (bounds.minY !== undefined) camera.position.y = Math.max(bounds.minY, camera.position.y);
      if (bounds.maxY !== undefined) camera.position.y = Math.min(bounds.maxY, camera.position.y);
      if (bounds.minZ !== undefined) camera.position.z = Math.max(bounds.minZ, camera.position.z);
      if (bounds.maxZ !== undefined) camera.position.z = Math.min(bounds.maxZ, camera.position.z);
    }
  });

  return keysPressed;
}

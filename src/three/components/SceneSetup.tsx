import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

/**
 * Scene setup component that configures lighting and camera
 * Following Three.js best practices for performance
 */
export const SceneSetup = () => {
  const { camera, invalidate } = useThree();

  // Enable mouse parallax for interactive camera movement
  useMouseParallax(camera, {
    enabled: true,
    intensity: 0.3,
    smoothing: 0.05,
  });

  useEffect(() => {
    // Request render when camera updates
    invalidate();
  }, [camera, invalidate]);

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} color="#05df72" />

      {/* Main directional light (key light) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>

      {/* Accent lights for depth */}
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#00d9ff" />
      <pointLight position={[5, -3, 5]} intensity={0.3} color="#fdc700" />

      {/* Hemisphere light for natural ambient */}
      <hemisphereLight
        args={['#0a0e1a', '#05df72', 0.3]}
        position={[0, 10, 0]}
      />
    </>
  );
};

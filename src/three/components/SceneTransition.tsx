import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';

interface SceneTransitionProps {
  children: React.ReactNode;
  transitionDuration?: number;
}

/**
 * Scene Transition component for smooth page route changes
 * Problem-solver approach: seamless 3D scene transitions between pages
 */
export const SceneTransition = ({
  children,
  transitionDuration = 1,
}: SceneTransitionProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousLocation = useRef(location.pathname);

  useEffect(() => {
    // Detect route change
    if (previousLocation.current !== location.pathname) {
      setIsTransitioning(true);

      // Fade out current scene
      if (groupRef.current) {
        gsap.to(groupRef.current.scale, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          duration: transitionDuration / 2,
          ease: 'power2.inOut',
        });

        gsap.to(groupRef.current, {
          visible: false,
          duration: transitionDuration / 2,
          onComplete: () => {
            // Fade in new scene
            if (groupRef.current) {
              groupRef.current.scale.set(1.2, 1.2, 1.2);
              groupRef.current.visible = true;

              gsap.to(groupRef.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: transitionDuration / 2,
                ease: 'power2.out',
                onComplete: () => {
                  setIsTransitioning(false);
                  previousLocation.current = location.pathname;
                },
              });
            }
          },
        });
      }
    }
  }, [location.pathname, transitionDuration]);

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};

/**
 * Transition effect types for different pages
 */
export type TransitionType = 'fade' | 'slide' | 'zoom' | 'rotate' | 'warp';

interface PageTransitionProps {
  type?: TransitionType;
  duration?: number;
  children: React.ReactNode;
}

/**
 * Configurable page transition with different effect types
 */
export const PageTransition = ({
  type = 'fade',
  duration = 1,
  children,
}: PageTransitionProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const animateTransition = () => {
      if (!groupRef.current) return;

      switch (type) {
        case 'fade':
          // Fade out then fade in
          gsap.to({ opacity: 1 }, {
            opacity: 0,
            duration: duration / 2,
            onUpdate: function() {
              setOpacity(this.targets()[0].opacity);
            },
            onComplete: () => {
              gsap.to({ opacity: 0 }, {
                opacity: 1,
                duration: duration / 2,
                onUpdate: function() {
                  setOpacity(this.targets()[0].opacity);
                },
              });
            },
          });
          break;

        case 'slide':
          // Slide out left, then in from right
          gsap.to(groupRef.current.position, {
            x: -10,
            duration: duration / 2,
            ease: 'power2.in',
            onComplete: () => {
              if (groupRef.current) {
                groupRef.current.position.x = 10;
                gsap.to(groupRef.current.position, {
                  x: 0,
                  duration: duration / 2,
                  ease: 'power2.out',
                });
              }
            },
          });
          break;

        case 'zoom':
          // Zoom out then zoom in
          gsap.to(groupRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: duration / 2,
            ease: 'power2.in',
            onComplete: () => {
              if (groupRef.current) {
                gsap.to(groupRef.current.scale, {
                  x: 1,
                  y: 1,
                  z: 1,
                  duration: duration / 2,
                  ease: 'back.out(1.7)',
                });
              }
            },
          });
          break;

        case 'rotate':
          // Rotate out then rotate in
          gsap.to(groupRef.current.rotation, {
            y: Math.PI,
            duration: duration / 2,
            ease: 'power2.in',
            onComplete: () => {
              if (groupRef.current) {
                groupRef.current.rotation.y = -Math.PI;
                gsap.to(groupRef.current.rotation, {
                  y: 0,
                  duration: duration / 2,
                  ease: 'power2.out',
                });
              }
            },
          });
          break;

        case 'warp':
          // Futuristic warp effect
          gsap.to(groupRef.current.scale, {
            x: 3,
            y: 0.1,
            z: 0.1,
            duration: duration / 2,
            ease: 'power4.in',
            onComplete: () => {
              if (groupRef.current) {
                groupRef.current.scale.set(0.1, 0.1, 3);
                gsap.to(groupRef.current.scale, {
                  x: 1,
                  y: 1,
                  z: 1,
                  duration: duration / 2,
                  ease: 'power4.out',
                });
              }
            },
          });
          break;
      }
    };

    animateTransition();
  }, [location.pathname, type, duration]);

  return (
    <group ref={groupRef} opacity={opacity}>
      {children}
    </group>
  );
};

/**
 * Loading transition screen with animated elements
 */
export const LoadingTransition = ({ progress = 0 }: { progress?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group>
      {/* Loading ring */}
      <mesh ref={meshRef}>
        <ringGeometry args={[0.8, 1, 64, 1, 0, (progress / 100) * Math.PI * 2]} />
        <meshBasicMaterial
          color="#05df72"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="#05df72" />
      </mesh>

      {/* Loading text (would need Text component from drei) */}
      <mesh position={[0, -1.5, 0]}>
        <planeGeometry args={[2, 0.3]} />
        <meshBasicMaterial color="#05df72" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

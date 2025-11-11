import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicPortraitProps {
  position?: [number, number, number];
  scale?: number;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * HolographicPortrait - 3D holographic display of profile image
 * Features:
 * - Floating animation
 * - Holographic scan line effect
 * - Glowing edges
 * - Rotating slowly
 */
export const HolographicPortrait = ({
  position = [0, 0, 0],
  scale = 1,
  quality = 'high',
}: HolographicPortraitProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Load texture
  const texture = useTexture('/images-of-me/whatsapp-profile.png');

  // Holographic material with custom shader
  const holographicMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: texture },
        time: { value: 0 },
        glowColor: { value: new THREE.Color('#05df72') },
        scanlineIntensity: { value: quality === 'high' ? 0.3 : quality === 'medium' ? 0.2 : 0.1 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform vec3 glowColor;
        uniform float scanlineIntensity;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Base texture
          vec4 texColor = texture2D(tDiffuse, vUv);

          // Scan line effect
          float scanline = sin(vUv.y * 100.0 + time * 2.0) * scanlineIntensity;

          // Holographic interference pattern
          float interference = sin(vUv.x * 50.0 + time) * sin(vUv.y * 50.0 - time * 0.5) * 0.1;

          // Fresnel edge glow
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
          vec3 glow = glowColor * fresnel * 0.5;

          // Combine effects
          vec3 finalColor = texColor.rgb + scanline + interference + glow;

          // Add subtle holographic tint
          finalColor = mix(finalColor, glowColor, 0.1);

          gl_FragColor = vec4(finalColor, texColor.a * 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [texture, quality]);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Update shader time uniform
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime;

      // Slow rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }

    if (ringRef.current) {
      // Rotate glow ring
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  // Cleanup
  useEffect(() => {
    return () => {
      holographicMaterial.dispose();
      texture.dispose();
    };
  }, [holographicMaterial, texture]);

  return (
    <Float
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <group position={position} scale={scale}>
        {/* Holographic portrait plane */}
        <mesh ref={meshRef}>
          <planeGeometry args={[2, 2, 32, 32]} />
          <primitive object={holographicMaterial} attach="material" />
        </mesh>

        {/* Glowing ring around portrait */}
        <mesh ref={ringRef} position={[0, 0, -0.1]}>
          <ringGeometry args={[1.1, 1.15, 64]} />
          <meshBasicMaterial
            color="#05df72"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Additional glow effect */}
        {quality !== 'low' && (
          <mesh position={[0, 0, -0.15]}>
            <circleGeometry args={[1.2, 64]} />
            <meshBasicMaterial
              color="#05df72"
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Particle effects around portrait */}
        {quality === 'high' && <PortraitParticles />}
      </group>
    </Float>
  );
};

/**
 * Orbiting particles around the portrait
 */
const PortraitParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.3 + Math.random() * 0.3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#05df72"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

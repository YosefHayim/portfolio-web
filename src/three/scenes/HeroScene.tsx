import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CodeMatrix } from '../components/CodeMatrix';
import { TerminalWindow } from '../components/TerminalWindow';
import { createNeonMaterial } from '../utils/materials';

interface HeroSceneProps {
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Main Hero Scene - "The Matrix Awakens"
 * Landing experience with code matrix background and 3D elements
 */
export const HeroScene = ({ quality = 'high' }: HeroSceneProps) => {
  const [nameVisible, setNameVisible] = useState(false);

  // Show name after brief delay
  useState(() => {
    setTimeout(() => setNameVisible(true), 500);
  });

  return (
    <group>
      {/* Orbit controls for user interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate={false}
      />

      {/* Background code matrix */}
      <CodeMatrix
        count={quality === 'high' ? 1000 : quality === 'medium' ? 500 : 200}
        spread={20}
        quality={quality}
      />

      {/* Central terminal window */}
      <TerminalWindow position={[0, 0, 0]} scale={1} />

      {/* Floating name text */}
      {nameVisible && (
        <Float
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <group position={[0, 2.5, 0]}>
            <Text
              fontSize={0.5}
              color="#e0e0e0"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
              outlineWidth={0.02}
              outlineColor="#05df72"
            >
              JOSEPH SABAG
            </Text>
            <Text
              position={[0, -0.7, 0]}
              fontSize={0.25}
              color="#05df72"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
            >
              Full-Stack Developer
            </Text>
          </group>
        </Float>
      )}

      {/* Tech stack orbiting cubes */}
      <OrbitingCubes />

      {/* Scroll indicator */}
      <ScrollIndicator position={[0, -3, 0]} />
    </group>
  );
};

/**
 * Orbiting tech stack cubes showing main skills
 */
const OrbitingCubes = () => {
  const groupRef = useRef<THREE.Group>(null);

  const techStack = [
    { name: 'React', color: '#61DAFB', position: 1.5 },
    { name: 'TypeScript', color: '#3178C6', position: 2 },
    { name: 'Node.js', color: '#339933', position: 1.8 },
    { name: 'Three.js', color: '#000000', position: 2.2 },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {techStack.map((tech, index) => {
        const angle = (index / techStack.length) * Math.PI * 2;
        const x = Math.cos(angle) * tech.position;
        const z = Math.sin(angle) * tech.position;

        return (
          <Float key={tech.name} speed={2 + index * 0.5} floatIntensity={0.5}>
            <mesh position={[x, 0, z]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <primitive
                object={createNeonMaterial(tech.color)}
                attach="material"
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

/**
 * Pulsing scroll indicator
 */
const ScrollIndicator = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <ringGeometry args={[0.3, 0.35, 32]} />
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.15}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
      >
        SCROLL
        {'\n'}
        TO EXPLORE
      </Text>
    </group>
  );
};

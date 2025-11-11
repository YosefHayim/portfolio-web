import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { createGlassMaterial } from '../utils/materials';

interface TerminalWindowProps {
  position?: [number, number, number];
  scale?: number;
}

/**
 * 3D Terminal Window with glassmorphism and typing effect
 * Mac OS inspired with traffic light buttons (Easter egg included!)
 */
export const TerminalWindow = ({
  position = [0, 0, 0],
  scale = 1,
}: TerminalWindowProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Trying to get better everyday...";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const glassMaterial = createGlassMaterial();

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Terminal window background */}
      <RoundedBox
        args={[4, 2.5, 0.1]}
        radius={0.05}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={glassMaterial} attach="material" />
      </RoundedBox>

      {/* Terminal header bar */}
      <mesh position={[0, 1.1, 0.06]}>
        <boxGeometry args={[4, 0.3, 0.02]} />
        <meshStandardMaterial
          color="#1e1e1e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Mac OS traffic light buttons */}
      <TrafficLights position={[-1.7, 1.1, 0.08]} />

      {/* Terminal content with typing effect */}
      <Text
        position={[-1.8, 0.5, 0.08]}
        fontSize={0.15}
        color="#05df72"
        anchorX="left"
        anchorY="top"
        maxWidth={3.5}
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        {`$ whoami\nJoseph Sabag\n\n$ cat motto.txt\n${displayText}_`}
      </Text>

      {/* Subtle glow effect */}
      <pointLight
        position={[0, 0, 0.5]}
        intensity={hovered ? 0.8 : 0.4}
        color="#05df72"
        distance={3}
      />
    </group>
  );
};

/**
 * Mac OS traffic light buttons with click interaction
 */
const TrafficLights = ({ position }: { position: [number, number, number] }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <group position={position}>
      {/* Red button (close) - clickable Easter egg */}
      <mesh
        position={[0, 0, 0]}
        onClick={handleCloseClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ff6467"
          emissive="#ff6467"
          emissiveIntensity={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* Yellow button */}
      <mesh position={[0.15, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#fdc700"
          emissive="#fdc700"
          emissiveIntensity={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Green button */}
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#05df72"
          emissive="#05df72"
          emissiveIntensity={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Easter egg alert - 3D text notification */}
      {showAlert && (
        <group position={[0.5, 0.8, 0.2]}>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[2.5, 0.8]} />
            <meshBasicMaterial
              color="#1e1e1e"
              transparent
              opacity={0.95}
            />
          </mesh>
          <mesh position={[0, 0, -0.04]}>
            <planeGeometry args={[2.48, 0.78]} />
            <meshBasicMaterial
              color="#ff6467"
              transparent
              opacity={0.3}
            />
          </mesh>
          <Text
            position={[0, 0.15, 0]}
            fontSize={0.12}
            color="#ff6467"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.3}
          >
            ⚠️ Cannot close this window!
          </Text>
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.08}
            color="#e0e0e0"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.3}
            fillOpacity={0.8}
          >
            Nice try though 😄{'\n'}(Still love Apple tho!)
          </Text>
        </group>
      )}
    </group>
  );
};

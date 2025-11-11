import { useState, useEffect } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface NavigationGuideProps {
  position: [number, number, number];
  currentSection: number;
  totalSections: number;
}

export const NavigationGuide = ({
  position,
  currentSection,
  totalSections,
}: NavigationGuideProps) => {
  const [showGuide, setShowGuide] = useState(true);

  // Auto-hide after 5 seconds on first section
  useEffect(() => {
    if (currentSection === 0) {
      const timer = setTimeout(() => setShowGuide(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setShowGuide(false);
    }
  }, [currentSection]);

  // Show again on hover area
  const handlePointerOver = () => setShowGuide(true);
  const handlePointerOut = () => {
    if (currentSection !== 0) setShowGuide(false);
  };

  if (!showGuide && currentSection !== 0) return null;

  return (
    <group
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Main instruction panel */}
      <RoundedBox
        args={[6, 3.5, 0.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.1]}
      >
        <meshStandardMaterial
          color="#0a0e1a"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Header bar */}
      <RoundedBox
        args={[6, 0.4, 0.21]}
        radius={0.1}
        smoothness={4}
        position={[0, 1.55, -0.05]}
      >
        <meshStandardMaterial
          color="#05df72"
          emissive="#05df72"
          emissiveIntensity={1.5}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 1.55, 0]}
        fontSize={0.22}
        color="#0a0e1a"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
      >
        🧭 NAVIGATION GUIDE
      </Text>

      {/* Instructions */}
      <group position={[-2.7, 1, 0]}>
        {/* Scroll instruction */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#05df72" />
          </mesh>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
          >
            SCROLL UP/DOWN
          </Text>
          <Text
            position={[0.3, -0.25, 0]}
            fontSize={0.12}
            color="#b0b0b0"
            anchorX="left"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
            maxWidth={5}
          >
            Navigate between 5 story sections
          </Text>
        </group>

        {/* Click & Drag instruction */}
        <group position={[0, -0.7, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#00d9ff" />
          </mesh>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
          >
            CLICK & DRAG
          </Text>
          <Text
            position={[0.3, -0.25, 0]}
            fontSize={0.12}
            color="#b0b0b0"
            anchorX="left"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
            maxWidth={5}
          >
            Rotate camera to explore 3D space
          </Text>
        </group>

        {/* Click objects instruction */}
        <group position={[0, -1.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#fdc700" />
          </mesh>
          <Text
            position={[0.3, 0, 0]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
          >
            CLICK OBJECTS
          </Text>
          <Text
            position={[0.3, -0.25, 0]}
            fontSize={0.12}
            color="#b0b0b0"
            anchorX="left"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
            maxWidth={5}
          >
            Interact with cards, buttons, projects
          </Text>
        </group>
      </group>

      {/* Page navigation hint */}
      <group position={[0, -1.4, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[5.5, 0.6]} />
          <meshBasicMaterial
            color="#1a1f2e"
            transparent
            opacity={0.8}
          />
        </mesh>

        <Text
          position={[0, 0.1, 0]}
          fontSize={0.13}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        >
          SITE NAVIGATION
        </Text>

        <Text
          position={[0, -0.15, 0]}
          fontSize={0.11}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
          maxWidth={5}
        >
          Use buttons in each section to visit other pages
        </Text>
      </group>

      {/* Border glow */}
      <mesh position={[0, 0, -0.12]}>
        <planeGeometry args={[6.1, 3.6]} />
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Section counter */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.14}
        color="#b0b0b0"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        Section {currentSection + 1} of {totalSections}
      </Text>
    </group>
  );
};

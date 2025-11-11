import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface JourneyCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  position: [number, number, number];
  onClick?: () => void;
  quality?: 'low' | 'medium' | 'high';
}

export const InteractiveJourneyCard = ({
  title,
  subtitle,
  description,
  icon,
  color,
  position,
  onClick,
  quality = 'high',
}: JourneyCardProps) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cardRef.current) {
      // Gentle hover animation
      const targetY = hovered ? position[1] + 0.3 : position[1];
      cardRef.current.position.y = THREE.MathUtils.lerp(
        cardRef.current.position.y,
        targetY,
        0.1
      );

      // Subtle rotation on hover
      const targetRotation = hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.05 : 0;
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        targetRotation,
        0.1
      );
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);

      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = hovered ? 0.4 : 0.2;
    }
  });

  return (
    <group
      ref={cardRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Glow effect behind card */}
      <mesh ref={glowRef} position={[0, 0, -0.15]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main card body */}
      <RoundedBox
        args={[2.5, 2.5, 0.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.1]}
      >
        <meshStandardMaterial
          color={hovered ? '#1a1f2e' : '#0a0e1a'}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>

      {/* Colored top border */}
      <RoundedBox
        args={[2.5, 0.15, 0.21]}
        radius={0.1}
        smoothness={4}
        position={[0, 1.175, -0.1]}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 1}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Icon */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        maxWidth={2.2}
        outlineWidth={0.01}
        outlineColor="#0a0e1a"
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.05, 0]}
        fontSize={0.13}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        maxWidth={2.2}
      >
        {subtitle}
      </Text>

      {/* Description */}
      {quality !== 'low' && (
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.11}
          color="#b0b0b0"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
          maxWidth={2.2}
          lineHeight={1.3}
        >
          {description}
        </Text>
      )}

      {/* Hover indicator */}
      {hovered && (
        <Text
          position={[0, -1.1, 0]}
          fontSize={0.12}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        >
          ▶ Click to explore
        </Text>
      )}

      {/* Corner decorations */}
      {quality === 'high' && (
        <>
          {/* Top-left corner */}
          <mesh position={[-1.15, 1.05, 0.01]}>
            <boxGeometry args={[0.15, 0.03, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position={[-1.15, 1.05, 0.01]}>
            <boxGeometry args={[0.03, 0.15, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Top-right corner */}
          <mesh position={[1.15, 1.05, 0.01]}>
            <boxGeometry args={[0.15, 0.03, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position={[1.15, 1.05, 0.01]}>
            <boxGeometry args={[0.03, 0.15, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Bottom-left corner */}
          <mesh position={[-1.15, -1.15, 0.01]}>
            <boxGeometry args={[0.15, 0.03, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position={[-1.15, -1.15, 0.01]}>
            <boxGeometry args={[0.03, 0.15, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Bottom-right corner */}
          <mesh position={[1.15, -1.15, 0.01]}>
            <boxGeometry args={[0.15, 0.03, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position={[1.15, -1.15, 0.01]}>
            <boxGeometry args={[0.03, 0.15, 0.03]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </>
      )}
    </group>
  );
};

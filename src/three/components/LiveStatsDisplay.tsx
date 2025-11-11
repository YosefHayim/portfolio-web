import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const stats: Stat[] = [
  { label: 'Projects Built', value: '11+', icon: '🚀', color: '#05df72' },
  { label: 'Technologies', value: '50+', icon: '⚡', color: '#00d9ff' },
  { label: 'Certifications', value: '10+', icon: '🏆', color: '#fdc700' },
  { label: 'Years Coding', value: '2+', icon: '💻', color: '#ff6467' },
];

interface LiveStatsDisplayProps {
  position: [number, number, number];
  quality?: 'low' | 'medium' | 'high';
}

export const LiveStatsDisplay = ({
  position,
  quality = 'high',
}: LiveStatsDisplayProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Gentle pulsing animation
    if (containerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      containerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={containerRef} position={position}>
      {/* Main title */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
      >
        BY THE NUMBERS
      </Text>

      {/* Stats grid (2x2) */}
      {stats.map((stat, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const xPos = (col - 0.5) * 3;
        const yPos = (1 - row) * 1.5;
        const isHovered = hoveredIndex === index;

        return (
          <group
            key={index}
            position={[xPos, yPos, 0]}
            onPointerOver={() => setHoveredIndex(index)}
            onPointerOut={() => setHoveredIndex(null)}
          >
            {/* Stat card background */}
            <RoundedBox
              args={[2.5, 1.2, 0.15]}
              radius={0.08}
              smoothness={4}
              position={[0, 0, -0.05]}
            >
              <meshStandardMaterial
                color={isHovered ? '#1a1f2e' : '#0a0e1a'}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.95}
              />
            </RoundedBox>

            {/* Colored top accent */}
            <mesh position={[0, 0.5, 0]}>
              <planeGeometry args={[2.5, 0.08]} />
              <meshBasicMaterial
                color={stat.color}
                transparent
                opacity={isHovered ? 1 : 0.8}
              />
            </mesh>

            {/* Icon */}
            <Text
              position={[-0.9, 0.15, 0]}
              fontSize={0.35}
              anchorX="center"
              anchorY="middle"
            >
              {stat.icon}
            </Text>

            {/* Value (big number) */}
            <Text
              position={[0.4, 0.15, 0]}
              fontSize={0.4}
              color={stat.color}
              anchorX="left"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
              outlineWidth={0.02}
              outlineColor="#0a0e1a"
            >
              {stat.value}
            </Text>

            {/* Label */}
            <Text
              position={[0, -0.35, 0]}
              fontSize={0.13}
              color="#b0b0b0"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
              maxWidth={2.3}
            >
              {stat.label}
            </Text>

            {/* Glow effect on hover */}
            {isHovered && quality !== 'low' && (
              <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[2.6, 1.3]} />
                <meshBasicMaterial
                  color={stat.color}
                  transparent
                  opacity={0.2}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}

            {/* Particle burst on hover */}
            {isHovered && quality === 'high' && (
              <>
                {[...Array(8)].map((_, particleIndex) => {
                  const angle = (particleIndex / 8) * Math.PI * 2;
                  const distance = 1.5;
                  return (
                    <mesh
                      key={particleIndex}
                      position={[
                        Math.cos(angle) * distance,
                        Math.sin(angle) * distance,
                        0,
                      ]}
                    >
                      <sphereGeometry args={[0.05, 8, 8]} />
                      <meshBasicMaterial
                        color={stat.color}
                        transparent
                        opacity={0.6}
                      />
                    </mesh>
                  );
                })}
              </>
            )}
          </group>
        );
      })}

      {/* Bottom tagline */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.14}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
        maxWidth={6}
      >
        And counting... Learning never stops.
      </Text>

      {/* Animated progress bar */}
      {quality !== 'low' && (
        <group position={[0, -2.9, 0]}>
          {/* Background bar */}
          <mesh>
            <planeGeometry args={[4, 0.15]} />
            <meshBasicMaterial
              color="#1a1f2e"
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Animated fill bar */}
          <mesh position={[-2, 0, 0.01]}>
            <planeGeometry args={[0, 0.15]} />
            <meshBasicMaterial
              color="#05df72"
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Progress text */}
          <Text
            position={[0, -0.25, 0]}
            fontSize={0.1}
            color="#b0b0b0"
            anchorX="center"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
          >
            "From zero to full-stack in 2 years"
          </Text>
        </group>
      )}
    </group>
  );
};

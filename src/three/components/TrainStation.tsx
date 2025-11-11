import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { CareerMilestone } from '../data/journeyData';
import { milestoneCategories } from '../data/journeyData';
import * as FaIcons from 'react-icons/fa';

interface TrainStationProps {
  milestone: CareerMilestone;
  onClick?: (milestone: CareerMilestone) => void;
  quality?: 'low' | 'medium' | 'high';
  isActive?: boolean;
}

/**
 * 3D Train Station representing a career milestone
 * Includes platform, sign, and glowing marker
 */
export const TrainStation = ({
  milestone,
  onClick,
  quality = 'high',
  isActive = false,
}: TrainStationProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const categoryColor = milestoneCategories[milestone.category].color;

  // Gentle floating animation for the station
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = milestone.position[1] + Math.sin(state.clock.elapsedTime + milestone.position[0]) * 0.1;
    }

    // Platform glow pulse
    if (platformRef.current) {
      const material = platformRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = (isActive ? 1.2 : 0.6) + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick?.(milestone);
  };

  // Get icon component
  const getIconComponent = () => {
    if (!milestone.icon || !milestone.iconLibrary) return null;
    const IconComponent = FaIcons[milestone.icon as keyof typeof FaIcons] as React.ComponentType;
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <group
      ref={groupRef}
      position={[milestone.position[0], 0, milestone.position[2]]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Station platform */}
      <mesh ref={platformRef} position={[0, 0, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[3, 3.5, 0.8, 32]} />
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={isActive ? 1.2 : 0.6}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Platform glow layers */}
      {quality !== 'low' && (
        <>
          <mesh position={[0, 0, 0]} scale={1.1}>
            <cylinderGeometry args={[3.3, 3.8, 0.9, 32]} />
            <meshBasicMaterial
              color={categoryColor}
              transparent
              opacity={hovered || isActive ? 0.4 : 0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh position={[0, 0, 0]} scale={1.2}>
            <cylinderGeometry args={[3.6, 4.1, 1.0, 32]} />
            <meshBasicMaterial
              color={categoryColor}
              transparent
              opacity={hovered || isActive ? 0.2 : 0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </>
      )}

      {/* Vertical beam/pillar */}
      <mesh position={[0, 2.5, 0]} castShadow={quality === 'high'}>
        <cylinderGeometry args={[0.3, 0.4, 4.5, 16]} />
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Station sign panel */}
      <mesh position={[0, 5, 0]} rotation={[0, 0, 0]} castShadow={quality === 'high'}>
        <boxGeometry args={[4, 1.5, 0.2]} />
        <meshStandardMaterial
          color="#0a0e1a"
          emissive={categoryColor}
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Icon on sign */}
      {milestone.icon && (
        <Html position={[0, 5.5, 0.2]} center distanceFactor={15}>
          <div
            style={{
              fontSize: '32px',
              color: categoryColor,
              filter: `drop-shadow(0 0 8px ${categoryColor})`,
            }}
          >
            {getIconComponent()}
          </div>
        </Html>
      )}

      {/* Station name */}
      <Text
        position={[0, 4.5, 0.2]}
        fontSize={0.35}
        color={categoryColor}
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
        maxWidth={3.5}
      >
        {milestone.title}
      </Text>

      {/* Date label */}
      <Text
        position={[0, 4, 0.2]}
        fontSize={0.2}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        {milestone.date}
      </Text>

      {/* Point light for station glow */}
      <pointLight
        position={[0, 3, 0]}
        color={categoryColor}
        intensity={isActive ? 4 : 2}
        distance={12}
        decay={2}
      />

      {/* Hover tooltip */}
      {hovered && !isActive && (
        <Html position={[0, 6.5, 0]} center distanceFactor={15}>
          <div
            style={{
              background: 'rgba(10, 14, 26, 0.95)',
              border: `2px solid ${categoryColor}`,
              borderRadius: '8px',
              padding: '12px 16px',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#e0e0e0',
              fontSize: '13px',
              minWidth: '200px',
              maxWidth: '280px',
              boxShadow: `0 0 20px ${categoryColor}`,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontWeight: 'bold', color: categoryColor, marginBottom: '6px' }}>
              {milestone.organization}
            </div>
            <div style={{ fontSize: '11px', color: '#888888' }}>
              {milestone.category.toUpperCase()}
              {milestone.duration && ` • ${milestone.duration}`}
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: '1.4' }}>
              {milestone.description}
            </div>
            <div
              style={{
                marginTop: '10px',
                fontSize: '10px',
                color: categoryColor,
                textAlign: 'center',
              }}
            >
              Click to explore →
            </div>
          </div>
        </Html>
      )}

      {/* Active indicator beam */}
      {isActive && quality !== 'low' && (
        <mesh position={[0, 8, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 6, 16]} />
          <meshBasicMaterial
            color={categoryColor}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Platform edge lights (decorative) */}
      {quality === 'high' && (
        <>
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 3, 0.5, Math.sin(angle) * 3]}
              scale={hovered || isActive ? 1.2 : 1}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={categoryColor}
                emissive={categoryColor}
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
};

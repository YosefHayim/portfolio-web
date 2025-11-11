import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Technology } from '../data/techStackData';
import { sizeMap, categories } from '../data/techStackData';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

interface SkillNodeProps {
  tech: Technology;
  onClick?: (tech: Technology) => void;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Individual technology node in the constellation
 * Rendered as a glowing orb with floating icon
 */
export const SkillNode = ({ tech, onClick, quality = 'high' }: SkillNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  // Get size from proficiency
  const baseSize = sizeMap[tech.size];
  const categoryColor = categories[tech.category].color;

  // Pulsing heartbeat animation
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulse effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      const targetScale = hovered ? baseSize * 1.3 : baseSize + pulse;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));

      // Rotate slowly for shimmer effect
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Animated light intensity
    if (lightRef.current) {
      const intensity = hovered ? 4 : 2 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
      lightRef.current.intensity = intensity;
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick?.(tech);
  };

  // Get icon component dynamically
  const getIconComponent = () => {
    if (!tech.icon || !tech.iconLibrary) return null;

    const iconLibrary = tech.iconLibrary.includes('fa') ? FaIcons : SiIcons;
    const IconComponent = iconLibrary[tech.icon as keyof typeof iconLibrary] as React.ComponentType;

    return IconComponent ? <IconComponent /> : null;
  };

  const segments = quality === 'high' ? 32 : quality === 'medium' ? 24 : 16;

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={tech.position}>
        {/* Main sphere */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow={quality === 'high'}
        >
          <sphereGeometry args={[1, segments, segments]} />
          <meshStandardMaterial
            color={categoryColor}
            emissive={categoryColor}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Glow layers */}
        {quality !== 'low' &&
          [1.1, 1.2, 1.3].map((scale, i) => (
            <mesh key={i} scale={scale}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshBasicMaterial
                color={categoryColor}
                transparent
                opacity={hovered ? 0.3 - i * 0.08 : 0.15 - i * 0.05}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}

        {/* Point light for glow */}
        <pointLight
          ref={lightRef}
          position={[0, 0, 0]}
          color={categoryColor}
          intensity={2}
          distance={5}
          decay={2}
        />

        {/* Icon overlay */}
        {tech.icon && (
          <Html
            center
            distanceFactor={8}
            style={{
              transition: 'all 0.2s',
              pointerEvents: 'none',
              transform: hovered ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            <div
              style={{
                color: '#ffffff',
                fontSize: `${baseSize * 24}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: `drop-shadow(0 0 ${hovered ? '8px' : '4px'} ${categoryColor})`,
                opacity: 0.95,
              }}
            >
              {getIconComponent()}
            </div>
          </Html>
        )}

        {/* Tech name label (shows on hover) */}
        {hovered && (
          <Html center distanceFactor={8} position={[0, baseSize + 0.8, 0]}>
            <div
              style={{
                background: 'rgba(10, 14, 26, 0.95)',
                border: `2px solid ${categoryColor}`,
                borderRadius: '8px',
                padding: '8px 16px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                fontWeight: 'bold',
                color: categoryColor,
                whiteSpace: 'nowrap',
                boxShadow: `0 0 20px ${categoryColor}`,
                pointerEvents: 'none',
              }}
            >
              {tech.name}
              <div
                style={{
                  fontSize: '10px',
                  color: '#888888',
                  marginTop: '4px',
                }}
              >
                {tech.yearsExperience}y exp • Level {tech.proficiencyLevel}/10
              </div>
            </div>
          </Html>
        )}

        {/* Proficiency ring indicator */}
        {quality !== 'low' && (
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <ringGeometry args={[baseSize * 1.3, baseSize * 1.4, 32, 1, 0, (tech.proficiencyLevel / 10) * Math.PI * 2]} />
            <meshBasicMaterial
              color={categoryColor}
              transparent
              opacity={hovered ? 0.6 : 0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Certification } from '../data/certificationsData';
import { certificationTypes } from '../data/certificationsData';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

interface CertificateProps {
  certification: Certification;
  onClick?: (certification: Certification) => void;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * 3D Certificate Card
 * Floating certificate with icon, title, and glow effects
 */
export const Certificate = ({ certification, onClick, quality = 'high' }: CertificateProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const typeColor = certificationTypes[certification.type].color;

  // Floating and rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        certification.position[1] + Math.sin(state.clock.elapsedTime + certification.position[0]) * 0.1;
      groupRef.current.rotation.y += 0.003;
    }

    if (cardRef.current) {
      const targetScale = hovered ? 1.15 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick?.(certification);
  };

  // Get icon component
  const getIconComponent = () => {
    if (!certification.icon || !certification.iconLibrary) return null;
    const iconLibrary = certification.iconLibrary.includes('fa') ? FaIcons : SiIcons;
    const IconComponent = iconLibrary[certification.icon as keyof typeof iconLibrary] as React.ComponentType;
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <group
      ref={groupRef}
      position={[certification.position[0], 0, certification.position[2]]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Certificate card */}
      <mesh ref={cardRef} castShadow={quality === 'high'}>
        <boxGeometry args={[2, 2.8, 0.1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={typeColor}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>

      {/* Card border/frame */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[2.1, 2.9, 0.05]} />
        <meshStandardMaterial
          color={typeColor}
          emissive={typeColor}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      {quality !== 'low' && (
        <>
          <mesh scale={1.05}>
            <boxGeometry args={[2, 2.8, 0.1]} />
            <meshBasicMaterial
              color={typeColor}
              transparent
              opacity={hovered ? 0.4 : 0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh scale={1.1}>
            <boxGeometry args={[2, 2.8, 0.1]} />
            <meshBasicMaterial
              color={typeColor}
              transparent
              opacity={hovered ? 0.2 : 0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </>
      )}

      {/* Icon on card */}
      {certification.icon && (
        <Html position={[0, 0.8, 0.11]} center distanceFactor={10}>
          <div
            style={{
              fontSize: '48px',
              color: typeColor,
              filter: `drop-shadow(0 0 8px ${typeColor})`,
              transition: 'all 0.3s',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {getIconComponent()}
          </div>
        </Html>
      )}

      {/* Certificate title */}
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.18}
        color="#0a0e1a"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        maxWidth={1.8}
        lineHeight={1.1}
      >
        {certification.title}
      </Text>

      {/* Issuer */}
      <Text
        position={[0, -0.5, 0.11]}
        fontSize={0.12}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
        maxWidth={1.8}
      >
        {certification.issuer}
      </Text>

      {/* Date */}
      <Text
        position={[0, -0.8, 0.11]}
        fontSize={0.1}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        {certification.date}
      </Text>

      {/* Type badge */}
      <mesh position={[0, -1.2, 0.11]}>
        <boxGeometry args={[1.5, 0.25, 0.02]} />
        <meshStandardMaterial
          color={typeColor}
          emissive={typeColor}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text
        position={[0, -1.2, 0.13]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
      >
        {certificationTypes[certification.type].label.toUpperCase()}
      </Text>

      {/* Point light for glow */}
      <pointLight
        position={[0, 0, 0.5]}
        color={typeColor}
        intensity={hovered ? 3 : 1.5}
        distance={4}
        decay={2}
      />

      {/* Hover tooltip */}
      {hovered && (
        <Html position={[0, -2, 0]} center distanceFactor={10}>
          <div
            style={{
              background: 'rgba(10, 14, 26, 0.95)',
              border: `2px solid ${typeColor}`,
              borderRadius: '8px',
              padding: '8px 12px',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#e0e0e0',
              fontSize: '11px',
              minWidth: '150px',
              boxShadow: `0 0 15px ${typeColor}`,
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: typeColor, fontWeight: 'bold', marginBottom: '4px' }}>
              {certification.skills.length} Skills
            </div>
            <div style={{ fontSize: '10px', color: '#888888' }}>Click to view details →</div>
          </div>
        </Html>
      )}

      {/* Featured indicator */}
      {certification.isFeatured && quality !== 'low' && (
        <>
          <mesh position={[0.85, 1.2, 0.11]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 6]} />
            <meshStandardMaterial
              color="#fdc700"
              emissive="#fdc700"
              emissiveIntensity={1.5}
            />
          </mesh>
          <pointLight position={[0.85, 1.2, 0.3]} color="#fdc700" intensity={2} distance={2} />
        </>
      )}
    </group>
  );
};

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { techStackData, connections, categories } from '../data/techStackData';
import { SkillNode } from '../components/SkillNode';
import { ConnectionLines } from '../components/ConnectionLines';
import type { Technology } from '../data/techStackData';

interface TechConstellationProps {
  quality?: 'low' | 'medium' | 'high';
  onTechSelect?: (tech: Technology) => void;
}

/**
 * Tech Stack Constellation Scene
 * Technologies arranged as stars in 3D space with connecting lines
 */
export const TechConstellation = ({
  quality = 'high',
  onTechSelect,
}: TechConstellationProps) => {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation of entire constellation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  const handleTechClick = (tech: Technology) => {
    setSelectedTech(tech);
    onTechSelect?.(tech);
  };

  // Filter technologies by hovered category
  const visibleTechnologies = hoveredCategory
    ? techStackData.filter((tech) => tech.category === hoveredCategory)
    : techStackData;

  return (
    <group ref={groupRef}>
      {/* Orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={40}
        minDistance={8}
        maxPolarAngle={Math.PI / 1.3}
        minPolarAngle={Math.PI / 4}
        autoRotate={!selectedTech}
        autoRotateSpeed={0.5}
      />

      {/* Stars background */}
      <Stars
        radius={150}
        depth={60}
        count={quality === 'high' ? 8000 : quality === 'medium' ? 4000 : 2000}
        factor={5}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Category center markers */}
      {Object.entries(categories).map(([categoryId, categoryData]) => (
        <group key={categoryId} position={categoryData.centerPosition}>
          {/* Category label */}
          <Text
            position={[0, 0, 0]}
            fontSize={0.8}
            color={categoryData.color}
            anchorX="center"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            outlineWidth={0.02}
            outlineColor="#0a0e1a"
            onPointerOver={() => setHoveredCategory(categoryId)}
            onPointerOut={() => setHoveredCategory(null)}
          >
            {categoryId.toUpperCase()}
          </Text>

          {/* Category glow sphere */}
          {quality !== 'low' && (
            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshBasicMaterial
                color={categoryData.color}
                transparent
                opacity={hoveredCategory === categoryId ? 0.3 : 0.1}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* Category point light */}
          <pointLight
            position={[0, 0, 0]}
            color={categoryData.color}
            intensity={hoveredCategory === categoryId ? 3 : 1}
            distance={15}
            decay={2}
          />
        </group>
      ))}

      {/* Connection lines between technologies */}
      <ConnectionLines
        connections={connections}
        quality={quality}
        animated={!selectedTech}
      />

      {/* Technology nodes */}
      {visibleTechnologies.map((tech) => {
        // Dim technologies not related to selected
        const isDimmed =
          selectedTech &&
          selectedTech.id !== tech.id &&
          !connections.some(
            (conn) =>
              (conn.from === selectedTech.id && conn.to === tech.id) ||
              (conn.to === selectedTech.id && conn.from === tech.id)
          );

        return (
          <group
            key={tech.id}
            opacity={isDimmed ? 0.2 : 1}
            scale={isDimmed ? 0.8 : 1}
          >
            <SkillNode tech={tech} onClick={handleTechClick} quality={quality} />
          </group>
        );
      })}

      {/* Grid helper for spatial reference */}
      {quality === 'high' && (
        <gridHelper
          args={[50, 20, '#05df72', '#05df72']}
          position={[0, -15, 0]}
          material-transparent
          material-opacity={0.1}
        />
      )}

      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />

      {/* Directional lights for depth */}
      <directionalLight
        position={[20, 30, 20]}
        intensity={0.3}
        color="#05df72"
        castShadow={quality === 'high'}
      />
      <directionalLight
        position={[-20, 30, -20]}
        intensity={0.3}
        color="#00d9ff"
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e1a', 30, 70]} />

      {/* Central core sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#05df72"
          emissive="#05df72"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Core glow layers */}
      {quality !== 'low' &&
        [1.2, 1.4, 1.6].map((scale, i) => (
          <mesh key={i} scale={scale} position={[0, 0, 0]}>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshBasicMaterial
              color="#05df72"
              transparent
              opacity={0.15 - i * 0.04}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}

      {/* Core label */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.6}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.03}
        outlineColor="#0a0e1a"
      >
        TECH CORE
      </Text>

      {/* Technology count label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        {technologies.length} Technologies • {connections.length} Connections
      </Text>
    </group>
  );
};

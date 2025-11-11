import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { ProjectData } from '../data/projectsData';

interface ProjectPlanetProps {
  project: ProjectData;
  onClick: (project: ProjectData) => void;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Individual project planet with orbital mechanics
 * Size, color, and orbit based on project characteristics
 */
export const ProjectPlanet = ({
  project,
  onClick,
  quality = 'high',
}: ProjectPlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);

  // Calculate position in orbit
  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around center
      const time = state.clock.elapsedTime * project.orbitSpeed;
      const x = Math.cos(time) * project.orbitRadius;
      const z = Math.sin(time) * project.orbitRadius;
      groupRef.current.position.x = x;
      groupRef.current.position.z = z;
    }

    if (planetRef.current) {
      // Planet self-rotation
      planetRef.current.rotation.y += 0.005;

      // Scale pulse when hovered
      if (hovered) {
        const scale = project.planetSize + Math.sin(state.clock.elapsedTime * 3) * 0.05;
        planetRef.current.scale.setScalar(scale);
      } else {
        planetRef.current.scale.setScalar(project.planetSize);
      }
    }
  });

  // Show label after delay
  useFrame((state) => {
    if (hovered && !labelVisible) {
      const delay = 0.5; // seconds
      if (state.clock.elapsedTime % 10 > delay) {
        setLabelVisible(true);
      }
    } else if (!hovered && labelVisible) {
      setLabelVisible(false);
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onClick(project);
  };

  // Material based on project status
  const getMaterial = () => {
    const baseProps = {
      color: project.color,
      emissive: project.glowColor,
      emissiveIntensity: hovered ? 0.5 : 0.2,
      metalness: 0.3,
      roughness: 0.6,
    };

    if (project.status === 'development') {
      return <meshStandardMaterial {...baseProps} wireframe={false} opacity={0.9} />;
    }

    return <meshStandardMaterial {...baseProps} />;
  };

  // Detail level based on quality
  const segments = quality === 'high' ? 64 : quality === 'medium' ? 32 : 16;

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <mesh
        ref={planetRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, segments, segments]} />
        {getMaterial()}
      </mesh>

      {/* Atmospheric glow */}
      <mesh scale={1.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={project.glowColor}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={hovered ? 1.5 : 0.5}
        color={project.glowColor}
        distance={project.planetSize * 5}
      />

      {/* Status indicator ring */}
      {project.status === 'development' && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 32]} />
          <meshBasicMaterial
            color="#fdc700"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Collaborators as small moons */}
      {project.collaborators &&
        project.collaborators.map((collab, index) => {
          const angle = (index / project.collaborators!.length) * Math.PI * 2;
          const moonDistance = project.planetSize * 1.8;
          const moonX = Math.cos(angle) * moonDistance;
          const moonZ = Math.sin(angle) * moonDistance;

          return (
            <mesh key={collab.name} position={[moonX, 0, moonZ]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#e0e0e0" emissive="#e0e0e0" emissiveIntensity={0.3} />
            </mesh>
          );
        })}

      {/* Project name label (3D text) */}
      {(hovered || labelVisible) && (
        <Text
          position={[0, project.planetSize + 0.8, 0]}
          fontSize={0.3}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#05df72"
        >
          {project.shortName}
        </Text>
      )}

      {/* Year label */}
      {hovered && (
        <Text
          position={[0, -project.planetSize - 0.6, 0]}
          fontSize={0.15}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          {project.year}
        </Text>
      )}

      {/* HTML tooltip with tech stack (only on hover) */}
      {hovered && quality === 'high' && (
        <Html
          position={[0, project.planetSize + 1.5, 0]}
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              background: 'rgba(10, 14, 26, 0.95)',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #05df72',
              maxWidth: '200px',
            }}
          >
            <p
              style={{
                color: '#05df72',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '4px',
              }}
            >
              Tech Stack:
            </p>
            <p style={{ color: '#e0e0e0', fontSize: '10px' }}>
              {project.techStack.slice(0, 5).join(', ')}
              {project.techStack.length > 5 && '...'}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

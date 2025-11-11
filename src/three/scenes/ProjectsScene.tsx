import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { projectsData, sunData } from '../data/projectsData';
import { ProjectPlanet } from '../components/ProjectPlanet';
import { ProjectDetailView } from '../components/ProjectDetailView';
import { ProjectsMinimap } from '../components/ProjectsMinimap';
import type { ProjectData } from '../data/projectsData';
import { createOrbitRing } from '../utils/geometries';

interface ProjectsSceneProps {
  quality?: 'low' | 'medium' | 'high';
  onProjectSelect?: (project: ProjectData) => void;
}

/**
 * Projects Solar System Scene
 * Each project orbits as a planet around central "sun" of core skills
 */
export const ProjectsScene = ({
  quality = 'high',
  onProjectSelect,
}: ProjectsSceneProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  // Rotate sun slowly
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    onProjectSelect?.(project);
  };

  return (
    <group>
      {/* Orbit controls for exploration */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={30}
        minDistance={5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={quality === 'high' ? 5000 : quality === 'medium' ? 2000 : 1000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Central sun (core skills) */}
      <group>
        <mesh ref={sunRef}>
          <sphereGeometry args={[sunData.size, 64, 64]} />
          <meshStandardMaterial
            color={sunData.color}
            emissive={sunData.glowColor}
            emissiveIntensity={1.5}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>

        {/* Sun glow layers */}
        {[1.1, 1.2, 1.3].map((scale, i) => (
          <mesh key={i} scale={scale}>
            <sphereGeometry args={[sunData.size, 32, 32]} />
            <meshBasicMaterial
              color={sunData.glowColor}
              transparent
              opacity={0.2 - i * 0.05}
              side={THREE.BackSide}
            />
          </mesh>
        ))}

        {/* Sun light */}
        <pointLight
          position={[0, 0, 0]}
          intensity={sunData.glowIntensity}
          color={sunData.glowColor}
          distance={40}
          decay={2}
        />

        {/* Sun label */}
        <Text
          position={[0, sunData.size + 1.5, 0]}
          fontSize={0.4}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
          outlineWidth={0.02}
          outlineColor="#0a0e1a"
        >
          {sunData.name}
        </Text>

        {/* Skill labels orbiting sun */}
        {sunData.skills.map((skill, index) => {
          const angle = (index / sunData.skills.length) * Math.PI * 2;
          const radius = sunData.size + 0.8;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <Text
              key={skill}
              position={[x, 0, z]}
              fontSize={0.15}
              color="#e0e0e0"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          );
        })}
      </group>

      {/* Orbit rings for visual guide */}
      {quality !== 'low' &&
        Array.from(new Set(projectsData.map((p) => p.orbitRadius))).map((radius) => (
          <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={createOrbitRing(radius, 0.01, 128)} />
            <meshBasicMaterial
              color="#05df72"
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

      {/* Project planets */}
      {projectsData.map((project) => (
        <ProjectPlanet
          key={project.id}
          project={project}
          onClick={handleProjectClick}
          quality={quality}
        />
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />

      {/* Directional light from above */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.5}
        castShadow={quality === 'high'}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e1a', 20, 50]} />

      {/* Project detail view modal */}
      {selectedProject && (
        <ProjectDetailView
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Minimap for navigation */}
      {!selectedProject && quality !== 'low' && (
        <ProjectsMinimap onProjectSelect={handleProjectClick} />
      )}
    </group>
  );
};

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { ProjectData } from '../data/projectsData';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

interface ProjectDetailViewProps {
  project: ProjectData | null;
  onClose: () => void;
}

/**
 * Modal view showing project details
 * Camera zooms into planet with detailed information overlay
 */
export const ProjectDetailView = ({ project, onClose }: ProjectDetailViewProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const originalCameraPosition = useRef(new THREE.Vector3());
  const originalCameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (project && groupRef.current) {
      // Store original camera position
      originalCameraPosition.current.copy(camera.position);

      // Animate camera zoom to project
      const targetPosition = groupRef.current.position.clone();
      targetPosition.y += 2;
      targetPosition.z += 5;

      gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      // Look at project
      gsap.to(originalCameraTarget.current, {
        x: groupRef.current.position.x,
        y: groupRef.current.position.y,
        z: groupRef.current.position.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }

    return () => {
      // Animate camera back on unmount
      if (!project) {
        gsap.to(camera.position, {
          x: originalCameraPosition.current.x,
          y: originalCameraPosition.current.y,
          z: originalCameraPosition.current.z,
          duration: 1.5,
          ease: 'power2.inOut',
        });
      }
    };
  }, [project, camera]);

  useFrame(() => {
    // Camera looks at target
    camera.lookAt(originalCameraTarget.current);
  });

  if (!project) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Enlarged planet */}
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.glowColor}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Glow */}
      <mesh scale={1.1}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color={project.glowColor}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Enhanced lighting */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color={project.glowColor}
        distance={15}
      />

      {/* Project title above planet */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#e0e0e0"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.03}
        outlineColor="#05df72"
        maxWidth={10}
      >
        {project.name}
      </Text>

      {/* Detailed HTML overlay */}
      <Html
        position={[0, 0, 4]}
        center
        distanceFactor={6}
        style={{
          width: '500px',
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            background: 'rgba(10, 14, 26, 0.98)',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid #05df72',
            color: '#e0e0e0',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              color: '#05df72',
              cursor: 'pointer',
              fontSize: '24px',
            }}
          >
            <FaTimes />
          </button>

          {/* Status badge */}
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px',
              background:
                project.status === 'live'
                  ? '#00C853'
                  : project.status === 'development'
                    ? '#fdc700'
                    : '#888888',
              color: '#0a0e1a',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            {project.status.toUpperCase()}
          </div>

          {/* Description */}
          <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: '20px' }}>
            <h3
              style={{
                color: '#05df72',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
              }}
            >
              Tech Stack:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(5, 223, 114, 0.2)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    border: '1px solid #05df72',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  color: '#05df72',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                }}
              >
                Collaborators:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.collaborators.map((collab) => (
                  <a
                    key={collab.name}
                    href={collab.githubProfileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#e0e0e0',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FaGithub size={16} />
                    {collab.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: '#05df72',
                color: '#0a0e1a',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaGithub size={18} />
              View Code
            </a>

            {project.deployedUrl && project.deployedUrl !== 'projects' && (
              <a
                href={project.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'transparent',
                  color: '#05df72',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  border: '2px solid #05df72',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaExternalLinkAlt size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

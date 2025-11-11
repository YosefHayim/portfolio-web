import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { projectsData } from '../data/projectsData';
import type { ProjectData } from '../data/projectsData';

interface ProjectsMinimapProps {
  onProjectSelect?: (project: ProjectData) => void;
  position?: [number, number, number];
}

/**
 * 2D minimap showing all project positions
 * Helps users navigate the solar system
 */
export const ProjectsMinimap = ({
  onProjectSelect,
  position = [0, -5, 0],
}: ProjectsMinimapProps) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Always face camera
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center distanceFactor={10}>
        <div
          style={{
            width: '250px',
            height: '250px',
            background: 'rgba(10, 14, 26, 0.95)',
            border: '2px solid #05df72',
            borderRadius: '12px',
            padding: '16px',
            position: 'relative',
          }}
        >
          {/* Title */}
          <div
            style={{
              color: '#05df72',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px',
              textAlign: 'center',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            PROJECT GALAXY
          </div>

          {/* Minimap canvas */}
          <div
            style={{
              width: '100%',
              height: 'calc(100% - 32px)',
              position: 'relative',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
              border: '1px solid #05df72',
            }}
          >
            {/* Sun at center */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#05df72',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 15px #05df72',
                zIndex: 10,
              }}
            />

            {/* Projects as dots */}
            {projectsData.map((project) => {
              // Calculate position on minimap (scaled down)
              const scale = 10; // Scale factor for minimap
              const angle = Math.random() * Math.PI * 2; // Simplified - in real implementation would track actual angle
              const x = Math.cos(angle) * (project.orbitRadius * scale);
              const y = Math.sin(angle) * (project.orbitRadius * scale);

              return (
                <div
                  key={project.id}
                  onClick={() => onProjectSelect?.(project)}
                  title={project.shortName}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    width: `${project.planetSize * 6}px`,
                    height: `${project.planetSize * 6}px`,
                    borderRadius: '50%',
                    background: project.color,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: `1px solid ${project.glowColor}`,
                    boxShadow:
                      project.status === 'development'
                        ? `0 0 8px ${project.glowColor}`
                        : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    e.currentTarget.style.boxShadow = `0 0 15px ${project.glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                    e.currentTarget.style.boxShadow =
                      project.status === 'development'
                        ? `0 0 8px ${project.glowColor}`
                        : 'none';
                  }}
                />
              );
            })}

            {/* Orbit rings */}
            {Array.from(new Set(projectsData.map((p) => p.orbitRadius))).map((radius) => {
              const scale = 10;
              const size = radius * scale * 2;

              return (
                <div
                  key={radius}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    border: '1px solid rgba(5, 223, 114, 0.2)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              right: '8px',
              fontSize: '10px',
              color: '#888888',
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#05df72',
                  marginRight: '4px',
                }}
              />
              Core
            </span>
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#fdc700',
                  border: '1px solid #fdc700',
                  boxShadow: '0 0 5px #fdc700',
                  marginRight: '4px',
                }}
              />
              Dev
            </span>
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#888888',
                  marginRight: '4px',
                }}
              />
              Live
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};

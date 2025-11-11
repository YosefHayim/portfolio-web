import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { Technology } from '../data/techStackData';
import { categories, connections, getTechnologyById } from '../data/techStackData';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

interface SkillDetailViewProps {
  tech: Technology;
  onClose: () => void;
}

/**
 * Detailed view of a technology with zoom and information
 * Shows related technologies, proficiency, experience
 */
export const SkillDetailView = ({ tech, onClose }: SkillDetailViewProps) => {
  const { camera } = useThree();
  const originalCameraPosition = useRef(new THREE.Vector3());
  const originalCameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Save original camera position
    originalCameraPosition.current.copy(camera.position);

    // Calculate zoom position (move camera closer to tech)
    const targetPosition = new THREE.Vector3(...tech.position);
    const offset = new THREE.Vector3(0, 3, 8);
    const finalPosition = targetPosition.clone().add(offset);

    // Animate camera zoom
    gsap.to(camera.position, {
      x: finalPosition.x,
      y: finalPosition.y,
      z: finalPosition.z,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(targetPosition);
      },
    });

    // Cleanup on close
    return () => {
      gsap.to(camera.position, {
        x: originalCameraPosition.current.x,
        y: originalCameraPosition.current.y,
        z: originalCameraPosition.current.z,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(originalCameraTarget.current);
        },
      });
    };
  }, [tech, camera]);

  // Get related technologies
  const relatedTechs = connections
    .filter((conn) => conn.from === tech.id || conn.to === tech.id)
    .map((conn) => {
      const relatedId = conn.from === tech.id ? conn.to : conn.from;
      return getTechnologyById(relatedId);
    })
    .filter(Boolean) as Technology[];

  const categoryColor = categories[tech.category].color;

  // Get icon component
  const getIconComponent = () => {
    if (!tech.icon || !tech.iconLibrary) return null;

    const iconLibrary = tech.iconLibrary.includes('fa') ? FaIcons : SiIcons;
    const IconComponent = iconLibrary[tech.icon as keyof typeof iconLibrary] as React.ComponentType;

    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <group position={tech.position}>
      {/* Enlarged tech orb */}
      <mesh scale={4}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={0.8}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Enhanced glow */}
      {[1.1, 1.2, 1.3, 1.4].map((scale, i) => (
        <mesh key={i} scale={scale * 4}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={categoryColor}
            transparent
            opacity={0.25 - i * 0.05}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Detail card */}
      <Html position={[0, 0, 5]} center distanceFactor={8}>
        <div
          style={{
            width: '500px',
            maxWidth: '90vw',
            background: 'rgba(10, 14, 26, 0.98)',
            border: `3px solid ${categoryColor}`,
            borderRadius: '16px',
            padding: '32px',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#e0e0e0',
            boxShadow: `0 0 40px ${categoryColor}, inset 0 0 20px rgba(5, 223, 114, 0.1)`,
            position: 'relative',
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
              border: `2px solid ${categoryColor}`,
              borderRadius: '8px',
              color: categoryColor,
              fontSize: '20px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = categoryColor;
              e.currentTarget.style.color = '#0a0e1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = categoryColor;
            }}
          >
            ✕
          </button>

          {/* Header with icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '64px',
                color: categoryColor,
                filter: `drop-shadow(0 0 12px ${categoryColor})`,
              }}
            >
              {getIconComponent()}
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: categoryColor,
                  textShadow: `0 0 10px ${categoryColor}`,
                }}
              >
                {tech.name}
              </h2>
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#888888',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {tech.category}
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                background: 'rgba(5, 223, 114, 0.1)',
                border: '1px solid rgba(5, 223, 114, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px' }}>
                PROFICIENCY
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: categoryColor }}>
                {tech.proficiencyLevel}
                <span style={{ fontSize: '18px', color: '#888888' }}>/10</span>
              </div>
              <div
                style={{
                  marginTop: '8px',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(tech.proficiencyLevel / 10) * 100}%`,
                    height: '100%',
                    background: categoryColor,
                    boxShadow: `0 0 10px ${categoryColor}`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: 'rgba(0, 217, 255, 0.1)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px' }}>
                EXPERIENCE
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00d9ff' }}>
                {tech.yearsExperience}
                <span style={{ fontSize: '18px', color: '#888888' }}>y</span>
              </div>
            </div>
          </div>

          {/* Related technologies */}
          {relatedTechs.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#888888',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Related Technologies ({relatedTechs.length})
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {relatedTechs.map((relatedTech) => (
                  <div
                    key={relatedTech.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${categories[relatedTech.category].color}`,
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: categories[relatedTech.category].color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${categories[relatedTech.category].color}20`;
                      e.currentTarget.style.boxShadow = `0 0 15px ${categories[relatedTech.category].color}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: categories[relatedTech.category].color,
                        boxShadow: `0 0 8px ${categories[relatedTech.category].color}`,
                      }}
                    />
                    {relatedTech.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer instruction */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '12px',
              color: '#888888',
              textAlign: 'center',
            }}
          >
            Click ✕ or press ESC to return to constellation
          </div>
        </div>
      </Html>
    </group>
  );
};

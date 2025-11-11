import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { CareerMilestone } from '../data/journeyData';
import { milestoneCategories } from '../data/journeyData';
import * as FaIcons from 'react-icons/fa';

interface StationDetailViewProps {
  milestone: CareerMilestone;
  onClose: () => void;
}

/**
 * Detailed view of a career milestone with zoom and information
 * Shows achievements, skills, timeline, and photos
 */
export const StationDetailView = ({ milestone, onClose }: StationDetailViewProps) => {
  const { camera } = useThree();
  const originalCameraPosition = useRef(new THREE.Vector3());
  const originalCameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Save original camera position
    originalCameraPosition.current.copy(camera.position);

    // Calculate zoom position (move camera closer to station)
    const targetPosition = new THREE.Vector3(...milestone.position);
    const offset = new THREE.Vector3(0, 5, 10);
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
  }, [milestone, camera]);

  const categoryColor = milestoneCategories[milestone.category].color;

  // Get icon component
  const getIconComponent = () => {
    if (!milestone.icon || !milestone.iconLibrary) return null;
    const IconComponent = FaIcons[milestone.icon as keyof typeof FaIcons] as React.ComponentType;
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <group position={milestone.position}>
      {/* Enlarged station marker */}
      <mesh scale={4}>
        <cylinderGeometry args={[3, 3.5, 0.8, 32]} />
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={1.2}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Enhanced glow layers */}
      {[1.1, 1.2, 1.3, 1.4].map((scale, i) => (
        <mesh key={i} scale={scale * 4}>
          <cylinderGeometry args={[3.3, 3.8, 0.9, 32]} />
          <meshBasicMaterial
            color={categoryColor}
            transparent
            opacity={0.3 - i * 0.06}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Detail card */}
      <Html position={[0, 0, 8]} center distanceFactor={12}>
        <div
          style={{
            width: '600px',
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
                {milestone.title}
              </h2>
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '18px',
                  color: '#888888',
                }}
              >
                {milestone.organization}
              </div>
              <div
                style={{
                  marginTop: '4px',
                  fontSize: '14px',
                  color: '#666666',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {milestoneCategories[milestone.category].label}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}>
                DATE
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: categoryColor }}>
                {milestone.date}
              </div>
            </div>
            {milestone.duration && (
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}>
                  DURATION
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#00d9ff' }}>
                  {milestone.duration}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
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
              Description
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#cccccc' }}>
              {milestone.description}
            </p>
          </div>

          {/* Achievements */}
          {milestone.achievements.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
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
                Key Achievements ({milestone.achievements.length})
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
                {milestone.achievements.map((achievement, index) => (
                  <li key={index} style={{ color: '#cccccc', marginBottom: '8px' }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills gained */}
          {milestone.skills && milestone.skills.length > 0 && (
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
                Skills Gained ({milestone.skills.length})
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {milestone.skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${categoryColor}`,
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: categoryColor,
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${categoryColor}20`;
                      e.currentTarget.style.boxShadow = `0 0 15px ${categoryColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {skill}
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
            Click ✕ or press ESC to continue journey
          </div>
        </div>
      </Html>
    </group>
  );
};

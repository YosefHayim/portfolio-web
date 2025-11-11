import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { Certification } from '../data/certificationsData';
import { certificationTypes } from '../data/certificationsData';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

interface CertificateDetailViewProps {
  certification: Certification;
  onClose: () => void;
}

export const CertificateDetailView = ({ certification, onClose }: CertificateDetailViewProps) => {
  const { camera } = useThree();
  const originalCameraPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    originalCameraPosition.current.copy(camera.position);
    const targetPosition = new THREE.Vector3(...certification.position);
    const offset = new THREE.Vector3(0, 0, 8);
    const finalPosition = targetPosition.clone().add(offset);

    gsap.to(camera.position, {
      x: finalPosition.x,
      y: finalPosition.y,
      z: finalPosition.z,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(targetPosition),
    });

    return () => {
      gsap.to(camera.position, {
        x: originalCameraPosition.current.x,
        y: originalCameraPosition.current.y,
        z: originalCameraPosition.current.z,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    };
  }, [certification, camera]);

  const typeColor = certificationTypes[certification.type].color;

  const getIconComponent = () => {
    if (!certification.icon || !certification.iconLibrary) return null;
    const iconLibrary = certification.iconLibrary.includes('fa') ? FaIcons : SiIcons;
    const IconComponent = iconLibrary[certification.icon as keyof typeof iconLibrary] as React.ComponentType;
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <group position={certification.position}>
      <mesh scale={5}>
        <boxGeometry args={[2, 2.8, 0.1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={typeColor}
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {[1.05, 1.1, 1.15].map((scale, i) => (
        <mesh key={i} scale={scale * 5}>
          <boxGeometry args={[2, 2.8, 0.1]} />
          <meshBasicMaterial
            color={typeColor}
            transparent
            opacity={0.3 - i * 0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <Html position={[0, 0, 3]} center distanceFactor={10}>
        <div style={{
          width: '500px', maxWidth: '90vw', background: 'rgba(10, 14, 26, 0.98)',
          border: `3px solid ${typeColor}`, borderRadius: '16px', padding: '32px',
          fontFamily: "'JetBrains Mono', monospace", color: '#e0e0e0',
          boxShadow: `0 0 40px ${typeColor}`, position: 'relative',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', right: '16px', background: 'transparent',
            border: `2px solid ${typeColor}`, borderRadius: '8px', color: typeColor,
            fontSize: '20px', width: '40px', height: '40px', cursor: 'pointer',
          }}>✕</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '64px', color: typeColor, filter: `drop-shadow(0 0 12px ${typeColor})` }}>
              {getIconComponent()}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: typeColor }}>
                {certification.title}
              </h2>
              <div style={{ marginTop: '8px', fontSize: '16px', color: '#888888' }}>
                {certification.issuer} • {certification.date}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#cccccc' }}>
              {certification.description}
            </div>
          </div>

          {certification.skills.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#888888', marginBottom: '12px' }}>
                SKILLS COVERED ({certification.skills.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {certification.skills.map((skill, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${typeColor}`,
                    borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: typeColor,
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '12px', color: '#888888', textAlign: 'center' }}>
            Press ESC or click ✕ to return to trophy case
          </div>
        </div>
      </Html>
    </group>
  );
};

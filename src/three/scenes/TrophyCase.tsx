import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Certificate } from '../components/Certificate';
import {
  certifications,
  getFeaturedCertification,
  getCertificationStats,
  type Certification,
} from '../data/certificationsData';

interface TrophyCaseProps {
  quality?: 'low' | 'medium' | 'high';
  onCertificateSelect?: (certification: Certification) => void;
}

/**
 * Trophy Case Scene
 * Display certifications as floating 3D cards in a museum-like setting
 */
export const TrophyCase = ({ quality = 'high', onCertificateSelect }: TrophyCaseProps) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const platformRef = useRef<THREE.Group>(null);
  const featuredCert = getFeaturedCertification();
  const stats = getCertificationStats();

  // Rotate featured platform
  useFrame(() => {
    if (platformRef.current && !selectedCert) {
      platformRef.current.rotation.y += 0.005;
    }
  });

  const handleCertificateClick = (cert: Certification) => {
    setSelectedCert(cert);
    onCertificateSelect?.(cert);
  };

  return (
    <group>
      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={25}
        minDistance={5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 6}
        autoRotate={!selectedCert}
        autoRotateSpeed={0.3}
      />

      {/* Stars background */}
      <Stars
        radius={150}
        depth={60}
        count={quality === 'high' ? 5000 : quality === 'medium' ? 2500 : 1200}
        factor={4}
        saturation={0}
        fade
        speed={0.2}
      />

      {/* Display case base */}
      <mesh position={[0, -3, 0]} receiveShadow={quality === 'high'}>
        <cylinderGeometry args={[12, 12, 0.5, 64]} />
        <meshStandardMaterial
          color="#0a0e1a"
          metalness={0.8}
          roughness={0.2}
          emissive="#05df72"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Featured rotating platform (center) */}
      {featuredCert && (
        <group ref={platformRef} position={[0, -1, 0]}>
          <mesh castShadow={quality === 'high'}>
            <cylinderGeometry args={[2.5, 2.5, 0.3, 32]} />
            <meshStandardMaterial
              color="#05df72"
              emissive="#05df72"
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {quality !== 'low' && (
            <mesh scale={1.1}>
              <cylinderGeometry args={[2.5, 2.5, 0.35, 32]} />
              <meshBasicMaterial
                color="#05df72"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}
          <pointLight position={[0, 2, 0]} color="#05df72" intensity={4} distance={8} />
        </group>
      )}

      {/* All certificates */}
      {certifications.map((cert) => (
        <Certificate
          key={cert.id}
          certification={cert}
          onClick={handleCertificateClick}
          quality={quality}
        />
      ))}

      {/* Display case glass dome (optional, for high quality) */}
      {quality === 'high' && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[13, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#00d9ff"
            transparent
            opacity={0.05}
            metalness={0.9}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Spotlights for museum effect */}
      {quality !== 'low' && (
        <>
          <spotLight
            position={[8, 12, 8]}
            angle={Math.PI / 6}
            penumbra={0.5}
            intensity={3}
            color="#ffffff"
            castShadow={quality === 'high'}
          />
          <spotLight
            position={[-8, 12, -8]}
            angle={Math.PI / 6}
            penumbra={0.5}
            intensity={2}
            color="#00d9ff"
          />
        </>
      )}

      {/* Directional lights */}
      <directionalLight position={[10, 15, 10]} intensity={0.4} color="#05df72" />
      <directionalLight position={[-10, 15, -10]} intensity={0.3} color="#00d9ff" />

      {/* Fog */}
      <fog attach="fog" args={['#0a0e1a', 20, 40]} />

      {/* Title above display */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.8}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.03}
        outlineColor="#0a0e1a"
      >
        TROPHY CASE
      </Text>

      {/* Stats */}
      <Text
        position={[0, 7, 0]}
        fontSize={0.3}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        {stats.total} Certifications • {stats.bootcamps} Bootcamps • {stats.courses} Courses • {stats.achievements} Awards
      </Text>

      {/* Grid floor */}
      {quality !== 'low' && (
        <gridHelper
          args={[30, 20, '#05df72', '#05df72']}
          position={[0, -2.8, 0]}
          material-transparent
          material-opacity={0.15}
        />
      )}
    </group>
  );
};

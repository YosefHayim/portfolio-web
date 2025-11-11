import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FaWhatsapp, FaGithub, FaFileDownload } from 'react-icons/fa';
import { createPhoneGeometry, createDocumentGeometry } from '../utils/geometries';
import { createNeonMaterial } from '../utils/materials';

interface Interactive3DButtonsProps {
  position?: [number, number, number];
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Interactive 3D buttons floating in the scene
 * WhatsApp phone, GitHub stars, CV document
 */
export const Interactive3DButtons = ({
  position = [0, -1.5, 0],
  quality = 'high',
}: Interactive3DButtonsProps) => {
  return (
    <group position={position}>
      <WhatsAppButton position={[-2.5, 0, 0]} />
      <GitHubStarsButton position={[0, 0, 0]} quality={quality} />
      <CVDownloadButton position={[2.5, 0, 0]} />
    </group>
  );
};

/**
 * Floating 3D WhatsApp phone button
 */
const WhatsAppButton = ({ position }: { position: [number, number, number] }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (phoneRef.current) {
      // Gentle rotation when hovered
      if (hovered) {
        phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      } else {
        phoneRef.current.rotation.y = 0;
      }

      // Click animation
      if (clicked) {
        const scale = 0.8 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
        phoneRef.current.scale.setScalar(scale);
      } else {
        phoneRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);

    // Open WhatsApp
    const phoneNumber = '+972542248558';
    const message = encodeURIComponent('Hey Joseph! I found your portfolio and I\'d love to chat!');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group
        ref={phoneRef}
        position={position}
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
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[0.5, 1, 0.1]} />
          <meshStandardMaterial
            color={hovered ? '#25D366' : '#1e1e1e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Screen with WhatsApp green */}
        <mesh position={[0, 0.05, 0.06]}>
          <boxGeometry args={[0.45, 0.85, 0.02]} />
          <meshStandardMaterial
            color="#25D366"
            emissive="#25D366"
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </mesh>

        {/* WhatsApp icon as HTML overlay */}
        <Html
          position={[0, 0, 0.08]}
          transform
          distanceFactor={0.5}
          style={{ pointerEvents: 'none' }}
        >
          <FaWhatsapp size={32} color="white" />
        </Html>

        {/* Label below */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.12}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
        >
          WhatsApp
        </Text>

        {/* Glow effect */}
        <pointLight
          position={[0, 0, 0.5]}
          intensity={hovered ? 1 : 0.3}
          color="#25D366"
          distance={2}
        />
      </group>
    </Float>
  );
};

/**
 * GitHub stars orbiting a central icon
 */
const GitHubStarsButton = ({
  position,
  quality,
}: {
  position: [number, number, number];
  quality: 'low' | 'medium' | 'high';
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const starCount = quality === 'high' ? 8 : quality === 'medium' ? 5 : 3;

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate stars around center
      groupRef.current.rotation.z = state.clock.elapsedTime * (hovered ? 1 : 0.3);
    }
  });

  const handleClick = () => {
    window.open('https://github.com/jyoketsu', '_blank');
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {/* Central GitHub circle */}
        <mesh
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
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial
            color="#1e1e1e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* GitHub icon */}
        <Html
          position={[0, 0, 0.02]}
          transform
          distanceFactor={0.5}
          style={{ pointerEvents: 'none' }}
        >
          <FaGithub size={40} color={hovered ? '#05df72' : '#e0e0e0'} />
        </Html>

        {/* Orbiting stars */}
        <group ref={groupRef}>
          {Array.from({ length: starCount }).map((_, i) => {
            const angle = (i / starCount) * Math.PI * 2;
            const radius = 0.8;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <mesh key={i} position={[x, y, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <primitive
                  object={createNeonMaterial('#fdc700')}
                  attach="material"
                />
              </mesh>
            );
          })}
        </group>

        {/* Label */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.12}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
        >
          GitHub
        </Text>

        {/* Glow */}
        <pointLight
          position={[0, 0, 0.5]}
          intensity={hovered ? 1 : 0.3}
          color="#05df72"
          distance={2}
        />
      </group>
    </Float>
  );
};

/**
 * 3D Document that unfolds on click for CV download
 */
const CVDownloadButton = ({ position }: { position: [number, number, number] }) => {
  const [hovered, setHovered] = useState(false);
  const [unfolding, setUnfolding] = useState(false);
  const docRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (docRef.current) {
      if (hovered && !unfolding) {
        // Slight hover animation
        docRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else if (unfolding) {
        // Unfold animation
        const progress = (Math.sin(state.clock.elapsedTime * 4) + 1) / 2;
        docRef.current.rotation.x = progress * Math.PI * 2;
      } else {
        docRef.current.rotation.y = 0;
        docRef.current.rotation.x = 0;
      }
    }
  });

  const handleClick = () => {
    setUnfolding(true);
    setTimeout(() => {
      // Download CV
      const cvUrl = '/cv/Joseph_Sabag_CV.pdf'; // Update with your CV path
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Joseph_Sabag_CV.pdf';
      link.click();

      setUnfolding(false);
    }, 1000);
  };

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
      <group
        ref={docRef}
        position={position}
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
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {/* Document body */}
        <mesh>
          <boxGeometry args={[0.7, 1, 0.05]} />
          <meshStandardMaterial
            color={hovered ? '#e0e0e0' : '#f5f5f5'}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* Document lines (decorative) */}
        {[0.3, 0.15, 0, -0.15, -0.3].map((yPos, i) => (
          <mesh key={i} position={[0, yPos, 0.026]}>
            <boxGeometry args={[0.5, 0.02, 0.001]} />
            <meshBasicMaterial color="#888888" />
          </mesh>
        ))}

        {/* Download icon */}
        <Html
          position={[0, 0, 0.03]}
          transform
          distanceFactor={0.5}
          style={{ pointerEvents: 'none' }}
        >
          <FaFileDownload
            size={32}
            color={hovered ? '#05df72' : '#333333'}
          />
        </Html>

        {/* Folded corner (detail) */}
        <mesh position={[0.3, 0.45, 0.026]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.1, 0.001]} />
          <meshBasicMaterial color="#d0d0d0" />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.12}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
        >
          Download CV
        </Text>

        {/* Glow effect */}
        <pointLight
          position={[0, 0, 0.5]}
          intensity={hovered ? 0.8 : 0.2}
          color="#05df72"
          distance={2}
        />
      </group>
    </Float>
  );
};

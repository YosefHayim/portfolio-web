import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectHighlight {
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  year: string;
}

const projectHighlights: ProjectHighlight[] = [
  {
    name: 'AutoBay SaaS',
    emoji: '🚀',
    tagline: 'eBay to Amazon dropshipping platform',
    color: '#FF9900',
    year: '2025',
  },
  {
    name: 'Quiz AI',
    emoji: '🧠',
    tagline: 'AI-powered quiz generation from any content',
    color: '#61DAFB',
    year: '2025',
  },
  {
    name: 'OCR Parse AI',
    emoji: '📄',
    tagline: 'Built for mom - invoice data extraction',
    color: '#10A37F',
    year: '2024',
  },
  {
    name: 'Trading Bots',
    emoji: '📈',
    tagline: 'Where it all started - ChatGPT + curiosity',
    color: '#F0B90B',
    year: '2023',
  },
];

interface ProjectHighlightCarouselProps {
  position: [number, number, number];
  quality?: 'low' | 'medium' | 'high';
  onProjectClick?: (projectName: string) => void;
}

export const ProjectHighlightCarousel = ({
  position,
  quality = 'high',
  onProjectClick,
}: ProjectHighlightCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<THREE.Group>(null);
  const cardGroupRef = useRef<THREE.Group>(null);

  // Auto-rotate carousel
  useFrame((state) => {
    if (carouselRef.current && !isTransitioning) {
      // Smooth auto-rotation
      const time = state.clock.elapsedTime;
      if (Math.floor(time) % 5 === 0 && !isTransitioning) {
        // Change project every 5 seconds
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % projectHighlights.length);
          setIsTransitioning(false);
        }, 500);
      }
    }

    // Gentle floating animation
    if (carouselRef.current) {
      carouselRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
    }

    // Card rotation animation during transition
    if (cardGroupRef.current && isTransitioning) {
      cardGroupRef.current.rotation.y += 0.1;
      const scale = Math.max(0.8, 1 - Math.abs(cardGroupRef.current.rotation.y) / 3);
      cardGroupRef.current.scale.setScalar(scale);
    } else if (cardGroupRef.current) {
      // Reset rotation smoothly
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.y,
        0,
        0.15
      );
      cardGroupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
    }
  });

  const currentProject = projectHighlights[currentIndex];

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projectHighlights.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + projectHighlights.length) % projectHighlights.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <group ref={carouselRef} position={position}>
      {/* Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
      >
        FEATURED WORK
      </Text>

      {/* Project card */}
      <group ref={cardGroupRef}>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          {/* Card background */}
          <RoundedBox args={[4, 3, 0.3]} radius={0.15} smoothness={4} position={[0, 0, -0.1]}>
            <meshStandardMaterial
              color="#0a0e1a"
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.95}
            />
          </RoundedBox>

          {/* Colored accent bar */}
          <RoundedBox
            args={[4, 0.2, 0.31]}
            radius={0.15}
            smoothness={4}
            position={[0, 1.4, -0.1]}
          >
            <meshStandardMaterial
              color={currentProject.color}
              emissive={currentProject.color}
              emissiveIntensity={1.5}
              roughness={0.3}
              metalness={0.7}
            />
          </RoundedBox>

          {/* Project emoji */}
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.8}
            anchorX="center"
            anchorY="middle"
          >
            {currentProject.emoji}
          </Text>

          {/* Project name */}
          <Text
            position={[0, 0, 0]}
            fontSize={0.28}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            outlineWidth={0.02}
            outlineColor="#0a0e1a"
          >
            {currentProject.name}
          </Text>

          {/* Tagline */}
          <Text
            position={[0, -0.4, 0]}
            fontSize={0.14}
            color="#b0b0b0"
            anchorX="center"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
            maxWidth={3.5}
            lineHeight={1.3}
          >
            {currentProject.tagline}
          </Text>

          {/* Year badge */}
          <mesh position={[1.5, -1.1, 0.01]}>
            <planeGeometry args={[0.6, 0.3]} />
            <meshBasicMaterial
              color={currentProject.color}
              transparent
              opacity={0.8}
            />
          </mesh>
          <Text
            position={[1.5, -1.1, 0.02]}
            fontSize={0.15}
            color="#0a0e1a"
            anchorX="center"
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
          >
            {currentProject.year}
          </Text>

          {/* View project button */}
          <group
            position={[0, -1.1, 0]}
            onClick={() => onProjectClick?.(currentProject.name)}
          >
            <RoundedBox args={[1.8, 0.4, 0.1]} radius={0.05} smoothness={4}>
              <meshStandardMaterial
                color={currentProject.color}
                emissive={currentProject.color}
                emissiveIntensity={1}
                roughness={0.3}
                metalness={0.7}
              />
            </RoundedBox>
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.14}
              color="#0a0e1a"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            >
              VIEW PROJECT →
            </Text>
          </group>

          {/* Glow effect */}
          {quality !== 'low' && (
            <mesh position={[0, 0, -0.15]}>
              <planeGeometry args={[4.2, 3.2]} />
              <meshBasicMaterial
                color={currentProject.color}
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}
        </Float>
      </group>

      {/* Navigation arrows */}
      <group position={[-2.5, 0, 0]} onClick={handlePrevious}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#1a1f2e"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <Text
          position={[0, 0, 0.31]}
          fontSize={0.3}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        >
          ‹
        </Text>
      </group>

      <group position={[2.5, 0, 0]} onClick={handleNext}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#1a1f2e"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <Text
          position={[0, 0, 0.31]}
          fontSize={0.3}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        >
          ›
        </Text>
      </group>

      {/* Progress dots */}
      <group position={[0, -2.2, 0]}>
        {projectHighlights.map((_, index) => (
          <mesh
            key={index}
            position={[(index - projectHighlights.length / 2 + 0.5) * 0.4, 0, 0]}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }
            }}
          >
            <sphereGeometry args={[index === currentIndex ? 0.12 : 0.08, 16, 16]} />
            <meshBasicMaterial
              color={index === currentIndex ? currentProject.color : '#4a4a4a'}
            />
          </mesh>
        ))}
      </group>

      {/* Project counter */}
      <Text
        position={[0, -2.7, 0]}
        fontSize={0.12}
        color="#b0b0b0"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
      >
        {currentIndex + 1} / {projectHighlights.length} projects
      </Text>
    </group>
  );
};

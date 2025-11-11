import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { CodeMatrix } from '../components/CodeMatrix';
import { PersonalStoryTimeline } from '../components/PersonalStoryTimeline';
import { InteractiveJourneyCard } from '../components/InteractiveJourneyCard';
import { PersonalityTerminal } from '../components/PersonalityTerminal';
import { ProjectHighlightCarousel } from '../components/ProjectHighlightCarousel';
import { LiveStatsDisplay } from '../components/LiveStatsDisplay';
import { NavButton3D } from '../components/NavButton3D';
import { NavigationGuide } from '../components/NavigationGuide';
import { createNeonMaterial } from '../utils/materials';

interface HeroSceneProps {
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Main Hero Scene - "Joseph's Story" - PERSONAL & INTERACTIVE
 * Landing experience that tells YOUR unique journey from zero to hero
 *
 * Layout (Multi-section scroll experience):
 * Section 1: Big intro with your name + personality terminal
 * Section 2: Personal story timeline (from ChatGPT to dev)
 * Section 3: Featured project carousel
 * Section 4: Interactive journey cards (3 key moments)
 * Section 5: Live stats + CTA buttons
 */
export const HeroScene = ({ quality = 'high' }: HeroSceneProps) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();

  // Show content after brief delay for dramatic entrance
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll-based section changes
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) {
        setCurrentSection((prev) => {
          const next = e.deltaY > 0 ? prev + 1 : prev - 1;
          return Math.max(0, Math.min(4, next)); // 5 sections (0-4)
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleProjectClick = (projectName: string) => {
    console.log('Navigate to project:', projectName);
    navigate('/projects');
  };

  return (
    <group>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />

      {/* Key light from top */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        color="#ffffff"
      />

      {/* Fill light from left - green accent */}
      <directionalLight
        position={[-15, 10, 5]}
        intensity={0.6}
        color="#05df72"
      />

      {/* Rim light from back right - cyan accent */}
      <directionalLight
        position={[15, 8, -15]}
        intensity={0.7}
        color="#00d9ff"
      />

      {/* Center spotlight for drama */}
      <spotLight
        position={[0, 20, 0]}
        angle={0.8}
        penumbra={0.5}
        intensity={0.8}
        color="#05df72"
        distance={40}
      />

      {/* Orbit controls for user interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={25}
        minDistance={8}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 3.5}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        autoRotate={false}
      />

      {/* Background code matrix - fuller spread */}
      <CodeMatrix
        count={quality === 'high' ? 1200 : quality === 'medium' ? 600 : 250}
        spread={30}
        quality={quality}
      />

      {contentVisible && (
        <>
          {/* Navigation Guide - Fixed position */}
          <NavigationGuide
            position={[-8, 5, 0]}
            currentSection={currentSection}
            totalSections={5}
          />

          {/* SECTION 1: Big Intro + Name */}
          <group position={[0, 0 - currentSection * 12, 0]}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
              <group position={[0, 6, 0]}>
                {/* Main name - HUGE */}
                <Text
                  fontSize={1}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
                  outlineWidth={0.04}
                  outlineColor="#05df72"
                  letterSpacing={0.08}
                >
                  JOSEPH SABAG
                </Text>

                {/* Tagline with personality */}
                <Text
                  position={[0, -1.2, 0]}
                  fontSize={0.35}
                  color="#05df72"
                  anchorX="center"
                  anchorY="middle"
                  font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
                  letterSpacing={0.15}
                >
                  FROM ZERO TO FULL-STACK
                </Text>

                {/* Personal subtitle */}
                <Text
                  position={[0, -1.8, 0]}
                  fontSize={0.18}
                  color="#e0e0e0"
                  anchorX="center"
                  anchorY="middle"
                  font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
                  maxWidth={10}
                  lineHeight={1.3}
                >
                  Started with ChatGPT and curiosity.
                  {'\n'}
                  Now building real solutions that matter.
                </Text>
              </group>
            </Float>

            {/* Personality Terminal - your voice */}
            <PersonalityTerminal
              position={[0, 0, 0]}
              quality={quality}
            />

            {/* Scroll indicator */}
            <ScrollIndicator position={[0, -8, 0]} />
          </group>

          {/* SECTION 2: Personal Story Timeline */}
          <group position={[0, -12 - currentSection * 12, 0]}>
            <PersonalStoryTimeline quality={quality} />
          </group>

          {/* SECTION 3: Featured Projects Carousel */}
          <group position={[0, -24 - currentSection * 12, 0]}>
            <ProjectHighlightCarousel
              position={[0, 0, 0]}
              quality={quality}
              onProjectClick={handleProjectClick}
            />
          </group>

          {/* SECTION 4: Interactive Journey Cards */}
          <group position={[0, -36 - currentSection * 12, 0]}>
            {/* Section title */}
            <Text
              position={[0, 4, 0]}
              fontSize={0.35}
              color="#05df72"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
              outlineWidth={0.02}
              outlineColor="#0a0e1a"
            >
              KEY TURNING POINTS
            </Text>

            {/* Three key moment cards */}
            <InteractiveJourneyCard
              title="The Spark"
              subtitle="2023"
              description="Asked ChatGPT 'how do I code?' Built trading bots with zero background."
              icon="💡"
              color="#F0B90B"
              position={[-4, 0, 0]}
              onClick={() => navigate('/about')}
              quality={quality}
            />

            <InteractiveJourneyCard
              title="The Grind"
              subtitle="2024"
              description="Bootcamp excellence award. Built automation for mom's work. Realized my potential."
              icon="🎓"
              color="#fdc700"
              position={[0, 0, 0]}
              onClick={() => navigate('/about')}
              quality={quality}
            />

            <InteractiveJourneyCard
              title="The Builder"
              subtitle="2025"
              description="11+ projects. 50+ tech stack. Full-stack developer who never stops learning."
              icon="🚀"
              color="#05df72"
              position={[4, 0, 0]}
              onClick={() => navigate('/about')}
              quality={quality}
            />
          </group>

          {/* SECTION 5: Stats + CTA */}
          <group position={[0, -48 - currentSection * 12, 0]}>
            {/* Live stats display */}
            <LiveStatsDisplay
              position={[0, 3, 0]}
              quality={quality}
            />

            {/* Call to action buttons */}
            <group position={[0, -6, 0]}>
              <NavButton3D
                text="Explore My Work"
                position={[-2.5, 0, 0]}
                to="/projects"
                variant="primary"
                scale={1.5}
                quality={quality}
              />

              <NavButton3D
                text="Let's Connect"
                position={[2.5, 0, 0]}
                onClick={() => window.open('https://wa.me/546187549', '_blank')}
                variant="whatsapp"
                scale={1.5}
                quality={quality}
              />
            </group>

            {/* Final tagline */}
            <Text
              position={[0, -8, 0]}
              fontSize={0.2}
              color="#b0b0b0"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
              maxWidth={10}
            >
              "Building what matters, one line at a time."
            </Text>
          </group>
        </>
      )}

      {/* Ambient tech stack orbiting cubes */}
      <OrbitingTechCubes quality={quality} />

      {/* Section indicator dots */}
      <SectionIndicator currentSection={currentSection} totalSections={5} />
    </group>
  );
};

/**
 * Orbiting tech stack cubes showing main skills
 * FIXED: Reduced radius, increased size, always visible
 */
const OrbitingTechCubes = ({ quality }: { quality: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  const techStack = [
    { name: 'React', color: '#61DAFB', radius: 8, height: 4 },
    { name: 'TypeScript', color: '#3178C6', radius: 8.5, height: 5 },
    { name: 'Node.js', color: '#339933', radius: 8.2, height: 3.5 },
    { name: 'Three.js', color: '#ffffff', radius: 8.7, height: 4.5 },
    { name: 'MongoDB', color: '#47A248', radius: 8.3, height: 3 },
    { name: 'Next.js', color: '#ffffff', radius: 8.6, height: 5.5 },
    { name: 'Python', color: '#3776AB', radius: 8.4, height: 3.8 },
    { name: 'AI', color: '#10A37F', radius: 8.8, height: 4.2 },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {techStack.map((tech, index) => {
        const angle = (index / techStack.length) * Math.PI * 2;
        const x = Math.cos(angle) * tech.radius;
        const z = Math.sin(angle) * tech.radius;

        return (
          <Float key={tech.name} speed={1.5 + index * 0.3} floatIntensity={0.3}>
            <mesh position={[x, tech.height, z]}>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <primitive
                object={createNeonMaterial(tech.color)}
                attach="material"
              />
            </mesh>
            {quality !== 'low' && (
              <Text
                position={[x, tech.height - 0.7, z]}
                fontSize={0.2}
                color={tech.color}
                anchorX="center"
                anchorY="middle"
                font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
                outlineWidth={0.02}
                outlineColor="#0a0e1a"
              >
                {tech.name}
              </Text>
            )}
          </Float>
        );
      })}
    </group>
  );
};

/**
 * Pulsing scroll indicator
 */
const ScrollIndicator = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    if (arrowRef.current) {
      arrowRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.25 - 0.6;
    }
  });

  return (
    <group position={position}>
      {/* Pulsing ring */}
      <mesh ref={meshRef}>
        <ringGeometry args={[0.5, 0.6, 32]} />
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh>
        <ringGeometry args={[0.45, 0.65, 32]} />
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Animated arrow */}
      <mesh ref={arrowRef} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.18, 0.35, 3]} />
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Text label */}
      <Text
        position={[0, 0.8, 0.01]}
        fontSize={0.2}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
        letterSpacing={0.1}
      >
        SCROLL TO EXPLORE
      </Text>
    </group>
  );
};

/**
 * Section indicator dots
 */
const SectionIndicator = ({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) => {
  return (
    <group position={[10, 0, 0]}>
      {[...Array(totalSections)].map((_, index) => {
        const yPos = (index - totalSections / 2 + 0.5) * 0.8;
        const isActive = index === currentSection;

        return (
          <mesh key={index} position={[0, yPos, 0]}>
            <sphereGeometry args={[isActive ? 0.15 : 0.1, 16, 16]} />
            <meshBasicMaterial
              color={isActive ? '#05df72' : '#4a4a4a'}
              transparent
              opacity={isActive ? 1 : 0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

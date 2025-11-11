import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface StoryNode {
  year: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  position: [number, number, number];
}

const storyNodes: StoryNode[] = [
  {
    year: '2023',
    title: 'Zero to Hero',
    description: 'Started with ZERO coding knowledge.\nUsed ChatGPT to build trading bots.',
    emoji: '🤖',
    color: '#F0B90B',
    position: [-6, 2, 0],
  },
  {
    year: '2024',
    title: 'The Spark',
    description: 'Built automation for mom\'s insurance company.\nRealized: "I can build ANYTHING."',
    emoji: '💡',
    color: '#00C853',
    position: [-2, 3, 0],
  },
  {
    year: '2024',
    title: 'Deep Dive',
    description: 'Bootcamp at Appleseeds.\nExcellence Award winner.\nMERN Stack mastered.',
    emoji: '🎓',
    color: '#fdc700',
    position: [2, 3, 0],
  },
  {
    year: '2025',
    title: 'Full-Stack Dev',
    description: '11+ projects built.\n50+ technologies learned.\nStill learning everyday.',
    emoji: '🚀',
    color: '#05df72',
    position: [6, 2, 0],
  },
];

interface PersonalStoryTimelineProps {
  quality?: 'low' | 'medium' | 'high';
}

export const PersonalStoryTimeline = ({ quality = 'high' }: PersonalStoryTimelineProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const lineRef = useRef<THREE.Line>(null);

  // Animate the connecting line
  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime;
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
    }
  });

  // Create connecting line geometry
  const points = storyNodes.map((node) => new THREE.Vector3(...node.position));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group position={[0, 3, -2]}>
      {/* Connecting line */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#05df72"
          transparent
          opacity={0.4}
          linewidth={2}
        />
      </line>

      {/* Story nodes */}
      {storyNodes.map((node, index) => (
        <Float
          key={node.year}
          speed={1.5 + index * 0.2}
          rotationIntensity={0.1}
          floatIntensity={0.3}
        >
          <group
            position={node.position}
            onPointerOver={() => setHoveredNode(node.year)}
            onPointerOut={() => setHoveredNode(null)}
          >
            {/* Node sphere */}
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={hoveredNode === node.year ? 2 : 1}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            {/* Glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.35, 0.45, 32]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={hoveredNode === node.year ? 0.8 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Year label */}
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.2}
              color={node.color}
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
              outlineWidth={0.02}
              outlineColor="#0a0e1a"
            >
              {node.year}
            </Text>

            {/* Emoji */}
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.4}
              anchorX="center"
              anchorY="middle"
            >
              {node.emoji}
            </Text>

            {/* Expanded info on hover */}
            {hoveredNode === node.year && quality !== 'low' && (
              <group position={[0, 1.2, 0]}>
                {/* Background panel */}
                <mesh position={[0, 0, -0.05]}>
                  <planeGeometry args={[3.5, 1.5]} />
                  <meshBasicMaterial
                    color="#0a0e1a"
                    transparent
                    opacity={0.95}
                  />
                </mesh>

                {/* Border glow */}
                <mesh position={[0, 0, -0.04]}>
                  <planeGeometry args={[3.6, 1.6]} />
                  <meshBasicMaterial
                    color={node.color}
                    transparent
                    opacity={0.3}
                  />
                </mesh>

                {/* Title */}
                <Text
                  position={[0, 0.5, 0]}
                  fontSize={0.18}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
                  maxWidth={3.2}
                >
                  {node.title}
                </Text>

                {/* Description */}
                <Text
                  position={[0, 0, 0]}
                  fontSize={0.12}
                  color="#b0b0b0"
                  anchorX="center"
                  anchorY="middle"
                  font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
                  maxWidth={3.2}
                  lineHeight={1.3}
                >
                  {node.description}
                </Text>
              </group>
            )}
          </group>
        </Float>
      ))}

      {/* Title above timeline */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.3}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
        letterSpacing={0.05}
      >
        THE JOURNEY: CURIOSITY → CODE
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.15}
        color="#e0e0e0"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
        maxWidth={8}
      >
        From asking ChatGPT "how do I code?" to building full-stack apps
      </Text>
    </group>
  );
};

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router';

interface TerminalItem {
  title: string;
  description: string;
  link?: string;
  color?: string;
}

interface Interactive3DTerminalProps {
  position?: [number, number, number];
  scale?: number;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Interactive3DTerminal - Full 3D terminal window with interactive content
 * Features:
 * - 3D frame with depth
 * - Glowing edges
 * - Interactive Mac-style buttons (red/yellow/green)
 * - Expandable terminal items
 * - Cursor animation
 * - Particle effects on interactions
 */
export const Interactive3DTerminal = ({
  position = [0, 0, 0],
  scale = 1,
  quality = 'high',
}: Interactive3DTerminalProps) => {
  const navigate = useNavigate();
  const terminalRef = useRef<THREE.Group>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  // Terminal content data
  const terminalItems: TerminalItem[] = [
    {
      title: 'WHO_AM_I?',
      description: 'Full-stack developer blending clean code with creative problem-solving.',
      color: '#05df72',
    },
    {
      title: 'STACK',
      description: 'MERN - (MongoDB, Express, React, Node.js) and much more!',
      link: '/techStack',
      color: '#00d9ff',
    },
    {
      title: 'FOCUS',
      description: "Focused on solving real-world problems — not just shipping features, but building tools that actually help people work smarter.",
      color: '#ffaa00',
    },
    {
      title: 'PASSION',
      description: "I'm automating the boring stuff, writing cleaner code, and leveling up with every project.",
      color: '#ff0080',
    },
    {
      title: 'MOTTO',
      description: 'Trying to get better everyday.',
      color: '#05df72',
    },
  ];

  const handleItemClick = (index: number, link?: string) => {
    if (link) {
      navigate(link);
    } else {
      setExpandedItem(expandedItem === index ? null : index);
    }
  };

  const handleCloseButton = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <group ref={terminalRef} position={position} scale={scale}>
      {/* Terminal frame */}
      <TerminalFrame quality={quality} />

      {/* Title bar with Mac buttons */}
      <TerminalTitleBar onCloseClick={handleCloseButton} quality={quality} />

      {/* Alert message */}
      {showAlert && (
        <AlertMessage
          message="Oops... Not Quite! That felt like a Mac close button, huh?"
          position={[0, 2.5, 0.1]}
        />
      )}

      {/* Terminal content */}
      <group position={[0, 0, 0.11]}>
        {terminalItems.map((item, index) => (
          <TerminalItem
            key={index}
            item={item}
            index={index}
            totalItems={terminalItems.length}
            hovered={hoveredItem === index}
            expanded={expandedItem === index}
            onHover={() => setHoveredItem(index)}
            onLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(index, item.link)}
            quality={quality}
          />
        ))}
      </group>

      {/* Cursor animation */}
      <TerminalCursor position={[0, -1.8, 0.11]} />

      {/* Glowing edges */}
      {quality !== 'low' && <TerminalGlow />}
    </group>
  );
};

/**
 * Terminal frame (background panel with depth)
 */
const TerminalFrame = ({ quality }: { quality: string }) => {
  return (
    <group>
      {/* Main panel */}
      <RoundedBox args={[4, 4.5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Back panel for depth */}
      <RoundedBox args={[4, 4.5, 0.05]} radius={0.1} smoothness={4} position={[0, 0, -0.08]}>
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.2}
          roughness={0.8}
        />
      </RoundedBox>

      {/* Border */}
      {quality !== 'low' && (
        <mesh position={[0, 0, 0.055]}>
          <ringGeometry args={[2.8, 2.82, 64]} />
          <meshBasicMaterial
            color="#05df72"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

/**
 * Terminal title bar with Mac-style buttons
 */
const TerminalTitleBar = ({
  onCloseClick,
  quality,
}: {
  onCloseClick: () => void;
  quality: string;
}) => {
  const [redHovered, setRedHovered] = useState(false);

  return (
    <group position={[-1.5, 2, 0.11]}>
      {/* Close button (red) */}
      <MacButton
        position={[0, 0, 0]}
        color="#ff5f56"
        hovered={redHovered}
        onHover={setRedHovered}
        onClick={onCloseClick}
        icon="×"
        quality={quality}
      />

      {/* Minimize button (yellow) */}
      <MacButton
        position={[0.25, 0, 0]}
        color="#ffbd2e"
        icon="−"
        quality={quality}
      />

      {/* Maximize button (green) */}
      <MacButton
        position={[0.5, 0, 0]}
        color="#27c93f"
        icon="↗"
        quality={quality}
      />
    </group>
  );
};

/**
 * Mac-style button
 */
const MacButton = ({
  position,
  color,
  hovered: externalHovered,
  onHover,
  onClick,
  icon,
  quality,
}: {
  position: [number, number, number];
  color: string;
  hovered?: boolean;
  onHover?: (hovered: boolean) => void;
  onClick?: () => void;
  icon?: string;
  quality: string;
}) => {
  const [internalHovered, setInternalHovered] = useState(false);
  const hovered = externalHovered !== undefined ? externalHovered : internalHovered;

  const handleHover = (state: boolean) => {
    setInternalHovered(state);
    onHover?.(state);
  };

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
        onClick={onClick}
      >
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Icon on hover */}
      {hovered && icon && (
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.08}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        >
          {icon}
        </Text>
      )}
    </group>
  );
};

/**
 * Individual terminal item
 */
const TerminalItem = ({
  item,
  index,
  totalItems,
  hovered,
  expanded,
  onHover,
  onLeave,
  onClick,
  quality,
}: {
  item: TerminalItem;
  index: number;
  totalItems: number;
  hovered: boolean;
  expanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  quality: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const itemSpacing = 0.8;
  const startY = 1.5;
  const yPosition = startY - index * itemSpacing;

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 5) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[-1.7, yPosition, 0]}
      onPointerOver={onHover}
      onPointerOut={onLeave}
      onClick={onClick}
    >
      {/* Arrow indicator */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.15}
        color={hovered ? item.color : '#05df72'}
        anchorX="left"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
      >
        ▶
      </Text>

      {/* Title */}
      <Text
        position={[0.25, 0, 0]}
        fontSize={0.15}
        color={hovered ? item.color : '#ffffff'}
        anchorX="left"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
      >
        {item.title}
      </Text>

      {/* Link indicator */}
      {item.link && (
        <Text
          position={[1.5, 0, 0]}
          fontSize={0.12}
          color={hovered ? '#ffaa00' : '#05df72'}
          anchorX="left"
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
        >
          _ VIEW
        </Text>
      )}

      {/* Description (shown on hover or expanded) */}
      {(hovered || expanded) && (
        <Text
          position={[0.25, -0.3, 0]}
          fontSize={0.1}
          color="#a0a0a0"
          anchorX="left"
          anchorY="top"
          maxWidth={3}
          lineHeight={1.2}
          font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
        >
          {item.description}
        </Text>
      )}

      {/* Hover highlight */}
      {hovered && quality !== 'low' && (
        <mesh position={[1.5, 0, -0.01]}>
          <planeGeometry args={[3.4, 0.4]} />
          <meshBasicMaterial
            color={item.color}
            transparent
            opacity={0.1}
          />
        </mesh>
      )}
    </group>
  );
};

/**
 * Animated terminal cursor
 */
const TerminalCursor = ({ position }: { position: [number, number, number] }) => {
  const cursorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cursorRef.current) {
      const opacity = Math.sin(state.clock.elapsedTime * 2) > 0 ? 1 : 0;
      (cursorRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={cursorRef} position={position}>
      <boxGeometry args={[0.1, 0.2, 0.01]} />
      <meshBasicMaterial color="#05df72" transparent opacity={1} />
    </mesh>
  );
};

/**
 * Glowing edges effect
 */
const TerminalGlow = () => {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  return (
    <mesh ref={glowRef} position={[0, 0, -0.05]}>
      <ringGeometry args={[2.85, 2.95, 64]} />
      <meshBasicMaterial
        color="#05df72"
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * Alert message popup
 */
const AlertMessage = ({
  message,
  position,
}: {
  message: string;
  position: [number, number, number];
}) => {
  return (
    <group position={position}>
      <RoundedBox args={[3.5, 0.5, 0.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#ff0080"
          emissive="#ff0080"
          emissiveIntensity={0.3}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.2}
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
      >
        {message}
      </Text>
    </group>
  );
};

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Plane } from '@react-three/drei';
import { useNavigate, useLocation } from 'react-router';
import * as THREE from 'three';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  position: [number, number, number];
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: '~', position: [-2, 0, 0] },
  { label: 'Projects', path: '/projects/3d', icon: '◉', position: [-1, 0, 0] },
  { label: 'Tech Stack', path: '/techStack/3d', icon: '⚡', position: [0, 0, 0] },
  { label: 'Journey', path: '/about/3d', icon: '🚂', position: [1, 0, 0] },
  { label: 'Certifications', path: '/certifications/3d', icon: '🏆', position: [2, 0, 0] },
];

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
}

function NavButton({ item, isActive, onClick, onHover }: NavButtonProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Float animation
    const time = state.clock.getElapsedTime();
    const index = navItems.findIndex(i => i.label === item.label);
    meshRef.current.position.y = Math.sin(time + index) * 0.05;

    // Hover scale
    const targetScale = hovered || isActive ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={meshRef}
      position={item.position}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Background panel */}
      <RoundedBox
        args={[0.8, 0.4, 0.05]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color={isActive ? '#05df72' : hovered ? '#00d9ff' : '#1e293b'}
          emissive={isActive ? '#05df72' : hovered ? '#00d9ff' : '#000000'}
          emissiveIntensity={isActive ? 0.5 : hovered ? 0.3 : 0}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Icon */}
      <Text
        position={[0, 0.08, 0.03]}
        fontSize={0.12}
        color={isActive ? '#000000' : '#e0e0e0'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.ttf"
      >
        {item.icon}
      </Text>

      {/* Label */}
      <Text
        position={[0, -0.08, 0.03]}
        fontSize={0.08}
        color={isActive ? '#000000' : '#e0e0e0'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {item.label}
      </Text>

      {/* Glow effect when active */}
      {isActive && (
        <Plane args={[1, 0.5]} position={[0, 0, -0.01]}>
          <meshBasicMaterial
            color="#05df72"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </Plane>
      )}
    </group>
  );
}

interface FloatingNavProps {
  position?: [number, number, number];
  visible?: boolean;
}

export default function FloatingNav({ position = [0, -3, 0], visible = true }: FloatingNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Subtle rotation based on mouse
    const mouse = state.pointer;
    groupRef.current.rotation.x = mouse.y * 0.05;
    groupRef.current.rotation.y = mouse.x * 0.05;
  });

  if (!visible) return null;

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Terminal-style background */}
      <RoundedBox
        args={[5.5, 0.8, 0.1]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.05]}
      >
        <meshStandardMaterial
          color="#0a0e1a"
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Border glow */}
      <RoundedBox
        args={[5.6, 0.85, 0.08]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.06]}
      >
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Nav buttons */}
      {navItems.map((item) => (
        <NavButton
          key={item.path}
          item={item}
          isActive={location.pathname === item.path}
          onClick={() => handleNavClick(item.path)}
          onHover={(hovering) => setHoveredItem(hovering ? item.label : null)}
        />
      ))}

      {/* Hover tooltip */}
      {hoveredItem && (
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.1}
          color="#05df72"
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          {hoveredItem}
        </Text>
      )}
    </group>
  );
}

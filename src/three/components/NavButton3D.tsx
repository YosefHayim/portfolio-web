import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router';

interface NavButton3DProps {
  text: string;
  position?: [number, number, number];
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'whatsapp';
  icon?: string;
  scale?: number;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * NavButton3D - Interactive 3D button mesh
 * Features:
 * - Hover effects (glow, scale, color change)
 * - Click interactions
 * - Routing integration
 * - Particle effects on hover (high quality)
 * - Smooth animations
 */
export const NavButton3D = ({
  text,
  position = [0, 0, 0],
  to,
  onClick,
  variant = 'primary',
  scale = 1,
  quality = 'high',
}: NavButton3DProps) => {
  const navigate = useNavigate();
  const buttonRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Color schemes for different variants
  const colors = {
    primary: {
      base: '#ffffff',
      hover: '#05df72',
      glow: '#05df72',
      textBase: '#000000',
      textHover: '#ffffff',
    },
    secondary: {
      base: '#1f2937',
      hover: '#374151',
      glow: '#05df72',
      textBase: '#05df72',
      textHover: '#ffffff',
    },
    whatsapp: {
      base: '#1f2937',
      hover: '#25D366',
      glow: '#25D366',
      textBase: '#05df72',
      textHover: '#ffffff',
    },
  };

  const colorScheme = colors[variant];

  // Handle click
  const handleClick = () => {
    setClicked(true);

    // Visual feedback
    setTimeout(() => {
      setClicked(false);

      // Navigation or callback
      if (to) {
        navigate(to);
      } else if (onClick) {
        onClick();
      }
    }, 150);
  };

  // Animation loop
  useFrame((state) => {
    if (buttonRef.current) {
      // Hover scale animation
      const targetScale = hovered ? 1.1 : clicked ? 0.95 : 1;
      buttonRef.current.scale.x = THREE.MathUtils.lerp(
        buttonRef.current.scale.x,
        targetScale * scale,
        0.1
      );
      buttonRef.current.scale.y = THREE.MathUtils.lerp(
        buttonRef.current.scale.y,
        targetScale * scale,
        0.1
      );
      buttonRef.current.scale.z = THREE.MathUtils.lerp(
        buttonRef.current.scale.z,
        targetScale * scale,
        0.1
      );

      // Subtle floating when hovered
      if (hovered) {
        buttonRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      } else {
        buttonRef.current.position.y = THREE.MathUtils.lerp(
          buttonRef.current.position.y,
          position[1],
          0.1
        );
      }
    }

    if (glowRef.current) {
      // Pulsing glow when hovered
      const glowIntensity = hovered ? 0.3 + Math.sin(state.clock.elapsedTime * 5) * 0.1 : 0;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity;

      // Rotate glow
      glowRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  const textContent = variant === 'whatsapp' ? `💬 ${text}` : text;

  return (
    <group position={position}>
      {/* Glow ring effect */}
      {quality !== 'low' && (
        <mesh ref={glowRef} position={[0, 0, -0.05]}>
          <ringGeometry args={[0.85, 0.95, 32]} />
          <meshBasicMaterial
            color={colorScheme.glow}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Button mesh */}
      <RoundedBox
        ref={buttonRef}
        args={[1.8, 0.6, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color={hovered ? colorScheme.hover : colorScheme.base}
          emissive={hovered ? colorScheme.glow : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Button text */}
      <Text
        ref={textRef}
        position={[0, 0, 0.06]}
        fontSize={0.22}
        color={hovered ? colorScheme.textHover : colorScheme.textBase}
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={quality !== 'low' ? 0.01 : 0}
        outlineColor={hovered ? colorScheme.glow : '#000000'}
      >
        {textContent}
      </Text>

      {/* Particle effects on hover (high quality only) */}
      {quality === 'high' && hovered && <ButtonParticles color={colorScheme.glow} />}
    </group>
  );
};

/**
 * Particle effects around button on hover
 */
const ButtonParticles = ({ color }: { color: string }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 20;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1 + Math.random() * 0.3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.5;
    }
    return pos;
  }, []);

  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z = state.clock.elapsedTime * 0.5;

      // Animate particles outward
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
        posAttr.setX(i, Math.cos(angle + state.clock.elapsedTime) * radius);
        posAttr.setZ(i, Math.sin(angle + state.clock.elapsedTime) * radius * 0.5);
      }
      posAttr.needsUpdate = true;
    }
  });

  React.useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Import React for ButtonParticles
import React from 'react';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingText3DProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
  glowColor?: string;
  maxWidth?: number;
  textAlign?: 'left' | 'center' | 'right';
  animated?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * FloatingText3D - Animated 3D text with neon glow effect
 * Features:
 * - Floating animation
 * - Neon glow outline
 * - Pulsing effect
 * - Custom shader for advanced effects
 */
export const FloatingText3D = ({
  text,
  position = [0, 0, 0],
  fontSize = 0.5,
  color = '#e0e0e0',
  glowColor = '#05df72',
  maxWidth = 10,
  textAlign = 'center',
  animated = true,
  quality = 'high',
}: FloatingText3DProps) => {
  const textRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Animation loop
  useFrame((state) => {
    if (animated && textRef.current) {
      // Subtle pulsing effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      textRef.current.scale.setScalar(pulse);
    }

    if (glowRef.current) {
      // Pulsing glow
      const glowPulse = 0.02 + Math.sin(state.clock.elapsedTime * 3) * 0.01;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowPulse * (quality === 'high' ? 1 : 0.5);
    }
  });

  return (
    <Float
      speed={animated ? 1.5 : 0}
      rotationIntensity={animated ? 0.1 : 0}
      floatIntensity={animated ? 0.2 : 0}
    >
      <group position={position}>
        {/* Main text */}
        <Text
          ref={textRef}
          fontSize={fontSize}
          color={color}
          anchorX={textAlign}
          anchorY="middle"
          font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
          maxWidth={maxWidth}
          lineHeight={1.2}
          outlineWidth={quality !== 'low' ? 0.02 : 0}
          outlineColor={glowColor}
        >
          {text}
        </Text>

        {/* Additional glow layer for high quality */}
        {quality === 'high' && (
          <Text
            ref={glowRef}
            position={[0, 0, -0.01]}
            fontSize={fontSize * 1.05}
            color={glowColor}
            anchorX={textAlign}
            anchorY="middle"
            font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            maxWidth={maxWidth}
            lineHeight={1.2}
            transparent
            opacity={0.3}
          >
            {text}
          </Text>
        )}
      </group>
    </Float>
  );
};

interface TypewriterText3DProps extends FloatingText3DProps {
  typingSpeed?: number;
  startDelay?: number;
}

/**
 * TypewriterText3D - Text that appears with typewriter effect
 */
export const TypewriterText3D = ({
  text,
  typingSpeed = 50,
  startDelay = 0,
  ...props
}: TypewriterText3DProps) => {
  const [displayText, setDisplayText] = React.useState('');
  const indexRef = useRef(0);

  React.useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayText(text.substring(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, typingSpeed, startDelay]);

  return <FloatingText3D {...props} text={displayText} />;
};

interface MultiLineFloatingTextProps {
  lines: string[];
  position?: [number, number, number];
  fontSize?: number;
  lineSpacing?: number;
  color?: string;
  glowColor?: string;
  staggerDelay?: number;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * MultiLineFloatingText - Multiple lines of 3D text with staggered animation
 */
export const MultiLineFloatingText = ({
  lines,
  position = [0, 0, 0],
  fontSize = 0.3,
  lineSpacing = 0.5,
  color = '#e0e0e0',
  glowColor = '#05df72',
  staggerDelay = 0.1,
  quality = 'high',
}: MultiLineFloatingTextProps) => {
  return (
    <group position={position}>
      {lines.map((line, index) => (
        <FloatingText3D
          key={index}
          text={line}
          position={[0, -index * lineSpacing, 0]}
          fontSize={fontSize}
          color={color}
          glowColor={glowColor}
          animated={true}
          quality={quality}
        />
      ))}
    </group>
  );
};

// Import React for TypewriterText3D
import React from 'react';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Achievement Particles - Yellow sparkles
interface AchievementParticlesProps {
  position: THREE.Vector3;
  count?: number;
  size?: number;
  color?: string;
}

export function AchievementParticles({
  position,
  count = 50,
  size = 0.1,
  color = '#fdc700',
}: AchievementParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start at center
      pos[i3] = position.x;
      pos[i3 + 1] = position.y;
      pos[i3 + 2] = position.z;

      // Random velocities
      vel[i3] = (Math.random() - 0.5) * 0.1;
      vel[i3 + 1] = Math.random() * 0.15;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    return [pos, vel];
  }, [position, count]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions
      pos[i3] += velocities[i3] * delta * 60;
      pos[i3 + 1] += velocities[i3 + 1] * delta * 60;
      pos[i3 + 2] += velocities[i3 + 2] * delta * 60;

      // Apply gravity
      velocities[i3 + 1] -= 0.005;

      // Reset if too far
      if (pos[i3 + 1] < position.y - 2) {
        pos[i3] = position.x;
        pos[i3 + 1] = position.y;
        pos[i3 + 2] = position.z;
        velocities[i3 + 1] = Math.random() * 0.15;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Code Snippet Particles - Floating text
interface CodeSnippetParticlesProps {
  count?: number;
  radius?: number;
  speed?: number;
}

export function CodeSnippetParticles({
  count = 20,
  radius = 15,
  speed = 0.01,
}: CodeSnippetParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const codeSnippets = useMemo(() => {
    const snippets = [
      'const', 'function', 'return', 'import', 'export',
      'class', 'async', 'await', 'if', 'else',
      'for', 'while', 'map', 'filter', 'reduce',
      'useState', 'useEffect', 'npm', 'git', 'push',
    ];

    return Array.from({ length: count }, (_, i) => ({
      text: snippets[Math.floor(Math.random() * snippets.length)],
      angle: (i / count) * Math.PI * 2,
      height: (Math.random() - 0.5) * 10,
      speed: speed * (0.5 + Math.random() * 0.5),
    }));
  }, [count, speed]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += speed;
  });

  return (
    <group ref={groupRef}>
      {codeSnippets.map((snippet, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(snippet.angle) * radius,
            snippet.height,
            Math.sin(snippet.angle) * radius,
          ]}
        >
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial
            color="#05df72"
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Dust Motes - Floating particles in light beams
interface DustMotesProps {
  count?: number;
  volume?: [number, number, number];
  speed?: number;
}

export function DustMotes({
  count = 100,
  volume = [10, 10, 10],
  speed = 0.01,
}: DustMotesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * volume[0];
      pos[i3 + 1] = (Math.random() - 0.5) * volume[1];
      pos[i3 + 2] = (Math.random() - 0.5) * volume[2];

      vel[i3] = (Math.random() - 0.5) * speed;
      vel[i3 + 1] = (Math.random() - 0.5) * speed * 0.5;
      vel[i3 + 2] = (Math.random() - 0.5) * speed;
    }

    return [pos, vel];
  }, [count, volume, speed]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      pos[i3] += velocities[i3] * delta * 60;
      pos[i3 + 1] += velocities[i3 + 1] * delta * 60;
      pos[i3 + 2] += velocities[i3 + 2] * delta * 60;

      // Wrap around
      if (Math.abs(pos[i3]) > volume[0] / 2) pos[i3] *= -1;
      if (Math.abs(pos[i3 + 1]) > volume[1] / 2) pos[i3 + 1] *= -1;
      if (Math.abs(pos[i3 + 2]) > volume[2] / 2) pos[i3 + 2] *= -1;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Fireflies - Magical glowing particles
interface FirefliesProps {
  count?: number;
  radius?: number;
  color?: string;
}

export function Fireflies({
  count = 30,
  radius = 10,
  color = '#05df72',
}: FirefliesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;

      pos[i3] = Math.cos(angle) * r;
      pos[i3 + 1] = (Math.random() - 0.5) * 5;
      pos[i3 + 2] = Math.sin(angle) * r;

      ph[i] = Math.random() * Math.PI * 2;
    }

    return [pos, ph];
  }, [count, radius]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      // Floating motion
      pos[i3 + 1] += Math.sin(time * 2 + phase) * 0.01;

      // Gentle orbital motion
      const angle = time * 0.1 + phase;
      const currentRadius = Math.sqrt(pos[i3] ** 2 + pos[i3 + 2] ** 2);
      pos[i3] = Math.cos(angle) * currentRadius;
      pos[i3 + 2] = Math.sin(angle) * currentRadius;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Confetti Explosion - Celebration effect
interface ConfettiProps {
  position: THREE.Vector3;
  count?: number;
  colors?: string[];
}

export function Confetti({
  position,
  count = 100,
  colors = ['#05df72', '#00d9ff', '#fdc700', '#ff6467'],
}: ConfettiProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const colorsRef = useRef<Float32Array>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      pos[i3] = position.x;
      pos[i3 + 1] = position.y;
      pos[i3 + 2] = position.z;

      // Explosive velocities
      const angle = Math.random() * Math.PI * 2;
      const power = Math.random() * 0.3;
      vel[i3] = Math.cos(angle) * power;
      vel[i3 + 1] = Math.random() * 0.4;
      vel[i3 + 2] = Math.sin(angle) * power;

      // Random colors
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }

    colorsRef.current = cols;
    return [pos, vel];
  }, [position, count, colors]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      pos[i3] += velocities[i3] * delta * 60;
      pos[i3 + 1] += velocities[i3 + 1] * delta * 60;
      pos[i3 + 2] += velocities[i3 + 2] * delta * 60;

      velocities[i3 + 1] -= 0.01; // Gravity
      velocities[i3] *= 0.98; // Air resistance
      velocities[i3 + 2] *= 0.98;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colorsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

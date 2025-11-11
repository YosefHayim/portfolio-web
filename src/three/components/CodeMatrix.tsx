import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface CodeMatrixProps {
  count?: number;
  spread?: number;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Falling code matrix particles - Matrix-inspired aesthetic
 * Optimized with instanced rendering for performance
 */
export const CodeMatrix = ({
  count = 1000,
  spread = 20,
  quality = 'high'
}: CodeMatrixProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Code snippets from your actual projects
  const codeChars = useMemo(() => [
    'const', 'async', 'await', 'import', 'export', 'function',
    'return', 'if', 'else', 'for', 'while', 'try', 'catch',
    'React', 'Three', 'fiber', 'useState', 'useEffect',
    '()', '{}', '[]', '=>', '===', '!==', '...',
    '0', '1', 'x', 'y', 'z', 'i', 'j', 'null', 'true', 'false'
  ], []);

  // Adjust count based on quality
  const adjustedCount = useMemo(() => {
    if (quality === 'low') return Math.floor(count * 0.3);
    if (quality === 'medium') return Math.floor(count * 0.6);
    return count;
  }, [count, quality]);

  // Initialize particle data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < adjustedCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          Math.random() * spread + 10,
          (Math.random() - 0.5) * spread
        ),
        speed: 0.02 + Math.random() * 0.08,
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        opacity: 0.3 + Math.random() * 0.7,
      });
    }
    return temp;
  }, [adjustedCount, spread, codeChars]);

  // Animate falling code
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    particles.forEach((particle, i) => {
      // Move particles down
      particle.position.y -= particle.speed;

      // Reset to top when reaching bottom
      if (particle.position.y < -10) {
        particle.position.y = 10;
        particle.position.x = (Math.random() - 0.5) * spread;
        particle.position.z = (Math.random() - 0.5) * spread;
      }

      // Set position and scale
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(0.1 + Math.sin(state.clock.elapsedTime + i) * 0.05);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, adjustedCount]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial
        color="#0f0"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};

/**
 * Text-based code matrix for higher quality mode
 */
export const CodeMatrixText = ({ count = 50 }: { count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  const codeLines = useMemo(() => [
    'const portfolio = new Three();',
    'import { useState } from "react";',
    'export default App;',
    'async function init() {',
    'useFrame((state, delta) => {',
    'renderer.render(scene, camera);',
    'mesh.rotation.x += 0.01;',
    'if (true) { return null; }',
    'const [x, setX] = useState(0);',
  ], []);

  const textElements = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      text: codeLines[Math.floor(Math.random() * codeLines.length)],
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        Math.random() * 10 + 5,
        (Math.random() - 0.5) * 10
      ),
      speed: 0.01 + Math.random() * 0.03,
    }));
  }, [count, codeLines]);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const data = textElements[i];
      child.position.y -= data.speed;

      if (child.position.y < -5) {
        child.position.y = 10;
        child.position.x = (Math.random() - 0.5) * 15;
        child.position.z = (Math.random() - 0.5) * 10;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textElements.map((item, i) => (
        <Text
          key={i}
          position={item.position}
          fontSize={0.2}
          color="#0f0"
          anchorX="center"
          anchorY="middle"
          transparent
          opacity={0.4}
        >
          {item.text}
        </Text>
      ))}
    </group>
  );
};

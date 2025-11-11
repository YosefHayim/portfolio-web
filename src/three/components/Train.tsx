import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface TrainProps {
  position: [number, number, number];
  rotation?: number; // Rotation angle in radians
  quality?: 'low' | 'medium' | 'high';
}

/**
 * 3D Train model representing the journey
 * Includes locomotive, cargo car, and smoke particles
 */
export const Train = ({ position, rotation = 0, quality = 'high' }: TrainProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const smokeRef = useRef<THREE.Points>(null);

  // Smoke particles
  const smokeParticles = useMemo(() => {
    const count = quality === 'high' ? 50 : quality === 'medium' ? 30 : 15;
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.05 + 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    return { positions, velocities };
  }, [quality]);

  // Animate smoke particles
  useFrame((state) => {
    if (smokeRef.current && quality !== 'low') {
      const positions = smokeRef.current.geometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        positions[i * 3] += smokeParticles.velocities[i].x;
        positions[i * 3 + 1] += smokeParticles.velocities[i].y;
        positions[i * 3 + 2] += smokeParticles.velocities[i].z;

        // Reset particle if it goes too high
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }

      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Gentle bobbing animation
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Locomotive body */}
      <group position={[0, 0.8, 0]}>
        {/* Main cabin */}
        <mesh castShadow={quality === 'high'}>
          <boxGeometry args={[1.8, 1.5, 1.2]} />
          <meshStandardMaterial
            color="#05df72"
            emissive="#05df72"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Cabin glow */}
        {quality !== 'low' && (
          <mesh scale={1.05}>
            <boxGeometry args={[1.8, 1.5, 1.2]} />
            <meshBasicMaterial
              color="#05df72"
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Roof */}
        <mesh position={[0, 1, 0]} castShadow={quality === 'high'}>
          <boxGeometry args={[2, 0.3, 1.3]} />
          <meshStandardMaterial color="#03a552" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Front window */}
        <mesh position={[0.95, 0.3, 0]} castShadow={quality === 'high'}>
          <boxGeometry args={[0.1, 0.8, 0.9]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Side windows */}
        <mesh position={[0, 0.3, 0.65]} castShadow={quality === 'high'}>
          <boxGeometry args={[1.4, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh position={[0, 0.3, -0.65]} castShadow={quality === 'high'}>
          <boxGeometry args={[1.4, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Chimney */}
        <mesh position={[-0.5, 1.5, 0]} castShadow={quality === 'high'}>
          <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
          <meshStandardMaterial color="#03a552" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Smoke particles from chimney */}
        {quality !== 'low' && (
          <points ref={smokeRef} position={[-0.5, 2, 0]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={smokeParticles.positions.length / 3}
                array={smokeParticles.positions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#888888"
              size={0.15}
              transparent
              opacity={0.4}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
            />
          </points>
        )}

        {/* Headlight */}
        <mesh position={[1, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#fdc700"
            emissive="#fdc700"
            emissiveIntensity={1.5}
          />
        </mesh>
        {quality !== 'low' && (
          <spotLight
            position={[1, 0, 0]}
            angle={Math.PI / 6}
            penumbra={0.5}
            intensity={3}
            distance={15}
            color="#fdc700"
            target-position={[5, -0.5, 0]}
          />
        )}
      </group>

      {/* Wheels */}
      {quality !== 'low' && (
        <>
          {/* Front wheels */}
          {[-0.5, 0.5].map((x, i) => (
            <group key={`front-${i}`} position={[0.6, 0.3, x]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow={quality === 'high'}>
                <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
                <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
          {/* Back wheels */}
          {[-0.5, 0.5].map((x, i) => (
            <group key={`back-${i}`} position={[-0.6, 0.3, x]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow={quality === 'high'}>
                <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
                <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </>
      )}

      {/* Train label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.25}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
      >
        JOURNEY EXPRESS
      </Text>

      {/* Point light for train glow */}
      <pointLight
        position={[0, 1, 0]}
        color="#05df72"
        intensity={2}
        distance={8}
        decay={2}
      />
    </group>
  );
};

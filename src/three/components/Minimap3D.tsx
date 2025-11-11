import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface MinimapProps {
  size?: number;
  position?: [number, number];
  zoom?: number;
  sections?: Array<{
    name: string;
    position: THREE.Vector3;
    color: string;
  }>;
}

export default function Minimap3D({
  size = 2,
  position = [5, -3],
  zoom = 15,
  sections = [],
}: MinimapProps) {
  const { camera } = useThree();
  const minimapCameraRef = useRef<THREE.OrthographicCamera>(null);
  const playerMarkerRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!playerMarkerRef.current) return;

    // Update player marker to match camera position (top-down view)
    playerMarkerRef.current.position.x = camera.position.x;
    playerMarkerRef.current.position.z = camera.position.z;

    // Update rotation to show camera direction
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
    playerMarkerRef.current.rotation.y = angle;
  });

  return (
    <group position={[position[0], position[1], 0]}>
      {/* Minimap Camera */}
      <OrthographicCamera
        ref={minimapCameraRef}
        makeDefault={false}
        position={[0, 50, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        zoom={zoom}
        near={0.1}
        far={100}
      />

      {/* Background */}
      <Plane
        args={[size, size]}
        position={[0, 0, -0.1]}
      >
        <meshBasicMaterial
          color="#0a0e1a"
          transparent
          opacity={0.8}
        />
      </Plane>

      {/* Border */}
      <Plane
        args={[size + 0.05, size + 0.05]}
        position={[0, 0, -0.11]}
      >
        <meshBasicMaterial
          color="#05df72"
          transparent
          opacity={0.5}
        />
      </Plane>

      {/* Grid */}
      <gridHelper
        args={[size, 10, '#05df72', '#1e293b']}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Section markers */}
      {sections.map((section, index) => (
        <group key={index}>
          {/* Section dot */}
          <mesh
            position={[
              section.position.x / 10,
              0.01,
              section.position.z / 10,
            ]}
          >
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial
              color={section.color}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Section pulse */}
          <mesh
            position={[
              section.position.x / 10,
              0.01,
              section.position.z / 10,
            ]}
          >
            <ringGeometry args={[0.1, 0.15, 16]} />
            <meshBasicMaterial
              color={section.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Player marker (camera position) */}
      <mesh ref={playerMarkerRef} position={[0, 0.02, 0]}>
        <coneGeometry args={[0.15, 0.3, 3]} />
        <meshBasicMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Player marker glow */}
      <mesh ref={playerMarkerRef} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.2, 16]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
